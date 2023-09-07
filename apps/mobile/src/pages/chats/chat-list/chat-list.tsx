import { PropsWithChildren, useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { clearUserInStorage, useUserConnected } from "../../../user-connected";
import {
    EditIcon,
    HeaderWithUserIcon,
    Loading,
    P,
    spaces,
} from "../../../components";
import { useNavigation } from "@react-navigation/native";
import { Routes } from "../../../navigation";
import { getData } from "repository";
import { ChatListUI } from "types";

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
            <P>ok</P>
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
