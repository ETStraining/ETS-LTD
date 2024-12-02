import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
<<<<<<< Updated upstream
import { AppDataSource } from "./data-source";
import { routes } from "./routes/routes";
=======
import { AppDataSource } from "./data-source"; 
import { routes } from "./routes/routes"; 
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from "./swaggerConfig"; 
>>>>>>> Stashed changes

const app = express();
const PORT = 3000;

AppDataSource.initialize().then(() => {
  // Middleware setup
  app.use(bodyParser.json());

  // Register routes dynamically based on the `routes` array
  routes.forEach(route => {
    const controllerInstance = new (route.controller as any)(); // Instantiate the controller

    // Dynamically create routes based on the method and controller's action
    (app as any)[route.method](route.route, async (req: Request, res: Response, next: NextFunction) => {
      try {
        const result = await controllerInstance[route.action](req, res, next);
        console.log("Route result:", result); 
        
        // If the result is valid, send the JSON response
        if (result !== null && result !== undefined) {
          res.json(result);
        } else {
          res.status(204).send(); 
        }
      } catch (error) {
        console.error("Error processing request:", error);
        if (!res.headersSent) { 
          res.status(500).json({ error: "Internal Server Error", details: error });
        }
      }
    });
  });

  // Start the Express server
  app.listen(PORT, () => {
    console.log(`Express server has started on port ${PORT}. Open http://localhost:${PORT}/users to see results`);
  });

}).catch(error => console.log("Error initializing AppDataSource:", error));
<<<<<<< Updated upstream
=======

>>>>>>> Stashed changes
