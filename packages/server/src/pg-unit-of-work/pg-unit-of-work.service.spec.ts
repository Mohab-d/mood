import { Test, TestingModule } from '@nestjs/testing';
import { PgUnitOfWorkService } from './pg-unit-of-work.service';

describe('PgUnitOfWorkService', () => {
  let service: PgUnitOfWorkService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PgUnitOfWorkService],
    }).compile();

    service = module.get<PgUnitOfWorkService>(PgUnitOfWorkService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
