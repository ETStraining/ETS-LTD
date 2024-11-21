import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Contact } from "../entity/Contact";

export class ContactController {
  private contactRepository = AppDataSource.getRepository(Contact);

  async getAll(_: Request, res: Response) {
    try {
      const contacts = await this.contactRepository.find();
      return (contacts); 
    } catch (error) {
      
      const errMessage = error instanceof Error ? error.message : "Unknown error occurred";
      res.status(500).json({ error: errMessage });
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const contact = await this.contactRepository.findOneBy({
        contactId: req.params.id,
      });

      if (!contact) {
        return res.status(404).json({ error: "Contact not found" });
      }
      return (contact);
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : "Unknown error occurred";
      res.status(500).json({ error: errMessage });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const { name, email, message } = req.body;
      const contact = this.contactRepository.create({ name, email, message });

      const savedContact = await this.contactRepository.save(contact);
      return res.status(201).json(savedContact); // Return a 201 Created status
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : "Unknown error occurred";
      res.status(400).json({ error: errMessage });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { name, email, message } = req.body;
      const contact = await this.contactRepository.findOneBy({
        contactId: req.params.id,
      });

      if (!contact) {
        return res.status(404).json({ error: "Contact not found" });
      }

      // Update properties
      contact.name = name;
      contact.email = email;
      contact.message = message;

      const updatedContact = await this.contactRepository.save(contact);
      return (updatedContact);
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : "Unknown error occurred";
      res.status(400).json({ error: errMessage });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const contact = await this.contactRepository.findOneBy({
        contactId: req.params.id,
      });

      if (!contact) {
        return res.status(404).json({ error: "Contact not found" });
      }

      await this.contactRepository.remove(contact);
      return ({ message: "Contact deleted" });
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : "Unknown error occurred";
      res.status(500).json({ error: errMessage });
    }
  }
}
