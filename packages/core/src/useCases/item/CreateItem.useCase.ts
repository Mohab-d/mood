import { MoodCoreEvents } from "../../constants/MoodCoreEvents.const";
import type { CreateItemDto } from "../../dtos/CreateItem.dto";
import { Item } from "../../entities/Item.entity";
import type { IMoodNotificationService } from "../../interfaces/IMoodNotificationService.interface";
import { IUnitOfWork } from "../../interfaces/IUnitOfWork.interface";
import { createTempId } from "../../utilities/createTempId.utility";

export class CreateItem {
  private _uow: IUnitOfWork;
  private _notificationService: IMoodNotificationService;

  constructor(uow: IUnitOfWork, notificationService: IMoodNotificationService) {
    this._uow = uow;
    this._notificationService = notificationService;
  }

  public async execute(itemData: CreateItemDto): Promise<Item> {
    const options = await this._uow.itemRepo.fetchManyOptionById(
      itemData.optionsId,
    );

    const newItem = new Item(
      createTempId(),
      itemData.name,
      options,
      itemData.isOption,
      itemData.isStackable,
      itemData.mainItemId,
    );

    const itemRepo = this._uow.itemRepo;
    const persistedItem = await itemRepo.save(newItem);

    this._notificationService.publish(MoodCoreEvents.ITEM.CREATED, {
      newItem: persistedItem,
      message: `New item created ${persistedItem.id}`,
    });

    return persistedItem;
  }
}
