import { IItemRepo } from "./IItemRepo.interface";
import { IOptionRepo } from "./IOptionRepo.interface";
import { IOrderRepo } from "./IOrderRepo.interface";
import { ITokenRepo } from "./ITokenRepo.interface";
import { IUserRepo } from "./IUserRepo.interface";

export interface IUnitOfWork {
  userRepo: IUserRepo;
  orderRepo: IOrderRepo;
  itemRepo: IItemRepo;
  optionRepo: IOptionRepo;
  tokenRepo: ITokenRepo;
}
