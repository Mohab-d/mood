import { ITokenRepo, TokenDto } from '@mood/core';
import { PoolClient } from 'pg';

export class PgTokenRepo implements ITokenRepo {
  private _pgPoolClient: PoolClient;
  constructor(pgPoolClient: PoolClient) {
    this._pgPoolClient = pgPoolClient;
  }
  save(token: string): Promise<TokenDto> {
    throw new Error('Method not implemented.');
  }
  fetch(tokenId: string): Promise<TokenDto> {
    throw new Error('Method not implemented.');
  }
  delete(tokenId: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
