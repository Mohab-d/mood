import { IMoodNotificationService, MoodCoreEventType } from '@mood/core';
import EventEmitter from 'events';
import { ProviderToken } from './ProviderToken';
import { Module } from '@nestjs/common';

export class MoodNotificationService implements IMoodNotificationService {
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

const globalNotification = new MoodNotificationService();

@Module({
  providers: [
    {
      provide: ProviderToken.notificationService,
      useValue: globalNotification,
    },
  ],
})
export class MoodNotificationModule {}
