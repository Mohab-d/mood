import type { Item } from "../../entities/Item.entity";
import { MoodCoreEvents } from "../../events/MoodCoreEvents.const";
import type { IMoodNotificationService } from "../../interfaces/IMoodNotificationService.interface";
import { IUnitOfWork } from "../../interfaces/IUnitOfWork.interface";

export class FetchAllItems {
  private _uow: IUnitOfWork;
  private _notificationService: IMoodNotificationService;

  constructor(uow: IUnitOfWork, notificationService: IMoodNotificationService) {
    this._uow = uow;
    this._notificationService = notificationService;
  }

  public async execute(): Promise<Item[]> {
    const itemRepo = this._uow.itemRepo;
    const fetcheditems = await itemRepo.fetchAllItems();

    this._notificationService.publish(MoodCoreEvents.ITEM.FETCH_ALL, {
      fetcheditems,
      message: "Fetched all items from database",
    });

    return fetcheditems;
  }
}
