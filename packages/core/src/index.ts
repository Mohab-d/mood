// entities
import type { Order } from "./entities/Order.entity";
import type { User } from "./entities/User.entity";
import type { Item } from "./entities/Item.entity";

// dtos
import type { CreateItemDto } from "./dtos/CreateItem.dto";
import type { CreateOrderDto } from "./dtos/CreateOrder.dto";
import type { CreateUserDto } from "./dtos/CreateUser.dto";
import type { TokenDto } from "./dtos/Token.dto";

// events
import { type MoodEventType } from "./events/MoodEvents.const";

// repos interfaces
import type { IItemRepo } from "./interfaces/IItemRepo.interface";
import type { IOrderRepo } from "./interfaces/IOrderRepo.interface";
import type { ITokenRepo } from "./interfaces/ITokenRepo.interface";
import type { IUserRepo } from "./interfaces/IUserRepo.interface";

// use cases
import { CreateItem } from "./useCases/item/CreateItem.useCase";
import { FetchAllItems } from "./useCases/item/FetchAllItems.useCase";
import { FetchAllOrders } from "./useCases/order/FetchAllOrders.useCase";
import { PlaceOrder } from "./useCases/order/PlaceOrder.useCase";
import { CreateOneTimePass } from "./useCases/user/CreateOneTimePass.useCase";
import { CreateUser } from "./useCases/user/CreateUser.useCase";
import { LoginByPass } from "./useCases/user/LoginByPass.useCase";
import { MoodNotification } from "./useCases/notification/MoodNotification.useCase";
import { makeBcryptHasher } from "./utilities/makeBcryptHasher.utility";
import { IUnitOfWork } from "./interfaces/IUnitOfWork.interface";

// setup common dependencies
const notificationService = new MoodNotification();
const hasher = makeBcryptHasher();

// use cases factories

export type {
  Item,
  Order,
  User,
  MoodEventType,
  CreateItemDto,
  CreateOrderDto,
  CreateUserDto,
  TokenDto,
  IItemRepo,
  IOrderRepo,
  ITokenRepo,
  IUserRepo,
  IUnitOfWork,
};

export {};

// export the use cases, delete the notification and hasher, those should be created by the server
