import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [SharedModule, ConfigModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
