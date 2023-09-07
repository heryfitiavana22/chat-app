import { PropsWithChildren } from "react";
import {} from "functions";
import { useNavigation } from "@react-navigation/native";
import { ChatListUI, UserUI } from "types";

export function ChatListItem({ chatItem, userConnected }: ChatListItemProps) {
    const navigation = useNavigation();
    const isLastMessageMine = userConnected.id == chatItem.lastChat.idUser;
    const isSeenByReceiverByConnected = isLastMessageMine
        ? true
        : chatItem.lastChat.isSeenByReceiver;

    return <>ChatListItem</>;
}

type ChatListItemProps = PropsWithChildren<{
    chatItem: ChatListUI;
    userConnected: UserUI;
}>;
