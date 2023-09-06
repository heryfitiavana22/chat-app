import { User } from "../entities"

export function guardUserInfo(user: User) {
    const { password, updatedAt, ...rest } = user

    return rest
}
