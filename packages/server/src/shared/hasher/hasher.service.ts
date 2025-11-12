import { IHasher } from '@mood/core';
import { Injectable } from '@nestjs/common';
import { hash, compare } from 'bcrypt';

@Injectable()
export class HasherService implements IHasher {
  public async hash(text: string, saltRounds: number = 10): Promise<string> {
    const hashed = await hash(text, saltRounds);
    return hashed;
  }

  public async compare(text: string, hash: string): Promise<boolean> {
    const isMatch = await compare(text, hash);
    return isMatch;
  }
}
