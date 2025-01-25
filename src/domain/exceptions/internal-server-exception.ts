import { CustomError } from '@/infra/http/exception/http.exception';

export default class InternalServerException extends CustomError {
  private static readonly _statusCode = 500;
  private readonly _code: number;
  private readonly _logging: boolean;
  private readonly _context: { [key: string]: unknown };

  constructor(params?: {
    code?: number;
    message?: string;
    logging?: boolean;
    context?: { [key: string]: unknown };
  }) {
    const { code, message, logging } = params || {};

    super(message ?? 'INTERNAL_SERVER_ERROR');
    this._code = code ?? InternalServerException._statusCode;
    this._logging = logging || false;
    this._context = params?.context || {};

    Object.setPrototypeOf(this, InternalServerException.prototype);
  }

  get errors() {
    return [{ message: this.message, context: this._context }];
  }

  get statusCode() {
    return this._code;
  }

  get logging() {
    return this._logging;
  }
}
