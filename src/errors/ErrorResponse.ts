import createError, {HttpError} from 'http-errors';

export default class ErrorResponse extends Error {
  private readonly _error: HttpError;

  constructor(statusCode: number, message: string = "") {
    super();
    this._error = message ? createError(statusCode, message) : createError(statusCode);
  }

  get statusCode(): number {
    return this._error.statusCode;
  }

  get message(): string {
    return this._error.message;
  }

  get httpError(): HttpError {
    return this._error;
  }
}