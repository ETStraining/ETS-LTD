import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"
//import * as dotenv from "dotenv"
import { User } from "./entity/User"
import {serviceRoute} from "./routes/serviceroutes"
import {CourseRoute} from "./routes/courseRoute"
AppDataSource.initialize().then(async () => {
//dotenv.config()
    // create express app
    const app = express()
    app.use(bodyParser.json())
    app.use(express.json())
    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next)
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

            } else if (result !== null && result !== undefined) {
                res.json(result)
            }
        })
    })

    // defining service routes
   serviceRoute.forEach(route=>{
    (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
        const result = (new (route.controller as any))[route.action](req, res, next)
        if (result instanceof Promise) {
            result.then(result => result !== null && result !== undefined ? res.send(result) : undefined)

        } else if (result !== null && result !== undefined) {
            res.json(result)
        }
    })
   })
   // defining Course routea
CourseRoute.forEach(route => {
    (app as any)[route.method](route.route, async (req: Request, res: Response, next: Function) => {
        try {
            const result = await new (route.controller as any)()[route.action](req, res, next);

            // Send the result only if it's not null or undefined
            if (result !== null && result !== undefined) {
                res.json(result);
            } else {
                res.sendStatus(204); // No Content, if result is null or undefined
            }
        } catch (error) {
            next(error); // Pass error to error-handling middleware
        }
    });
});

    // setup express app here
    // ...
    const port=process.env.Port
    // start express server
    app.listen(3001)
    // insert new users for test
    console.log(`Express server has started on port 3001. Open http://localhost:3001/users to see results`)

}).catch(error => console.log(error))
