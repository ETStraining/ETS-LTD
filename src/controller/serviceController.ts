import { AppDataSource } from "../data-source";
import { NextFunction,Request,Response } from "express";
import {Service} from "../entity/Service"

export class ServiceController {
    private serviceRepository = AppDataSource.getRepository(Service)
  
   async create(request: Request, response: Response, next: NextFunction)
   {
    const {title, description}=request.body
    const service=Object.assign(new Service(),
{
    title,
    description,
    createdAt: new Date(),
    updatedAt: new Date(),
})
return this.serviceRepository.save(service)
   }
   async all(request: Request, response: Response, next: NextFunction) {
    return this.serviceRepository.find()
}
async findService(request: Request, response: Response, next: NextFunction)
{
    const id = parseInt(request.params.id)
    const service = await this.serviceRepository.findOneBy({ id })
    if (!service) {
        return "Service not found"
    }
    return service
}
   async update(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id)
    const { title, description } = request.body
    let serviceToUpdate=this.serviceRepository.findOneBy({id})
    
    if (!serviceToUpdate) {
        return "Service not found"
    }
    (await serviceToUpdate).title=title,
    (await serviceToUpdate).description=description,
    (await serviceToUpdate).updatedAt=new Date()
    return this.serviceRepository.save( await serviceToUpdate)
   }
   async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id)
    let serviceToremove=this.serviceRepository.findOneBy({id})
    
    if (!serviceToremove) {
        return "Service not found"
    }

   await this.serviceRepository.delete(id)
    return "Service deleted"
   }



}