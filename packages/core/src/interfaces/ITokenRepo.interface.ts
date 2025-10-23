import type { TokenDto } from "../dtos/Token.dto";

export interface ITokenRepo {
  save(token: string): Promise<TokenDto>;
  fetch(tokenId: string): Promise<TokenDto>;
  delete(tokenId: string): Promise<void>;
}
