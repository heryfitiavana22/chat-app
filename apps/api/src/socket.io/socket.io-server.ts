import { FastifyInstance } from "fastify";
import { AppDataSource } from "../database";
import { Chat, User } from "../entities";
import { ChatService, UserService } from "../services";
import {
    ChatSocketName,
    ChatListSocketName,
    UserSocketName,
    SenderAndReceiver,
    SocketChat,
} from "socket.io-name";
import { ChatDTO } from "../DTO";
import { Socket } from "socket.io";
import { UserUI } from "types";

export class SocketIoServer {
    constructor(private server: FastifyInstance) {}

    init() {
        this.server.io.on("connection", (socket) => {
            socket.emit("by server");

            socket.on("from client", () => {
                console.log("from client received");
            });
            this.chatSocket(socket);
            this.userSocket(socket)
        });
    }

    private chatSocket(socket: Socket) {
        const chatRepo = AppDataSource.getRepository(Chat);
        const chatService = new ChatService(chatRepo);
        /* CHAT */
        socket.on(ChatSocketName.chatJoin(), (users: SenderAndReceiver) => {
            socket.join(
                ChatSocketName.chatRoom({
                    receiver: users.receiver,
                    sender: users.sender,
                })
            );
            socket.join(
                ChatSocketName.chatRoom({
                    receiver: users.sender,
                    sender: users.receiver,
                })
            );
            // refecth le chat list de l'user receiver
            socket
                .in(ChatListSocketName.chatListRoom(users.receiver))
                .emit(ChatListSocketName.chatListRefetch());
        });

        socket.on(
            ChatSocketName.chatSeenAllMessage(),
            (users: SenderAndReceiver) => {
                socket
                    .in(
                        ChatSocketName.chatRoom({
                            receiver: users.receiver,
                            sender: users.sender,
                        })
                    )
                    .emit(ChatSocketName.chatListenerSeenAllMessage());
                socket
                    .in(
                        ChatSocketName.chatRoom({
                            receiver: users.sender,
                            sender: users.receiver,
                        })
                    )
                    .emit(ChatSocketName.chatListenerSeenAllMessage());
            }
        );

        socket.on(ChatSocketName.chatLeave(), (users: SenderAndReceiver) => {
            socket.leave(
                ChatSocketName.chatRoom({
                    receiver: users.receiver,
                    sender: users.sender,
                })
            );
            socket.leave(
                ChatSocketName.chatRoom({
                    receiver: users.sender,
                    sender: users.receiver,
                })
            );
        });

        socket.on(ChatSocketName.chatEmit(), async (chat: SocketChat) => {
            const newChat = await chatService.add({
                content: chat.content,
                fromUserId: chat.sender.id,
                toUserId: chat.receiver.id,
                id: 0,
            });

            this.server.io
                .in(ChatSocketName.chatRoom({ ...chat }))
                .emit(ChatSocketName.chatListener(), ChatDTO.toChatUI(newChat));
            // refecth le chat list de l'user receiver
            socket
                .in(ChatListSocketName.chatListRoom(chat.receiver))
                .emit(ChatListSocketName.chatListRefetch());
        });

        /* CHAT LIST */
        socket.on(
            ChatListSocketName.chatListJoin(),
            (userConnected: UserUI) => {
                socket.join(ChatListSocketName.chatListRoom(userConnected));
                socket.join(ChatListSocketName.chatList());
            }
        );

        socket.on(
            ChatListSocketName.emitChatListRefetch(),
            (userConnected: UserUI) => {
                // refecth le chat list de l'user connecté
                socket
                    .in(ChatListSocketName.chatListRoom(userConnected))
                    .emit(ChatListSocketName.chatListRefetch());
            }
        );

        socket.on(
            ChatListSocketName.chatListLeave(),
            (userConnected: UserUI) => {
                socket.leave(ChatListSocketName.chatListRoom(userConnected));
            }
        );
    }

    private userSocket(socket: Socket) {
        const userRepo = AppDataSource.getRepository(User);
        const userService = new UserService(userRepo);

        socket.on(
            UserSocketName.emitConnected(),
            async (userConnected: UserUI) => {
                await userService.updateWhere(
                    { id: userConnected.id },
                    { isConnected: true }
                );
                socket
                    .in(ChatListSocketName.chatList())
                    .emit(ChatListSocketName.chatListRefetch());
            }
        );
        socket.on(
            UserSocketName.emitDeconnected(),
            async (userConnected: UserUI) => {
                await userService.updateWhere(
                    { id: userConnected.id },
                    { isConnected: false, lastConnection: new Date() }
                );
                socket
                    .in(ChatListSocketName.chatList())
                    .emit(ChatListSocketName.chatListRefetch());
            }
        );
    }
}
