import { useEffect, useState } from "react";
import { getDashboardOverview } from "../../services/adminDashboardService";
import type { DashboardOverview } from "../../types/adminDashboard";
import { useAuth } from "../../../../context/Auth/AuthContext";
import StatsGrid from "../../components/dashboard/StatsGrid";
import RevenueChart from "../../components/dashboard/RevenueChart";
import RecentOrdersTable from "../../components/dashboard/RecentOrdersTable";
import TopProducts from "../../components/dashboard/TopProducts";
import OrderStatusChart from "../../components/dashboard/OrderStatusChart";
import Loading from "../../../../components/ui/Loading";

const DashboardPage = () => {
  const { username } = useAuth();
  const [data, setData] = useState<DashboardOverview | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOverview = async () => {
      try {
        const response = await getDashboardOverview();
        setData(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOverview();
  }, []);

  if (loading) return <Loading />;
  if (!data) return null;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold text-textPrimary">
          Good morning, {username ?? "Admin"}
        </h1>
        <p className="mt-1 text-sm text-textSecondary">
          Here's what's happening with your store today.
        </p>
      </div>

      <StatsGrid summary={data.summary} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RevenueChart data={data.monthlyRevenue} />
        </div>
        <div className="lg:col-span-1">
          <OrderStatusChart data={data.orderStatusBreakdown} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentOrdersTable orders={data.recentOrders} />
        </div>
        <div className="lg:col-span-1">
          <TopProducts products={data.topProducts} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
