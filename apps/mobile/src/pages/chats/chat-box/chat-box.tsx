import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { RootStackParamList } from "../../../navigation";
import { useUserConnected } from "../../../user-connected";
import { ChatUI, UserUI } from "types";
import { getData, getDataById, updateOneDataById } from "repository";
import { COLORS, Loading, P, borderRadius, spaces } from "../../../components";
import { Header, InputMessage, Message } from "./components";
import { useQuery } from "@tanstack/react-query";
import { ServerFormater } from "functions";
import { chatListSocket, chatSocket } from "../../../socket.io";
import { ChatBoxHelper } from "./chat-box.helper";

let isListening = false;

export function ChatBox({ route }: ChatBoxProps) {
    const { userIdToChat } = route.params;
    const { userConnected } = useUserConnected();
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(true);
    const [seeMore, setSeeMore] = useState(false);
    const [page, setPage] = useState(0);
    const [chats, setChats] = useState<ChatUI[]>([]);
    const { data: userToChat } = useQuery({
        queryKey: ["userToChat"],
        queryFn: () => getDataById<UserUI>("user", userIdToChat),
    });

    useEffect(() => {
        if (!userConnected) return;
        new Promise(async (resolve) => {
            setLoading(true);
            const response = await getData<ChatUI>("chats", {
                fromUserId: userIdToChat,
                toUserId: userConnected.id,
                page,
            });
            setLoading(false);

            if (response.status == "success") {
                if (response.data.length === 0) setHasMore(false);
                if (seeMore)
                    setChats((last) => {
                        return ChatBoxHelper.removeDuplicatedID([
                            ...last,
                            ...response.data,
                        ]);
                    });
                else setChats(response.data);
            }
            resolve("");
        });
    }, [userConnected, seeMore, page]);

    useEffect(() => {
        if (!userConnected || !userToChat) return;
        if (isListening) return;

        console.log("listening chat");
        chatSocket.join({
            sender: userConnected,
            receiver: userToChat.data,
        });
        chatSocket.listener({
            sender: userConnected,
            receiver: userToChat.data,
            onReceived(newChat) {
                newChat && setChats((last) => [...new Set([newChat, ...last])]);
                chatListSocket.emitRefetchReceiver(userToChat.data);
            },
        });
        chatSocket.listenerSeenAllMessage({
            sender: userConnected,
            receiver: userToChat.data,
            onReceived() {
                setChats((lastChats) => {
                    return lastChats.map((curr) => ({
                        ...curr,
                        isSeenByReceiver: true,
                    }));
                });
                chatListSocket.emitRefetchReceiver(userToChat.data);
            },
        });
        isListening = true;
    }, [userConnected, userToChat]);

    useEffect(() => {
        return () => {
            if (userConnected && userToChat) {
                console.log("leaving chat");
                chatSocket.leave({
                    sender: userConnected,
                    receiver: userToChat.data,
                });
                isListening = false;
            }
        };
    }, [userConnected, userToChat]);

    useEffect(() => {
        if (!userConnected || !userToChat) return;
        // message non lu par l'utilisateur connecté
        new Promise(async (resolve) => {
            const chatUpdated: ChatUI[] = [];
            let isChanged = false;
            for (const chat of chats) {
                if (
                    userConnected.id == chat.toUser.id &&
                    !chat.isSeenByReceiver
                ) {
                    await updateOneDataById("chat", chat.id.toString(), {
                        isSeenByReceiver: true,
                    });
                    chatUpdated.push({ ...chat, isSeenByReceiver: true });
                    isChanged = true;
                } else {
                    chatUpdated.push(chat);
                }
            }
            if (isChanged) {
                setChats(chatUpdated);
                chatListSocket.emitRefetchReceiver(userToChat.data);
                chatSocket.emitSeenAllMessage({
                    sender: userConnected,
                    receiver: userToChat.data,
                });
            }
            resolve("");
        });
    }, [userConnected, userToChat, chats]);

    if (!userToChat || !userConnected) return <Loading />;

    const lastMessage = chats.at(0);
    const isLastMessageMine =
        lastMessage && userConnected.id == lastMessage.fromUser.id;

    return (
        <View style={styles.content}>
            <Header userToChat={userToChat.data} />
            <FlatList
                data={chats}
                renderItem={({ item }) => (
                    <Message chat={item} userConnected={userConnected} />
                )}
                style={styles.list}
                ListFooterComponent={
                    <>
                        {hasMore && chats.length > 9 && (
                            <TouchableOpacity
                                style={styles.seeMore}
                                onPress={() => {
                                    setSeeMore(true);
                                    setPage((p) => p + 1);
                                }}
                            >
                                <P>voir plus...</P>
                            </TouchableOpacity>
                        )}

                        {loading && (
                            <View style={styles.activityIndicator}>
                                <ActivityIndicator />
                            </View>
                        )}
                    </>
                }
                ListHeaderComponent={
                    <>
                        {lastMessage &&
                            isLastMessageMine &&
                            lastMessage.isSeenByReceiver && (
                                <View style={styles.miniImageContainer}>
                                    <Image
                                        source={{
                                            uri: ServerFormater.staticPath(
                                                userToChat.data.imageURL
                                            ),
                                        }}
                                        style={styles.miniImage}
                                    />
                                </View>
                            )}
                    </>
                }
                showsVerticalScrollIndicator={false}
                inverted
                onEndReached={() => {
                    setSeeMore(true);
                    setPage((p) => p + 1);
                }}
            />
            <InputMessage
                onSent={(content) => {
                    chatSocket.emit({
                        sender: userConnected,
                        receiver: userToChat.data,
                        content,
                    });
                }}
            />
        </View>
    );
}

type ChatBoxProps = NativeStackScreenProps<RootStackParamList, "Chatbox">;

const styles = StyleSheet.create({
    content: {
        paddingBottom: 80,
        flex: 1,
    },
    list: {
        marginTop: 64,
    },
    seeMore: {
        width: "100%",
        backgroundColor: COLORS.neutral[100],
        borderColor: COLORS.neutral[200],
        borderRadius: borderRadius.large,
        borderWidth: 1,
        padding: spaces.m2,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    activityIndicator: {
        position: "absolute",
        top: 40,
        justifyContent: "center",
        flexDirection: "row",
        width: "100%",
    },
    miniImageContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        paddingHorizontal: spaces.m2,
    },
    miniImage: {
        width: 15,
        height: 15,
        borderRadius: borderRadius.rounded,
    },
});
