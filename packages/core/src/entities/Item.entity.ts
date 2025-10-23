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
    mainItemId?: string
  ) {
    this.id = id;
    this.name = name;
    options.forEach(option => this.addOption(option))
    this.isOption = isOption;
    this.isStackable = isStackable
    this.mainItemId = mainItemId
  }

  public addOption(option: Item): this {
    if (!option.isOption) {
      throw new Error(`Tried to add a non-option item ${option}`);
    }
    if (this.isOption) {
      throw new Error(`You can not add option to an option`);
    }

    const existingItemOption = this.options.get(option.id);

    if (!existingItemOption) {
      throw new Error(`This option can not be addedd to this item`)
    }
    if (!option.isStackable && existingItemOption.qty > 0) {
      throw new Error(`You can only add this option once`)
    }

    existingItemOption.qty++;

    return this;
  }

  public removeOption(option: Item): this {
    const existingItemOption = this.options.get(option.id);

    if (!existingItemOption) {
      throw new Error(`Tried to remove a non-existing option`);
    }
    if (existingItemOption.qty === 0) {
      throw new Error(`Tried to remove an option that is already set to 0`)
    }

    existingItemOption.qty--;

    return this;
  }
}
