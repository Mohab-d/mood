import { Module } from '@nestjs/common';
import { PgUnitOfWorkService } from 'src/pg-unit-of-work/pg-unit-of-work.service';
import { LoginService } from './login.service';
import { LoginController } from './login.controller';

@Module({
  imports: [PgUnitOfWorkService],
  providers: [LoginService],
  controllers: [LoginController],
})
export class LoginModule {}
