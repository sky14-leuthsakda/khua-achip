const DEFAULT_API_URL = 'http://localhost:8787';

export function getApiBaseUrl(): string {
  if (typeof window !== 'undefined') {
    // Check vite env var or global window override
    const envUrl = (import.meta as any).env?.VITE_API_URL || (import.meta as any).env?.PUBLIC_API_URL;
    if (envUrl) return envUrl;
  }
  return DEFAULT_API_URL;
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
