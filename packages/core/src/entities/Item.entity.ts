import { MoodCoreErrorCodes } from "../constants/MoodCoreErrorCodes.const";
import { ItemOption } from "../types/ItemOption.type";
import { MoodCoreError } from "./MoodCoreError.entity";
import { Option } from "./Option.entity";

export class Item {
  public id: string;
  public name: string;
  public options: Map<string, ItemOption> = new Map<string, ItemOption>();

  public isAvailable: boolean;
  public availableQty: number = 0;

  constructor(
    id: string,
    name: string,
    options: Option[],
    isAvailable?: boolean,
    availableQty?: number,
  ) {
    this.id = id;
    this.name = name;

    options.forEach((option) => {
      this.options.set(option.id, { option: option, qty: 0 });
    });

    this.isAvailable = !isAvailable ? false : isAvailable;
    this.availableQty = availableQty ?? 0;
  }

  public assignOption(option: Option): this {
    const existingItemOption = this.options.get(option.id);

    if (existingItemOption) {
      return this;
    }

    this.options.set(option.id, { option, qty: 0 });
    return this;
  }

  public addOption(option: Option): this {
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

    if (!existingItemOption || existingItemOption.qty === 0) {
      return this;
    }

    existingItemOption.qty--;

    return this;
  }

  public updateAvailably(isAvailable: boolean): void {
    this.isAvailable = isAvailable;
  }

  public make(itemQty: number): Option[] {
    const insufficientOptions: Option[] = [];

    this.options.forEach(function checkAvailability({ option, qty }) {
      const requiredQty = qty * itemQty;
      const qtyAfterConsumption = option.availableQty - requiredQty;

      if (!(qtyAfterConsumption > 0)) {
        insufficientOptions.push(option);
      }
    });

    if (insufficientOptions.length > 0) {
      throw new MoodCoreError(
        MoodCoreErrorCodes.BUSINESS.INSUFFICIENT_MATERIAL,
        {
          detailedMessage:
            "Available qty is insufficient to make the required qty",
          insufficientItems: insufficientOptions,
          order: this,
        },
      );
    }

    const consumedOptions: Option[] = [];
    this.options.forEach(function applyConsumption({ option, qty }) {
      const requiredQty = qty * itemQty;
      option.forceConsume(requiredQty);
      consumedOptions.push(option);
    });

    return consumedOptions;
  }

  public forceMake(itemQty: number): void {
    this.options.forEach(({ option, qty }) => {
      option.forceConsume(qty * itemQty);
    });
  }
}
