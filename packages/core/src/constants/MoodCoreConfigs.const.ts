import { IAuthorizer } from "../interfaces/IAuthorizer.interface";
import { IContextProvider } from "../interfaces/IContextProvider.interface";
import { IMoodNotificationService } from "../interfaces/IMoodNotificationService.interface";

export interface MoodCoreConfigs {
  context_provider: IContextProvider;
  notification_service?: IMoodNotificationService;
  authorizer?: IAuthorizer;
  allow_negative_stock?: boolean;
}
