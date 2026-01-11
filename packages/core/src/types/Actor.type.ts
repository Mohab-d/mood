import { UserRole } from "./UserRole.type";

type SystemActor = {
  id: string;
  type: "SYSTEM";
};

type UserActor = {
  id: string;
  type: "USER";
  role: UserRole;
};

export type Actor = SystemActor | UserActor;
