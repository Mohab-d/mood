import type { UserRole } from "../types/UserRole.type";

export type CreateUserDto = {
  name: string;
  role: UserRole;
  email: string;
  password: string;
};
