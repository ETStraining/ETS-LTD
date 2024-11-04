import { Request, Response } from 'express';
import { AppDataSource } from '../data-source';
import { Training } from '../entity/Training';

// Repository for accessing the Training entity
const trainingRepository = AppDataSource.getRepository(Training);

// a new training entry
export const createTraining = async (req: Request, res: Response) => {
  try {
    const { title, description, startDate, endDate, location } = req.body;

    const training = new Training();
    training.title = title;
    training.description = description;
    training.startDate = new Date(startDate);
    training.endDate = new Date(endDate);
    training.location = location;

    const savedTraining = await trainingRepository.save(training);
    res.status(201).json(savedTraining);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create training' });
  }
};

// all training entries
export const getTrainings = async (_: Request, res: Response) => {
  try {
    const trainings = await trainingRepository.find();
    res.json(trainings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve trainings' });
  }
};
