import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface CustomRequest extends Request {
    user?: { id: string; email: string };
}

export const authenticateToken = (req: CustomRequest, res: Response, next: NextFunction) => {
    const token = req.headers["authorization"]?.split(" ")[1]; // Extract token from 'Bearer <token>'

    if (!token) {
        return res.status(401).json({ message: "Access token required" });
    }

    jwt.verify(token, process.env.JWT_SECRET || "default-secret", (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid token" });
        }

        req.user = { id: (decoded as any).id, email: (decoded as any).email };
        next();
    });
};
