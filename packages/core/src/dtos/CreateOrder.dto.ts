import { ItemData } from "../types/ItemData.type";

export type CreateOrderDto = {
  placedByUserId: string;
  orderItems: { itemData: ItemData; qty: number }[];
};
