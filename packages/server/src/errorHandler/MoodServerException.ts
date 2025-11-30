import { HttpException } from '@nestjs/common';
import { IMoodServerError } from 'src/interfaces/IMoodServerError.interface';
import { ServerErrorCode } from 'src/types/ServerErrorCode.type';

export class MoodServerException<T> extends HttpException {
  private _code: string;
  private _context?: T | undefined;
  private _createdAt: Date;

  constructor(errorCode: ServerErrorCode, context?: T | undefined) {
    super('myException', errorCode.httpCode);

    this._code = errorCode.code;
    this._context = context;
    this._createdAt = new Date();
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

  public getResponse(): IMoodServerError<T> {
    return {
      httpCode: this.getStatus(),
      message: this.message,
      code: this._code,
      context: this._context,
      createdAt: this.createdAt
    };
  }
}
