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
import { MoodNotification } from "./useCases/notification/MoodNotification.useCase";
import { FetchAllOrders } from "./useCases/order/FetchAllOrders.useCase";
import { PlaceOrder } from "./useCases/order/PlaceOrder.useCase";
import { CreateOneTimePass } from "./useCases/user/CreateOneTimePass.useCase";
import { CreateUser } from "./useCases/user/CreateUser.useCase";
import { LoginByPass } from "./useCases/user/LoginByPass.useCase";
import { makeBcryptHasher } from "./utilities/makeBcryptHasher.utility";

// --- MOOD'S CORE API DEFINITION ---
type MoodCoreAPI = {
  items: {
    create: typeof CreateItem.prototype.execute;
    fetchAll: typeof FetchAllItems.prototype.execute;
  };
  orders: {
    fetchAll: typeof FetchAllOrders.prototype.execute;
    place: typeof PlaceOrder.prototype.execute;
  };
  users: {
    create: typeof CreateUser.prototype.execute;
    createOneTimePass: typeof CreateOneTimePass.prototype.createThenGetPassId;
    loginByPass: typeof LoginByPass.prototype.execute;
  };
};

// setup common dependencies
const notificationService = new MoodNotification();
const hasher = makeBcryptHasher();

// create the core
export function mood(
  itemRepo: IItemRepo,
  orderRepo: IOrderRepo,
  userRepo: IUserRepo,
  tokenRepo: ITokenRepo,
): MoodCoreAPI {
  const createItemUseCase = new CreateItem(itemRepo, notificationService);
  const fetchAllItemsUseCase = new FetchAllItems(itemRepo, notificationService);
  const fetchAllOrdersUseCase = new FetchAllOrders(
    orderRepo,
    notificationService,
  );
  const placeOrderUseCase = new PlaceOrder(orderRepo, notificationService);
  const createOneTimePassUseCase = new CreateOneTimePass(
    tokenRepo,
    notificationService,
  );
  const createUserUseCase = new CreateUser(
    userRepo,
    hasher,
    notificationService,
  );
  const loginPassUseCase = new LoginByPass(tokenRepo, notificationService);

  return {
    items: {
      create: (params) => createItemUseCase.execute(params),
      fetchAll: () => fetchAllItemsUseCase.execute(),
    },
    orders: {
      fetchAll: () => fetchAllOrdersUseCase.execute(),
      place: (params) => placeOrderUseCase.execute(params),
    },
    users: {
      create: (params) => createUserUseCase.execute(params),
      createOneTimePass: (params) =>
        createOneTimePassUseCase.createThenGetPassId(params),
      loginByPass: (params) => loginPassUseCase.execute(params),
    },
  };
}

export default mood;

export type {
  Item,
  Order,
  User,
  MoodEventType,
  MoodCoreAPI,
  CreateItemDto,
  CreateOrderDto,
  CreateUserDto,
  TokenDto,
};
