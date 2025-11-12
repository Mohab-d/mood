import { ITokenRepo, TokenDto } from '@mood/core';
import { PoolClient } from 'pg';
import { Queries } from './Queries.constant';

export class PgTokenRepo implements ITokenRepo {
  private _pgPoolClient: PoolClient;
  constructor(pgPoolClient: PoolClient) {
    this._pgPoolClient = pgPoolClient;
  }
  public async save(token: string): Promise<TokenDto> {
    const { rows } = await this._pgPoolClient.query(Queries.createNewToken, [
      token,
    ]);

    return {
      id: rows[0].id,
      token: rows[0].token,
    };
  }

  public async fetch(tokenId: string): Promise<TokenDto> {
    const { rows } = await this._pgPoolClient.query(Queries.fetchTokenById, [
      tokenId,
    ]);

    return rows[0];
  }

  public async delete(tokenId: string): Promise<void> {
    await this._pgPoolClient.query(Queries.deleteToken, [tokenId]);
  }
}
