import type { TokenDto } from "../dtos/Token.dto";

export interface ITokenRepo {
  save(token: string): Promise<TokenDto>;
  fetch(tokenId: string): Promise<TokenDto>;
  markAsUsed(tokenId: string): Promise<void>;
}
