import { Item } from "../entities/Item.entity";
import { ItemData } from "../types/ItemData.type";

export function makeItem(itemData: ItemData): Item {
  const options = itemData.options.map(
    (optionData) =>
      new Item(
        optionData.id,
        optionData.name,
        [],
        optionData.isOption,
        optionData.isStackable,
        optionData.mainItemId,
        optionData.isAvilable,
        optionData.avilableQty,
      ),
  );

  return new Item(
    itemData.id,
    itemData.name,
    options,
    itemData.isOption,
    itemData.isStackable,
    itemData.mainItemId,
    itemData.isAvilable,
    itemData.avilableQty,
  );
}
