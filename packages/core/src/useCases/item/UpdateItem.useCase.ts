import { MoodCoreEvents } from "../../constants/MoodCoreEvents.const";
import { Item } from "../../entities/Item.entity";
import { IMoodNotificationService } from "../../interfaces/IMoodNotificationService.interface";
import { IUnitOfWork } from "../../interfaces/IUnitOfWork.interface";
import { ItemData } from "../../types/ItemData.type";
import { makeItem } from "../../utilities/makeItem.utility";

export class UpdateItem {
  private _uow: IUnitOfWork;
  private _notificationService: IMoodNotificationService;

  constructor(uow: IUnitOfWork, notificationService: IMoodNotificationService) {
    this._uow = uow;
    this._notificationService = notificationService;
  }

  public async execute(itemData: ItemData): Promise<Item> {
    const item = makeItem(itemData);

    const updatedItem = await this._uow.itemRepo.updateItem(item);

    this._notificationService.publish(MoodCoreEvents.ITEM.UPDATE, {
      message: `Updated item ${itemData.id}`,
      updatedItem,
    });

    return updatedItem;
  }
}
