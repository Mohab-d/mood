export interface INotificationService {
  subscribe(event: string, listener: (...args: any[]) => void): void;
  publish(
    event: string,
    payload: { message: string; [key: string]: any },
  ): void;
}
