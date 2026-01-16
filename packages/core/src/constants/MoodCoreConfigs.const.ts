import { IAuthorizer } from "../interfaces/IAuthorizer.interface";
import { IContextProvider } from "../interfaces/IContextProvider.interface";
import { IHasher } from "../interfaces/IHasher.interface";
import { IMoodNotificationService } from "../interfaces/IMoodNotificationService.interface";

export interface MoodCoreConfigs {
  allow_negative_stock: boolean;
  context_provider: IContextProvider;
  notification_service?: IMoodNotificationService;
  authorizer?: IAuthorizer;
  hasher?: IHasher;
}
