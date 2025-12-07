import { MoodCoreEvents } from "../../constants/MoodCoreEvents.const";
import type { CreateOrderDto } from "../../dtos/CreateOrder.dto";
import { Order } from "../../entities/Order.entity";
import type { IMoodNotificationService } from "../../interfaces/IMoodNotificationService.interface";
import { IUnitOfWork } from "../../interfaces/IUnitOfWork.interface";
import { createTempId } from "../../utilities/createTempId.utility";
import { makeItem } from "../../utilities/makeItem.utility";

export class PlaceOrder {
  private _uow: IUnitOfWork;
  private _notificationService: IMoodNotificationService;

  constructor(uow: IUnitOfWork, notificationService: IMoodNotificationService) {
    this._uow = uow;
    this._notificationService = notificationService;
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
    const persistedOrder = await this._uow.orderRepo.placeOrder(newOrder);

    this._notificationService.publish(MoodCoreEvents.ORDER.CREATED, {
      newOrder: persistedOrder,
      message: `Placed new order ${persistedOrder.id}`,
    });

    return persistedOrder;
  }
}
