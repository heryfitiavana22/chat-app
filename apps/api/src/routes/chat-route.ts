import { FastifyInstance } from "fastify";
import { ChatController } from "../controllers";
import { ChatService } from "../services";
import { AppDataSource } from "../database";
import { Chat } from "../entities";
import { apiURL } from "api-config";

export async function chatRoute(fastify: FastifyInstance) {
    const repo = AppDataSource.getRepository(Chat);
    const service = new ChatService(repo);
    const controller = new ChatController(service);

    fastify.get(apiURL.chats, controller.getChatsQuery);
    fastify.get(apiURL.chatList, controller.getChatListByUserId);
    fastify.post(apiURL.chats, controller.createChat);
    fastify.put(apiURL.chats+ "/:id", controller.updateChatById);
}
