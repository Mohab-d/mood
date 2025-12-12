import { Item } from "../entities/Item.entity";

export interface IItemRepo {
  save(item: Item): Promise<Item>;
  fetchAllItems(): Promise<Item[]>;
  fetchManyOptionById(optionIds: string[]): Promise<Item[]>;
  updateItem(item: Item): Promise<Item>;
  consumeItems(items: Item[]): Promise<Item[]>;
}
