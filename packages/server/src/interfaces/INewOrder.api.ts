import { Item, OrderItem, User } from '@mood/core';

export interface INewOrder {
  id: string;
  placedBy: User;
  orderItems: Map<string, OrderItem>;
}
