import { MoodExcecutionContext } from "../context/MoodExcecutionContext.contex";

export interface IContextProvider {
  getContext(): MoodExcecutionContext;
}
