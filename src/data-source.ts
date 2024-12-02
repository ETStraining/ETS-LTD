import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Admin } from "./entity/Admin"
<<<<<<< Updated upstream
=======
import { Service} from "./entity/Service"
import {Course} from "./entity/course"
import { Contact } from "./entity/Contact";
import { Training } from "./entity/Training";
import { TrainingForm } from "./entity/TrainingForm"




>>>>>>> Stashed changes

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "postgres",
    synchronize: true,
<<<<<<< Updated upstream
    logging: false,
    entities: [User, Admin],
=======
    logging: ["error"],
    entities: [User, Service,Course,Contact,Training, TrainingForm, Admin],
>>>>>>> Stashed changes
    migrations: [],
    subscribers: [],
})
