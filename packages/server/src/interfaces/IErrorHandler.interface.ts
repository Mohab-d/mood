import { MoodCoreError } from '@mood/core';
import { IAPIErrorResponse } from './IAPIErrorResponse.api';

export interface IErrorHandler {
  handle(error: MoodCoreError<any>): void;
  getResponseBody(error: MoodCoreError<any>): IAPIErrorResponse;
  getHttpStatus(): number;
}
