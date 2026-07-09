import { useEffect, useState, type FC, type PropsWithChildren } from "react";
import { OrderContext } from "./OrderContext";

import api from "../../api/axios";
import { useAuth } from "../Auth/AuthContext";

import type { Order } from "../../types/order";

const OrderProvider: FC<PropsWithChildren> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  const { token } = useAuth();

  const getMyOrders = async () => {
    if (!token) return;

    setOrdersLoading(true);

    try {
      const { data } = await api.get("/user/my-orders");

      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);

      setOrders([]);
    } finally {
      setOrdersLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      setOrders([]);
      return;
    }

    getMyOrders();
  }, [token]);

  return (
    <OrderContext.Provider
      value={{
        orders,
        ordersLoading,
        getMyOrders,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
};

export default OrderProvider;
