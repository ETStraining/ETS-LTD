import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Contact } from "../entity/Contact";

export class ContactController {
  private contactRepository = AppDataSource.getRepository(Contact);

  // Fetch all contacts
  async getAll(_: Request, res: Response) {
    try {
      const contacts = await this.contactRepository.find();
      return res.json(contacts); // Return the result properly
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : "Unknown error occurred";
      return res.status(500).json({ error: errMessage });
    }
  }

  // Fetch a single contact by ID
  async getOne(req: Request, res: Response) {
    try {
      const contact = await this.contactRepository.findOneBy({
        contactId: req.params.id, // Changed 'id' to 'contactId'
      });

      if (!contact) {
        return res.status(404).json({ error: "Contact not found" });
      }

      return res.json(contact); // Return the found contact
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : "Unknown error occurred";
      return res.status(500).json({ error: errMessage });
    }
  }

  // Create a new contact
  async create(req: Request, res: Response) {
    try {
      const { company, fullName, email, phoneNumber, message } = req.body; // Adjusted fields based on the entity
      const contact = this.contactRepository.create({
        company,
        fullName,
        email,
        phoneNumber,
        message,
      });

      const savedContact = await this.contactRepository.save(contact);
      return res.status(201).json(savedContact); // Return the created contact with a 201 status
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : "Unknown error occurred";
      return res.status(400).json({ error: errMessage });
    }
  }

  // Update an existing contact
  async update(req: Request, res: Response) {
    try {
      const { company, fullName, email, phoneNumber, message } = req.body; // Adjusted fields based on the entity
      const contact = await this.contactRepository.findOneBy({
        contactId: req.params.id, // Changed 'id' to 'contactId'
      });

      if (!contact) {
        return res.status(404).json({ error: "Contact not found" });
      }

      // Update properties
      contact.company = company;
      contact.fullName = fullName;
      contact.email = email;
      contact.phoneNumber = phoneNumber;
      contact.message = message;

      const updatedContact = await this.contactRepository.save(contact);
      return res.json(updatedContact); // Return the updated contact
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : "Unknown error occurred";
      return res.status(400).json({ error: errMessage });
    }
  }

  // Delete a contact
  async delete(req: Request, res: Response) {
    try {
      const contact = await this.contactRepository.findOneBy({
        contactId: req.params.id, // Changed 'id' to 'contactId'
      });

      if (!contact) {
        return res.status(404).json({ error: "Contact not found" });
      }

      await this.contactRepository.remove(contact);
      return res.json({ message: "Contact deleted" }); // Confirm deletion
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : "Unknown error occurred";
      return res.status(500).json({ error: errMessage });
    }
  }
}
