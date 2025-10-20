import type { IHasher } from "../interfaces/IHasher.interface";
import { hash, compare } from "bcrypt";

export function makeBcryptHasher(): IHasher {
  async function hashFunc(
    text: string,
    saltRounds: number = 10,
  ): Promise<string> {
    const hashed = await hash(text, saltRounds);
    return hashed;
  }

  async function compareFunc(text: string, hash: string): Promise<boolean> {
    const isMatch = await compare(text, hash);
    return isMatch;
  }

  return {
    hash: hashFunc,
    compare: compareFunc,
  };
}
