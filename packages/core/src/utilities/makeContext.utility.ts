import { MoodExcecutionContext } from "../context/MoodExcecutionContext.contex";
import { IExecutionContext } from "../interfaces/IExecutionContext.interface";
import { IUnitOfWork } from "../interfaces/IUnitOfWork.interface";
import { Actor } from "../types/Actor.type";
import { MoodCoreAction } from "../types/MoodCoreAction.type";
import { createTempId } from "./createTempId.utility";

export function makeContext(
  actor: Actor,
  action: MoodCoreAction,
  uow?: IUnitOfWork,
): IExecutionContext {
  return new MoodExcecutionContext(createTempId(), actor, action, uow);
}
