import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Service} from "./entity/Service"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "ets",
    synchronize: true,
    logging: ["error"],
    entities: [User, Service],
    migrations: [],
    subscribers: [],
})
