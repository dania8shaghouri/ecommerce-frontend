import { useState, type FC, type PropsWithChildren } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { BASE_URL } from "../../constants/baseUrl";
import type { Order } from "../../types/order";

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

  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

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

  const getMyOrders = async () => {
    if (!token) return;

    setOrdersLoading(true);

    try {
      const { data } = await axios.get(`${BASE_URL}/user/my-orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
      setOrders([]);
    } finally {
      setOrdersLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        username,
        token,
        role,
        isAuthenticated,
        login,
        logout,
        orders,
        ordersLoading,
        getMyOrders,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
