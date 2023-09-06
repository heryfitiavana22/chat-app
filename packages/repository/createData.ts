import { apiURL, axiosInstance, KeyURL } from "api-config"
import { getContentType } from "./utils"
import { ResponseAPI } from "types"

export async function createData<T>(
    uri: KeyURL,
    data: T,
): Promise<ResponseAPI<T>> {
    return axiosInstance
        .post(apiURL[uri], data, {
            headers: {
                "Content-Type": getContentType(data),
            },
        })
        .then((v) => v.data)
}
