import { ChatUI } from "types"
import { Chat } from "../entities"
import { guardUserInfo } from "../helpers"

export class ChatDTO {
    static toChatUI(chat: Chat): ChatUI {
        const { fromUser, toUser, ...rest } = chat

        return {
            ...rest,
            fromUser: guardUserInfo(fromUser),
            toUser: guardUserInfo(toUser),
        }
    }

    static toChatsUI(chats: Chat[]): ChatUI[] {
        return chats.map((chat) => ChatDTO.toChatUI(chat))
    }
}
