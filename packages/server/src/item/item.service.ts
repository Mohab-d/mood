import {
  CreateItem,
  CreateItemDto,
  FetchAllItems,
  Item,
  UpdateItem,
} from '@mood/core';
import { ItemData } from '@mood/core/dist/types/ItemData.type';
import { Injectable } from '@nestjs/common';
import { NotificationService } from 'src/shared/notification/notification.service';
import { PgUnitOfWorkService } from 'src/shared/pg-unit-of-work/pg-unit-of-work.service';

@Injectable()
export class ItemService {
  constructor(
    private readonly uowCoordinator: PgUnitOfWorkService,
    private readonly notificationService: NotificationService,
  ) {}

  public async saveItem(itemData: CreateItemDto): Promise<Item> {
    const newItem = await this.uowCoordinator.runInTransaction(async (uow) => {
      const createItemService = new CreateItem(uow, this.notificationService);

      const newItem = await createItemService.execute(itemData);

      return newItem;
    });

    return newItem;
  }

  public async fetchAllItems(): Promise<Item[]> {
    const items = await this.uowCoordinator.runInTransaction(async (uow) => {
      const createItemService = new FetchAllItems(
        uow,
        this.notificationService,
      );

      const allItems = await createItemService.execute();

      return allItems;
    });

    return items;
  }

  public async updateItem(itemData: ItemData): Promise<Item> {
    const item = await this.uowCoordinator.runInTransaction(async (uow) => {
      const updateItemService = new UpdateItem(uow, this.notificationService);

      const updatedItem = await updateItemService.execute(itemData);

      return updatedItem;
    });

    return item;
  }

  public async deleteItem(itemId: string): Promise<void> {
    await this.uowCoordinator.runInTransaction(async (uow) => {
      const deleteItemService = new DeleteItem(uow, this.notificationService);

      await deleteItemService.execute(itemId);
    });
  }
}
