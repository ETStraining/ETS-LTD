import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import  TrainingForm  from "../entity/TrainingForm";

export class TrainingFormController {
  private trainingFormRepository = AppDataSource.getRepository(TrainingForm);

  // Create a new training form
  async createTrainingForm(req: Request, res: Response) {
    try {
      const { fullName, phoneNumber, emailAddress, trainingCourse } = req.body;

      const newForm = this.trainingFormRepository.create({
        fullName,
        phoneNumber,
        emailAddress,
        trainingCourse,
      });

      const savedForm = await this.trainingFormRepository.save(newForm);
      return res.status(201).json(savedForm);
    } catch (error) {
      return res.status(400).json({ error: "Error creating training form", details: error });
    }
  }

  // Get all training forms
  async getAllTrainingForms(req: Request, res: Response) {
    try {
      const forms = await this.trainingFormRepository.find();
      return res.status(200).json(forms);
    } catch (error) {
      return res.status(500).json({ error: "Error fetching training forms", details: error });
    }
  }

  // Get a single training form by ID
  async getTrainingFormById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const form = await this.trainingFormRepository.findOneBy({ id: parseInt(id) });

      if (!form) {
        return res.status(404).json({ error: "Training form not found" });
      }

      return res.status(200).json(form);
    } catch (error) {
      return res.status(500).json({ error: "Error fetching training form", details: error });
    }
  }

  // Update a training form
  async updateTrainingForm(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { fullName, phoneNumber, emailAddress, trainingCourse } = req.body;

      const form = await this.trainingFormRepository.findOneBy({ id: parseInt(id) });
      if (!form) {
        return res.status(404).json({ error: "Training form not found" });
      }

      form.fullName = fullName || form.fullName;
      form.phoneNumber = phoneNumber || form.phoneNumber;
      form.emailAddress = emailAddress || form.emailAddress;
      form.trainingCourse = trainingCourse || form.trainingCourse;

      const updatedForm = await this.trainingFormRepository.save(form);
      return res.status(200).json(updatedForm);
    } catch (error) {
      return res.status(400).json({ error: "Error updating training form", details: error });
    }
  }

  // Delete a training form
  async deleteTrainingForm(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const form = await this.trainingFormRepository.findOneBy({ id: parseInt(id) });
      if (!form) {
        return res.status(404).json({ error: "Training form not found" });
      }

      await this.trainingFormRepository.remove(form);
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: "Error deleting training form", details: error });
    }
  }
}
