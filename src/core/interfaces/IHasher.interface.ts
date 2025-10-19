export interface IHasher {
  hash(text: string, saltRounds?: number): Promise<string>;
  compare(text: string, hash: string): Promise<boolean>;
}
