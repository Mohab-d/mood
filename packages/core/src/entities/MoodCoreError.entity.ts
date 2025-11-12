import { IMoodCoreError } from "../interfaces/IMoodCoreError.interface";
import { ErrorCode } from "../types/ErrorCode.type";

export class MoodCoreError<T> extends Error implements IMoodCoreError<T> {
  private _code: string;
  private _context?: T;
  private _createdAt = new Date();

  constructor(statusCode: ErrorCode, context?: T) {
    super(statusCode.message);
    this.name = "MoodCoreError";

    this._code = statusCode.code;
    this._context = context;
  }

  get code(): string {
    return this._code;
  }

  get context(): T | undefined {
    return this._context;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  public flatten(): IMoodCoreError<T> {
    return {
      code: this._code,
      message: this.message,
      context: this._context,
      createdAt: this._createdAt,
    };
  }
}
