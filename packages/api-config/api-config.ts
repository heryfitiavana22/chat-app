import axios from "axios"
import { API_VERSION, SERVER_URL } from "env"

export const axiosInstance = axios.create({
    baseURL: SERVER_URL,
})

function apiPath(path: string) {
    return `/api${API_VERSION}${path}`
}

export const apiURL = {
    chat: apiPath("/chat"),
    chats: apiPath("/chats"),
    chatList: apiPath("/chat-list"),
    user: apiPath("/user"),
    userIsValid: apiPath("/user-is-valid"),
    users: apiPath("/users"),
} as const

export type KeyURL = keyof typeof apiURL
