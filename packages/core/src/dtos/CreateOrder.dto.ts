import type { Item } from "../entities/Item.entity";
import type { User } from "../entities/User.entity";

export type CreateOrderDto = {
  placedBy: User;
  orderItems: Item[];
};
