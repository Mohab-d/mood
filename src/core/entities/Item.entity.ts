type ItemOption = {
  option: Item;
  qty: number;
};

export class Item {
  public id: string;
  public name: string;
  public options: ItemOption[];
  public isOption: boolean;

  constructor(
    id: string,
    name: string,
    options: ItemOption[],
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

    const { existingItemOption } = this.findExistingItemOption(option);

    if (!existingItemOption) {
      this.options.push({
        option,
        qty: 1,
      });

      return this;
    }

    return this;
  }

  public removeOption(option: ItemOption): this {
    this.options = this.options.filter((o) => o.id !== option.id);
    return this;
  }

  private findExistingItemOption(itemOption: Item): {
    existingItemOption: ItemOption | undefined;
    index: number | undefined;
  } {
    let index: number | undefined;

    const existingItemOption = this.options.find((option, index) => {
      index = index;
      return option.option.id === itemOption.id;
    });

    return {
      existingItemOption,
      index,
    };
  }
}
