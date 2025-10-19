import { Order } from "../../entities/Order.entity";
import type { CreateOrderData } from "../../types/CreateOrderData.type";
import { createTempId } from "../../utilities/createTempId.utility";

export function createOrder(createOrderData: CreateOrderData): Order {
  const tempId = createTempId();
  console.log(`created order ${tempId}`);
  return new Order(tempId, createOrderData.by, []);
}
