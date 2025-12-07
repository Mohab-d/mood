import { IItemRepo, Item, makeItem } from '@mood/core';
import { PoolClient } from 'pg';
import { Queries } from './Queries.constant';

export class PgItemRepo implements IItemRepo {
  private _pgPoolClient: PoolClient;
  constructor(pgPoolClient: PoolClient) {
    this._pgPoolClient = pgPoolClient;
  }

  public async fetchManyOptionById(itemIds: string[]): Promise<Item[]> {
    const fetchQueryResult = await this._pgPoolClient.query(
      Queries.fetchManyItemById,
      [itemIds.toString()],
    );

    const items = fetchQueryResult.rows.map(
      (itemData) =>
        new Item(
          itemData.id,
          itemData.name,
          [],
          itemData.is_option,
          itemData.is_stackable,
        ),
    );

    return items;
  }

  public async save(item: Item): Promise<Item> {
    const insertItemQueryResult = await this._pgPoolClient.query(
      Queries.createNewItem,
      [item.name, item.isOption, item.isStackable],
    );

    item.id = insertItemQueryResult.rows[0].id;

    if (item.options.size > 0) {
      const options: string[] = [];
      item.options.forEach((_, key) => options.push(key));

      await this._pgPoolClient.query(Queries.addItemOptions, [
        item.id,
        options.toString(),
      ]);
    }

    return item;
  }

  public async fetchAllItems(): Promise<Item[]> {
    const fetchItemsQueryResults = await this._pgPoolClient.query(
      Queries.fetchAllItems,
    );

    const items = fetchItemsQueryResults.rows.map((row) => {
      return makeItem({
        id: row.id,
        name: row.name,
        options: row.options ?? [],
        isStackable: row.isStackable,
        isOption: row.isOption,
        mainItemId: row.mainItemId,
      });
    });

    return items;
  }
}
