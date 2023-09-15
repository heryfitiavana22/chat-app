import { FastifyInstance } from "fastify";
import { ChatService } from "../services";
import { AppDataSource } from "../database";
import {
    Chat,
    ChatAddSchema,
    ChatFlat,
    ChatQuery,
    ChatUpdateSchema,
    ChatWhere,
    GetChatsSchema,
} from "../entities";
import { Value } from "@sinclair/typebox/value";
import { apiURL } from "api-config";
import { ApiResponse } from "functions";
import { ParamsId } from "types";
import { ChatDTO } from "../DTO";

export async function chatController(fastify: FastifyInstance) {
    const repo = AppDataSource.getRepository(Chat);
    const service = new ChatService(repo);

    fastify.get<{ Querystring: ChatQuery }>(apiURL.chats, async (request) => {
        const where = queryToWhere(request.query);
        if (Value.Check(GetChatsSchema, where)) {
            const chats = await service.getChats(request.query);
            return ApiResponse.success({ data: ChatDTO.toChatsUI(chats) });
        }
        return ApiResponse.error({ message: "Query error" });
    });

    fastify.get<{ Querystring: { userId: string } }>(
        apiURL.chatList,
        async (request) => {
            const id = Number(request.query.userId);
            if (id) {
                const chatlist = await service.getChatList(id);
                return ApiResponse.success({
                    data: ChatDTO.toChatListUI({
                        chats: chatlist,
                        currentUserId: id,
                    }),
                });
            }
            return ApiResponse.error({ message: "user id error" });
        }
    );

    fastify.post<{ Body: ChatFlat }>(apiURL.chat, async (request) => {
        const chat = request.body;
        if (Value.Check(ChatAddSchema, chat)) {
            const data = await service.add(chat);
            return ApiResponse.success({ data });
        }
        return ApiResponse.error({ message: "Data error" });
    });

    fastify.put<{ Params: ParamsId; Body: ChatFlat }>(
        apiURL.chat + "/:id",
        async (request) => {
            const id = Number(request.params.id);
            const chat = request.body;

            if (id && Value.Check(ChatUpdateSchema, chat)) {
                const data = await service.updateWhere({ id }, chat);
                return ApiResponse.success({ data });
            }

            return ApiResponse.error({
                message: "Data or id error",
            });
        }
    );
}

function queryToWhere(query: ChatQuery): ChatWhere {
    return {
        ...query,
        fromUserId: Number(query.fromUserId),
        toUserId: Number(query.toUserId),
    };
}
