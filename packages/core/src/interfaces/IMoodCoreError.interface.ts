export interface IMoodCoreError<T> {
  readonly code: string;
  readonly message: string;
  readonly context?: T;
  readonly createdAt: Date;
}
