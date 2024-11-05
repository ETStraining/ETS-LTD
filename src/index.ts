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
