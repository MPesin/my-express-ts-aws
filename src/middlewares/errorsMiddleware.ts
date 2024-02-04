import {Request, Response, NextFunction} from 'express';
import ErrorResponse from "../errors";
import {GetLogger} from "../logging";

export default function errorsMiddleware(err: Error, req: Request, res: Response, next: NextFunction): void {
  const error = err instanceof ErrorResponse ?
      err :
      new ErrorResponse(500, `Internal Server Error: ${err.message}`);

  res.status(error.statusCode)
      .json({
        success: false,
        error: error.message
      });

  GetLogger().logError(err.stack ?? err.message);
}