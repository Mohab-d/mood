import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserModule } from './user/user.module';
import { LoginController } from './login/login.controller';
import { LoginService } from './login/login.service';
import { LoginModule } from './login/login.module';
import { SharedModule } from './shared/shared.module';
import { ConfigModule } from '@nestjs/config';
import { MoodFilterModule } from './filters/mood-filter.module';
import configurations from './config/configurations';
import { APP_FILTER } from '@nestjs/core';
import { MoodCoreFilter } from './filters/mood-core-filter/mood-core-filter.filter';
import { OrderModule } from './order/order.module';
import { ItemModule } from './item/item.module';

@Module({
  imports: [
    UserModule,
    LoginModule,
    SharedModule,
    ConfigModule.forRoot({
      load: [configurations],
    }),
    MoodFilterModule,
    OrderModule,
    ItemModule,
  ],
  controllers: [AppController, UserController, LoginController],
  providers: [
    AppService,
    UserService,
    LoginService,
    {
      provide: APP_FILTER,
      useClass: MoodCoreFilter,
    },
  ],
})
export class AppModule {}
