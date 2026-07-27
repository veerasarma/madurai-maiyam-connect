function normalizeApiBaseUrl(raw: string | undefined): string {
  const base = (raw || "http://localhost:4000/api/v1").replace(/\/+$/, "");
  if (base.endsWith("/api/v1")) return base;
  return `${base}/api/v1`;
}

const API_BASE = normalizeApiBaseUrl(import.meta.env.VITE_API_URL);

const ACCESS_KEY = "visil191_web_access";
const REFRESH_KEY = "visil191_web_refresh";
const USER_KEY = "visil191_web_user";

export interface ApiEnvelope<T> {
  success: boolean;
  data: T;
  error?: { message: string; code?: string };
}

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_KEY);
}

export function getRefreshToken(): string | null {
  return localStorage.getItem(REFRESH_KEY);
}

export function setAuthSession(payload: {
  accessToken: string;
  refreshToken: string;
  user: unknown;
}) {
  localStorage.setItem(ACCESS_KEY, payload.accessToken);
  localStorage.setItem(REFRESH_KEY, payload.refreshToken);
  localStorage.setItem(USER_KEY, JSON.stringify(payload.user));
}

export function clearAuthSession() {
  localStorage.removeItem(ACCESS_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getStoredUser<T>(): T | null {
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

async function refreshTokens(): Promise<boolean> {
  const refreshToken = getRefreshToken();
  if (!refreshToken) return false;
  try {
    const res = await fetch(`${API_BASE}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });
    if (!res.ok) return false;
    const body = (await res.json()) as ApiEnvelope<{
      accessToken: string;
      refreshToken: string;
    }>;
    if (!body.success || !body.data?.accessToken) return false;
    localStorage.setItem(ACCESS_KEY, body.data.accessToken);
    localStorage.setItem(REFRESH_KEY, body.data.refreshToken);
    return true;
  } catch {
    return false;
  }
}

export class ApiError extends Error {
  status: number;
  code?: string;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
  }
}

type RequestOptions = {
  method?: string;
  body?: unknown;
  auth?: boolean;
  retry?: boolean;
  headers?: Record<string, string>;
};

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const { method = "GET", body, auth = true, retry = true, headers = {} } = options;
  const reqHeaders: Record<string, string> = { ...headers };

  if (body !== undefined && !(body instanceof FormData)) {
    reqHeaders["Content-Type"] = "application/json";
  }

  if (auth) {
    const token = getAccessToken();
    if (token) reqHeaders.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: reqHeaders,
    body: body === undefined ? undefined : body instanceof FormData ? body : JSON.stringify(body),
  });

  if (res.status === 401 && auth && retry) {
    const refreshed = await refreshTokens();
    if (refreshed) {
      return apiRequest<T>(path, { ...options, retry: false });
    }
    clearAuthSession();
  }

  let payload: ApiEnvelope<T> | null = null;
  try {
    payload = (await res.json()) as ApiEnvelope<T>;
  } catch {
    payload = null;
  }

  if (!res.ok || !payload?.success) {
    throw new ApiError(
      payload?.error?.message || `Request failed (${res.status})`,
      res.status,
      payload?.error?.code,
    );
  }

  return payload.data;
}

export { API_BASE };
