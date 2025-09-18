import HttpClient from './http/httpClient';

export const client = new HttpClient(
  import.meta.env.VITE_API_URL,
  {
    'accept': 'application/json',
    // 'x-cg-demo-api-key': import.meta.env.VITE_API_KEY as string
  },
  {}
);