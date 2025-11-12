export interface IAPISuccessResponse<T> {
  success: boolean;
  message: string;
  data: T;
  createdAt: Date;
}
