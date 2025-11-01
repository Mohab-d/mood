import { Module } from '@nestjs/common';
import { Pool } from 'pg';
import { serverConfig } from 'src/serverConfig.config';

const pgPool = new Pool({
  connectionString: serverConfig.pgConnectionString,
});

@Module({
  providers: [
    {
      provide: 'PG_POOL',
      useValue: pgPool,
    },
  ],
})
export class PgPoolModule {}
