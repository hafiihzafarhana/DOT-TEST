export interface ApiResponseInterface {
  code: number;
  status: string | number;
  message: string;
  data?: unknown;
  errors?: string | object;
  meta?: {
    page: number;
    per_page: number;
    page_size: number;
    total_data: number;
  };
}
