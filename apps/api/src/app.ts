import * as dotenv from "dotenv";
dotenv.config();
import Fastify from "fastify";
import { chatController, userController } from "./controllers";
import { AppDataSource } from "./database";
import fastifyIO from "fastify-socket.io";
import fastifyStatic from "@fastify/static";
import { SocketIoServer } from "./socket.io";
import * as path from "node:path";

const fastify = Fastify({
    logger: true,
});

fastify.register(fastifyStatic, {
    root: path.join(__dirname, "public"),
    prefix: "/public/",
});

AppDataSource.initialize()
    .then(async () => {
        console.log("Data Source has been initialized!");
        
        fastify.get("/", (request, reply) => {
            return {
                ok: true,
            };
        });

    
        fastify.register(chatController);
        fastify.register(userController);
        fastify.register(fastifyIO);

        fastify.ready().then(() => {
            const socketIoServer = new SocketIoServer(fastify);
            socketIoServer.init();
        });

        fastify.listen({ port: 3000, host: "0.0.0.0" }, (err) => {
            if (err) {
                fastify.log.error(err);
                process.exit(1);
            }
            console.log("Server running at port 3000");
        });
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
    });
