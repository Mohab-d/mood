import { decode } from "jsonwebtoken";

export function getJwtPayload(token: string): any {
  return decode(token);
}
