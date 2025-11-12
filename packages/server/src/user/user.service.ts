import {
  CreateOneTimePass,
  CreateUser,
  CreateUserDto,
  FetchAllUsers,
  IUnitOfWork,
  User,
} from '@mood/core';
import { UserRole } from '@mood/core/dist/types/UserRole.type';
import { Injectable } from '@nestjs/common';
import { HasherService } from 'src/shared/hasher/hasher.service';
import { NotificationService } from 'src/shared/notification/notification.service';
import { PgUnitOfWorkService } from 'src/shared/pg-unit-of-work/pg-unit-of-work.service';

@Injectable()
export class UserService {
  constructor(
    private readonly pgUnitOfWorkService: PgUnitOfWorkService,
    private readonly hasher: HasherService,
    private readonly notifyService: NotificationService,
  ) {}

  public async createNewUserAndPass(
    userData: CreateUserDto,
  ): Promise<{ newUser: User; passId: string }> {
    const { newUser, passId } = await this.pgUnitOfWorkService.runInTransaction(
      async (uow: IUnitOfWork) => {
        const createUserService = new CreateUser(
          uow,
          this.hasher,
          this.notifyService,
        );
        const createOneTimePassService = new CreateOneTimePass(
          uow,
          this.notifyService,
        );

        const newUser = await createUserService.execute(userData);
        const passId = await createOneTimePassService.createThenGetPassId({
          id: newUser.id,
          name: newUser.name,
          role: newUser.role,
        });

        return { newUser, passId };
      },
    );

    return { newUser, passId };
  }

  public async createPass(payload: {
    id: string;
    role: UserRole;
    name: string;
  }): Promise<string> {
    const passId = await this.pgUnitOfWorkService.runInTransaction(
      async (uow) => {
        const oneTimePassService = new CreateOneTimePass(
          uow,
          this.notifyService,
        );
        return await oneTimePassService.createThenGetPassId(payload);
      },
    );

    return passId;
  }

  public async getAllUsers(): Promise<User[]> {
    const users = await this.pgUnitOfWorkService.runInTransaction(
      async (uow) => {
        const fetchAllUsersService = new FetchAllUsers(uow, this.notifyService);

        const allUsers = await fetchAllUsersService.execute();

        return allUsers;
      },
    );

    return users;
  }
}
