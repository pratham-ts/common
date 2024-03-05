export interface Response {
  success: boolean;
  statusCode: number;
  message: string;
  data?: unknown;
  errorData?: {
    timestamp: string;
    route: string;
    method: string;
    name: string;
    detail: unknown;
  };
}
