import { Item } from "../entities/Item.entity";

export interface IItemRepo {
  save(item: Item): Promise<Item>;
  fetchAllItems(): Promise<Item[]>;
}
