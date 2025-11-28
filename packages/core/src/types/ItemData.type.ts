export type ItemData = {
  id: string;
  name: string;
  options: ItemData[];
  isOption?: boolean;
  isStackable?: boolean;
  mainItemId?: string;
};
