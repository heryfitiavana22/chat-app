import { UserUI } from "./User-UI"

export interface ChatUI {
    id: number
    fromUser: UserUI
    toUser: UserUI
    isSeen: boolean
    content: string
    createdAt: Date
}

export type ChatListUI = {
    id: number
    user: UserUI
    lastChat: {
        idUser: number
        content: string
        createdAt: Date
        isSeen: boolean
    }
}
