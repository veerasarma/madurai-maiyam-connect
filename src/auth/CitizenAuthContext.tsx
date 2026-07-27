import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { citizenApi } from "@/api/citizen";
import {
  clearAuthSession,
  getAccessToken,
  getStoredUser,
  setAuthSession,
} from "@/api/client";
import type { AuthPayload, AuthUser } from "@/api/types";

interface CitizenAuthContextValue {
  user: AuthUser | null;
  isAuthenticated: boolean;
  sendOtp: (phone: string) => Promise<{ devOtp?: string }>;
  verifyOtp: (phone: string, otp: string) => Promise<void>;
  /** Sign in with mobile number */
  phoneAccess: (phone: string, name?: string) => Promise<void>;
  logout: () => void;
}

const CitizenAuthContext = createContext<CitizenAuthContextValue | null>(null);

function normalizeUser(raw: AuthPayload["user"]): AuthUser {
  return {
    id: String(raw.id),
    phone: String(raw.phone),
    role: String(raw.role),
    profile: {
      name: raw.profile?.name || "",
      nameTa: raw.profile?.nameTa,
    },
  };
}

function persistPayload(payload: AuthPayload) {
  const normalized = normalizeUser(payload.user);
  setAuthSession({
    accessToken: payload.accessToken,
    refreshToken: payload.refreshToken,
    user: normalized,
  });
  return normalized;
}

export function CitizenAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    if (!getAccessToken()) return null;
    return getStoredUser<AuthUser>();
  });

  const sendOtp = useCallback(async (phone: string) => {
    const result = await citizenApi.sendOtp(phone);
    return { devOtp: result.devOtp };
  }, []);

  const verifyOtp = useCallback(async (phone: string, otp: string) => {
    const payload = await citizenApi.verifyOtp(phone, otp);
    setUser(persistPayload(payload));
  }, []);

  const phoneAccess = useCallback(async (phone: string, name?: string) => {
    const payload = await citizenApi.phoneAccess(phone, name);
    setUser(persistPayload(payload));
  }, []);

  const logout = useCallback(() => {
    clearAuthSession();
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user && getAccessToken()),
      sendOtp,
      verifyOtp,
      phoneAccess,
      logout,
    }),
    [user, sendOtp, verifyOtp, phoneAccess, logout],
  );

  return (
    <CitizenAuthContext.Provider value={value}>{children}</CitizenAuthContext.Provider>
  );
}

export function useCitizenAuth() {
  const ctx = useContext(CitizenAuthContext);
  if (!ctx) throw new Error("useCitizenAuth must be used within CitizenAuthProvider");
  return ctx;
}
