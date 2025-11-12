import { IUserRepo } from '@mood/core';
import { User } from '@mood/core';
import { PoolClient } from 'pg';
import { Queries } from './Queries.constant';

export class PgUserRepo implements IUserRepo {
  private _pgPoolClient: PoolClient;
  constructor(pgPoolClient: PoolClient) {
    this._pgPoolClient = pgPoolClient;
  }

  public async fetchAllUsers(): Promise<User[]> {
    const { rows } = await this._pgPoolClient.query(Queries.fetchAllUsers);

    const users = rows.map(
      (userData) =>
        new User(userData.id, userData.name, userData.role, userData.email),
    );

    return users;
  }
  public async saveNewUser(newUser: User): Promise<User> {
    const { rows } = await this._pgPoolClient.query(Queries.createNewUser, [
      newUser.name,
      newUser.email,
      newUser.role,
      newUser.password,
    ]);

    const [user] = rows.map(
      (userData) =>
        new User(userData.id, userData.name, userData.role, userData.email),
    );

    return user;
  }
}
