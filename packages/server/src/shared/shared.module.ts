import { Module } from '@nestjs/common';
import { HasherService } from './hasher/hasher.service';
import { NotificationService } from './notification/notification.service';
import { ConfigModule } from '@nestjs/config';
import { PgUnitOfWorkService } from './pg-unit-of-work/pg-unit-of-work.service';

@Module({
  imports: [ConfigModule],
  providers: [HasherService, NotificationService, PgUnitOfWorkService],
  exports: [HasherService, NotificationService, PgUnitOfWorkService],
})
export class SharedModule {}
