import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PgUnitOfWorkService } from './pg-unit-of-work/pg-unit-of-work.service';
import { PgUnitOfWorkModule } from './pg-unit-of-work/pg-unit-of-work.module';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';

@Module({
  imports: [PgUnitOfWorkModule],
  controllers: [AppController, UserController],
  providers: [AppService, PgUnitOfWorkService, UserService],
})
export class AppModule {}
