import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "./api-response";

// Wrapper to handle async route responses
export const asyncHandler = (fn: Function) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await fn(req, res, next);
      if (!res.headersSent) {
        res.json(ApiResponse.success(data));
      }
    } catch (error: any) {
      if (!res.headersSent) {
        res.status(500).json(ApiResponse.fail(error.message));
      }
    }
  };
