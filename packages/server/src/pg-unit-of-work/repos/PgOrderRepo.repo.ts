import { IOrderRepo, Order } from '@mood/core';
import { PoolClient } from 'pg';

export class PgOrderRepo implements IOrderRepo {
  private _pgPoolClient: PoolClient;
  constructor(pgPoolClient: PoolClient) {
    this._pgPoolClient = pgPoolClient;
  }
  placeOrder(order: Order): Promise<Order> {
    throw new Error('Method not implemented.');
  }
  fetchAllOrders(): Promise<Order[]> {
    throw new Error('Method not implemented.');
  }
}
