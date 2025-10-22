import { type MoodEventType } from "../events/MoodEvents.const";

export interface IMoodNotificationService {
  subscribe(event: MoodEventType, listener: (...args: any[]) => void): void;
  publish(
    event: MoodEventType,
    payload: { message: string; [key: string]: any },
  ): void;
}
