import { CreateItem, CreateItemDto, Item } from '@mood/core';
import { Injectable } from '@nestjs/common';
import { NotificationService } from 'src/shared/notification/notification.service';
import { PgUnitOfWorkService } from 'src/shared/pg-unit-of-work/pg-unit-of-work.service';

@Injectable()
export class ItemService {
  constructor(
    private readonly uowCoordinator: PgUnitOfWorkService,
    private readonly notificationService: NotificationService,
  ) { }

  public async saveItem(itemData: CreateItemDto): Promise<Item> {
    const newItem = await this.uowCoordinator.runInTransaction(async (uow) => {
      const createItemService = new CreateItem(uow, this.notificationService);

      const newItem = await createItemService.execute(itemData);

      return newItem;
    });

    return newItem;
  }
}
