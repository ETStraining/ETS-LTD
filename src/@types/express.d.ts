import { Request } from "express";
import { User } from "./User"; // Adjust the import path based on your structure

declare global {
    namespace Express {
        interface Request {
            user?: User; // Use the custom User type
        }
    }
}
