import { CreateOneTimePass, LoginByPass } from '@mood/core';
import { UserRole } from '@mood/core/dist/types/UserRole.type';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NotificationService } from 'src/shared/notification/notification.service';
import { PgUnitOfWorkService } from 'src/shared/pg-unit-of-work/pg-unit-of-work.service';

@Injectable()
export class LoginService {
  constructor(
    private readonly notifyService: NotificationService,
    private readonly uowCoordinator: PgUnitOfWorkService,
    private readonly configService: ConfigService,
  ) {}

  public async loginByPass(passId: string): Promise<string> {
    const token = await this.uowCoordinator.runInTransaction(async (uow) => {
      const loginByPassService = new LoginByPass(uow, this.notifyService);
      return await loginByPassService.execute(passId);
    });

    return token;
  }

  public async createPassLink(payload: {
    id: string;
    role: UserRole;
    name: string;
  }): Promise<string> {
    const tokenId = await this.uowCoordinator.runInTransaction(async (uow) => {
      const createOneTimePassService = new CreateOneTimePass(
        uow,
        this.notifyService,
      );

      createOneTimePassService.createThenGetPassId(payload);
      return createOneTimePassService;
    });

    const passLink =
      this.configService.get('baseUrl') + `/login?pass=${tokenId}`;
    return passLink;
  }
}
