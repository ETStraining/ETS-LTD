import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Contact } from "./entity/Contact";
import { Training } from "./entity/Training"; 

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "test",
    synchronize: true,
    logging: false,
    entities: [User, Contact, Training], 
    migrations: [],
    subscribers: [],
});
