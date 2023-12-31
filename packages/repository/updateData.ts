import { apiURL, axiosInstance, KeyURL } from "api-config";
import { concatURL, getContentType } from "./utils";
import { ResponseAPI } from "types";

export async function updateOneDataById<T>(
    uri: KeyURL,
    id: string,
    data: Partial<T>
): Promise<ResponseAPI<T>> {
    const url = concatURL(apiURL[uri], "/", id);
    return axiosInstance
        .put(url, data, {
            headers: { "Content-Type": getContentType(data) },
        })
        .then((v) => v.data);
}

export async function updateMoreData<T>(
    uri: KeyURL,
    data: T[]
): Promise<ResponseAPI<T>> {
    const url = concatURL(apiURL[uri]);
    return axiosInstance.put(url, data).then((v) => v.data);
}
