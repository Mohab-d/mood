import { User } from "../../entities/User.entity";
import { MoodCoreEvents } from "../../events/MoodCoreEvents.const";
import { IMoodNotificationService } from "../../interfaces/IMoodNotificationService.interface";
import { IUnitOfWork } from "../../interfaces/IUnitOfWork.interface";

export class FetchAllUsers {
  constructor(
    private uow: IUnitOfWork,
    private notificationService: IMoodNotificationService,
  ) {}

  public async execute(): Promise<User[]> {
    const allUsers = await this.uow.userRepo.fetchAllUsers();

    this.notificationService.publish(MoodCoreEvents.USER.FETCH_ALL, {
      message: "Fetched all users",
      users: allUsers,
    });

    return allUsers;
  }
}
