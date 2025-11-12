import { sign } from "jsonwebtoken";

export function generateJWT(secretKey: string, payload: object): string {
  return sign(payload, secretKey);
}
