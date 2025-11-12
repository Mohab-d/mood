import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { LoginService } from './login.service';
import { UserRole } from '@mood/core/dist/types/UserRole.type';
import { ConfigService } from '@nestjs/config';
import { IAPISuccessResponse } from 'src/interfaces/IAPISuccessResponse.api';

@Controller('login')
export class LoginController {
  constructor(
    private readonly loginService: LoginService,
    private readonly configService: ConfigService,
  ) {}

  @Get()
  async loginWithPass(
    @Query('pass') passId: string,
  ): Promise<IAPISuccessResponse<{ token: string }>> {
    const token = await this.loginService.loginByPass(passId);

    return {
      success: true,
      message: 'Login token fetched',
      data: {
        token: token,
      },
      createdAt: new Date(),
    };
  }

  @Post('make-pass')
  async createPass(
    @Body() userData: { id: string; role: UserRole; name: string },
  ): Promise<IAPISuccessResponse<{ passLink: string }>> {
    const passId = await this.loginService.createPassLink(userData);
    const passLink =
      this.configService.get('baseUrl') + `/login?pass=${passId}`;

    return {
      success: true,
      message: 'New pass created',
      data: {
        passLink: passLink,
      },
      createdAt: new Date(),
    };
  }
}
