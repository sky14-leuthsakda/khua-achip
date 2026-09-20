const PROD_API_URL = 'https://khua-achip-api.sukanya28988lsd.workers.dev';
const DEV_API_URL = 'http://localhost:8787';

export function getApiBaseUrl(): string {
  // 1. Check Vite env variables (VITE_API_URL or PUBLIC_API_URL)
  const envUrl =
    (import.meta as any).env?.VITE_API_URL ||
    (import.meta as any).env?.PUBLIC_API_URL;

  if (envUrl && typeof envUrl === 'string' && envUrl.trim() !== '') {
    return envUrl.trim().replace(/\/+$/, '');
  }

  // 2. Check if running in production mode or deployed domain
  if (import.meta.env.PROD) {
    return PROD_API_URL;
  }

  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
      return PROD_API_URL;
    }
  }

  return DEV_API_URL;
}

export async function apiFetch<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const baseUrl = getApiBaseUrl();
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${baseUrl}${cleanEndpoint}`;

  const headers = new Headers(options.headers || {});
  if (!headers.has('Content-Type') && options.body && typeof options.body === 'string') {
    headers.set('Content-Type', 'application/json');
  }

  try {
    const res = await fetch(url, {
      ...options,
      headers
    });

    const data = await res.json();
    if (!res.ok || data.success === false) {
      throw new Error(data.error || `API request failed with status ${res.status}`);
    }

    return data.data !== undefined ? data.data : data;
  } catch (err: any) {
    console.error(`[API Fetch Error] ${endpoint}:`, err);
    throw err;
  }
}
