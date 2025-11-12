import { ErrorCode } from '@mood/core';

export type ServerErrorCode = ErrorCode & {
  httpCode: number;
};
