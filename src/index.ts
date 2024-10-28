import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes/routes";
import { User } from "./entity/User";
import { Admin } from "./entity/Admin";
import bcrypt from "bcrypt";

const app = express();
const PORT = 3000;

AppDataSource.initialize()
  .then(async () => {
    // Use body-parser middleware
    app.use(bodyParser.json());

    // Register express routes from defined application routes
    Routes.forEach((route) => {
      (app as any)[route.method](
        route.route,
        (req: Request, res: Response, next: NextFunction) => {
          const result = new (route.controller as any)()[route.action](
            req,
            res,
            next
          );
          if (result instanceof Promise) {
            result
              .then((result) =>
                result !== null && result !== undefined
                  ? res.send(result)
                  : undefined
              )
              .catch(next); // Catch errors
          } else if (result !== null && result !== undefined) {
            res.json(result);
          }
        }
      );
    });

    // Insert new users for testing
    await AppDataSource.manager.save(
      AppDataSource.manager.create(User, {
        firstName: "Timber",
        lastName: "Saw",
        age: 27,
      })
    );

    await AppDataSource.manager.save(
      AppDataSource.manager.create(User, {
        firstName: "Phantom",
        lastName: "Assassin",
        age: 24,
      })
    );

    // Insert new admin for testing
    const hashedPassword = await bcrypt.hash("adminpassword", 10); // Hash the password for security

    await AppDataSource.manager.save(
      AppDataSource.manager.create(Admin, {
        firstName: "Admin",
        lastName: "User",
        email: "admin@example.com",
        password: hashedPassword, // Save the hashed password
      })
    );

    console.log(
      `Express server has started on port ${PORT}. Open http://localhost:${PORT}/users to see results`
    );
  })
  .catch((error) =>
    console.log("Error during Data Source initialization:", error)
  );

// Error handling middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("Shutting down server...");
  await AppDataSource.destroy(); // Close the database connection
  process.exit();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
