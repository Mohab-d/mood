import type { Order } from "../entities/Order.entity";

export interface IOrderRepo {
  placeOrder(order: Order): Promise<Order>;
  fetchAllOrders(): Promise<Order[]>;
  markAsComplete(orderId: string): Promise<void>;
}
