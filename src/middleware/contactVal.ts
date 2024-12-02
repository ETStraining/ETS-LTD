import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { Request, Response, NextFunction } from "express";


export const validationMiddleware = (dtoClass: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoInstance = plainToInstance(dtoClass, req.body);

    const errors: ValidationError[] = await validate(dtoInstance);
    if (errors.length > 0) {
      const errorMessages = errors.map((err) =>
        Object.values(err.constraints || {})
      );
      return res.status(400).json({ errors: errorMessages.flat() });
    }

    next();
  };
};
