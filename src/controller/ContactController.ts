import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Contact } from "../entity/Contact";

export class ContactController {
  private contactRepository = AppDataSource.getRepository(Contact);

  async getAll(_: Request, res: Response) {
    try {
      const contacts = await this.contactRepository.find();
      return res.json(contacts); // No need for plainToInstance here
    } catch (error) {
      console.error("Error fetching contacts:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getOne(req: Request, res: Response) {
    try {
      const contact = await this.contactRepository.findOneBy({ contactId: req.params.id });
      if (!contact) {
        return res.status(404).json({ error: "Contact not found" });
      }
      return res.json(contact);
    } catch (error) {
      console.error("Error fetching contact:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const contact = this.contactRepository.create(req.body);
      const savedContact = await this.contactRepository.save(contact);
      return res.status(201).json(savedContact);
    } catch (error: any) {
      console.error("Error creating contact:", error);
      if (error.code === "23505") {
        // Unique constraint violation (PostgreSQL-specific)
        return res.status(400).json({ error: "Email must be unique" });
      }
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const contact = await this.contactRepository.findOneBy({ contactId: req.params.id });
      if (!contact) {
        return res.status(404).json({ error: "Contact not found" });
      }
      this.contactRepository.merge(contact, req.body);
      const updatedContact = await this.contactRepository.save(contact);
      return res.json(updatedContact);
    } catch (error) {
      console.error("Error updating contact:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const contact = await this.contactRepository.findOneBy({ contactId: req.params.id });
      if (!contact) {
        return res.status(404).json({ error: "Contact not found" });
      }
      await this.contactRepository.remove(contact);
      return res.json({ message: "Contact deleted successfully" });
    } catch (error) {
      console.error("Error deleting contact:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
