import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extend Request interface to include user property
interface AuthRequest extends Request {
    user?: any; // Adjust the type as needed for your application
}

// Middleware function to authenticate the user using JWT
export const userAuth = (req: AuthRequest, res: Response, next: NextFunction) => {
    // Get token from the authorization header
    const token = req.headers["authorization"]?.split(" ")[1]; // Bearer <token>
    
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key"); // Use environment variable for secret
        req.user = decoded; // Attach the decoded token info to the request
        next(); // Proceed to the next middleware/route handler
    } catch (error) {
        console.error("Token verification error:", error); // Log the error
        return res.status(400).json({ message: "Invalid token." });
    }
};
