import { IUserRepo, User } from '@mood/core';
import { PoolClient } from 'pg';

export class PgUserRepo implements IUserRepo {
  private _pgPoolClient: PoolClient;
  constructor(pgPoolClient: PoolClient) {
    this._pgPoolClient = pgPoolClient;
  }
  saveNewUser(newUser: User): Promise<User> {
    throw new Error('Method not implemented.');
  }
}
