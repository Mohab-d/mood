import { MoodCoreErrorCodes } from "../constants/MoodCoreErrorCodes.const";
import { OrderItem } from "../types/OrderItem.type";
import type { Item } from "./Item.entity";
import { MoodCoreError } from "./MoodCoreError.entity";
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
      throw new MoodCoreError(MoodCoreErrorCodes.RULE.ITEM_DOES_NOT_EXIST, {
        detailedMessage: `Tried to remove an item that does not exist in the orderItems array of order ${this.id}`,
        itemToRemove: item,
      });
    }

    existingItem.qty--;
    if (existingItem.qty === 0) {
      this.orderItems.delete(item.id);
    }

    return this;
  }

  public consumeOrder(): Item[] {
    const insufficientItems: Item[] = [];

    this.orderItems.forEach(function checkAvailability(orderItem) {
      const item = orderItem.item;
      const qtyAfterConsumption = item.availableQty - orderItem.qty;

      if (!(qtyAfterConsumption > 0)) {
        insufficientItems.push(item);
      }
    });

    if (insufficientItems.length > 0) {
      throw new MoodCoreError(
        MoodCoreErrorCodes.BUSINESS.INSUFFICIENT_MATERIAL,
        {
          detailedMessage:
            "Available qty is insufficient to fulfill this order",
          insufficientItems,
          order: this,
        },
      );
    }

    const consumedItems: Item[] = [];
    this.orderItems.forEach(function applyConsumption(orderItem) {
      orderItem.item.forceConsume(orderItem.qty);
      consumedItems.push(orderItem.item);
    });

    return consumedItems;
  }

  public forceConsumeOrder(): Item[] {
    const consumedItems: Item[] = [];
    this.orderItems.forEach(function applyConsumption(orderItem) {
      orderItem.item.forceConsume(orderItem.qty);
      consumedItems.push(orderItem.item);
    });

    return consumedItems;
  }
}
