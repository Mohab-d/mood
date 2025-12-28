import { MoodConfig } from "../../config/MoodConfig";
import { MoodCoreConfigs } from "../../constants/MoodCoreConfigs.const";
import { IMoodNotificationService } from "../../interfaces/IMoodNotificationService.interface";
import { IUnitOfWork } from "../../interfaces/IUnitOfWork.interface";
import { generateJWT } from "../../utilities/generateJWT.utility";

export class CreateGuestPass {
  private _uow: IUnitOfWork;
  private _notificationService: IMoodNotificationService;
  private _config: MoodConfig;

  constructor(uow: IUnitOfWork, notificationService: IMoodNotificationService) {
    this._uow = uow;
    this._notificationService = notificationService;
    this._config = MoodConfig.getInstance();
  }

  public async execute(): Promise<string> {
    const token = generateJWT(
      this._config.getProperty(MoodCoreConfigs.SECRETE_KEY),
      {
        role: "guest",
      },
    );

    return token;
  }
}
