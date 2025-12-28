import { Item } from "../entities/Item.entity";
import { Option } from "../entities/Option.entity";
import { ItemData } from "../types/ItemData.type";

export function makeItem(itemData: ItemData): Item {
  const options = itemData.options.map(
    (optionData) =>
      new Option(
        optionData.id,
        optionData.name,
        optionData.isStackable,
        optionData.isAvailable,
        optionData.availableQty,
      ),
  );

  return new Item(
    itemData.id,
    itemData.name,
    options,
    itemData.isAvailable,
    itemData.avilableQty,
  );
}
