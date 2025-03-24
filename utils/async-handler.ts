import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "./api-response";

// Wrapper to handle async route responses
export const asyncHandler = (fn: Function) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await fn(req, res, next);
      if (!res.headersSent) {
        res.status(200).json(ApiResponse.success(data));
      }
    } catch (error: any) {
      if (!res.headersSent) {
        let statusCode = 404;
        let message = error.message;

        if (error.status) {
          statusCode = error.status;
          message = error.message;
        } else if (error.name === "EntityNotFound") {
          statusCode = 404;
          message = "Resource not found";
        } else if (error.name === "ValidationError") {
          statusCode = 400;
          message = error.message;
        }

        res.status(statusCode).json(ApiResponse.fail(message));
      }
    }
  };
