import { PropsWithChildren, useEffect, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { clearUserInStorage, useUserConnected } from "../../../user-connected";
import { EditIcon, HeaderWithUserIcon, Loading } from "../../../components";
import { useNavigation } from "@react-navigation/native";
import { Routes } from "../../../navigation";
import { getData } from "repository";
import { ChatListUI } from "types";
import { ChatListItem } from "./components";

export function ChatList({}: ChatListProps) {
    const navigation = useNavigation();
    const { userConnected } = useUserConnected();
    const [chatList, setChatList] = useState<ChatListUI[]>([]);
    const [openList, setOpenList] = useState(false);

    useEffect(() => {
        if (!userConnected) return;

        new Promise(async (resolve) => {
            const response = await getData<ChatListUI>("chatList", {
                userId: userConnected.id,
            });
            if (response.status == "success") setChatList(response.data);
            resolve("");
        });
    }, [userConnected]);

    if (!userConnected) return <Loading />;

    return (
        <HeaderWithUserIcon
            user={userConnected}
            onSignOut={() => {
                clearUserInStorage();
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
    );
}

type ChatListProps = PropsWithChildren<{}>;

const styles = StyleSheet.create({
    messageToUser: {
        flexDirection: "row",
        justifyContent: "flex-end",
    },
});
