import { MoodCoreErrorCodes } from "../constants/MoodCoreErrorCodes.const";
import { MoodCoreError } from "./MoodCoreError.entity";

export class Option {
  public id: string;
  public name: string;
  public isStackable: boolean;

  public isAvailable: boolean = false;
  public availableQty: number = 0;

  constructor(
    id: string,
    name: string,
    isStackable: boolean = false,
    isAvailable: boolean = false,
    availableQty: number = 0,
  ) {
    this.id = id;
    this.name = name;
    this.isStackable = isStackable;
    this.isAvailable = isAvailable;
    this.availableQty = availableQty;
  }

  public updateAvailably(isAvailable: boolean): void {
    this.isAvailable = isAvailable;
  }

  public consume(qty: number): void {
    const newQty = this.availableQty - qty;

    if (newQty < 0) {
      throw new MoodCoreError(
        MoodCoreErrorCodes.BUSINESS.INSUFFICIENT_MATERIAL,
        {
          detailedMessage: "Available quantity is insufficient",
          item: this,
          requiredQty: qty,
        },
      );
    }

    this.availableQty = newQty;
  }

  public forceConsume(qty: number): void {
    this.availableQty -= qty;
  }
}
