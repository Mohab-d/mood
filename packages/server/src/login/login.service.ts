import { LoginByPass, type IMoodNotificationService } from '@mood/core';
import { Inject, Injectable } from '@nestjs/common';
import { PgUnitOfWorkService } from 'src/pg-unit-of-work/pg-unit-of-work.service';
import { ProviderToken } from 'src/providers/ProviderToken';

@Injectable()
export class LoginService {
  constructor(
    @Inject(ProviderToken.notificationService)
    private readonly notifyService: IMoodNotificationService,
    private readonly uowCoordinator: PgUnitOfWorkService,
  ) {}

  public async loginByPass(passId: string): Promise<string> {
    const token = await this.uowCoordinator.runInTransaction(async (uow) => {
      const loginByPassService = new LoginByPass(uow, this.notifyService);
      return await loginByPassService.execute(passId);
    });

    return token;
  }
}
