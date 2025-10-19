import type { INotificationService } from "../../interfaces/INotificationService.interface";
import type { IOrderRepo } from "../../interfaces/IOrderRepo.interface";

export class PlaceOrder {
  private _orderRepo: IOrderRepo;
  private _notificationService: INotificationService;

  constructor(
    orderRepo: IOrderRepo,
    notificationService: INotificationService,
  ) {
    this._orderRepo = orderRepo;
    this._notificationService = notificationService;
  }

  public async execute(): Promise<void> {}
}
