import { ResponseAPI } from "types"

export function responseApi<T>({
    data = null as any,
    message = "",
    status = "success",
}: Partial<ResponseAPI<T>>) {
    return {
        data,
        message,
        status,
    } as ResponseAPI<T>
}
