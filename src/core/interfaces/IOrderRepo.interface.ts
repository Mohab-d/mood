import type { Order } from "../entities/Order.entity";

export interface IOrderRepo {
  placeOrder(order: Order): Promise<void>;
}
