import api from "../api/axios";

export const getOrderStatus = (orderId: string) =>
  api.get(`/payment/order-status/${orderId}`);
