import {
  CreateOneTimePass,
  CreateUser,
  CreateUserDto,
  type IHasher,
  type IMoodNotificationService,
  IUnitOfWork,
  User,
} from '@mood/core';
import { Inject, Injectable } from '@nestjs/common';
import { PgUnitOfWorkService } from 'src/pg-unit-of-work/pg-unit-of-work.service';
import { ProviderToken } from 'src/providers/ProviderToken';

@Injectable()
export class UserService {
  constructor(
    private readonly uowCoordinator: PgUnitOfWorkService,

    @Inject(ProviderToken.bcryptHasher)
    private readonly hasher: IHasher,

    @Inject(ProviderToken.notificationService)
    private readonly notifyService: IMoodNotificationService,
  ) {}

  public async creatNew(userData: CreateUserDto): Promise<User> {
    const user = await this.uowCoordinator.runInTransaction(
      async (uow: IUnitOfWork) => {
        const createUserService = new CreateUser(
          uow,
          this.hasher,
          this.notifyService,
        );
        const newUser = await createUserService.execute(userData);

        return newUser;
      },
    );

    return user;
  }

  public async createPass(payload: object): Promise<string> {
    const passId = await this.uowCoordinator.runInTransaction(async (uow) => {
      const oneTimePassService = new CreateOneTimePass(uow, this.notifyService);
      return await oneTimePassService.createThenGetPassId(payload);
    });

    return passId;
  }

  public async getAllUsers(): Promise<User[]> {
    const users = await this.uowCoordinator.runInTransaction(async (uow) => {});

    return users;
  }
}
