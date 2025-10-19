import type { UserRole } from "./UserRole.type";

export type CreateUserDto = {
  name: string;
  role: UserRole;
  email: string;
  password: string;
};
