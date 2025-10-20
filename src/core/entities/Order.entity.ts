import type { Item } from "./Item.entity";
import type { User } from "./User.entity";

type OrderItem = {
  item: Item;
  qty: number;
};

export class Order {
  id: string;
  createdBy: User;
  orderItems: Map<string, OrderItem>;

  constructor(id: string, by: User, items: Map<string, OrderItem>) {
    this.id = id;
    this.createdBy = by;
    this.orderItems = items;
  }

  public addItem(item: Item): this {
    const existingItem = this.orderItems.get(item.id);

    if (!existingItem) {
      this.orderItems.set(item.id, { item, qty: 1 });
      return this;
    }

    existingItem.qty++;
    return this;
  }

  public removeItem(item: Item): this {
    const existingItem = this.orderItems.get(item.id);

    if (!existingItem) {
      throw new Error(`Tried to remove a non-existing item from order`);
    }

    existingItem.qty--;
    if (existingItem.qty === 0) {
      this.orderItems.delete(item.id);
    }

    return this;
  }
}
