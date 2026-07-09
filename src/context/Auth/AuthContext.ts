import { useContext, createContext } from "react";
interface AuthContextType {
  username: string | null;
  token: string | null;
  role: "customer" | "admin" | null;
  isAuthenticated: boolean;

  login: (username: string, token: string, role: "customer" | "admin") => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  username: null,
  token: null,
  role: null,
  isAuthenticated: false,

  login: () => {},
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);
