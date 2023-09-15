import { apiURL } from "api-config";
import { FastifyInstance } from "fastify";
import { AppDataSource } from "../database";
import { User, UserSchema } from "../entities";
import { UserService } from "../services";
import { ApiResponse } from "functions";
import { UserDTO } from "../DTO";
import { ParamsId } from "types";
import { compareHash, guardUserInfo, hash } from "../helpers";
import { Value } from "@sinclair/typebox/value";

export async function userController(fastify: FastifyInstance) {
    const repo = AppDataSource.getRepository(User);
    const service = new UserService(repo);

    fastify.get(apiURL.users, async (request) => {
        const data = await service.getAll();
        return ApiResponse.success({ data: UserDTO.toUsersUI(data) });
    });

    fastify.get<{ Params: ParamsId }>(apiURL.user + "/:id", async (request) => {
        const id = Number(request.params.id);
        if (id) {
            const data = await service.getOneById(id);
            return ApiResponse.success({ data: UserDTO.toUserUI(data) });
        }
        return ApiResponse.error({ message: "Params error" });
    });

    fastify.post<{ Body: User }>(apiURL.userIsValid, async (request) => {
        const { pseudo, password } = request.body;
        if (pseudo && password) {
            const userFind = await service.getOneWhere({ pseudo });
            if (userFind && compareHash(password, userFind.password)) {
                return ApiResponse.success({ data: guardUserInfo(userFind) });
            }
        }
        return ApiResponse.error({ message: "Data error" });
    });

    fastify.post<{ Body: User }>(apiURL.user, async (request) => {
        const newUser = request.body;
        if (Value.Check(UserSchema, newUser)) {
            try {
                newUser.password = hash(newUser.password);
                const userAdded = await service.add(newUser);
                return ApiResponse.success({ data: guardUserInfo(userAdded) });
            } catch (error) {
                console.log(error);

                return ApiResponse.error({
                    message: "Pseudo already exist",
                });
            }
        }

        return ApiResponse.error({ message: "Data error" });
    });

    fastify.delete<{ Params: ParamsId }>(
        apiURL.user + "/:id",
        async (request) => {
            const id = Number(request.params.id);
            if (id) {
                const data = await service.deleteById(id);
                return ApiResponse.success({ data });
            }
            return ApiResponse.error({ message: "Params error" });
        }
    );
}
