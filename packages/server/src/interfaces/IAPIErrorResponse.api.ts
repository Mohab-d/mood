export interface IAPIErrorResponse {
  success: boolean;
  errorCode: string;
  message: string;
  statusCode: number;
  details?: { field: string; error: string[] };
  createdAt: Date;
}
