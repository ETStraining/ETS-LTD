import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import { validate } from "class-validator";

export class UserController {
    private userRepository = AppDataSource.getRepository(User);

    async all(request: Request, response: Response, next: NextFunction) {
        const users = await this.userRepository.find();
        return response.json(users);
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);
        const user = await this.userRepository.findOne({ where: { id } });

        if (!user) {
            return response.status(404).json({ message: "User not found" });
        }
        return response.json(user);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { firstName, lastName, age } = request.body;
        const user = Object.assign(new User(), { firstName, lastName, age });

        const errors = await validate(user);
        if (errors.length > 0) {
            return response.status(400).json({ errors });
        }

        try {
            const result = await this.userRepository.save(user);
            return response.status(201).json(result);
        } catch (error) {
            return response.status(500).json({ message: 'Error saving user', error });
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);
        const { firstName, lastName, age } = request.body;

        let userToUpdate = await this.userRepository.findOneBy({ id });
        if (!userToUpdate) {
            return response.status(404).json({ message: "User not found" });
        }

        userToUpdate.firstName = firstName || userToUpdate.firstName;
        userToUpdate.lastName = lastName || userToUpdate.lastName;
        userToUpdate.age = age !== undefined ? age : userToUpdate.age;

        const errors = await validate(userToUpdate);
        if (errors.length > 0) {
            return response.status(400).json({ errors });
        }

        try {
            const result = await this.userRepository.save(userToUpdate);
            return response.status(200).json(result);
        } catch (error) {
            return response.status(500).json({ message: "Error updating user", error });
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);
        const userToRemove = await this.userRepository.findOneBy({ id });

        if (!userToRemove) {
            return response.status(404).json({ message: "User not found" });
        }

        await this.userRepository.remove(userToRemove);
        return response.json({ message: "User has been removed" });
    }
}
