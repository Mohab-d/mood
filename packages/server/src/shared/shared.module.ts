import { Logger, Module } from '@nestjs/common';
import { HasherService } from './hasher/hasher.service';
import { NotificationService } from './notification/notification.service';
import { ConfigModule } from '@nestjs/config';
import { PgUnitOfWorkService } from './pg-unit-of-work/pg-unit-of-work.service';
import { MoodCoreEvents } from '@mood/core/dist/constants/MoodCoreEvents.const';

@Module({
  imports: [ConfigModule],
  providers: [
    HasherService,
    PgUnitOfWorkService,
    {
      provide: NotificationService,
      useFactory: () => {
        const logger = Logger;
        const ns = new NotificationService();

        ns.subscribe(MoodCoreEvents.ORDER.CREATED, (payload) => {
          logger.log(payload.message);
        });

        return ns;
      },
    },
  ],
  exports: [HasherService, NotificationService, PgUnitOfWorkService],
})
export class SharedModule {}
