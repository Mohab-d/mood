import { User } from "../../entities/User.entity";
import type { IHasher } from "../../interfaces/IHasher.interface";
import type { CreateUserDto } from "../../types/CreateUserDto.type";
import { createTempId } from "../../utilities/createTempId.utility";

export class createNewUser {
  private _userRepo: IUserRepo;
  private _hasher: IHasher;

  constructor(userRepo: IUserRepo, hasher: IHasher) {
    this._userRepo = userRepo;
    this._hasher = hasher;
  }

  public async execute(userData: CreateUserDto): Promise<User> {
    const hashedPassword = await this._hasher.hash(userData.password);

    const user: User = new User(
      createTempId(),
      userData.name,
      userData.role,
      userData.email,
      hashedPassword,
    );

    const persistedUser = await this._userRepo.saveNewUser(user);

    return persistedUser;
  }
}
