import { useCallback, useEffect, useState } from "react";
import { getUserInStorage } from "./user-storage";

export function useUserConnected() {
    return useCallback(() => {
        const userInStorage = getUserInStorage();
        const [user, setUser] = useState(getUserInStorage());

        useEffect(() => {
            setUser(getUserInStorage());
        }, []);

        return {
            userConnected: user,
            isConnected: Boolean(userInStorage),
            refetch: () => {
                const userInStorage = getUserInStorage();
                setUser(userInStorage);
                return userInStorage;
            },
        };
    }, [])();
}
