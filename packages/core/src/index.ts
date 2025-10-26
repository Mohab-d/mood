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

export type MoodCoreFactories = {
  items: {
    getCreateService: (uow: IUnitOfWork) => CreateItem;
    getFetchAllService: (uow: IUnitOfWork) => FetchAllItems;
  };
  orders: {
    getFetchAllService: (uow: IUnitOfWork) => FetchAllOrders;
    getPlaceService: (uow: IUnitOfWork) => PlaceOrder;
  };
  users: {
    getCreateService: (uow: IUnitOfWork) => CreateUser;
    getCreateOneTimePassService: (uow: IUnitOfWork) => CreateOneTimePass;
    getLoginByPassService: (uow: IUnitOfWork) => LoginByPass;
  };
};

// setup common dependencies
const notificationService = new MoodNotification();
const hasher = makeBcryptHasher();

// use cases factories
function getCreateItemService(uow: IUnitOfWork): CreateItem {
  return new CreateItem(uow, notificationService);
}

function getFetchAllItemsService(uow: IUnitOfWork): FetchAllItems {
  return new FetchAllItems(uow, notificationService);
}

function getFetchAllOrdersService(uow: IUnitOfWork): FetchAllOrders {
  return new FetchAllOrders(uow, notificationService);
}

function getPlaceOrderService(uow: IUnitOfWork): PlaceOrder {
  return new PlaceOrder(uow, notificationService);
}

function getCreateOneTimePassService(uow: IUnitOfWork): CreateOneTimePass {
  return new CreateOneTimePass(uow, notificationService);
}

function getCreateUserService(uow: IUnitOfWork): CreateUser {
  return new CreateUser(uow, hasher, notificationService);
}

function getLoginByPassService(uow: IUnitOfWork): LoginByPass {
  return new LoginByPass(uow, notificationService);
}

function createMoodCoreFactories(): MoodCoreFactories {
  return {
    items: {
      getCreateService: getCreateItemService,
      getFetchAllService: getFetchAllItemsService,
    },
    orders: {
      getFetchAllService: getFetchAllOrdersService,
      getPlaceService: getPlaceOrderService,
    },
    users: {
      getCreateService: getCreateUserService,
      getCreateOneTimePassService: getCreateOneTimePassService,
      getLoginByPassService: getLoginByPassService,
    },
  };
}

export default createMoodCoreFactories;

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
