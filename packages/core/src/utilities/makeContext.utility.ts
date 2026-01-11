import { MoodExcecutionContext } from "../context/MoodExcecutionContext.contex";
import { IExecutionContext } from "../interfaces/IExecutionContext.interface";
import { createTempId } from "./createTempId.utility";

export function makeContext(actor: Actor): IExecutionContext {
  return new MoodExcecutionContext(createTempId(), actor, action, uow);
}
