import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UserController {
    private userRepository = AppDataSource.getRepository(User);
    private secretKey = process.env.JWT_SECRET || "your-secret-key"; // Use an environment variable for your secret key

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
        const id = request.params.id; // UUID is string

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

    // Register a new user
    async register(request: Request, response: Response, next: NextFunction) {
        const { firstName, lastName, email, password, age } = request.body;

        try {
            // Check for existing user
            const existingUser = await this.userRepository.findOne({ where: { email } });
            if (existingUser) {
                return response.status(409).json({ message: "Email already registered" });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = Object.assign(new User(), {
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

    // Login user
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

            // Generate a token
            const token = jwt.sign({ id: user.id }, this.secretKey, { expiresIn: "1h" });
            return response.status(200).json({ token });
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: "Error during login" });
        }
    }

    // Forgot password
    async forgotPassword(request: Request, response: Response, next: NextFunction) {
        const { email } = request.body;

        try {
            const user = await this.userRepository.findOne({ where: { email } });
            if (!user) {
                return response.status(404).json({ message: "User not found" });
            }

            // Generate a reset token
            const resetToken = jwt.sign({ id: user.id }, this.secretKey, { expiresIn: "15m" });

            // Here you would send the reset link to the user's email
            console.log(`Reset token for ${email}: ${resetToken}`); // For demonstration

            return response.status(200).json({ message: "Reset link sent to your email." });
        } catch (error) {
            console.error(error);
            return response.status(500).json({ message: "Error processing request" });
        }
    }

    // Reset password
    async resetPassword(request: Request, response: Response, next: NextFunction) {
        const { token, newPassword } = request.body;

        try {
            // Verify the token
            const decoded: any = jwt.verify(token, this.secretKey);
            const userId = decoded.id;

            const user = await this.userRepository.findOne({ where: { id: userId } });
            if (!user) {
                return response.status(404).json({ message: "User not found" });
            }

            // Hash the new password
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user.password = hashedPassword;
            await this.userRepository.save(user);

            return response.status(200).json({ message: "Password has been reset successfully." });
        } catch (error) {
            console.error(error);
            return response.status(400).json({ message: "Invalid token or token expired." });
        }
    }

    // Remove user by ID
    async remove(request: Request, response: Response, next: NextFunction) {
        const id = request.params.id; // UUID is string

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

   async getUserProfile(request: Request, response: Response, next: NextFunction) {
    const userId = request.user?.id; // Retrieve user ID from the request object

    if (!userId) {
        return response.status(401).json({ message: "Unauthorized access" });
    }

    try {
        const user = await this.userRepository.findOne({ where: { id: userId } });

        if (!user) {
            return response.status(404).json({ message: "User not found" });
        }

        // Optionally, you can omit the password field before sending the response
        const { password, ...userData } = user; // Exclude password
        return response.status(200).json(userData); // Return user data
    } catch (error) {
        return response.status(500).json({ message: "Error fetching user profile" });
    }
}

}
