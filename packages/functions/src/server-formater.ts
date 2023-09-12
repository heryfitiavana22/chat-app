import { SERVER_URL } from "env";

export class ServerFormater {
    static withServerURL(uri: string) {
        return SERVER_URL + uri;
    }

    static staticPath(path: string) {
        return SERVER_URL + "/static" + path;
    }

    static defaultImagePath(path: string) {
        return path || "/images/profiles/default.png"
    }
}
