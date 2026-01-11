import { CreateUserDto } from "../dtos/CreateUser.dto";
import { Actor } from "../types/Actor.type";
import { MoodCoreAction } from "../types/MoodCoreAction.type";
import { IUnitOfWork } from "./IUnitOfWork.interface";

export interface ContextRegistry {
  newUserCreateData?: CreateUserDto;
}

export type ContextRegistryKey = keyof ContextRegistry;

export interface IExecutionContext {
  readonly correlationId: string;
  readonly actor: Actor;
  readonly action: MoodCoreAction;
  readonly uow: IUnitOfWork;

  set<K extends ContextRegistryKey>(
    key: K,
    value: ContextRegistry[K],
  ): IExecutionContext;
  get<K extends ContextRegistryKey>(key: K): ContextRegistry[K];
  has<K extends ContextRegistryKey>(key: K): boolean;
}
