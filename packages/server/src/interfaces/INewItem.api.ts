export interface INewItem {
  id: string;
  name: string;
  options: INewItem[];
  isOption: boolean;
  isStackable: boolean;
  mainItemId?: string;
}
