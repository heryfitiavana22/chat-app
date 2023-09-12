import * as bcrypt from "bcryptjs"

export function hash(value: string) {
    return bcrypt.hashSync(value, 8)
}

export function compareHash(value: string, hashValue: string) {
    return bcrypt.compareSync(value, hashValue)
}
