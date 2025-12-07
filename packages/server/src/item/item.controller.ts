import { Item, type CreateItemDto } from '@mood/core';
import { Body, Controller, Delete, Get, Patch, Post } from '@nestjs/common';
import { IAPISuccessResponse } from 'src/interfaces/IAPISuccessResponse.api';
import { INewItem } from 'src/interfaces/INewItem.api';
import { ItemService } from './item.service';
import { type ItemData } from '@mood/core/dist/types/ItemData.type';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Post()
  public async createItem(
    @Body() itemData: CreateItemDto,
  ): Promise<IAPISuccessResponse<INewItem>> {
    const newItem = await this.itemService.saveItem(itemData);

    return {
      success: true,
      message: 'New Item created',
      data: this.serializeItem(newItem),
      createdAt: new Date(),
    };
  }

  @Get()
  public async fetchAllItems(): Promise<IAPISuccessResponse<ItemData[]>> {
    const items = await this.itemService.fetchAllItems();

    return {
      success: true,
      message: 'Fetched all items',
      data: items.map((item) => this.serializeItem(item)),
      createdAt: new Date(),
    };
  }

  @Patch()
  public async updateItem(
    itemData: ItemData,
  ): Promise<IAPISuccessResponse<INewItem>> {
    const updatedItem = await this.itemService.updateItem(itemData);

    return {
      success: true,
      message: `Updated item ${itemData.id}`,
      data: this.serializeItem(updatedItem),
      createdAt: new Date(),
    };
  }

  @Delete()
  public async deleteItem(
    itemId: string,
  ): Promise<IAPISuccessResponse<undefined>> {
    await this.itemService.deleteItem(itemId);

    return {
      success: true,
      message: `Deleted item ${itemId}`,
      data: undefined,
      createdAt: new Date(),
    };
  }

  private serializeItem(item: Item): INewItem {
    const optionIds: string[] = [];
    item.options.forEach((_, key) => {
      optionIds.push(key);
    });

    const optionsData: INewItem[] = optionIds.map((optionId) => {
      const option = item.options.get(optionId)!.option;

      return {
        id: option.id,
        name: option.name,
        options: [],
        isOption: option?.isOption,
        isStackable: option?.isStackable,
        mainItemId: option?.mainItemId,
      };
    });

    return {
      id: item.id,
      name: item.name,
      options: optionsData,
      isOption: item.isOption,
      isStackable: item.isStackable,
      mainItemId: item.mainItemId,
    };
  }
}
