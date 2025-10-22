import type { Order } from "../../entities/Order.entity";
import { MoodEvents } from "../../events/MoodEvents.const";
import type { IMoodNotificationService } from "../../interfaces/IMoodNotificationService.interface";
import type { IOrderRepo } from "../../interfaces/IOrderRepo.interface";

export class FetchAllOrders {
  private _orderRepo: IOrderRepo;
  private _notificationService: IMoodNotificationService;

  constructor(
    orderRepo: IOrderRepo,
    notificationService: IMoodNotificationService,
  ) {
    this._orderRepo = orderRepo;
    this._notificationService = notificationService;
  }

  public async execute(): Promise<Order[]> {
    const orders = await this._orderRepo.fetchAllOrders();

    this._notificationService.publish(MoodEvents.ORDER.FETCH_ALL, {
      fetchedOrders: orders,
      message: `Fetched all orders`,
    });

    return orders;
  }
}
