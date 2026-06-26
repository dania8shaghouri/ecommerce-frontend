import StatsGrid from "../../components/dashboard/StatsGrid.js";
import RevenueChart from "../../components/dashboard/RevenueChart.js";
import RecentOrdersTable from "../../components/dashboard/RecentOrdersTable.js";
import TopProducts from "../../components/dashboard/TopProducts.js";
import OrderStatusChart from "../../components/dashboard/OrderStatusChart.js";

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <StatsGrid />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">{<RevenueChart />}</div>

        <div className="lg:col-span-1">
          <OrderStatusChart />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentOrdersTable />
        </div>

        <div className="lg:col-span-1">
          <TopProducts />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
