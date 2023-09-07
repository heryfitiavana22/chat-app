import { MMKV } from "react-native-mmkv"

export const storage = new MMKV()

export function getDataInStorage<T>(key: string) {
    const value = storage.getString(key)
    if (value) return JSON.parse(value) as T
    return null
}

export const storeDataInStorage = async (key: string, value: any) => {
    try {
        storage.set(key, JSON.stringify(value))
        return true
    } catch (e) {
        return false
    }
}

export async function clearDataInStorage(key: string) {
    try {
        storage.delete(key)
        return true
    } catch (e) {
        return false
    }
}
