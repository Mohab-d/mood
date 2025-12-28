import { OptionData } from "./OptionData.type";

export type ItemData = {
  id: string;
  name: string;
  options: OptionData[];
  isAvailable?: boolean;
  avilableQty?: number;
};
