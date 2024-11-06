import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Contact } from "../entity/Contact";
import { validate } from "class-validator";

export class ContactController {
    private contactRepository = AppDataSource.getRepository(Contact);

    async all(request: Request, response: Response, next: NextFunction) {
        const contacts = await this.contactRepository.find();
        return response.json(contacts);
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);
        const contact = await this.contactRepository.findOne({ where: { id } });

        if (!contact) {
            return response.status(404).json({ message: "Contact not found" });
        }
        return response.json(contact);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const { name, email, message } = request.body;
        const contact = Object.assign(new Contact(name, email, message));

        const errors = await validate(contact);
        if (errors.length > 0) {
            return response.status(400).json({ errors });
        }

        try {
            const result = await this.contactRepository.save(contact);
            return response.status(201).json(result);
        } catch (error) {
            return response.status(500).json({ message: 'Error saving contact', error });
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);
        const { name, email, message } = request.body;

        let contactToUpdate = await this.contactRepository.findOneBy({ id });
        if (!contactToUpdate) {
            return response.status(404).json({ message: "Contact not found" });
        }

        contactToUpdate.name = name || contactToUpdate.name;
        contactToUpdate.email = email || contactToUpdate.email;
        contactToUpdate.message = message || contactToUpdate.message;

        const errors = await validate(contactToUpdate);
        if (errors.length > 0) {
            return response.status(400).json({ errors });
        }

        try {
            const result = await this.contactRepository.save(contactToUpdate);
            return response.status(200).json(result);
        } catch (error) {
            return response.status(500).json({ message: "Error updating contact", error });
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        const id = parseInt(request.params.id);
        const contactToRemove = await this.contactRepository.findOneBy({ id });

        if (!contactToRemove) {
            return response.status(404).json({ message: "Contact not found" });
        }

        await this.contactRepository.remove(contactToRemove);
        return response.json({ message: "Contact has been removed" });
    }
}
