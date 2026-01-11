import { IExecutionContext } from "./IExecutionContext.interface";

export interface IAuthorizer {
  authorize(ctx: IExecutionContext, action: string): Promise<void>;
  revoke(ctx: IExecutionContext, action: string): Promise<void>;
  isAuthorized(cts: IExecutionContext, action: string): Promise<boolean>;
}
