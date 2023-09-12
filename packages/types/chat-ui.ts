import { UserUI } from "./user-ui"

export interface ChatUI {
    id: number
    fromUser: UserUI
    toUser: UserUI
    isSeenByReceiver: boolean
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
        isSeenByReceiver: boolean
    }
}
