import type { Item } from "./Item.entity";
import type { User } from "./User.entity";

type OrderItem = {
  item: Item;
  qty: number;
};

export class Order {
  id: string;
  createdBy: User;
  orderItems: OrderItem[];

  constructor(id: string, by: User, items: OrderItem[]) {
    this.id = id;
    this.createdBy = by;
    this.orderItems = items;
  }

  public addItem(item: Item): void {
    const { existingOrderItem } = this.findExistingItem(item);

    if (!existingOrderItem) {
      this.orderItems.push({ item: item, qty: 1 });
      return;
    }

    existingOrderItem.qty++;
  }

  public removeItem(item: Item): void {
    const { existingOrderItem, index } = this.findExistingItem(item);

    if (!existingOrderItem) {
      throw new Error(
        `Tried to decrement item qty ${item}, but it does not exist`,
      );
    }

    existingOrderItem.qty--;

    if (existingOrderItem.qty === 0) {
      this.orderItems.splice(index!);
    }
  }

  private findExistingItem(item: Item): {
    existingOrderItem: OrderItem | undefined;
    index: number | undefined;
  } {
    let index: number | undefined;

    const existingOrderItem = this.orderItems.find((orderItem, index) => {
      index = index;
      return orderItem.item.id === item.id;
    });

    return {
      existingOrderItem,
      index,
    };
  }
}
