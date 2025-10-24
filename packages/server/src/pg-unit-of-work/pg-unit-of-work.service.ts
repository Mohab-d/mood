import { IItemRepo } from '@mood/core/dist/interfaces/IItemRepo.interface';
import { IOrderRepo } from '@mood/core/dist/interfaces/IOrderRepo.interface';
import { IUserRepo } from '@mood/core/dist/interfaces/IUserRepo.interface';
import { Inject, Injectable } from '@nestjs/common';
import { Pool, PoolClient } from 'pg';
import { IUnitOfWork } from 'src/interfaces/IUnitOfWork.interface';
import { PgUserRepo } from './repos/PgUserRepo.repo';
import { PgOrderRepo } from './repos/PgOrderRepo.repo';
import { PgItemRepo } from './repos/PgItemRepo.repo';

@Injectable()
export class PgUnitOfWorkService {
  private _pool: Pool;

  constructor(@Inject('PG_POOL') pool: Pool) {
    this._pool = pool;
  }

  public async runInTransaction<T>(
    work: (uow: IUnitOfWork) => Promise<T>,
  ): Promise<T> {
    const client: PoolClient = await this._pool.connect();

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
  private _usersRepo: IUserRepo;
  private _ordersRepo: IOrderRepo;
  private _itemsRepo: IItemRepo;
  private _client: PoolClient;

  constructor(client: PoolClient) {
    this._client = client;

    this._usersRepo = new PgUserRepo(this._client);
    this._ordersRepo = new PgOrderRepo(this._client);
    this._itemsRepo = new PgItemRepo(this._client);
  }

  get usersRepo(): IUserRepo {
    return this._usersRepo;
  }

  get ordersRepo(): IOrderRepo {
    return this._ordersRepo;
  }

  get itemsRepo(): IItemRepo {
    return this._itemsRepo;
  }
}
