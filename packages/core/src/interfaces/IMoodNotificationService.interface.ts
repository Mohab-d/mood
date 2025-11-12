export interface IMoodNotificationService {
  subscribe(event: string, listener: (...args: any[]) => void): void;
  publish(
    event: string,
    payload: { message: string; [key: string]: any },
  ): void;
}
