import { Module } from '@nestjs/common';
import { PgUnitOfWorkService } from './pg-unit-of-work.service';
import { serverConfig } from 'src/serverConfig.config';
import { Pool } from 'pg';

const pgPool = new Pool({
  connectionString: serverConfig.pgConnectionString,
});

@Module({
  providers: [
    {
      provide: 'PG_POOL',
      useValue: pgPool,
    },
    PgUnitOfWorkService,
  ],
  exports: [PgUnitOfWorkService],
})
export class PgUnitOfWorkModule {}
