import type { z } from "zod";

import type { ApiErrorSchema, PageQuerySchema } from "../schemas/common";

export type ApiError = z.infer<typeof ApiErrorSchema>;
export type PageQuery = z.infer<typeof PageQuerySchema>;

export interface PageResult<TItem> {
  items: TItem[];
  page: number;
  pageSize: number;
  total: number;
}

export interface ApiResult<TData> {
  success: true;
  data: TData;
  requestId: string;
}

export interface ApiFailureResult {
  success: false;
  error: ApiError;
  requestId: string;
}
