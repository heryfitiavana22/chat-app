import { Repository } from "typeorm"
import { Chat, ChatFlat, ChatWhere, User } from "../entities"

const ROWS = 10
export class ChatService {
    constructor(private repo: Repository<Chat>) {}

    getChats = (where: ChatWhere, page = 0) => {
        return this.repo.find({
            where: [
                {
                    fromUser: { id: where.fromUserId },
                    toUser: { id: where.toUserId },
                },
                {
                    fromUser: { id: where.toUserId },
                    toUser: { id: where.fromUserId },
                },
            ],
            order: { createdAt: "DESC" },
            skip: page * ROWS,
            take: ROWS,
        })
    }

    getChatList = (userId: number, page = 0) => {
        return this.repo.find({
            where: {
                fromUser: { id: userId },
                toUser: { id: userId },
            },
            order: {
                createdAt: "DESC",
            },
        })
    }

    add = (chatFlat: ChatFlat) => {
        const added = new Chat()
        added.fromUser = { id: chatFlat.fromUserId } as User
        added.toUser = { id: chatFlat.toUserId } as User
        added.content = chatFlat.content
        added.createdAt = new Date()
        added.updatedAt = new Date()

        return this.repo.save(added)
    }

    updateWhere = (where: ChatWhere, value: Partial<Chat>) => {
        return this.repo.update(where, value)
    }
}
