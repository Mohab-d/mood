import type { Order } from "../../entities/Order.entity";
import { MoodEvents } from "../../events/MoodEvents.const";
import type { IMoodNotificationService } from "../../interfaces/IMoodNotificationService.interface";
import { IUnitOfWork } from "../../interfaces/IUnitOfWork.interface";

export class FetchAllOrders {
  private _uow: IUnitOfWork;
  private _notificationService: IMoodNotificationService;

  constructor(uow: IUnitOfWork, notificationService: IMoodNotificationService) {
    this._uow = uow;
    this._notificationService = notificationService;
  }

  public async execute(): Promise<Order[]> {
    const orderRepo = this._uow.orderRepo;
    const orders = await orderRepo.fetchAllOrders();

    this._notificationService.publish(MoodEvents.ORDER.FETCH_ALL, {
      fetchedOrders: orders,
      message: `Fetched all orders`,
    });

    return orders;
  }
}
