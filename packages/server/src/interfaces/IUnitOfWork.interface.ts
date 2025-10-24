import { IItemRepo } from '@mood/core/dist/interfaces/IItemRepo.interface';
import { IOrderRepo } from '@mood/core/dist/interfaces/IOrderRepo.interface';
import { IUserRepo } from '@mood/core/dist/interfaces/IUserRepo.interface';

export interface IUnitOfWork {
  usersRepo: IUserRepo;
  ordersRepo: IOrderRepo;
  itemsRepo: IItemRepo;
}
