import type { OrderItem } from "./OrderItem.entity";
import type { User } from "./User.entity";

export class Order {
  id: string;
  by: User;
  items: OrderItem[];

  constructor(id: string, by: User, items: OrderItem[]) {
    this.id = id;
    this.by = by;
    this.items = items;
  }

  public addItem(item: OrderItem): void {
    this.items.push(item);
  }

  public removeItemWithId(itemId: string): void {
    const removedOrderItem = this.items.find(
      (orderItem) => orderItem.id === itemId,
    );

    if (!removedOrderItem) {
      throw new Error(
        `Item with id ${itemId} does not exist on order ${this.id}`,
      );
    }

    this.items = this.items.filter((item) => item.id !== itemId);
  }
}
