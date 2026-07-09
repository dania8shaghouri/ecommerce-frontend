import { createContext, useContext } from "react";
import type { Order } from "../../types/order";

interface OrderContextType {
  orders: Order[];
  ordersLoading: boolean;

  getMyOrders: () => Promise<void>;
}

export const OrderContext = createContext<OrderContextType>({
  orders: [],
  ordersLoading: false,

  getMyOrders: async () => {},
});

export const useOrder = () => useContext(OrderContext);
