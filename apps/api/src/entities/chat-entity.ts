import {
    Column,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    Relation,
} from "typeorm"
import { User } from "./user-entity"
import { Static, Type } from "@sinclair/typebox"

@Entity()
export class Chat {
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, { eager: true })
    fromUser: Relation<User>

    @ManyToOne(() => User, { eager: true })
    toUser: Relation<User>

    @Column()
    content: string

    @Column({ default: false })
    isSeenByReceiver: boolean

    @Column()
    createdAt: Date

    @Column()
    updatedAt: Date
}

export const ChatFlatSchema = Type.Object({
    id: Type.Number(),
    fromUserId: Type.Number(),
    toUserId: Type.Number(),
    content: Type.String(),
    isSeenByReceiver: Type.Optional(Type.Boolean({ default: false })),
})

export const ChatAddSchema = Type.Object({
    fromUserId: Type.Number(),
    toUserId: Type.Number(),
    content: Type.String(),
})

export const ChatUpdateSchema = Type.Object({
    id: Type.Optional(Type.Number()),
    fromUserId: Type.Optional(Type.Number()),
    toUserId: Type.Optional(Type.Number()),
    content: Type.Optional(Type.String()),
    isSeenByReceiver: Type.Optional(Type.Boolean({ default: false })),
})

export const GetChatsSchema = Type.Object({
    fromUserId: Type.Number(),
    toUserId: Type.Number(),
})

export type ChatFlat = Static<typeof ChatFlatSchema>

export type ChatWhere = Partial<ChatFlat>

export type ChatQuery = Partial<ChatFlat>
