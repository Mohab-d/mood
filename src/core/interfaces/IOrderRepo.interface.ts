import type { Order } from "../entities/Order.entity";

export interface IOrderRepo {
  placeOrder(order: Order): Promise<void>;
  getAllOrders(): Promise<Order[]>;
  markOrderWithIdAsCompleted(orderId: string): Promise<void>;
}
