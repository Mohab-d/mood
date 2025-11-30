import { Item, type CreateItemDto } from '@mood/core';
import { Controller, Post } from '@nestjs/common';
import { IAPISuccessResponse } from 'src/interfaces/IAPISuccessResponse.api';
import { INewItem } from 'src/interfaces/INewItem.api';
import { ItemService } from './item.service';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) { }

  @Post()
  public async createItem(
    itemData: CreateItemDto,
  ): Promise<IAPISuccessResponse<INewItem>> {
    const newItem = await this.itemService.saveItem(itemData);

    return {
      success: true,
      message: 'New Item created',
      data: this.serializeItem(newItem),
      createdAt: new Date(),
    };
  }

  private serializeItem(item: Item): INewItem {
    const optionIds = Object.keys(item.options);

    const optionsData: INewItem[] = optionIds.map(optionId => {
      const option = item.options.get(optionId)!.option;

      return {
        id: option.id,
        name: option.name,
        options: [],
        isOption: option?.isOption,
        isStackable: option?.isStackable,
        mainItemId: option?.mainItemId
      }
    })

    return {
      id: item.id,
      name: item.name,
      options: optionsData,
      isOption: item.isOption,
      isStackable: item.isStackable,
      mainItemId: item.mainItemId
    };
  }
}
