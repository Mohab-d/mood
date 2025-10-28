import { Module } from '@nestjs/common';
import { PgUnitOfWorkService } from './pg-unit-of-work.service';

@Module({
  providers: [PgUnitOfWorkService],
  exports: [PgUnitOfWorkService],
})
export class PgUnitOfWorkModule {}
