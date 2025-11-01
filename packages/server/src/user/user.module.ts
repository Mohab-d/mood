import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { HasherModule } from 'src/providers/hasher.provider';
import { MoodNotificationModule } from 'src/providers/notification.provider';
import { PgPoolModule } from 'src/providers/pgPool.provider';

@Module({
  imports: [HasherModule, MoodNotificationModule, PgPoolModule],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
