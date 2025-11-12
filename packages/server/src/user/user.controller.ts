import { User, type CreateUserDto } from '@mood/core';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { ConfigService } from '@nestjs/config';
import { IAPISuccessResponse } from 'src/interfaces/IAPISuccessResponse.api';
import { INewUser } from 'src/interfaces/INewUser.api';
import { IUserData } from 'src/interfaces/IUserData.api';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  async creatNewUser(
    @Body() userData: CreateUserDto,
  ): Promise<IAPISuccessResponse<INewUser>> {
    const { newUser, passId } =
      await this.userService.createNewUserAndPass(userData);

    return {
      success: true,
      message: 'New user created',
      data: {
        name: newUser.name,
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
        passLink: this.configService.get('baseUrl') + `/login?pass=${passId}`,
      },
      createdAt: new Date(),
    };
  }

  @Get()
  async getAllUsers(): Promise<IAPISuccessResponse<IUserData[]>> {
    const users = await this.userService.getAllUsers();
    const mapedUserData = users.map((user) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      };
    });

    return {
      success: true,
      message: 'Fetched all users',
      data: mapedUserData,
      createdAt: new Date(),
    };
  }
}
