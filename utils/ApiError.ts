import { Request, Response, NextFunction } from 'express';

export class AppError extends Error {
  public statusCode: number;
  public success: boolean;
  public data: any;

  constructor(statusCode: number, message: string, success: boolean, data: any = null) {
    super(message);
    this.statusCode = statusCode;
    this.success = success;
    this.data = data;

    Object.setPrototypeOf(this, new.target.prototype);
    Error.captureStackTrace(this);
  }
}

// Specific Error Classes
export class NotFoundError extends AppError {
  constructor(message = 'Not Found') {
    super(404, message, false);
  }
}

export class ValidationError extends AppError {
  constructor(message = 'Validation Error') {
    super(400, message, false);
  }
}

export class ConflictError extends AppError {
  constructor(message = 'Conflict') {
    super(409, message, false);
  }
}

export class SuccessError extends AppError {
  constructor(data: any = null, message = 'Success') {
    super(200, message, true, data);
  }
}

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): void => {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      status: err.message,
      code: err.statusCode,
      success: err.success,
      data: err.data,
    });
  } else {
    res.status(500).json({
      status: 'Internal Server Error',
      code: 500,
      success: false,
    });
  }
};
