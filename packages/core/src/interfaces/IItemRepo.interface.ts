import { Item } from "../entities/Item.entity";
import { ItemData } from "../types/ItemData.type";

export interface IItemRepo {
  save(item: Item): Promise<Item>;
  fetchAllItems(): Promise<Item[]>;
  fetchManyOptionById(optionIds: string[]): Promise<Item[]>;
  updateItem(itemData: ItemData): Promise<Item>;
}
