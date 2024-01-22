import {Request, Response, NextFunction, RequestHandler} from 'express';

export default function asyncMiddlewareHandler(func: RequestHandler) {
  return (req: Request, res: Response, next: NextFunction) =>
      Promise
          .resolve(func(req, res, next))
          .catch(next);
}