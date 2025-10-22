import type { IMoodNotificationService } from "../../interfaces/IMoodNotificationService.interface";
import { EventEmitter } from "node:events";
import { type MoodEventType } from "../../events/MoodEvents.const";

export class MoodNotification implements IMoodNotificationService {
  private _eventEmitter = new EventEmitter();

  subscribe(event: MoodEventType, listener: (...args: any[]) => void): void {
    this._eventEmitter.on(event, listener);
  }
  publish(
    event: MoodEventType,
    payload: { message: string; [key: string]: any },
  ): void {
    this._eventEmitter.emit(event, payload);
  }
}
