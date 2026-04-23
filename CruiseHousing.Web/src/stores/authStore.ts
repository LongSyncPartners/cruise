import { create } from "zustand";

type AuthSession = {
  accessToken: string;
  expiresAt: string;
  userName: string;
  email: string;
};

type AuthState = {
  session: AuthSession | null;
  isAuthenticated: boolean;
  login: (session: AuthSession) => void;
  logout: () => void;
};

const storedSession = localStorage.getItem("auth_session");
const initialSession: AuthSession | null = storedSession
  ? JSON.parse(storedSession)
  : null;

export const useAuthStore = create<AuthState>((set) => ({
  session: initialSession,
  isAuthenticated: !!initialSession,

  login: (session) => {
    localStorage.setItem("auth_session", JSON.stringify(session));
    set({
      session,
      isAuthenticated: true,
    });
  },

  logout: () => {
    localStorage.removeItem("auth_session");
    set({
      session: null,
      isAuthenticated: false,
    });
  },
}));