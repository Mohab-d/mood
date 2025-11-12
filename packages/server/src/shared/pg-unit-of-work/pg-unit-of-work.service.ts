import {
  IItemRepo,
  IOrderRepo,
  ITokenRepo,
  IUnitOfWork,
  IUserRepo,
} from '@mood/core';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool, PoolClient } from 'pg';
import { IUnitOfWorkCoordinator } from 'src/interfaces/IUnitOfWorkCoordinator.interface';
import { PgItemRepo } from './repos/PgItemRepo.repo';
import { PgOrderRepo } from './repos/PgOrderRepo.repo';
import { PgTokenRepo } from './repos/PgTokenRepo.repo';
import { PgUserRepo } from './repos/PgUserRepo.repo';

@Injectable()
export class PgUnitOfWorkService implements IUnitOfWorkCoordinator {
  private readonly pool: Pool;

  constructor(private readonly configService: ConfigService) {
    this.pool = new Pool({
      connectionString: configService.get('pgConnectionString'),
    });
  }

  public async runInTransaction<T>(
    work: (uow: IUnitOfWork) => Promise<T>,
  ): Promise<T> {
    const client: PoolClient = await this.pool.connect();

    try {
      await client.query('BEGIN');

      const transactionalUnitOfWork = new PgTransactionalUnitOfWork(client);

      const result = await work(transactionalUnitOfWork);

      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
}

class PgTransactionalUnitOfWork implements IUnitOfWork {
  private _client: PoolClient;

  private _usersRepo: IUserRepo;
  private _ordersRepo: IOrderRepo;
  private _itemsRepo: IItemRepo;
  private _tokenRepo: ITokenRepo;

  constructor(client: PoolClient) {
    this._client = client;

    this._usersRepo = new PgUserRepo(this._client);
    this._ordersRepo = new PgOrderRepo(this._client);
    this._itemsRepo = new PgItemRepo(this._client);
    this._tokenRepo = new PgTokenRepo(this._client);
  }

  get userRepo(): IUserRepo {
    return this._usersRepo;
  }

  get orderRepo(): IOrderRepo {
    return this._ordersRepo;
  }

  get itemRepo(): IItemRepo {
    return this._itemsRepo;
  }

  get tokenRepo(): ITokenRepo {
    return this._tokenRepo;
  }
}
