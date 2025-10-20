import { MoodConfig } from "../../config/MoodConfig";
import { MoodEvents } from "../../events/MoodEvents.const";
import type { INotificationService } from "../../interfaces/INotificationService.interface";
import type { ITokenRepo } from "../../interfaces/ITokenRepo.interface";
import { generateJWT } from "../../utilities/generateJWT.utility";

export class CreateOneTimePass {
  private _tokenRepo: ITokenRepo;
  private _notificationService: INotificationService;

  constructor(
    tokenRepo: ITokenRepo,
    notificationService: INotificationService,
  ) {
    this._tokenRepo = tokenRepo;
    this._notificationService = notificationService;
  }

  public async createThenGetPassId(payload: object): Promise<string> {
    // utility used
    const token = generateJWT(MoodConfig.secreteKey, payload);

    const persistedToken = await this._tokenRepo.save(token);

    this._notificationService.publish(MoodEvents.USER.LOGIN_PASS_CREATED, {
      tokenData: persistedToken,
      message: `One time pass created, id ${persistedToken.id}`,
    });

    return persistedToken.id!;
  }
}
