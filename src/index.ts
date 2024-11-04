import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import { AppDataSource } from "./data-source"; 
import { Routes } from "./routes"; 
import { User } from "./entity/User"; 
import "reflect-metadata"; 

// Initialize the data source and start the server
AppDataSource.initialize().then(async () => {
    const app = express();
    app.use(bodyParser.json());

    
    Routes.forEach(route => {
        (app as any)[route.method](route.route, async (req: Request, res: Response, next: NextFunction) => {
            try {
                
                const result = await (new (route.controller as any))[route.action](req, res, next);
                if (result !== null && result !== undefined) {
                    res.json(result);
                }
            } catch (err) {
                next(err); // Pass error to error-handling middlewar
            }
        });
    });

    // Simple error-handling middleware
    app.use((err: any, req: Request, res: Response, next: NextFunction) => {
        console.error("An error occurred:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    });

    // Start the Express server
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Express server has started on port ${PORT}. Open http://localhost:${PORT}/ to see results.`);
    });

    // Adding sample users to the database
    try {
        await AppDataSource.manager.save(
            AppDataSource.manager.create(User, {
                firstName: "Aime",
                lastName: "Muhoza",
                age: 27,
            })
        );

        await AppDataSource.manager.save(
            AppDataSource.manager.create(User, {
                firstName: "Maliza",
                lastName: "Mugabekazi",
                age: 24,
            })
        );

        console.log("Sample users have been added to the database.");
    } catch (error) {
        console.error("Error saving sample users:", error);
    }
}).catch(error => {
    console.error("Error during Data Source initialization:", error);
});
