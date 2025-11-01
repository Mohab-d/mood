import { MoodCoreEventType } from "../events/MoodCoreEvents.const";

export interface IMoodNotificationService {
  subscribe(event: MoodCoreEventType, listener: (...args: any[]) => void): void;
  publish(
    event: MoodCoreEventType,
    payload: { message: string; [key: string]: any },
  ): void;
}
