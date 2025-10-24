import { Item } from '@mood/core';
import { IItemRepo } from '@mood/core/dist/interfaces/IItemRepo.interface';
import { PoolClient } from 'pg';

export class PgItemRepo implements IItemRepo {
  private _pgPoolClient: PoolClient;
  constructor(pgPoolClient: PoolClient) {
    this._pgPoolClient = pgPoolClient;
  }
  save(item: Item): Promise<Item> {
    throw new Error('Method not implemented.');
  }
  fetchAllItems(): Promise<Item[]> {
    throw new Error('Method not implemented.');
  }
}
