import { apiURL } from "api-config";
import { FastifyInstance } from "fastify";
import { AppDataSource } from "../database";
import { User, UserSchema } from "../entities";
import { UserService } from "../services";
import { responseApi } from "functions";
import { UserDTO } from "../DTO";
import { ParamsId } from "types";
import { compareHash, guardUserInfo, hash } from "../helpers";
import { Value } from "@sinclair/typebox/value";

export async function userController(fastify: FastifyInstance) {
    const repo = AppDataSource.getRepository(User);
    const service = new UserService(repo);

    fastify.get(apiURL.users, async (request) => {
        const data = await service.getAll();
        return responseApi({ data: UserDTO.toUsersUI(data) });
    });

    fastify.get<{ Params: ParamsId }>(apiURL.user + "/:id", async (request) => {
        const id = Number(request.params.id);
        if (id) {
            const data = await service.getOneById(id);
            return responseApi({ data: UserDTO.toUserUI(data) });
        }
        return responseApi({ status: "error", message: "Params error" });
    });

    fastify.post<{ Body: User }>(apiURL.userIsValid, async (request) => {
        const { pseudo, password } = request.body;
        if (pseudo && password) {
            const userFind = await service.getOneWhere({ pseudo });
            if (userFind && compareHash(password, userFind.password)) {
                return responseApi({ data: guardUserInfo(userFind) });
            }
        }
        return responseApi({ status: "error", message: "Data error" });
    });

    fastify.post<{ Body: User }>(apiURL.user, async (request) => {
        const newUser = request.body;
        if (Value.Check(UserSchema, newUser)) {
            try {
                newUser.password = hash(newUser.password);
                const userAdded = await service.add(newUser);
                return responseApi({ data: guardUserInfo(userAdded) });
            } catch (error) {
                console.log(error);

                return responseApi({
                    status: "error",
                    message: "Pseudo already exist",
                });
            }
        }

        return responseApi({ status: "error", message: "Data error" });
    });

    fastify.delete<{ Params: ParamsId }>(
        apiURL.user + "/:id",
        async (request) => {
            const id = Number(request.params.id);
            if (id) {
                const data = await service.deleteById(id);
                return responseApi({ data });
            }
            return responseApi({ status: "error", message: "Params error" });
        }
    );
}
