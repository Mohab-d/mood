import type { CreateOrderDto } from "../../dtos/CreateOrder.dto";
import { Order } from "../../entities/Order.entity";
import { MoodEvents } from "../../events/MoodEvents.const";
import type { INotificationService } from "../../interfaces/INotificationService.interface";
import type { IOrderRepo } from "../../interfaces/IOrderRepo.interface";
import { createTempId } from "../../utilities/createTempId.utility";

export class PlaceOrder {
  private _orderRepo: IOrderRepo;
  private _notificationService: INotificationService;

  constructor(
    orderRepo: IOrderRepo,
    notificationService: INotificationService,
  ) {
    this._orderRepo = orderRepo;
    this._notificationService = notificationService;
  }

  public async execute(orderData: CreateOrderDto): Promise<Order> {
    const newOrder = new Order(createTempId(), orderData.placedBy, orderData.orderItems)

    const persistedOrder = await this._orderRepo.placeOrder(newOrder);

    this._notificationService.publish(MoodEvents.ORDER.CREATED, {
      newOrder: persistedOrder,
      message: `Placed new order ${persistedOrder.id}`
    })

    return persistedOrder
  }
}
