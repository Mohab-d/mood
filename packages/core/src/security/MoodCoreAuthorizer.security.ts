import { MoodCoreEvents } from "../constants/MoodCoreEvents.const";
import { IAuthorizer } from "../interfaces/IAuthorizer.interface";
import { IExecutionContext } from "../interfaces/IExecutionContext.interface";
import { IMoodNotificationService } from "../interfaces/IMoodNotificationService.interface";

type RBACAtrr = {
  role: string;
};

export class MoodCoreAuthorizer implements IAuthorizer<RBACAtrr> {
  constructor(
    private rolesPermissions: Record<string, string[]>,
    private ns: IMoodNotificationService,
  ) {}

  async authorize(
    ctx: IExecutionContext<RBACAtrr>,
    action: string,
  ): Promise<void> {
    const actor = ctx.actor;

    const alreadyHavePermission =
      this.rolesPermissions[actor.attributes.role].includes(action);

    if (alreadyHavePermission) {
      return;
    }

    this.rolesPermissions[actor.attributes.role].push(action);

    this.ns.publish(MoodCoreEvents.AUTHZ.AUTHORIZE, {
      message: "Actor was authorized to perform an action",
      actor,
      action,
    });
  }

  async revoke(
    ctx: IExecutionContext<RBACAtrr>,
    action: string,
  ): Promise<void> {
    const actor = ctx.actor;

    const actorActions = this.rolesPermissions[actor.attributes.role];

    this.rolesPermissions[actor.attributes.role] = actorActions.filter(
      (actorAction) => actorAction !== action,
    );

    this.ns.publish(MoodCoreEvents.AUTHZ.REVOKE, {
      message: "Actor authorization for action is revoked",
      actor,
      action,
    });
  }

  async isAuthorized(
    ctx: IExecutionContext<RBACAtrr>,
    action: string,
  ): Promise<boolean> {
    const actor = ctx.actor;

    if (actor.type === "SYSTEM") {
      return true;
    }

    const canPerformAction =
      this.rolesPermissions[actor.attributes.role].includes(action);

    return canPerformAction;
  }
}
