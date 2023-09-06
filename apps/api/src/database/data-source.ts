import { DataSource } from "typeorm"
import * as dotenv from "dotenv"
dotenv.config()

// console.log(process.env?.MYSQL_DB_NAME)
// console.log(process.env?.MYSQL_HOST)
// console.log(process.env?.MYSQL_PASSWORD)
// console.log(process.env?.MYSQL_USERNAME)

export const AppDataSource = new DataSource({
    type: "mysql",
    entities: ["../**/*-entity.ts"],
    logging: ["error", "warn", "info", "log", "schema", "migration"],
    synchronize: true,
    host: process.env.MYSQL_HOST,
    port: 3306,
    username: process.env.MYSQL_USERNAME,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB_NAME,
    migrations: ["migration/*.js"],
    charset: "utf8mb4"
})
