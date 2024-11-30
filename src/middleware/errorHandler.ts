import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: Error | any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack || err);

  if (err.status) {
    return res.status(err.status).json({ error: err.message });
  }

  // Default response for unknown errors
  res.status(500).json({ error: "Internal Server Error" });
};
