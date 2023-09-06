import { apiURL, axiosInstance, KeyURL } from "api-config"
import { concatURL, Query, withQuery } from "./utils"
import { ResponseAPI } from "types"

export async function deleteData<T>(
    uri: KeyURL,
    query: Query<T>,
): Promise<ResponseAPI<T>> {
    const url = withQuery(apiURL[uri], query)
    return (await axiosInstance.delete(url)).data
}

export async function deleteOneDataId<T>(
    uri: KeyURL,
    id: string,
): Promise<ResponseAPI<T>> {
    const url = concatURL(apiURL[uri], "/", id)
    return (await axiosInstance.delete(url)).data
}
