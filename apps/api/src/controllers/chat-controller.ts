import { FastifyRequest } from "fastify";
import { ChatService } from "../services";
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
import { ApiResponse } from "functions";
import { ParamsId } from "types";
import { ChatDTO } from "../DTO";

export class ChatController {
    constructor(private service: ChatService) {}

    getChatsQuery = async (
        request: FastifyRequest<{ Querystring: ChatQuery }>
    ) => {
        const where = queryToWhere(request.query);
        const page = Number(request.query.page || 0);
        if (Value.Check(GetChatsSchema, where)) {
            const chats = await this.service.getChats(request.query, page);
            return ApiResponse.success({ data: ChatDTO.toChatsUI(chats) });
        }
        return ApiResponse.error({ message: "Query error" });
    };

    getChatListByUserId = async (
        request: FastifyRequest<{ Querystring: { userId: string } }>
    ) => {
        const id = Number(request.query.userId);
        if (id) {
            const chatlist = await this.service.getChatList(id);
            return ApiResponse.success({
                data: ChatDTO.toChatListUI({
                    chats: chatlist,
                    currentUserId: id,
                }),
            });
        }
        return ApiResponse.error({ message: "user id error" });
    };

    createChat = async (request: FastifyRequest<{ Body: ChatFlat }>) => {
        const chat = request.body;
        if (Value.Check(ChatAddSchema, chat)) {
            const data = await this.service.add(chat);
            return ApiResponse.success({ data });
        }
        return ApiResponse.error({ message: "Data error" });
    };

    updateChatById = async (
        request: FastifyRequest<{ Params: ParamsId; Body: ChatFlat }>
    ) => {
        const id = Number(request.params.id);
        const chat = request.body;

        if (id && Value.Check(ChatUpdateSchema, chat)) {
            const data = await this.service.updateWhere({ id }, chat);
            return ApiResponse.success({ data });
        }

        return ApiResponse.error({
            message: "Data or id error",
        });
    };
}

function queryToWhere(query: ChatQuery): ChatWhere {
    return {
        ...query,
        fromUserId: Number(query.fromUserId),
        toUserId: Number(query.toUserId),
    };
}
