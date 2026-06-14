interface RequestOptions {
  url: string;
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  data?: Record<string, unknown>;
}

const DEFAULT_API_BASE_URL = 'http://127.0.0.1:3000/api';
const envApiBaseUrl = (import.meta as any).env?.VITE_API_BASE_URL as string | undefined;
const API_BASE_URL = (envApiBaseUrl || DEFAULT_API_BASE_URL).replace(/\/$/, '');

export async function request<T>({ url, method = 'GET', data }: RequestOptions): Promise<T> {
  const result = await uni.request({
    url: `${API_BASE_URL}${url}`,
    method,
    data,
    timeout: 5000,
  });

  const [error, response] = result;
  if (error) {
    throw error;
  }

  const statusCode = response.statusCode ?? 500;
  if (statusCode < 200 || statusCode >= 300) {
    throw new Error(`Request failed with status ${statusCode}`);
  }

  return response.data as T;
}
