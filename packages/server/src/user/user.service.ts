import {
  CreateUserDto,
  IUnitOfWork,
  User,
  type MoodCoreFactories,
} from '@mood/core';
import { Inject, Injectable } from '@nestjs/common';
import { PgUnitOfWorkService } from 'src/pg-unit-of-work/pg-unit-of-work.service';
import { ProviderToken } from 'src/providers/ProviderToken';

@Injectable()
export class UserService {
  private _moodCore: MoodCoreFactories;

  constructor(
    @Inject(ProviderToken.moodCore) moodCore: MoodCoreFactories,
    private readonly uowCoordinator: PgUnitOfWorkService,
  ) {
    this._moodCore = moodCore;
  }

  public async creatNew(userData: CreateUserDto): Promise<User> {
    const user = await this.uowCoordinator.runInTransaction(
      async (uow: IUnitOfWork) => {
        const createUserService = this._moodCore.users.getCreateService(uow);

        const newUser = await createUserService.execute(userData);

        return newUser;
      },
    );

    return user;
  }

  public async createPass(payload: object): Promise<string> {
    const passId = await this.uowCoordinator.runInTransaction(async (uow) => {
      const passId = await this._moodCore.users
        .getCreateOneTimePassService(uow)
        .createThenGetPassId(payload);

      return passId;
    });

    return passId;
  }

  public async loginByPass(passId: string): Promise<string> {
    const token = await this.uowCoordinator.runInTransaction(async (uow) => {
      const token = this._moodCore.users
        .getLoginByPassService(uow)
        .execute(passId);

      return token;
    });

    return token;
  }
}
