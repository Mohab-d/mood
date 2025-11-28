import { Controller, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { type CreateOrderDto } from '@mood/core';
import { type IAPISuccessResponse } from 'src/interfaces/IAPISuccessResponse.api';
import { type INewOrder } from 'src/interfaces/INewOrder.api';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  public async createOrder(
    orderData: CreateOrderDto,
  ): Promise<IAPISuccessResponse<INewOrder>> {
    const newOrder = await this.orderService.saveOrder(orderData);

    return {
      success: true,
      message: 'New order placed',
      data: newOrder,
      createdAt: new Date(),
    };
  }
}
