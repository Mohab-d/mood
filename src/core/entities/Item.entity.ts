type ItemOption = {
  option: Item;
  qty: number;
};

export class Item {
  public id: string;
  public name: string;
  public options: Item[];
  public isOption: boolean;
  public stackLimit: number;

  constructor(
    id: string,
    name: string,
    options: Item[],
    isOption: boolean = false,
    stackLimit: number = 1,
  ) {
    this.id = id;
    this.name = name;
    this.options = options;
    this.isOption = isOption;
    this.stackLimit = stackLimit;
  }

  public addOption(option: Item): this {
    if (!option.isOption) {
      throw new Error(`Tried to add a non-option item ${option}`);
    }

    this.options.push(option);
    return this;
  }

  public removeOption(option: ItemOption): this {
    this.options = this.options.filter((o) => o.id !== option.id);
    return this;
  }
}
