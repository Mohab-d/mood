import { MoodCoreError } from '@mood/core';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { ErrorHandlerSelectorService } from 'src/filters/error-handler-selector.service';

@Catch()
export class MoodCoreFilter implements ExceptionFilter {
  private readonly logger = Logger;

  constructor(private readonly handlerSelector: ErrorHandlerSelectorService) {}

  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    if (exception instanceof MoodCoreError) {
      const handler = this.handlerSelector.getHandler(exception.code);

      handler.handle(exception);

      return response
        .status(handler.getHttpStatus())
        .json(handler.getResponseBody(exception));
    }

    this.logger.error(exception);
    return response
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: 'Internal error occured' });
  }
}
