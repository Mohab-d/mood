type ItemOption = {
  option: Item;
  qty: number;
};

export class Item {
  public id: string;
  public name: string;
  public options: Map<string, ItemOption>;
  public isOption: boolean;

  constructor(
    id: string,
    name: string,
    options: Map<string, ItemOption>,
    isOption: boolean = false,
  ) {
    this.id = id;
    this.name = name;
    this.options = options;
    this.isOption = isOption;
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
      this.options.set(option.id, { option, qty: 1 });
      return this;
    }

    existingItemOption.qty++;

    return this;
  }

  public removeOption(option: Item): this {
    const existingItemOption = this.options.get(option.id);

    if (!existingItemOption) {
      throw new Error(`Tried to remove a non-existing option`);
    }

    existingItemOption.qty--;
    if (existingItemOption.qty === 0) {
      this.options.delete(option.id);
    }

    return this;
  }
}
