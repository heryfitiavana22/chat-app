import { ChatUI } from "types";

export class ChatBoxHelper {
    static removeDuplicatedID(chats: ChatUI[]) {
        const idPicked: number[] = [];
        const newChats: ChatUI[] = [];
        chats.forEach((chat) => {
            if (idPicked.includes(chat.id)) return;
            newChats.push(chat);
            idPicked.push(chat.id);
        });
        return newChats;
    }
}
