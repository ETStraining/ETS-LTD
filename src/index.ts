import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes";
import { User } from "./entity/User";

AppDataSource.initialize().then(async () => {
    
    const app = express();
    app.use(bodyParser.json());


    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result
                    .then(result => result !== null && result !== undefined ? res.send(result) : undefined)
                    .catch(err => next(err)); // Handle async errors
            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });

    
    const PORT = 3000;
    app.listen(PORT, () => {
        console.log(`Express server has started on port ${PORT}. Open http://localhost:${PORT}/ to see results`);
    });

    
    await AppDataSource.manager.save(
        AppDataSource.manager.create(User, {
            firstName: "Aime",
            lastName: "Muhoza",
            age: 27
        })
    );

    await AppDataSource.manager.save(
        AppDataSource.manager.create(User, {
            firstName: "Maliza",
            lastName: "Mugabekazi",
            age: 24
        })
    );

    console.log("Sample users have been added to the database.");
}).catch(error => console.log("Error during Data Source initialization", error));
