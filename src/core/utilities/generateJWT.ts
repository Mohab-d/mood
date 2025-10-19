import { sign } from "jsonwebtoken";

export function generateJWT(secreteKey: string, payload: object): string {
  return sign(payload, secreteKey);
}
