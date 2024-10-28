// src/types/express.d.ts
import { UserPayload } from "../entity/User"; // Adjust the path if necessary
import * as express from "express";

declare global {
    namespace Express {
        interface Request {
            user?: UserPayload; // Use the custom UserPayload type
        }
    }
}
