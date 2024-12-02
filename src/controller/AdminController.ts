import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Admin } from "../entity/Admin";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken"; 

export class AdminController {
    private adminRepository = AppDataSource.getRepository(Admin);

    // Get all admins
    async all(request: Request, response: Response, next: NextFunction) {
        try {
            const admins = await this.adminRepository.find();
            return response.status(200).json(admins);
        } catch (error) {
            return response.status(500).json({ message: "Error fetching admins" });
        }
    }

    // Get one admin by ID
    async one(request: Request, response: Response, next: NextFunction) {
        const {id} = request.params; // UUID is string

        try {
            const admin = await this.adminRepository.findOne({
                where: { id: id as string },
            });

            if (!admin) {
                return response.status(404).json({ message: "Admin not found" });
            }

            return response.status(200).json(admin);
        } catch (error) {
            return response.status(500).json({ message: "Error fetching admin" });
        }
    }

    // Save a new admin
    async save(request: Request, response: Response, next: NextFunction) {
        const { firstName, lastName, email, password } = request.body;

        const admin = Object.assign(new Admin(), {
            firstName,
            lastName,
            email,
            password,
        });

        try {
            const savedAdmin = await this.adminRepository.save(admin);
            return response.status(201).json(savedAdmin);
        } catch (error) {
            return response.status(500).json({ message: "Error saving admin" });
        }
    }

    // Remove admin by ID
    async remove(request: Request, response: Response, next: NextFunction) {
        const {id} = request.params; // UUID is string

        try {
            let adminToRemove = await this.adminRepository.findOneBy({ id: id as string });

            if (!adminToRemove) {
                return response.status(404).json({ message: "This admin does not exist" });
            }

            await this.adminRepository.remove(adminToRemove);
            return response.status(204).json({ message: "Admin has been removed" });
        } catch (error) {
            return response.status(500).json({ message: "Error removing admin" });
        }
    }

    // Admin login
    async login(request: Request, response: Response, next: NextFunction) {
        const { email, password } = request.body;

        try {
            const admin = await this.adminRepository.findOne({
                where: { email },
            });

            if (!admin) {
                return response.status(401).json({ message: "Invalid credentials" });
            }

            const isPasswordValid = await bcrypt.compare(password, admin.password);
            if (!isPasswordValid) {
                return response.status(401).json({ message: "Invalid credentials" });
            }

            // Generate JWT token
            const token = jwt.sign({ id: admin.id }, "your_secret_key", { expiresIn: "1h" }); // Use a secure secret key
            return response.status(200).json({ token });
        } catch (error) {
            return response.status(500).json({ message: "Error logging in" });
        }
    }
}

