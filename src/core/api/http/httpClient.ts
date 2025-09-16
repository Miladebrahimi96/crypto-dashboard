import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, type AxiosError } from 'axios';
import { deeplySnakize, deeplyCamelize } from '@/core/utils';
import { isEmpty } from 'lodash';

class HttpClient {
  handler: AxiosInstance;

  constructor(baseUrl: string, headers: Record<string, string>, config: AxiosRequestConfig) {
    this.handler = axios.create({
      baseURL: baseUrl,
      timeout: config.timeout,
      transformRequest: [(data, headers) => {
        if (headers['Content-Type'] === 'application/json') {
          return JSON.stringify(deeplySnakize(data));
        }

        return data;
      }],
      transformResponse: [(data) => {
        if (isEmpty(data)) {
          return data;
        }

        try {
          return deeplyCamelize(JSON.parse(data));
        } catch (err) {
          return err;
        }
      }],
      headers: {
        ...headers,
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    this.handler.interceptors.request.use(
      (config) => {
        const token = this.getAuthToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }

        if (import.meta.env.DEV) {
          console.log('Request:', config.method?.toUpperCase(), config.url);
        }

        return config;
      },
      (error) => {
        console.error('Request interceptor error:', error);
        return Promise.reject(error);
      }
    );

    this.handler.interceptors.response.use(
      (response) => {
        if (import.meta.env.DEV) {
          console.log('Response:', response.status, response.config.url);
        }

        return response;
      },
      (error: AxiosError) => {
        if (error.response) {
          const { status, data } = error.response;
          if (import.meta.env.DEV) {
            console.error('Error response:', { status, data });
          }
        } else if (error.request) {
          console.error('Network error:', error.message);
        } else {
          console.error('Error:', error.message);
        }

        return Promise.reject(error);
      }
    );
  }

  private getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  public get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.handler.get<T>(url, config);
  }

  public post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.handler.post<T>(url, data, config);
  }

  public put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.handler.put<T>(url, data, config);
  }

  public patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.handler.patch<T>(url, data, config);
  }

  public delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.handler.delete<T>(url, config);
  }

  public toResponse<T = any>(response: AxiosResponse<T>): T {
    return response.data;
  }
}

export default HttpClient;