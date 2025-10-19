import { MoodEvents } from "../../events/MoodEvents.const";
import type { INotificationService } from "../../interfaces/INotificationService.interface";
import type { ITokenRepo } from "../../interfaces/ITokenRepo.interface";

export class LoginByPass {
  private _tokenRepo: ITokenRepo;
  private _notificationService: INotificationService;

  constructor(
    tokenRepo: ITokenRepo,
    notificationService: INotificationService,
  ) {
    this._tokenRepo = tokenRepo;
    this._notificationService = notificationService;
  }

  public async execute(tokenId: string): Promise<string> {
    const persistedToken = await this._tokenRepo.get(tokenId);

    if (!persistedToken) {
      throw new Error(`Pass of id ${tokenId} is invalid`);
    }

    await this._tokenRepo.delete(tokenId);

    this._notificationService.publish(MoodEvents.USER.LOGIN_BY_PASS, {
      usedToken: persistedToken,
      message: "One time pass is used",
    });

    return persistedToken.token;
  }
}
