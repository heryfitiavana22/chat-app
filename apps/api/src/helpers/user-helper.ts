import { ServerFormater } from "functions";
import { User } from "../entities";

export function guardUserInfo(user: User) {
    const { password, updatedAt, imageURL, ...rest } = user;

    return { ...rest, imageURL: ServerFormater.defaultImagePath(imageURL) };
}
