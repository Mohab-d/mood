import { CreateOrderDto, Order, PlaceOrder } from '@mood/core';
import { Injectable } from '@nestjs/common';
import { NotificationService } from 'src/shared/notification/notification.service';
import { PgUnitOfWorkService } from 'src/shared/pg-unit-of-work/pg-unit-of-work.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly notificationService: NotificationService,
    private readonly uowCoordinatorService: PgUnitOfWorkService,
  ) {}

  public async saveOrder(orderData: CreateOrderDto): Promise<Order> {
    const persistedOrder = await this.uowCoordinatorService.runInTransaction(
      async (uow) => {
        const createOrderService = new PlaceOrder(
          uow,
          this.notificationService,
        );

        const newOrder = await createOrderService.execute(orderData);

        return newOrder;
      },
    );

    return persistedOrder;
  }
}
