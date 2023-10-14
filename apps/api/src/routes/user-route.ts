import { FastifyInstance } from "fastify";
import { AppDataSource } from "../database";
import { User } from "../entities";
import { UserService } from "../services";
import { UserController } from "../controllers";
import { apiURL } from "api-config";

export async function userRoute(fastify: FastifyInstance) {
    const repo = AppDataSource.getRepository(User);
    const service = new UserService(repo);
    const controller = new UserController(service)

    fastify.get(apiURL.users, controller.getUsers)
    fastify.get(apiURL.user + "/:id", controller.getUserById)
    fastify.post(apiURL.userIsValid, controller.userIsValid)
    fastify.post(apiURL.user, controller.createUser)
    fastify.delete(apiURL.user + "/:id", controller.deleteById)
}
