import { HttpException } from '@nestjs/common';
import { IMoodServerError } from 'src/interfaces/IMoodServerError.interface';
import { ServerErrorCode } from 'src/types/ServerErrorCode.type';

export class MoodServerException<T>
  extends HttpException
  implements IMoodServerError<T>
{
  private _httpCode: number;
  private _code: string;
  private _context?: T | undefined;
  private _createdAt: Date;

  constructor(errorCode: ServerErrorCode, context?: T | undefined) {
    super('response', errorCode.httpCode);
    this.name = 'MoodServerError';

    this._httpCode = errorCode.httpCode;
    this._code = errorCode.code;
    this._context = context;
    this._createdAt = new Date();
  }

  public get httpCode(): number {
    return this._httpCode;
  }

  public get code(): string {
    return this._code;
  }

  public get context(): T | undefined {
    return this._context;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public flatten(): IMoodServerError<T> {
    return {
      httpCode: this._httpCode,
      message: this.message,
      code: this._code,
      context: this._context,
      createdAt: this._createdAt,
    };
  }
}
