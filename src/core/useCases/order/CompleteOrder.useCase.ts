import type { Order } from "../../entities/Order.entity";
import type { IOrderRepo } from "../../interfaces/IOrderRepo.interface";

export class CompleteOrder {
  private _orderRepo: IOrderRepo;

  constructor(orderRepo: IOrderRepo) {
    this._orderRepo = orderRepo;
  }

  public async execute(order: Order): Promise<void> {
    await this._orderRepo.markOrderWithIdAsCompleted(order.id);
    console.debug(`Completed order ${order.id}`);
  }
}
