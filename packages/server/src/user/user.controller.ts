import { type CreateUserDto } from '@mood/core';
import { Body, Controller, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { serverConfig } from 'src/serverConfig.config';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async creatNew(@Body() userData: CreateUserDto): Promise<any> {
    const newUser = await this.userService.creatNew(userData);
    const passId = await this.userService.createPass({
      id: newUser.id,
      role: newUser.role,
      name: newUser.name,
    });

    return {
      user: {
        name: newUser.name,
        id: newUser.id,
        email: newUser.email,
        role: newUser.role,
      },

      passLink: serverConfig.baseUrl + `/login?pass=${passId}`,
    };
  }
}
