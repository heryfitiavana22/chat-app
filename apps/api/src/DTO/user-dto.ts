import { UserUI } from "types/User-UI"
import { User } from "../entities"
import { guardUserInfo } from "../helpers"

export class UserDTO {
    static toUserUI(user: User): UserUI {
        return guardUserInfo(user)
    }

    static toUsersUI(users: User[]): UserUI[] {
        return users.map((user) => this.toUserUI(user))
    }
}
