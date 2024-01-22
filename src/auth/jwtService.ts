import {NextFunction, Request, Response} from 'express';
import jwt, {JwtPayload} from 'jsonwebtoken';
import {SecretsRepo} from '../secrets';
import ErrorResponse from "../errors/ErrorResponse";
import Logger from "../logs";
import {myContainer, TYPES} from "../infrastructure/ioc";

export async function jwtMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  const log: Logger = myContainer.get<Logger>(TYPES.Logger);
  const secretsRepo: SecretsRepo = myContainer.get<SecretsRepo>(TYPES.SecretsRepo);
  const secret: string = await secretsRepo.getJwtSecret();
  try {
    const payLoad: string | JwtPayload = getJwtPayload(req, secret);
    if (payLoad) {
      log.logInfo(`JWT verified from ${req.ip}`);
      return next();
    }

    log.logWarning(`Failed to get JWT token from ${req.ip}`);
    return next(new ErrorResponse(401));
  } catch (error) {
    log.logError(`Invalid or expired token from ${req.ip}: ${error}`);
    return next(new ErrorResponse(401));
  }
}

function getJwtPayload(req: Request, secret: string): string | JwtPayload {
  const token: string = getJwtToken(req);
  return token ? jwt.verify(token, secret) : "";
}

function getJwtToken(req: Request): string {
  let token: string = '';
  if (req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }
  return token;
}
