import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Service } from "../entity/Service";

export class ServiceController {
    private serviceRepository = AppDataSource.getRepository(Service);
  
    // Create a new service
    async create(request: Request, response: Response, next: NextFunction) {
        const { title, description, category, price, contactPerson, contactEmail, status, image } = request.body;

        const service = this.serviceRepository.create({
            title,
            description,
            category,
            price,
            contactPerson,
            contactEmail,
            status,
            image
        });

        try {
            const savedService = await this.serviceRepository.save(service);
            return response.status(201).json(savedService);
        } catch (error) {
            next(error);
        }
    }

    // Retrieve all services
    async all(request: Request, response: Response, next: NextFunction) {
        try {
            const services = await this.serviceRepository.find();
            return response.json(services);
        } catch (error) {
            next(error);
        }
    }

    // Find a specific service by ID
    async findService(request: Request, response: Response, next: NextFunction) {
        const id = request.params.id;
        
        try {
            const service = await this.serviceRepository.findOne({where:{Serviceid: id }});
            if (!service) {
                return response.status(404).json({ message: "Service not found" });
            }
            return response.json(service);
        } catch (error) {
            next(error);
        }
    }

    // Update an existing service
    async update(request: Request, response: Response, next: NextFunction) {
        const id = request.params.id;
        const { title, description, category, price, contactPerson, contactEmail, status, image } = request.body;

        try {
            const serviceToUpdate = await this.serviceRepository.findOne({where:{Serviceid: id }});
            
            if (!serviceToUpdate) {
                return response.status(404).json({ message: "Service not found" });
            }

            // Update fields
            serviceToUpdate.title = title;
            serviceToUpdate.description = description;
             serviceToUpdate.category = category;
            serviceToUpdate.price = price;
            serviceToUpdate.contactPerson = contactPerson;
            serviceToUpdate.contactEmail = contactEmail;
            serviceToUpdate.status = status;
            serviceToUpdate.image = image;

            const updatedService = await this.serviceRepository.save(serviceToUpdate);
            return response.json(updatedService);
        } catch (error) {
            next(error);
        }
    }

    // Delete a service
    async remove(request: Request, response: Response, next: NextFunction) {
        const id = request.params.id;

        try {
            const serviceToRemove = await this.serviceRepository.findOneBy({Serviceid:id });
            
            if (!serviceToRemove) {
                return response.status(404).json({ message: "Service not found" });
            }

            await this.serviceRepository.delete(id);
            return response.json({ message: "Service deleted" });
        } catch (error) {
            next(error);
        }
    }
}
