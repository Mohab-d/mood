import type { Item } from "./Item.entity";

export class OrderItem {
  id: string;
  item: Item;
  quantity: number;

  constructor(id: string, item: Item, quantity: number) {
    this.id = id;
    this.item = item;
    this.quantity = quantity;
  }
}
