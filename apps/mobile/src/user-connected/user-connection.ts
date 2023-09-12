import { userSocket } from "../socket.io"
import { getUserInStorage } from "./user-storage"

export function setUserToConnected() {
    const user = getUserInStorage()
    user && userSocket.emitConnected(user)
}

export function setUserToDisconnected() {
    const user = getUserInStorage()
    user && userSocket.emitDeconnected(user)
}