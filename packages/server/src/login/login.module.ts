import { Module } from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [ConfigModule, SharedModule],
  providers: [LoginService],
  controllers: [LoginController],
})
export class LoginModule {}
