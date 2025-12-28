import { OrderItem } from "../types/OrderItem.type";
import type { Item } from "./Item.entity";
import type { User } from "./User.entity";

export class Order {
  id: string;
  placedBy: User;
  orderItems: Map<string, OrderItem> = new Map<string, OrderItem>();

  constructor(id: string, placedBy: User, orderItems: OrderItem[]) {
    this.id = id;
    this.placedBy = placedBy;
    orderItems.forEach((orderItem) => this.addItem(orderItem.item, 0));
  }

  public addItem(item: Item, qty: number): this {
    const existingItem = this.orderItems.get(item.id);

    if (!existingItem) {
      this.orderItems.set(item.id, { item, qty: qty });
      return this;
    }

    existingItem.qty++;
    return this;
  }

  public removeItem(item: Item): this {
    const existingItem = this.orderItems.get(item.id);

    if (!existingItem) {
      return this;
    }

    existingItem.qty--;
    if (existingItem.qty === 0) {
      this.orderItems.delete(item.id);
    }

    return this;
  }

  public consumeOrder(): Item[] {
    const preparedItems: Item[] = [];

    this.orderItems.forEach(({ item, qty }) => {
      item.make(qty);
      preparedItems.push(item);
    });

    return preparedItems;
  }

  public forceConsumeOrder(): Item[] {
    const consumedItems: Item[] = [];
    this.orderItems.forEach(function applyConsumption(orderItem) {
      orderItem.item.forceMake(orderItem.qty);
      consumedItems.push(orderItem.item);
    });

    return consumedItems;
  }
}
