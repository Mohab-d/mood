import { MoodCoreErrorCodes } from "../constants/MoodCoreErrorCodes.const";
import type { Item } from "./Item.entity";
import { MoodCoreError } from "./MoodCoreError.entity";
import type { User } from "./User.entity";

type OrderItem = {
  item: Item;
  qty: number;
};

export class Order {
  id: string;
  placedBy: User;
  orderItems: Map<string, OrderItem> = new Map<string, OrderItem>();

  constructor(id: string, placedBy: User, items: Item[]) {
    this.id = id;
    this.placedBy = placedBy;
    items.forEach((item) => this.addItem(item));
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
}
