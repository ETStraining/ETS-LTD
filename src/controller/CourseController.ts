import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Course } from "../entity/course";

export class CourseController {
    private courseRepository = AppDataSource.getRepository(Course);
  
    // Create a new course
    async create(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        const { title, description, image, status, duration, instructor, prerequisites, category } = request.body;

        const course = this.courseRepository.create({
            title,
            description,
            image,
            status,
            duration,
            instructor,
            prerequisites,
            category
        });

        try {
            const savedCourse = await this.courseRepository.save(course);
            return response.status(201).json(savedCourse);
        } catch (error) {
            return next(error);
        }
    }

    // Retrieve all courses
    async all(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const courses = await this.courseRepository.find();
            return response.status(200).json(courses);
        } catch (error) {
            return next(error);
        }
    }

    // Find a specific course by ID
    async findCourse(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        const {id} = request.params;
        
        try {
            const course = await this.courseRepository.findOne({ where: { Courseid: id } });
            if (!course) {
                return response.status(404).json({ message: "Course not found" });
            }
            return response.status(200).json(course);
        } catch (error) {
            return next(error);
        }
    }

    // Update an existing course
    async update(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        const {id} = request.params;
        const { title, description, image, status, duration, instructor, prerequisites, category } = request.body;

        try {
            const courseToUpdate = await this.courseRepository.findOne({ where: { Courseid: id } });
            if (!courseToUpdate) {
                return response.status(404).json({ message: "Course not found" });
            }

            // Update fields
            courseToUpdate.title = title ?? courseToUpdate.title;
            courseToUpdate.description = description ?? courseToUpdate.description;
            courseToUpdate.image = image ?? courseToUpdate.image;
            courseToUpdate.status = status ?? courseToUpdate.status;
            courseToUpdate.duration = duration ?? courseToUpdate.duration;
            courseToUpdate.instructor = instructor ?? courseToUpdate.instructor;
            courseToUpdate.prerequisites = prerequisites ?? courseToUpdate.prerequisites;
            courseToUpdate.category = category ?? courseToUpdate.category;

            const updatedCourse = await this.courseRepository.save(courseToUpdate);
            return response.status(200).json(updatedCourse);
        } catch (error) {
            return next(error);
        }
    }

    // Delete a course
    async remove(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        const {id} = request.params;

        try {
            const courseToRemove = await this.courseRepository.findOneBy({ Courseid: id });
            if (!courseToRemove) {
                return response.status(404).json({ message: "Course not found" });
            }

            await this.courseRepository.remove(courseToRemove);
            return response.status(200).json({ message: "Course deleted" });
        } catch (error) {
            return next(error);
        }
    }
}
