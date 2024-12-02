import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Admin } from "./entity/Admin"
import { Service} from "./entity/Service"
import {Course} from "./entity/course"
import { Contact } from "./entity/Contact";
import { Training } from "./entity/Training"






export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: 'paccy"root123',
    database: "test",
    synchronize: true,
    logging: ["error"],
    entities: [User, Service,Course,Contact,Training],
    migrations: [],
    subscribers: [],
    ssl: false,
})
