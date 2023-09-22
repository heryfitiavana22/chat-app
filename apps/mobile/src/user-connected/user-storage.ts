import { UserUI } from "types";
import {
    clearDataInStorage,
    getDataInStorage,
    storeDataInStorage,
} from "./storage";

const userKey = "userInStorage";

export function getUserInStorage() {
    const user = getDataInStorage<string>(userKey);

    return user ? (JSON.parse(user) as UserUI) : null;
}

export function saveUserInStorage(user: UserUI) {
    return storeDataInStorage(userKey, JSON.stringify(user));
}

export function clearUserInStorage() {
    return clearDataInStorage(userKey);
}
