import { MoodCoreErrorCodes } from "../../constants/MoodCoreErrorCodes.const";
import { MoodCoreEvents } from "../../constants/MoodCoreEvents.const";
import { MoodCoreError } from "../../entities/MoodCoreError.entity";
import type { IMoodNotificationService } from "../../interfaces/IMoodNotificationService.interface";
import { IUnitOfWork } from "../../interfaces/IUnitOfWork.interface";

export class LoginByPass {
  private _uow: IUnitOfWork;
  private _notificationService: IMoodNotificationService;

  constructor(uow: IUnitOfWork, notificationService: IMoodNotificationService) {
    this._uow = uow;
    this._notificationService = notificationService;
  }

  public async execute(tokenId: string): Promise<string> {
    const persistedToken = await this._uow.tokenRepo.fetch(tokenId);

    if (!persistedToken) {
      throw new MoodCoreError(MoodCoreErrorCodes.AUTHN.INVALID_TOKEN, {
        detailedMessage: "This token is invalid, maybe it does not exist",
        idOfNotFoundToken: tokenId,
      });
    }

    await this._uow.tokenRepo.delete(tokenId);

    this._notificationService.publish(MoodCoreEvents.USER.LOGIN_BY_PASS, {
      usedToken: persistedToken,
      message: "One time pass is used",
    });

    return persistedToken.token;
  }
}
