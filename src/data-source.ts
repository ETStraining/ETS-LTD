import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Admin } from "./entity/Admin"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "test",
    synchronize: true,
    logging: false,
    entities: [User, Admin],
    migrations: [],
    subscribers: [],
})
