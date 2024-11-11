import * as express from "express"
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { AppDataSource } from "./data-source"
import { Routes } from "./routes"
import { User } from "./entity/User"
import {serviceRoute} from "./routes/serviceroutes"
import {CourseRoute} from "./routes/courseRoute"
AppDataSource.initialize().then(async () => {

    // create express app
    const app = express()
    app.use(bodyParser.json())

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
   CourseRoute.forEach(route=>{
    (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
        const result = (new (route.controller as any))[route.action](req, res, next)
        if (result instanceof Promise) {
            result.then(result => result!== null && result!== undefined? res.send(result) : undefined)
        }
        else if (result!== null && result!== undefined) {
            res.json(result)
        }
    })
})
    // setup express app here
    // ...

    // start express server
    app.listen(process.env.Port)

    // insert new users for test
    console.log(`Express server has started on port 3000. Open http://localhost:3000/users to see results`)

}).catch(error => console.log(error))
=======
import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import { AppDataSource } from "./data-source";
import { routes } from "./routes/routes";

const app = express();
const PORT = 3000;

AppDataSource.initialize().then(async () => {
  app.use(bodyParser.json());

  // Initialize routes
  routes.forEach(route => {
    const controllerInstance = new (route.controller as any)(); // Instantiate the controller

    (app as any)[route.method](route.route, async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await controllerInstance[route.action](req, res, next);
        console.log("Route result:", result); // Log the result for debugging
        if (result !== null && result !== undefined) {
          res.json(result); 
        } else {
          res.status(204).send(); 
        }
      } catch (error) {
        console.error("Error processing request:", error);
        if (!res.headersSent) { // Check if headers have already been sent
          res.status(500).json({ error: "Internal Server Error" });
        }
      }
    });
  });

  // Start the express server
  app.listen(PORT, () => {
    console.log(`Express server has started on port ${PORT}. Open http://localhost:${PORT}/users to see results`);
  });

}).catch(error => console.log("Error initializing AppDataSource:", error));
