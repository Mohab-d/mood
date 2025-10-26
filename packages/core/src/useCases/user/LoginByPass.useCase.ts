import { MoodEvents } from "../../events/MoodEvents.const";
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
      throw new Error(`Pass of id ${tokenId} is invalid`);
    }

    await this._uow.tokenRepo.delete(tokenId);

    this._notificationService.publish(MoodEvents.USER.LOGIN_BY_PASS, {
      usedToken: persistedToken,
      message: "One time pass is used",
    });

    return persistedToken.token;
  }
}
