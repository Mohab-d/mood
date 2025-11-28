import { ConsoleLogger, Logger, Module } from '@nestjs/common';
import { MoodCoreFilter } from './mood-core-filter/mood-core-filter.filter';
import { ErrorHandlerSelectorService } from './error-handler-selector.service';
import { IErrorHandler } from 'src/interfaces/IErrorHandler.interface';
import { MoodCoreErrorCodes } from '@mood/core';
import { NotFoundHandler } from './handlers/serverHandlers/NotFound.handler';
import { InvalidTokenHandler } from './handlers/coreHandlers/InvalidToken.handler';

function createHandlerSelector(
  notFoundHandler: IErrorHandler,
  invalidTokenHandler: IErrorHandler,
): ErrorHandlerSelectorService {
  const handlerSelector = new ErrorHandlerSelectorService();

  handlerSelector
    .setHandler(
      MoodCoreErrorCodes.AUTHN.INVALID_TOKEN.code,
      invalidTokenHandler,
    )
    .setHandler(
      MoodCoreErrorCodes.SYSTEM.MISSING_SETTING.code,
      notFoundHandler,
    );

  return handlerSelector;
}

@Module({
  providers: [
    MoodCoreFilter,
    NotFoundHandler,
    InvalidTokenHandler,
    ErrorHandlerSelectorService,
    {
      provide: ErrorHandlerSelectorService,
      useFactory: createHandlerSelector,
      inject: [NotFoundHandler, InvalidTokenHandler],
    },
  ],

  exports: [ErrorHandlerSelectorService],
})
export class MoodFilterModule {}
