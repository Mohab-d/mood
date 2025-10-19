import { User } from "../../entities/User.entity";
import { MoodEvents } from "../../events/MoodEvents.const";
import type { IHasher } from "../../interfaces/IHasher.interface";
import type { INotificationService } from "../../interfaces/INotificationService.interface";
import type { IUserRepo } from "../../interfaces/IUserRepo.interface";
import type { CreateUserDto } from "../../dtos/CreateUser.dto";
import { createTempId } from "../../utilities/createTempId.utility";

export class CreateUser {
  private _userRepo: IUserRepo;
  private _hasher: IHasher;
  private _notificationService: INotificationService;

  constructor(
    userRepo: IUserRepo,
    hasher: IHasher,
    notificationService: INotificationService,
  ) {
    this._userRepo = userRepo;
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

    const persistedUser = await this._userRepo.saveNewUser(user);

    this._notificationService.publish(MoodEvents.USER.CREATED, {
      newUser: persistedUser,
      message: `New user ${persistedUser.id} created`,
    });

    return persistedUser;
  }
}
