import { ChatListUI, ChatUI } from "types";
import { Chat } from "../entities";
import { guardUserInfo } from "../helpers";

export class ChatDTO {
    static toChatUI(chat: Chat): ChatUI {
        const { fromUser, toUser, ...rest } = chat;

        return {
            ...rest,
            fromUser: guardUserInfo(fromUser),
            toUser: guardUserInfo(toUser),
        };
    }

    static toChatsUI(chats: Chat[]): ChatUI[] {
        return chats.map((chat) => ChatDTO.toChatUI(chat));
    }

    static toChatListUI({
        chats,
        currentUserId,
    }: ToChatListParams): ChatListUI[] {
        const usersIdPicked: number[] = [];
        const chatListUI: ChatListUI[] = [];

        chats.forEach((chat) => {
            const { fromUser, id, toUser, updatedAt, ...rest } = chat;

            if (
                fromUser.id !== currentUserId &&
                !usersIdPicked.includes(fromUser.id)
            ) {
                chatListUI.push({
                    id,
                    lastChat: { ...rest, idUser: fromUser.id },
                    user: guardUserInfo(fromUser),
                });
                return usersIdPicked.push(fromUser.id);
            }

            if (
                toUser.id !== currentUserId &&
                !usersIdPicked.includes(toUser.id)
            ) {
                chatListUI.push({
                    id,
                    lastChat: { ...rest, idUser: fromUser.id },
                    user: guardUserInfo(toUser),
                });
                return usersIdPicked.push(toUser.id);
            }
        });
        return chatListUI;
    }
}

type ToChatListParams = {
    chats: Chat[];
    currentUserId: number;
};
