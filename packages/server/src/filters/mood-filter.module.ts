import { Module } from '@nestjs/common';
import { MoodCoreFilter } from './mood-core-filter/mood-core-filter.filter';
import { ErrorHandlerSelectorService } from './error-handler-selector.service';
import { IErrorHandler } from 'src/interfaces/IErrorHandler.interface';
import { MoodCoreErrorCodes } from '@mood/core';
import { NotFoundHandler } from './handlers/serverHandlers/NotFound.handler';
import { InvalidTokenHandler } from './handlers/coreHandlers/InvalidToken.handler';
import { IncompatibleOptionHandler } from './handlers/coreHandlers/IncompatibleOptionHandler';

function createHandlerSelector(
  notFoundHandler: IErrorHandler,
  invalidTokenHandler: IErrorHandler,
  incompatibleOptionHandler: IErrorHandler,
): ErrorHandlerSelectorService {
  const handlerSelector = new ErrorHandlerSelectorService();

  handlerSelector
    .setHandler(
      MoodCoreErrorCodes.AUTHN.INVALID_TOKEN.code,
      invalidTokenHandler,
    )
    .setHandler(MoodCoreErrorCodes.SYSTEM.MISSING_SETTING.code, notFoundHandler)
    .setHandler(
      MoodCoreErrorCodes.RULE.INCOMPATIBLE.code,
      incompatibleOptionHandler,
    );

  return handlerSelector;
}

@Module({
  providers: [
    MoodCoreFilter,
    NotFoundHandler,
    InvalidTokenHandler,
    IncompatibleOptionHandler,
    ErrorHandlerSelectorService,
    {
      provide: ErrorHandlerSelectorService,
      useFactory: createHandlerSelector,
      inject: [NotFoundHandler, InvalidTokenHandler, IncompatibleOptionHandler],
    },
  ],

  exports: [ErrorHandlerSelectorService],
})
export class MoodFilterModule {}
