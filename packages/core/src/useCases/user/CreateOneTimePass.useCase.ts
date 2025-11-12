import { MoodConfig } from "../../config/MoodConfig";
import { MoodCoreEvents } from "../../constants/MoodCoreEvents.const";
import type { IMoodNotificationService } from "../../interfaces/IMoodNotificationService.interface";
import { IUnitOfWork } from "../../interfaces/IUnitOfWork.interface";
import { generateJWT } from "../../utilities/generateJWT.utility";

export class CreateOneTimePass {
  private _uow: IUnitOfWork;
  private _notificationService: IMoodNotificationService;
  private _config: MoodConfig;

  constructor(uow: IUnitOfWork, notificationService: IMoodNotificationService) {
    this._uow = uow;
    this._notificationService = notificationService;
    this._config = MoodConfig.getInstance();
  }

  public async createThenGetPassId(payload: object): Promise<string> {
    // utility used
    const token = generateJWT(this._config.getProperty("secretKey"), payload);

    const tokenRepo = this._uow.tokenRepo;
    const persistedToken = await tokenRepo.save(token);

    this._notificationService.publish(MoodCoreEvents.USER.LOGIN_PASS_CREATED, {
      tokenData: persistedToken,
      message: `One time pass created, id ${persistedToken.id}`,
    });

    return persistedToken.id!;
  }
}
