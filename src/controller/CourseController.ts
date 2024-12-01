import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Course } from "../entity/course";

export class CourseController {
    private courseRepository = AppDataSource.getRepository(Course);

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
            // Save the course in the database
            const savedCourse = await this.courseRepository.save(course);
    
            // Extract only required fields from savedCourse to avoid circular structures
            const safeCourse = {
                id: savedCourse.Courseid, // Ensure this matches the primary key field in your database
                title: savedCourse.title,
                description: savedCourse.description,
                image: savedCourse.image,
                status: savedCourse.status,
                duration: savedCourse.duration,
                instructor: savedCourse.instructor,
                prerequisites: savedCourse.prerequisites,
                category: savedCourse.category,
            };
    
            // Return the serialized data as JSON
            return response.status(201).json(safeCourse);
        } catch (error) {
            // Send a JSON-safe error response
            return response.status(500).json({
                message: error instanceof Error ? error.message : 'An error occurred while saving the course.',
            });
        }
    }
    


    // Retrieve all courses
    async all(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        try {
            const courses = await this.courseRepository.find();
            return response.status(200).json(courses);  // Returning serialized courses array
        } catch (error) {
            return next(error);
        }
    }

    // Find a specific course by ID
    async findCourse(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        const id = request.params.id;

        try {
            const course = await this.courseRepository.findOne({ where: { Courseid: id } });
            if (!course) {
                return response.status(404).json({ message: "Course not found" });
            }
            return response.status(200).json(course);  // Returning serialized course object
        } catch (error) {
            return next(error);
        }
    }

    // Update an existing course
    async update(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        const id = request.params.id;
        const { title, description, image, status, duration, instructor, prerequisites, category } = request.body;

        try {
            const courseToUpdate = await this.courseRepository.findOne({ where: { Courseid: id } });
            if (!courseToUpdate) {
                return response.status(404).json({ message: "Course not found" });
            }

            // Create a new object with updated fields
            const updatedCourseData = {
                ...courseToUpdate,
                title: title ?? courseToUpdate.title,
                description: description ?? courseToUpdate.description,
                image: image ?? courseToUpdate.image,
                status: status ?? courseToUpdate.status,
                duration: duration ?? courseToUpdate.duration,
                instructor: instructor ?? courseToUpdate.instructor,
                prerequisites: prerequisites ?? courseToUpdate.prerequisites,
                category: category ?? courseToUpdate.category,
            };

            const updatedCourse = await this.courseRepository.save(updatedCourseData);
            return response.status(200).json(updatedCourse);  // Returning serialized updated course data
        } catch (error) {
            return next(error);
        }
    }

    // Delete a course
    async remove(request: Request, response: Response, next: NextFunction): Promise<Response | void> {
        const id = request.params.id;

        try {
            const courseToRemove = await this.courseRepository.findOneBy({ Courseid: id });
            if (!courseToRemove) {
                return response.status(404).json({ message: "Course not found" });
            }

            await this.courseRepository.remove(courseToRemove);
            return response.status(200).json({ message: "Course deleted" });  // Returning serialized message
        } catch (error) {
            return next(error);
        }
    }
}
