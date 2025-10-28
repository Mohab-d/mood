import { IUnitOfWork } from '@mood/core';

export interface IUnitOfWorkCoordinator {
  runInTransaction<T>(work: (uow: IUnitOfWork) => Promise<T>): Promise<T>;
}
