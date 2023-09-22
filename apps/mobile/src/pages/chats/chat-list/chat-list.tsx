import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import {
    clearUserInStorage,
    setUserToDisconnected,
    useUserConnected,
} from "../../../user-connected";
import {
    EditIcon,
    HeaderWithUserIcon,
    Loading,
    spaces,
} from "../../../components";
import { useNavigation } from "@react-navigation/native";
import { Routes } from "../../../navigation";
import { getData } from "repository";
import { ChatListUI } from "types";
import { ChatListItem } from "./components";
import { chatListSocket } from "../../../socket.io";
import { ListUsers } from "../list-users";

export function ChatList({}: ChatListProps) {
    const navigation = useNavigation();
    const { userConnected } = useUserConnected();
    const [chatList, setChatList] = useState<ChatListUI[]>([]);
    const [openList, setOpenList] = useState(false);
    const [refetch, setRefecth] = useState(false);
    const idListener = useMemo(() => Math.random(), []);
    const refetchChatList = () => setRefecth((last) => !last);

    useEffect(() => {
        navigation.addListener("focus", refetchChatList);
        navigation.addListener("blur", refetchChatList);
    }, []);

    useEffect(() => {
        if (!userConnected) return;

        new Promise(async (resolve) => {
            const response = await getData<ChatListUI>("chatList", {
                userId: userConnected.id,
            });
            if (response.status == "success") setChatList(response.data);
            resolve("");
        });

        chatListSocket.join(userConnected);
        chatListSocket.listener(refetchChatList, idListener);
    }, [userConnected, refetch]);

    if (!userConnected) return <Loading />;

    return (
        <>
            <HeaderWithUserIcon
                user={userConnected}
                onSignOut={async () => {
                    setUserToDisconnected();
                    await clearUserInStorage();
                    navigation.navigate(Routes.Login);
                }}
            >
                <View style={styles.messageToUser}>
                    <TouchableOpacity onPress={() => setOpenList(true)}>
                        <EditIcon size={30} />
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={chatList}
                    renderItem={({ item }) => (
                        <ChatListItem
                            chatItem={item}
                            userConnected={userConnected}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                />
            </HeaderWithUserIcon>
            {openList && (
                <ListUsers
                    userConnected={userConnected}
                    onClose={() => setOpenList(false)}
                />
            )}
        </>
    );
}

type ChatListProps = PropsWithChildren<{}>;

const styles = StyleSheet.create({
    messageToUser: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginBottom: spaces.m2,
    },
});
