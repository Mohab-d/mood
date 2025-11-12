import { IMoodNotificationService, MoodCoreEventType } from '@mood/core';
import { Injectable } from '@nestjs/common';
import EventEmitter from 'events';

@Injectable()
export class NotificationService implements IMoodNotificationService {
  private _eventEmitter = new EventEmitter();

  subscribe(
    event: MoodCoreEventType,
    listener: (...args: any[]) => void,
  ): void {
    this._eventEmitter.on(event, listener);
  }
  publish(
    event: MoodCoreEventType,
    payload: { message: string; [key: string]: any },
  ): void {
    this._eventEmitter.emit(event, payload);
  }
}
