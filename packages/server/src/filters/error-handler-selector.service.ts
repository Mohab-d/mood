import { Catch } from '@nestjs/common';
import { IErrorHandler } from 'src/interfaces/IErrorHandler.interface';

@Catch()
export class ErrorHandlerSelectorService {
  private _handlers: Record<string, IErrorHandler> = {};

  getHandler(code: string): IErrorHandler {
    return this._handlers[code];
  }

  setHandler(code: string, handler: IErrorHandler): this {
    this._handlers[code] = handler;
    return this;
  }
}
