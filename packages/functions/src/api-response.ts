import { ResponseAPI } from "types";

export class ApiResponse {
    static success<T>({
        data = null as any,
        message = "",
    }: DataAndMessage<T>): ResponseAPI<T> {
        return {
            data,
            message,
            status: "success",
        };
    }

    static error<T>({
        data = null as any,
        message = "",
    }: DataAndMessage<T>): ResponseAPI<T> {
        return {
            data,
            message,
            status: "success",
        };
    }
}

type DataAndMessage<T> = Partial<Pick<ResponseAPI<T>, "data" | "message">>;
