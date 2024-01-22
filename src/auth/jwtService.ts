import {NextFunction, Request, Response} from 'express';
import jwt, {JwtPayload} from 'jsonwebtoken';
import SecretsRepo from "../secrets";
import ErrorResponse from "../errors/ErrorResponse";
import Logger, {GetLogger} from "../logs";

export class JwtService {
  private readonly _logger: Logger = GetLogger();

  constructor(private readonly _secretsRepo: SecretsRepo) {  }

  public async jwtMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
    const secret: string = await this._secretsRepo.getJwtSecret();
    try {
      const payLoad: string | JwtPayload = this.getJwtPayload(req, secret);
      if (payLoad) {
        this._logger.logInfo(`JWT verified from ${req.ip}`);
        return next();
      }

      this._logger.logWarning(`Failed to get JWT token from ${req.ip}`);
      return next(new ErrorResponse(401));
    } catch (error) {
      this._logger.logError(`Invalid or expired token from ${req.ip}: ${error}`);
      return next(new ErrorResponse(401));
    }
  }

  private getJwtPayload(req: Request, secret: string): string | JwtPayload {
    const token: string = this.getJwtToken(req);
    return token ? jwt.verify(token, secret) : "";
  }

  private getJwtToken(req: Request): string {
    let token: string = '';
    if (req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }
    return token;
  }
}
