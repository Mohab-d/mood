import { Item } from "../entities/Item.entity";

export type OrderItem = {
  item: Item;
  qty: number;
};
