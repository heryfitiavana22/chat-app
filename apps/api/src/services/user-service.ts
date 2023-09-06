import { Repository } from "typeorm"
import { User, UserWhere } from "../entities"

export class UserService {
    constructor(private repo: Repository<User>) {}

    getAll = () => {
        return this.repo.find()
    }

    getOneById = (id: number) => {
        return this.repo.findOneBy({ id })
    }

    getOneWhere = (where: UserWhere) => {
        return this.repo.findOneBy(where)
    }

    add = (currentUser: User) => {
        const newUser = new User()
        newUser.createdAt = new Date()
        newUser.updatedAt = new Date()
        newUser.imageURL = currentUser?.imageURL
        newUser.password = currentUser.password
        newUser.name = currentUser.name
        newUser.pseudo = currentUser.pseudo

        return this.repo.save(newUser)
    }

    updateWhere = (where: UserWhere, value: Partial<User>) => {
        return this.repo.update(where, value)
    }

    deleteById = (id: number) => {
        return this.repo.delete({ id })
    }
}
