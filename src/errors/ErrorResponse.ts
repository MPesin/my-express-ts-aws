import createError, {HttpError} from 'http-errors';

export default class ErrorResponse extends Error {
  private readonly _error: HttpError;

  constructor(statusCode: number, description: string = "") {
    super();
    this._error = description ? createError(statusCode, description) : createError(statusCode);
  }

  get statusCode(): number {
    return this._error.statusCode;
  }

  get description(): string {
    return this._error.description;
  }

  get httpError(): HttpError {
    return this._error;
  }
}