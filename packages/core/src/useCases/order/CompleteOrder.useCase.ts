import { MoodCoreEvents } from "../../constants/MoodCoreEvents.const";
import { IMoodNotificationService } from "../../interfaces/IMoodNotificationService.interface";
import { IUnitOfWork } from "../../interfaces/IUnitOfWork.interface";

export class CompleteOrder {
  private _uow: IUnitOfWork;
  private _notificationService: IMoodNotificationService;

  constructor(uow: IUnitOfWork, notificationService: IMoodNotificationService) {
    this._uow = uow;
    this._notificationService = notificationService;
  }

  public async execute(orderId: string): Promise<void> {
    await this._uow.orderRepo.markAsComplete(orderId);

    this._notificationService.publish(MoodCoreEvents.ORDER.COMPLETED, {
      message: `Completed order ${orderId}`,
      orderId,
    });
  }
}
