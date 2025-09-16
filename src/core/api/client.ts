import HttpClient from './http/httpClient';

export const client = new HttpClient(import.meta.env.VITE_API_URL, {}, {});