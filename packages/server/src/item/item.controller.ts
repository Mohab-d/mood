import { Item, type CreateItemDto } from '@mood/core';
import { Controller, Post } from '@nestjs/common';
import { IAPISuccessResponse } from 'src/interfaces/IAPISuccessResponse.api';
import { INewItem } from 'src/interfaces/INewItem.api';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  public async createItem(
    itemData: CreateItemDto,
  ): Promise<IAPISuccessResponse<INewItem>> {
    const newItem = await this.itemService.saveItem(itemData);

    return {
      success: true,
      message: 'New Item created',
      data: this.serializeItemRecursivly(newItem),
      createdAt: new Date(),
    };
  }

  private serializeItemRecursivly(item: Item): INewItem {
    const itemData: INewItem = {
      id: item.id,
      name: item.name,
      isOption: item.isOption,
      isStackable: item.isStackable,
      mainItemId: item.mainItemId!,
      options: item.options.,
    };

    return itemData;
  }
}
