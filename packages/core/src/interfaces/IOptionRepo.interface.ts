import { Option } from "../entities/Option.entity";

export interface IOptionRepo {
  fetchManyOptionById(optionIds: string[]): Promise<Option[]>;
  save(option: Option): Promise<Option>;
  update(option: Option): Promise<Option>;
  fetchForItemId(itemId: string): Promise<Option[]>;
}
