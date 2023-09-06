import * as bcrypt from "bcrypt"

export function hash(value: string | Buffer) {
    return bcrypt.hashSync(value, 8)
}

export function compareHash(value: string | Buffer, hashValue: string) {
    return bcrypt.compareSync(value, hashValue)
}
