import type { UserRole } from "../types/UserRole.type";

export class User {
  public id: string;
  public name: string;
  public role: UserRole;
  public email: string;
  public password?: string;

  constructor(
    id: string,
    name: string,
    role: UserRole,
    email: string,
    password?: string,
  ) {
    this.id = id;
    this.name = name;
    this.role = role;
    this.email = email;
    this.password = password;
  }
}
