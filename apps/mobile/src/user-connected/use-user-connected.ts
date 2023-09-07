import { useState } from "react";
import { getUserInStorage } from "./user-storage";

export function useUserConnected() {
    const userInStorage = getUserInStorage();
    const [user, setUser] = useState(getUserInStorage());

    return {
        userConnected: user,
        isConnected: Boolean(userInStorage),
    };
}
