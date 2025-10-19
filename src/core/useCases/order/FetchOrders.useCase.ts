import type { Order } from "../../entities/Order.entity";
import type { IOrderRepo } from "../../interfaces/IOrderRepo.interface";

export class FetchAllOrders {
  private _orderRepo: IOrderRepo;

  constructor(orderRepo: IOrderRepo) {
    this._orderRepo = orderRepo;
  }

  public async execute(): Promise<Order[]> {
    const orders = await this._orderRepo.getAllOrders();
    console.debug(`Fetched all orders`);

    return orders;
  }
}
