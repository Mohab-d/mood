export type CreateItemDto = {
  name: string;
  optionsId: string[];
  isOption?: boolean;
  isStackable?: boolean;
  mainItemId?: string;
  isAvailable?: boolean;
  availableQty?: number;
};
