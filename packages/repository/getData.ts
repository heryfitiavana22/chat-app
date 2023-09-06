import { apiURL, axiosInstance, KeyURL } from "api-config"
import { concatURL, Query, withQuery } from "./utils"
import { ResponseAPI } from "types"

export async function getData<T>(
    uri: KeyURL,
    query?: Query<T>,
): Promise<ResponseAPI<T[]>> {
    const url = withQuery(apiURL[uri], query)
    return (await axiosInstance.get(url)).data
}

export async function getDataById<T>(
    uri: KeyURL,
    idValue: string | number,
): Promise<ResponseAPI<T>> {
    const url = concatURL(apiURL[uri], "/", idValue)
    return (await axiosInstance.get(url)).data
}
