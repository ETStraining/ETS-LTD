import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User"; // Ensure this path is correct
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CustomRequest } from "../middleware/userAuth"; // Import your CustomRequest type

export class UserController {
    private userRepository = AppDataSource.getRepository(User);
    private secretKey = process.env.JWT_SECRET || "default-secret"; // Use an environment variable for your secret key

    // Register a new user
    async register(request: Request, response: Response, next: NextFunction) {
        const { firstName, lastName, email, password, age } = request.body;

        try {
            const existingUser = await this.userRepository.findOne({ where: { email } });
            if (existingUser) {
                return response.status(409).json({ message: "Email already registered" });
            }

            const hashedPassword = await bcrypt.hash(password, 10);
            const user = this.userRepository.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                age,
            });

            const savedUser = await this.userRepository.save(user);
            return response.status(201).json(savedUser);
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: "Error saving user" });
        }
    }

    // Login user and return a JWT token
    async login(request: Request, response: Response, next: NextFunction) {
        const { email, password } = request.body;

        try {
            const user = await this.userRepository.findOne({ where: { email } });
            if (!user) {
                return response.status(401).json({ message: "Invalid credentials" });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return response.status(401).json({ message: "Invalid credentials" });
            }

            // Create a JWT token
            const token = jwt.sign({ id: user.id, email: user.email }, this.secretKey, {
                expiresIn: "1h", // Token expiration time
            });

            const { password: _, ...userInfo } = user; // Exclude password
            return response.status(200).json({ userInfo, token }); // Return user info and token
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: "Error during login" });
        }
    }

    // Get all users
    async all(request: Request, response: Response, next: NextFunction) {
        try {
            const users = await this.userRepository.find();
            return response.status(200).json(users);
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: "Error fetching users" });
        }
    }

    // Get one user by ID
    async one(request: Request, response: Response, next: NextFunction) {
        const id = request.params.id;

        try {
            const user = await this.userRepository.findOne({ where: { id } });

            if (!user) {
                return response.status(404).json({ message: "Unregistered user" });
            }

            return response.status(200).json(user);
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: "Error fetching user" });
        }
    }

    // Remove user by ID
    async remove(request: Request, response: Response, next: NextFunction) {
        const id = request.params.id;

        try {
            const userToRemove = await this.userRepository.findOne({ where: { id } });
            if (!userToRemove) {
                return response.status(404).json({ message: "This user does not exist" });
            }

            await this.userRepository.remove(userToRemove);
            return response.status(204).json({ message: "User has been removed" });
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: "Error removing user" });
        }
    }

    // Get user profile (now protected by the middleware)
    async getUserProfile(request: CustomRequest, response: Response, next: NextFunction) {
        const userId = request.user?.id; // Get user ID from the authenticated request

        try {
            const user = await this.userRepository.findOne({ where: { id: userId } });

            if (!user) {
                return response.status(404).json({ message: "User not found" });
            }

            const { password, ...userData } = user; // Exclude password
            return response.status(200).json(userData); // Return user data
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: "Error fetching user profile" });
        }
    }
}
