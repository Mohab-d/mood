import type { Item } from "../../entities/Item.entity";
import { MoodEvents } from "../../events/MoodEvents.const";
import type { IItemRepo } from "../../interfaces/IItemRepo.interface";
import type { INotificationService } from "../../interfaces/INotificationService.interface";

export class GetItems {
  private _itemRepo: IItemRepo;
  private _notificationService: INotificationService;

  constructor(itemRepo: IItemRepo, notificationService: INotificationService) {
    this._itemRepo = itemRepo
    this._notificationService = notificationService
  }

  public async execute(): Promise<Item[]> {
    const fetcheditems = await this._itemRepo.fetchAllItems();

    this._notificationService.publish(MoodEvents.ITEM.FETCH_ALL, {
      fetcheditems,
      message: "Fetched all items from database"
    })

    return fetcheditems;
  }
}
