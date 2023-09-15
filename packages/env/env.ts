export const SERVER_PORT = "3000"
export const SERVER = "http://192.168.1.105"
// export const SERVER_URL = `${SERVER}` as const
export const SERVER_URL = `${SERVER}:${SERVER_PORT}` as const
// export const SOCKET_URL = `${SERVER}` as const
export const SOCKET_URL = `${SERVER}:${SERVER_PORT}` as const
export const API_VERSION = "/v1"
