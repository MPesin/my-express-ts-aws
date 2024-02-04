import jwt, {JwtPayload} from "jsonwebtoken";
import ErrorResponse from "../errors";
import {NextFunction, Request, Response} from "express";
import Logger, {GetLogger} from "../logging";
import SecretsRepo, {AwsSecretsRepo} from "../secrets";

const logger: Logger = GetLogger();
const secretsRepo: SecretsRepo = new AwsSecretsRepo();

export default async function authMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
  const secret: string = await secretsRepo.getJwtSecret();
  try {
    const payLoad: string | JwtPayload = getJwtPayload(req, secret);
    if (payLoad) {
      logger.logInfo(`JWT verified from ${req.ip}`);
      return next();
    }

    logger.logWarning(`Failed to get JWT token from ${req.ip}`);
    return next(new ErrorResponse(401));
  } catch (error) {
    logger.logError(`Invalid or expired token from ${req.ip}: ${error}`);
    return next(new ErrorResponse(401));
  }
}
const getJwtPayload = (req: Request, secret: string): string | JwtPayload => {
  const token: string = getJwtToken(req);
  return token ? jwt.verify(token, secret) : "";
}

const getJwtToken = (req: Request): string => {
  let token: string = '';
  if (req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.token) {
    token = req.cookies.token;
  }
  return token;
}
