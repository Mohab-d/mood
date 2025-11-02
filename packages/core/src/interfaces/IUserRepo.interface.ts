import type { User } from "../entities/User.entity";

export interface IUserRepo {
  saveNewUser(newUser: User): Promise<User>;
  fetchAllUsers(): Promise<User[]>;
}
