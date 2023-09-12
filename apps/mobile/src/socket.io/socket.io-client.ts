import { SOCKET_URL } from "env";
import { io } from "socket.io-client";
import { ChatUI, UserUI } from "types";
import {
    ChatSocketName,
    ChatListSocketName,
    UserSocketName,
    SenderAndReceiver,
    SocketChat,
} from "socket.io-name";

export const socket = io(SOCKET_URL);

socket.on("by server", () => {
    console.log("by server received");
});

export const chatSocket = {
    join: (users: SenderAndReceiver) => {
        socket.emit(ChatSocketName.chatJoin(), users);
    },
    emit: (chat: SocketChat) => {
        socket.emit(ChatSocketName.chatEmit(), chat);
    },
    emitSeenAllMessage: (users: SenderAndReceiver) => {
        socket.emit(ChatSocketName.chatSeenAllMessage(), users);
    },
    listener: (listener: ChatListener) => {
        socket.on(ChatSocketName.chatListener(), listener.onReceived);
    },
    listenerSeenAllMessage: (listener: ChatListener) => {
        socket.on(
            ChatSocketName.chatListenerSeenAllMessage(),
            listener.onReceived
        );
    },
    leave: (chat: SenderAndReceiver) => {
        socket.emit(ChatSocketName.chatLeave(), chat);
    },
};

let listenersChatList: Function[] = [];
let listenersIDChatList: number[] = [];
export const chatListSocket = {
    join: (userConnected: UserUI) => {
        socket.emit(ChatListSocketName.chatListJoin(), userConnected);
    },
    emitRefetchReceiver: (userReceiver: UserUI) => {
        socket.emit(ChatListSocketName.emitChatListRefetch(), userReceiver);
    },
    listener: (refetch: () => void, id: number) => {
        if (listenersIDChatList.find((currentId) => currentId == id)) return;
        listenersChatList.push(refetch);
        listenersIDChatList.push(id);
    },
    leave: (userConnected: UserUI) => {
        socket.emit(ChatListSocketName.chatListLeave(), userConnected);
        listenersChatList = [];
        listenersIDChatList = [];
    },
};

export const userSocket = {
    emitConnected: (user: UserUI) => {
        socket.emit(UserSocketName.emitConnected(), user);
    },
    emitDeconnected: (user: UserUI) => {
        socket.emit(UserSocketName.emitDeconnected(), user);
    },
};

export function initSocket() {
    socket.emit("from client");
    // listen on new chat
    socket.on(ChatListSocketName.chatListRefetch(), () => {
        listenersChatList.forEach((listener) => listener());
    });
}

type ChatListener = SenderAndReceiver & {
    onReceived: (content: ChatUI) => void;
};
