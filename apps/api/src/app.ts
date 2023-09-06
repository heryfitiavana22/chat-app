import * as dotenv from "dotenv"
dotenv.config()
import Fastify from "fastify"
import { chatController, userController } from "./controllers"
import { AppDataSource } from "./database"
import cors from "@fastify/cors"

const fastify = Fastify({
    // logger: true,
})

AppDataSource.initialize()
    .then(async () => {
        console.log("Data Source has been initialized!")
        // await fastify.register(cors, {
        //     origin: "*"
        // })

        fastify.get("/", (request, reply) => {
            return {
                ok: true,
            }
        })
        fastify.register(chatController)
        fastify.register(userController)

        fastify.listen({ port: 3000, host: "0.0.0.0" }, (err) => {
            if (err) {
                fastify.log.error(err)
                process.exit(1)
            }
            console.log("Server running at port 3000")
        })
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })
