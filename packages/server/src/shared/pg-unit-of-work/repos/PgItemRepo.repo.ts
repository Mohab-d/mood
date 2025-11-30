import { IItemRepo, Item } from '@mood/core';
import { PoolClient } from 'pg';
import { Queries } from './Queries.constant';

export class PgItemRepo implements IItemRepo {
  private _pgPoolClient: PoolClient;
  constructor(pgPoolClient: PoolClient) {
    this._pgPoolClient = pgPoolClient;
  }

  public async getManyItemById(itemIds: string[]): Promise<Item[]> {
    const { rows } = await this._pgPoolClient.query(Queries.fetchManyItemById);
  }

  save(item: Item): Promise<Item> {
    throw new Error('Method not implemented.');
  }
  fetchAllItems(): Promise<Item[]> {
    throw new Error('Method not implemented.');
  }
}
