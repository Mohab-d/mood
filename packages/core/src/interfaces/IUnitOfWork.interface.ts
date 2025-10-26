import { IItemRepo } from "./IItemRepo.interface";
import { IOrderRepo } from "./IOrderRepo.interface";
import { ITokenRepo } from "./ITokenRepo.interface";
import { IUserRepo } from "./IUserRepo.interface";

export interface IUnitOfWork {
  userRepo: IUserRepo;
  orderRepo: IOrderRepo;
  itemRepo: IItemRepo;
  tokenRepo: ITokenRepo;
}
