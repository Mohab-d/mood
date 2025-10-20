import type { Item } from "../entities/Item.entity";

export type CreateItemDto = {
  name: string;
  options: Item[];
  isOption: boolean;
};
