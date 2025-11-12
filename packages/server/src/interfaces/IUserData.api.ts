import { UserRole } from '@mood/core/dist/types/UserRole.type';

export interface IUserData {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}
