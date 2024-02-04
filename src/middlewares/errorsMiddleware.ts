import {Request, Response, NextFunction} from 'express';
import ErrorResponse from "../errors";
import {GetLogger} from "../logs";

export default function errorsMiddleware(err: Error, req: Request, res: Response, next: NextFunction): void {
  const error = new ErrorResponse(500, `Internal Server Error: ${err.message}`)
  res.status(error.statusCode)
      .json({
        success: false,
        error: error.message
      });

  GetLogger().logError(err.stack ?? err.message);
}