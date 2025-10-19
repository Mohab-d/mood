import type { Item } from "../../entities/Item.entity";
import type { INotificationService } from "../../interfaces/INotificationService.interface";

export class CreateItem {
  private _itemRepo: IItemRepo;
  private _notificationService: INotificationService;

  constructor(itemRepo: IItemRepo, notificationService: INotificationService) {
    this._itemRepo = itemRepo;
    this._notificationService = notificationService;
  }

  public async execute(): Promise<Item> {}
}
