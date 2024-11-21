import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Admin } from "./entity/Admin"
import { Service} from "./entity/Service"
import {Course} from "./entity/course"
import { Contact } from "./entity/Contact";






export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "ets",
    synchronize: true,
    logging: ["error"],
    entities: [User, Service,Course,Contact],
    migrations: [],
    subscribers: [],
})
