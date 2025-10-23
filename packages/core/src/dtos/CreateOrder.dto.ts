import type { Item } from "../entities/Item.entity";
import type { User } from "../entities/User.entity";

export type CreateOrderDto = {
  id: string;
  placedBy: User;
  orderItems: Item[];
};
