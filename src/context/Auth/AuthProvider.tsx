import { useEffect, useState, type FC, type PropsWithChildren } from "react";
import { setLogoutHandler } from "../../utils/auth";
import { AuthContext } from "./AuthContext";

const USERNAME_KEY = "username";
const TOKEN_KEY = "token";

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [username, setUsername] = useState<string | null>(
    localStorage.getItem(USERNAME_KEY),
  );

  const [token, setToken] = useState<string | null>(
    localStorage.getItem(TOKEN_KEY),
  );
  const [role, setRole] = useState<"customer" | "admin" | null>(
    localStorage.getItem("role") as "customer" | "admin" | null,
  );

  const isAuthenticated = Boolean(token);

  const login = (
    username: string,
    token: string,
    role: "customer" | "admin",
  ) => {
    setUsername(username);
    setToken(token);
    setRole(role);

    localStorage.setItem(USERNAME_KEY, username);
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem("role", role);
  };

  const logout = () => {
    setUsername(null);
    setToken(null);
    setRole(null);
    localStorage.removeItem(USERNAME_KEY);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem("role");
  };
  useEffect(() => {
    setLogoutHandler(logout);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        username,
        token,
        role,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
