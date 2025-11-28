import { MoodCoreError } from '@mood/core';
import { HttpStatus } from '@nestjs/common';
import { IAPIErrorResponse } from 'src/interfaces/IAPIErrorResponse.api';
import { IErrorHandler } from 'src/interfaces/IErrorHandler.interface';

export class InvalidTokenHandler implements IErrorHandler {
  private _httpCode = HttpStatus.UNAUTHORIZED;

  handle(error: MoodCoreError<any>): void {}

  getResponseBody(error: MoodCoreError<any>): IAPIErrorResponse {
    return {
      success: false,
      errorCode: error.code,
      message: error.message,
      statusCode: this._httpCode,
      details: error.context,
      createdAt: new Date(),
    };
  }

  getHttpStatus(): number {
    return this._httpCode;
  }
}
