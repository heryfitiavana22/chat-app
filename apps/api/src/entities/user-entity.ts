import { Static, Type } from "@sinclair/typebox"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"
import { Nullable } from "../helpers"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    pseudo: string

    @Column()
    name: string

    @Column({ length: 100 })
    password: string

    @Column({ nullable: true })
    imageURL: string

    @Column({ default: false })
    isConnected: boolean

    @Column({default: "2023-09-09 10:28:36"})
    lastConnection: Date

    @Column()
    createdAt: Date

    @Column()
    updatedAt: Date
}

export const UserSchema = Type.Object({
    id: Type.Number(),
    pseudo: Type.String(),
    name: Type.String(),
    password: Type.String(),
    imageURL: Nullable(Type.String()),
    isConnected: Type.Optional(Type.Boolean({ default: false })),
})

export type UserType = Static<typeof UserSchema>

export type UserWhere = Partial<UserType>

export type UserQuery = Partial<UserType>