// import { useEffect } from "react";
// import { useAuth } from "../context/Auth/AuthContext";

// const MyOrdersPage = () => {
//   const { getMyOrders, orders, ordersLoading } = useAuth();

//   useEffect(() => {
//     getMyOrders();
//   }, []);

//   if (ordersLoading) {
//     return (
//       <div className="flex items-center justify-center h-[60vh]">
//         <p className="text-gray-500">Loading orders...</p>
//       </div>
//     );
//   }

//   if (!orders || orders.length === 0) {
//     return (
//       <div className="flex items-center justify-center h-[60vh]">
//         <p className="text-gray-500">No orders found</p>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8">
//       <h1 className="text-2xl font-semibold mb-6">My Orders</h1>

//       <div className="space-y-4">
//         {orders.map((order) => (
//           <div key={order._id} className="bg-white shadow-md rounded-xl p-5">
//             {/* TOP */}
//             <div className="flex justify-between mb-3">
//               <span className="text-sm text-gray-500">
//                 Order #: {order.orderNumber}
//               </span>

//               <span className="text-sm font-medium text-primary">
//                 {order.status}
//               </span>
//             </div>

//             {/* SHIPPING */}
//             <div className="text-sm text-gray-600 mb-3">
//               <p>
//                 {order.shipping.fullName} • {order.shipping.phone}
//               </p>
//               <p>
//                 {order.shipping.city} - {order.shipping.address}
//               </p>
//             </div>

//             {/* ITEMS */}
//             <div className="space-y-2">
//               {order.orderItems.map((item, index) => (
//                 <div
//                   key={index}
//                   className="flex justify-between text-sm border-t pt-2"
//                 >
//                   <span>
//                     {item.productTitle} × {item.quantity}
//                   </span>

//                   <span className="font-medium">
//                     ₺{(item.unitPrice * item.quantity).toLocaleString()}
//                   </span>
//                 </div>
//               ))}
//             </div>

//             {/* TOTAL */}
//             <div className="flex justify-between mt-4 border-t pt-3 font-semibold">
//               <span>Total</span>
//               <span className="text-primary">
//                 ₺{order.total.toLocaleString()}
//               </span>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MyOrdersPage;


import { useEffect } from "react";
import { useAuth } from "../context/Auth/AuthContext";
import Loading from "../components/ui/Loading";
import EmptyState from "../components/ui/EmptyState";
import OrderCard from "../components/orders/OrderCard";

const MyOrdersPage = () => {
  const { getMyOrders, orders, ordersLoading } = useAuth();

  useEffect(() => {
    getMyOrders();
  }, []);

  if (ordersLoading) return <Loading />;

  if (!orders || orders.length === 0) {
    return <EmptyState message="No orders found" />;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6">My Orders</h1>

      <div className="space-y-4">
        {orders.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default MyOrdersPage;