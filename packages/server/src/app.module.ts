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
import configurations from './config/configurations';

@Module({
  imports: [
    UserModule,
    LoginModule,
    SharedModule,
    ConfigModule.forRoot({
      load: [configurations],
    }),
  ],
  controllers: [AppController, UserController, LoginController],
  providers: [AppService, UserService, LoginService],
})
export class AppModule {}
