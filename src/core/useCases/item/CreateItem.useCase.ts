import type { CreateItemDto } from "../../dtos/CreateItem.dto";
import { Item } from "../../entities/Item.entity";
import { MoodEvents } from "../../events/MoodEvents.const";
import type { IItemRepo } from "../../interfaces/IItemRepo.interface";
import type { INotificationService } from "../../interfaces/INotificationService.interface";
import { createTempId } from "../../utilities/createTempId.utility";

export class CreateItem {
  private _itemRepo: IItemRepo;
  private _notificationService: INotificationService;

  constructor(itemRepo: IItemRepo, notificationService: INotificationService) {
    this._itemRepo = itemRepo;
    this._notificationService = notificationService;
  }

  public async execute(itemData: CreateItemDto): Promise<Item> {
    const newItem = new Item(createTempId(), itemData.name, itemData.options, itemData.isOption, itemData.isStackable, itemData.mainItemId);

    const persistedItem = await this._itemRepo.save(newItem);

    this._notificationService.publish(MoodEvents.ITEM.CREATED, {
      newItem: persistedItem,
      message: `New item created ${persistedItem.id}`
    })

    return persistedItem;
  }
}
