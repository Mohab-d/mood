import { MoodConfig } from "../../config/MoodConfig";
import { MoodCoreConfigs } from "../../constants/MoodCoreConfigs.const";
import { MoodCoreEvents } from "../../constants/MoodCoreEvents.const";
import type { CreateOrderDto } from "../../dtos/CreateOrder.dto";
import { Item } from "../../entities/Item.entity";
import { Order } from "../../entities/Order.entity";
import type { IMoodNotificationService } from "../../interfaces/IMoodNotificationService.interface";
import { IUnitOfWork } from "../../interfaces/IUnitOfWork.interface";
import { createTempId } from "../../utilities/createTempId.utility";
import { makeItem } from "../../utilities/makeItem.utility";

export class PlaceOrder {
  private _uow: IUnitOfWork;
  private _notificationService: IMoodNotificationService;
  private _config: MoodConfig;

  constructor(uow: IUnitOfWork, notificationService: IMoodNotificationService) {
    this._uow = uow;
    this._notificationService = notificationService;
    this._config = MoodConfig.getInstance();
  }

  public async execute(orderData: CreateOrderDto): Promise<Order> {
    const user = await this._uow.userRepo.fetchUserById(
      orderData.placedByUserId,
    );

    const orderItems = orderData.orderItems.map((orderItem) => ({
      item: makeItem(orderItem.itemData),
      qty: orderItem.qty,
    }));

    const newOrder = new Order(createTempId(), user, orderItems);
    let consumedItems: Item[] = [];

    const allowNegativeStock = this._config.getProperty(
      MoodCoreConfigs.ALLOW_NEGATIVE_STOCK,
    );
    if (!allowNegativeStock) {
      consumedItems = newOrder.consumeOrder();
    } else {
      consumedItems = newOrder.forceConsumeOrder();
    }

    const persistedOrder = await this._uow.orderRepo.placeOrder(newOrder);
    await this._uow.itemRepo.consumeItems(consumedItems);

    this._notificationService.publish(MoodCoreEvents.ORDER.CREATE, {
      newOrder: persistedOrder,
      message: `Placed new order ${persistedOrder.id}`,
    });

    this._notificationService.publish(MoodCoreEvents.ITEM.CONSUME, {
      message: `Consumed items of order ${persistedOrder.id}`,
      consumedItems,
    });

    return persistedOrder;
  }
}
