import * as React from "react";

type User = { email: string; phone?: string; name?: string; country?: string; currency?: string; twoFA?: boolean; payment?: { method: string; details: string }; terms?: string };
type Ctx = { user: User | null; signup: (email: string, password: string) => void; setUser: (u: User | null) => void; update: (patch: Partial<User>) => void; isLoggedIn: boolean };

const AuthCtx = React.createContext<Ctx | null>(null);
const KEY = "chx_user_v1";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = React.useState<User | null>(() => {
    try { const raw = localStorage.getItem(KEY); return raw ? JSON.parse(raw) : null; } catch { return null; }
  });
  const setUser = React.useCallback((u: User | null) => {
    setUserState(u);
    try { u ? localStorage.setItem(KEY, JSON.stringify(u)) : localStorage.removeItem(KEY); } catch {}
  }, []);
  const signup = React.useCallback((email: string, _password: string) => {
    setUser({ email });
  }, [setUser]);
  const update = React.useCallback((patch: Partial<User>) => {
    setUserState((prev) => {
      const next = { ...(prev || { email: "" }), ...patch };
      try { localStorage.setItem(KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  }, []);
  return <AuthCtx.Provider value={{ user, signup, setUser, update, isLoggedIn: !!user }}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = React.useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
