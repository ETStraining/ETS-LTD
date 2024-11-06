import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Training } from "../entity/Training";

export class TrainingController {
  static async createTraining(req: Request, res: Response) {
    const { title, description, message, location, startDate, endDate } = req.body;

    const training = new Training( title, description, message, location, startDate, endDate);
    training.title = title;
    training.description = description;
    training.message = message;
    training.location = location;
    training.startDate = new Date(startDate);
    training.endDate = new Date(endDate);

    try {
      await AppDataSource.manager.save(training);
      return res.status(201).json(training);
    } catch (error) {
      return res.status(500).json({ message: "Error saving training", error });
    }
  }

  static async getTrainings(req: Request, res: Response) {
    try {
      const trainings = await AppDataSource.manager.find(Training);
      return res.json(trainings);
    } catch (error) {
      return res.status(500).json({ message: "Error retrieving trainings", error });
    }
  }
}
