import { IMoodCoreError } from '@mood/core';

export interface IMoodServerError<T> extends IMoodCoreError<T> {
  httpCode: number;
}
