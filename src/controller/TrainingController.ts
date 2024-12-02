import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Training } from "../entity/Training";

const trainingRepository = AppDataSource.getRepository(Training);

/**
 * Get all trainings
 */
export const getTrainings = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const trainings = await trainingRepository.find();
    return res.status(200).json(trainings);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Failed to fetch trainings";
    return res.status(500).json({ error: errorMessage });
  }
};

/**
 * Create a new training
 */
export const createTraining = async (req: Request, res: Response): Promise<Response> => {
  try {
    const training = trainingRepository.create(req.body);
    const savedTraining = await trainingRepository.save(training);
    return res.status(201).json(savedTraining);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Failed to create training";
    return res.status(400).json({ error: errorMessage });
  }
};

/**
 * Get a single training by ID
 */
export const getTrainingById = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const training = await trainingRepository.findOneBy({ trainingId: req.params.id });
    if (!training) {
      return res.status(404).json({ error: "Training not found" });
    }
    return res.status(200).json(training);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Server error";
    return res.status(500).json({ error: errorMessage });
  }
};

/**
 * Update an existing training by ID
 */
export const updateTraining = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const training = await trainingRepository.findOneBy({ trainingId: req.params.id });
    if (!training) {
      return res.status(404).json({ error: "Training not found" });
    }

    trainingRepository.merge(training, req.body);
    const updatedTraining = await trainingRepository.save(training);
    return res.status(200).json(updatedTraining);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Failed to update training";
    return res.status(500).json({ error: errorMessage });
  }
};

/**
 * Delete a training by ID
 */
export const deleteTraining = async (req: Request, res: Response): Promise<Response | void> => {
  try {
    const result = await trainingRepository.delete(req.params.id);
    if (result.affected === 0) {
      return res.status(404).json({ error: "Training not found" });
    }
    return res.status(204).send();
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Failed to delete training";
    return res.status(500).json({ error: errorMessage });
  }
};
