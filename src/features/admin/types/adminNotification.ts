export interface NewOrderNotification {
  _id: string;
  orderNumber: string;
  customerName: string;
  createdAt: string;
}

export interface LowStockNotification {
  _id: string;
  title: string;
  stock: number;
}

export interface AdminNotifications {
  newOrders: NewOrderNotification[];
  lowStockProducts: LowStockNotification[];
  totalCount: number;
}
