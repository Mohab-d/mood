import type { Order } from "../../entities/Order.entity";
import type { IOrderRepo } from "../../interfaces/IOrderRepo.interface";

export class SubmitOrder {
  private _orderRepo: IOrderRepo;

  constructor(orderRepo: any) {
    this._orderRepo = orderRepo;
  }

  public async execute(order: Order): Promise<void> {
    const placedOrder = await this._orderRepo.placeOrder(order);
    console.debug(`Placed order ${order.id}`);
  }
}
