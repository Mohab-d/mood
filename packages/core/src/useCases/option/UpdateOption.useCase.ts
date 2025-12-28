import { MoodCoreEvents } from "../../constants/MoodCoreEvents.const";
import { Option } from "../../entities/Option.entity";
import { IMoodNotificationService } from "../../interfaces/IMoodNotificationService.interface";
import { IUnitOfWork } from "../../interfaces/IUnitOfWork.interface";
import { OptionData } from "../../types/OptionData.type";

export class UpdateOption {
  private _uow: IUnitOfWork;
  private _notificationService: IMoodNotificationService;

  constructor(uow: IUnitOfWork, notificationService: IMoodNotificationService) {
    this._uow = uow;
    this._notificationService = notificationService;
  }

  public async execute(optionData: OptionData): Promise<Option> {
    const oldOption = new Option(
      optionData.id,
      optionData.name,
      optionData.isStackable,
      optionData.isAvailable,
      optionData.availableQty,
    );

    const updatedOption = await this._uow.optionRepo.update(oldOption);

    this._notificationService.publish(MoodCoreEvents.OPTION.UPDATE, {
      message: "Updated option",
      currentOption: oldOption,
      updatedOption,
    });

    return updatedOption;
  }
}
