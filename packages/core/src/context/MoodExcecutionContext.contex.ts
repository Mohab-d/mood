import { MoodCoreErrorCodes } from "../constants/MoodCoreErrorCodes.const";
import { MoodCoreError } from "../entities/MoodCoreError.entity";
import {
  ContextRegistry,
  ContextRegistryKey,
  IExecutionContext,
} from "../interfaces/IExecutionContext.interface";
import { IUnitOfWork } from "../interfaces/IUnitOfWork.interface";
import { Actor } from "../types/Actor.type";
import { MoodCoreAction } from "../types/MoodCoreAction.type";

export class MoodExcecutionContext implements IExecutionContext {
  private _ctxReg: Partial<ContextRegistry> = {};

  readonly correlationId: string;
  readonly actor: Actor;
  readonly action: MoodCoreAction;
  readonly uow: IUnitOfWork;
  readonly startTime: Date;

  constructor(
    correlationId: string,
    actor: Actor,
    action: MoodCoreAction,
    uow: IUnitOfWork,
  ) {
    this.correlationId = correlationId;
    this.actor = actor;
    this.action = action;
    this.uow = uow;
    this.startTime = new Date();
  }

  set<K extends ContextRegistryKey>(key: K, value: ContextRegistry[K]): this {
    const property = this._ctxReg[key];

    if (property !== undefined) {
      throw new MoodCoreError(MoodCoreErrorCodes.CONTEXT.VALUE_ALREADY_SET, {
        detailedMessage: `Property ${key} is already set and cannot be overriden`,
        key,
        currentValue: property,
        providedValue: value,
      });
    }
    this._ctxReg[key] = value;
    return this;
  }

  get<K extends ContextRegistryKey>(key: K): ContextRegistry[K] {
    const property = this._ctxReg[key];

    if (property === undefined) {
      throw new MoodCoreError(MoodCoreErrorCodes.CONTEXT.MISSING_DATA, {
        detailedMessage: `Property ${key} is undefined`,
      });
    }

    return this._ctxReg[key];
  }

  has<K extends ContextRegistryKey>(key: K): boolean {
    return this._ctxReg[key] !== undefined;
  }
}
