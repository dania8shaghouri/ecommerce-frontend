import api from "../../../api/axios";
import type { DashboardOverview } from "../types/adminDashboard";

export const getDashboardOverview = () =>
  api.get<DashboardOverview>("/admin/dashboard");
