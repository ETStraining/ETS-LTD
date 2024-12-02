import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any, 
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log the error stack or the error itself if no stack is present
  console.error(err.stack || err);

  // If the error has a known status and message, return a custom response
  if (err.status && err.message) {
    return res.status(err.status).json({ error: err.message });
  }

  // Default response for unknown errors
  return res.status(500).json({ error: "Internal Server Error" });
};
