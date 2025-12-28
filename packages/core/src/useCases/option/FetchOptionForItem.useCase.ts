import { MoodCoreEvents } from "../../constants/MoodCoreEvents.const";
import { Option } from "../../entities/Option.entity";
import { IMoodNotificationService } from "../../interfaces/IMoodNotificationService.interface";
import { IUnitOfWork } from "../../interfaces/IUnitOfWork.interface";

export class FetchOptionForItem {
  private _uow: IUnitOfWork;
  private _notificationService: IMoodNotificationService;

  constructor(uow: IUnitOfWork, notificationService: IMoodNotificationService) {
    this._uow = uow;
    this._notificationService = notificationService;
  }

  public async execute(itemId: string): Promise<Option[]> {
    const options = await this._uow.optionRepo.fetchForItemId(itemId);

    this._notificationService.publish(MoodCoreEvents.OPTION.FETCH, {
      message: `Fetched options for item ${itemId}`,
      options,
    });

    return options;
  }
}
