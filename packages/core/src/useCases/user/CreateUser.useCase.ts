import { User } from "../../entities/User.entity";
import type { IHasher } from "../../interfaces/IHasher.interface";
import type { IMoodNotificationService } from "../../interfaces/IMoodNotificationService.interface";
import type { CreateUserDto } from "../../dtos/CreateUser.dto";
import { createTempId } from "../../utilities/createTempId.utility";
import { IUnitOfWork } from "../../interfaces/IUnitOfWork.interface";
import { MoodCoreEvents } from "../../constants/MoodCoreEvents.const";

export class CreateUser {
  private _uow: IUnitOfWork;
  private _hasher: IHasher;
  private _notificationService: IMoodNotificationService;

  constructor(
    uow: IUnitOfWork,
    hasher: IHasher,
    notificationService: IMoodNotificationService,
  ) {
    this._uow = uow;
    this._hasher = hasher;
    this._notificationService = notificationService;
  }

  public async execute(userData: CreateUserDto): Promise<User> {
    const hashedPassword = await this._hasher.hash(userData.password);

    // utility used
    const user: User = new User(
      createTempId(),
      userData.name,
      userData.role,
      userData.email,
      hashedPassword,
    );

    const userRepo = this._uow.userRepo;
    const persistedUser = await userRepo.saveNewUser(user);

    this._notificationService.publish(MoodCoreEvents.USER.CREATE, {
      newUser: persistedUser,
      message: `New user ${persistedUser.id} created`,
    });

    return persistedUser;
  }
}
