import { MoodCoreEvents } from "../../constants/MoodCoreEvents.const";
import { CreateOptionDto } from "../../dtos/CreateOption.dto";
import { Option } from "../../entities/Option.entity";
import { IMoodNotificationService } from "../../interfaces/IMoodNotificationService.interface";
import { IUnitOfWork } from "../../interfaces/IUnitOfWork.interface";
import { createTempId } from "../../utilities/createTempId.utility";

export class CreateOption {
  private _uow: IUnitOfWork;
  private _notificationService: IMoodNotificationService;

  constructor(uow: IUnitOfWork, notificationService: IMoodNotificationService) {
    this._uow = uow;
    this._notificationService = notificationService;
  }

  public async execute(optionData: CreateOptionDto): Promise<Option> {
    const newOption = new Option(
      createTempId(),
      optionData.name,
      optionData.isStackable,
      optionData.isAvailable,
      optionData.availableQty,
    );

    const persistedOption = await this._uow.optionRepo.save(newOption);

    this._notificationService.publish(MoodCoreEvents.OPTION.CREATE, {
      message: "New option created",
      newOption,
    });

    return persistedOption;
  }
}
