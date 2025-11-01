import { Controller, Get, Query } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Get()
  async loginWithPass(@Query('pass') passId: string): Promise<any> {
    const token = await this.loginService.loginByPass(passId);

    return token;
  }
}
