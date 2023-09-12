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
import { getData, getDataById } from "repository";
import { COLORS, Loading, P, borderRadius, spaces } from "../../../components";
import { Header, InputMessage, Message } from "./components";
import { useQuery } from "@tanstack/react-query";
import { ServerFormater } from "functions";

export function ChatBox({ route }: ChatBoxProps) {
    const { userIdToChat } = route.params;
    const { userConnected } = useUserConnected();
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(true);
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
            });
            setLoading(false);
            if (response.status == "success") {
                if (response.data.length === 0) setHasMore(false);
                setChats(chats);
            }
            resolve("");
        });
    }, [userConnected]);

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
                                // onPress={onSeeMore}
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
                                            uri: ServerFormater.defaultImagePath(
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
                    console.log("end reached");
                }}
            />
            <InputMessage onSent={() => {}} />
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
