import { MoodCoreErrorCodes } from "../constants/MoodCoreErrorCodes.const";
import { MoodCoreError } from "./MoodCoreError.entity";

type ItemOption = {
  option: Item;
  qty: number;
};

export class Item {
  public id: string;
  public name: string;
  public options: Map<string, ItemOption> = new Map<string, ItemOption>();
  public isOption: boolean;
  public isStackable: boolean;
  public mainItemId?: string;

  constructor(
    id: string,
    name: string,
    options: Item[],
    isOption: boolean = false,
    isStackable: boolean = false,
    mainItemId?: string,
  ) {
    this.id = id;
    this.name = name;
    options.forEach((option) => this.addOption(option));
    this.isOption = isOption;
    this.isStackable = isStackable;
    this.mainItemId = mainItemId;
  }

  public addOption(option: Item): this {
    if (!option.isOption) {
      throw new MoodCoreError(MoodCoreErrorCodes.RULE.INCOMPATIBLE, {
        detailedMessage: "This item is not an option, so it can not be added",
        nonOptionItem: option,
      });
    }
    if (this.isOption) {
      throw new MoodCoreError(MoodCoreErrorCodes.RULE.NESTGIN_NOT_ALLOWED, {
        detailedMessage: "You can not nest options under other options",
        optionToAdd: option,
      });
    }

    const existingItemOption = this.options.get(option.id);

    if (!existingItemOption) {
      throw new MoodCoreError(MoodCoreErrorCodes.RULE.INCOMPATIBLE, {
        detailedMessaged: "This option can not be added to this item",
        allowedOptions: this.options,
        option: option,
      });
    }
    if (!option.isStackable && existingItemOption.qty > 0) {
      throw new MoodCoreError(MoodCoreErrorCodes.RULE.MAX_LIMIT, {
        dtailedMessage: "You can only add this option once",
        option: option,
      });
    }

    existingItemOption.qty++;

    return this;
  }

  public removeOption(option: Item): this {
    const existingItemOption = this.options.get(option.id);

    if (!existingItemOption) {
      throw new MoodCoreError(MoodCoreErrorCodes.RULE.ITEM_DOES_NOT_EXIST, {
        detailedMessage:
          "Option is not allowed in this item, and does not exist in the options list, but the user tried to delete it",
        optionToDelete: option,
        allowedOptions: this.options,
      });
    }
    if (existingItemOption.qty === 0) {
      throw new MoodCoreError(MoodCoreErrorCodes.RULE.NEGATIVE_NOT_ALLOWED, {
        detailedMessage:
          "This option is already set to zero, yet the user tried to decrement it",
        option: option,
      });
    }

    existingItemOption.qty--;

    return this;
  }
}
