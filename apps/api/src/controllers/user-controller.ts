import { FastifyRequest } from "fastify";
import { User, UserSchema } from "../entities";
import { UserService } from "../services";
import { ApiResponse } from "functions";
import { UserDTO } from "../DTO";
import { ParamsId } from "types";
import { compareHash, guardUserInfo, hash } from "../helpers";
import { Value } from "@sinclair/typebox/value";

export class UserController {
    constructor(private service: UserService) {}

    getUsers = async (request: FastifyRequest) => {
        const data = await this.service.getAll();
        return ApiResponse.success({ data: UserDTO.toUsersUI(data) });
    };

    getUserById = async (request: FastifyRequest<{ Params: ParamsId }>) => {
        const id = Number(request.params.id);
        if (id) {
            const data = await this.service.getOneById(id);
            return ApiResponse.success({ data: UserDTO.toUserUI(data) });
        }
        return ApiResponse.error({ message: "Params error" });
    };

    userIsValid = async (request: FastifyRequest<{ Body: User }>) => {
        const { pseudo, password } = request.body;
        if (pseudo && password) {
            const userFind = await this.service.getOneWhere({ pseudo });
            if (userFind && compareHash(password, userFind.password)) {
                return ApiResponse.success({ data: guardUserInfo(userFind) });
            }
        }
        return ApiResponse.error({ message: "Data error" });
    };

    createUser = async (request: FastifyRequest<{ Body: User }>) => {
        const newUser = request.body;
        if (Value.Check(UserSchema, newUser)) {
            try {
                newUser.password = hash(newUser.password);
                const userAdded = await this.service.add(newUser);
                return ApiResponse.success({ data: guardUserInfo(userAdded) });
            } catch (error) {
                console.log(error);

                return ApiResponse.error({
                    message: "Pseudo already exist",
                });
            }
        }
        return ApiResponse.error({ message: "Data error" });
    };

    deleteById = async (request: FastifyRequest<{ Params: ParamsId }>) => {
        const id = Number(request.params.id);
        if (id) {
            const data = await this.service.deleteById(id);
            return ApiResponse.success({ data });
        }
        return ApiResponse.error({ message: "Params error" });
    };
}
