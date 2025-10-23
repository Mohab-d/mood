import type { Item } from "../../entities/Item.entity";
import { MoodEvents } from "../../events/MoodEvents.const";
import type { IItemRepo } from "../../interfaces/IItemRepo.interface";
import type { IMoodNotificationService } from "../../interfaces/IMoodNotificationService.interface";

export class FetchAllItems {
  private _itemRepo: IItemRepo;
  private _notificationService: IMoodNotificationService;

  constructor(
    itemRepo: IItemRepo,
    notificationService: IMoodNotificationService,
  ) {
    this._itemRepo = itemRepo;
    this._notificationService = notificationService;
  }

  public async execute(): Promise<Item[]> {
    const fetcheditems = await this._itemRepo.fetchAllItems();

    this._notificationService.publish(MoodEvents.ITEM.FETCH_ALL, {
      fetcheditems,
      message: "Fetched all items from database",
    });

    return fetcheditems;
  }
}
