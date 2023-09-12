import { UserUI } from "types";

export type SenderAndReceiver = {
    sender: UserUI;
    receiver: UserUI;
};

export type SocketChat = SenderAndReceiver & {
    content: string
}