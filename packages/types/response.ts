export type ResponseAPI<T> = {
    status: "success" | "error"
    message: string
    data: T
}

export type ParamsId = {
    id: string
}