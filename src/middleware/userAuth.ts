import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

// Your JWT secret key
const secretKey = process.env.JWT_SECRET || "default-secret";

// Define the structure of your user
interface User {
    id: string;
    
}

// Extend the Express Request interface and export it
export interface CustomRequest extends Request { 
    user?: User; 
}

// Custom JWT Payload Interface
interface CustomJwtPayload extends JwtPayload {
    id: string;
    
}

// JWT Authentication Middleware
export const authenticateJWT = (req: CustomRequest, res: Response, next: NextFunction) => {
    // Get token from Authorization header
    const token = req.headers.authorization?.split(" ")[1]; 

    if (!token) {
        return res.status(401).json({ message: "Access token required" });
    }

    // Verify the token
    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid or expired token" });
        }

        // Check if decoded is defined and matches the User structure
        if (decoded && typeof decoded === "object" && "id" in decoded) {
            // Cast the decoded token to the CustomJwtPayload type
            req.user = { id: (decoded as CustomJwtPayload).id }; // Cast to CustomJwtPayload and assign user info to the request
        } else {
            return res.status(403).json({ message: "Invalid token payload" });
        }

        next(); // Call the next middleware or route handler
    });
};
