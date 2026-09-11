import api from "../../../api/axios";
import type { AdminNotifications } from "../types/adminNotification";

export const getAdminNotifications = () =>
  api.get<AdminNotifications>("/admin/notifications");
