export class ItemOption {
  id: string;
  isStackable: boolean;
  stackLimit: number;

  constructor(id: string, isStackable: boolean, stackLimit: number) {
    this.id = id;
    this.isStackable = isStackable;
    this.stackLimit = stackLimit;
  }
}
