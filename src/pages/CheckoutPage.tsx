// import { useCart } from "../context/Auth/cart/CartContext";
// import { BASE_URL } from "../constants/baseUrl";
// import { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/Auth/AuthContext";

// const CheckoutPage = () => {
//   const navigate = useNavigate();
//   const { cartItems, totalAmount, clearCart } = useCart();
//   const [form, setForm] = useState({
//     fullName: "",
//     phone: "",
//     city: "",
//     address: "",
//   });
//   const { token } = useAuth();
//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
//   ) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleCheckout = async () => {
//     if (!form.fullName || !form.phone || !form.city || !form.address) {
//       alert("Lütfen tüm adres bilgilerini doldurun");
//       return;
//     }

//     try {
//       await axios.post(
//         `${BASE_URL}/cart/checkout`,
//         {
//           shipping: {
//             fullName: form.fullName,
//             phone: form.phone,
//             city: form.city,
//             address: form.address,
//           },
//         },
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         },
//       );

//       // ✅ başarılıysa yönlendir
//       clearCart();
//       navigate("/order-success");
//     } catch (error) {
//       console.error(error);
//       alert("Sipariş oluşturulamadı");
//     }
//   };

//   if (cartItems.length === 0) {
//     return (
//       <div className="flex items-center justify-center h-[70vh]">
//         <h2 className="text-2xl text-gray-500">Sepetin boş 🛒</h2>
//       </div>
//     );
//   }

//   const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

//   return (
//     <div className="max-w-5xl mx-auto px-4 py-8">
//       <h1 className="text-2xl font-semibold mb-6">Checkout</h1>

//       {/* PRODUCTS */}
//       <div className="bg-white shadow-md rounded-xl overflow-hidden">
//         {/* HEADER */}
//         <div className="grid grid-cols-5 gap-4 p-4 border-b text-sm font-semibold text-gray-500">
//           <span className="col-span-2">Product</span>
//           <span>Price</span>
//           <span>Qty</span>
//           <span className="text-right">Total</span>
//         </div>

//         {/* ITEMS */}
//         {cartItems.map((item) => (
//           <div
//             key={item.productId}
//             className="grid grid-cols-5 gap-4 p-4 items-center border-b last:border-none"
//           >
//             <div className="col-span-2 flex items-center gap-4">
//               <img
//                 src={`${BASE_URL}/images/${item.productImage}`}
//                 alt={item.title}
//                 className="w-16 h-16 object-contain"
//               />
//               <span className="font-medium">{item.title}</span>
//             </div>

//             <span className="text-gray-600">
//               ₺{item.unitPrice.toLocaleString()}
//             </span>

//             <span className="font-medium">{item.quantity}</span>

//             <span className="text-right font-semibold text-primary">
//               ₺{(item.unitPrice * item.quantity).toLocaleString()}
//             </span>
//           </div>
//         ))}
//       </div>
//       {/* SHIPPING INFO */}
//       <div className="mb-6 bg-white shadow-md rounded-xl p-5">
//         <h2 className="text-lg font-semibold mb-4">Shipping Information</h2>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <input
//             type="text"
//             name="fullName"
//             placeholder="Full Name"
//             value={form.fullName}
//             onChange={handleChange}
//             className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
//           />

//           <input
//             type="text"
//             name="phone"
//             placeholder="Phone Number"
//             value={form.phone}
//             onChange={handleChange}
//             className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary"
//           />

//           <input
//             type="text"
//             name="city"
//             placeholder="City"
//             value={form.city}
//             onChange={handleChange}
//             className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary md:col-span-2"
//           />

//           <textarea
//             name="address"
//             placeholder="Full Address"
//             value={form.address}
//             onChange={handleChange}
//             className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-primary md:col-span-2"
//           />
//         </div>
//       </div>

//       {/* SUMMARY + PAYMENT */}
//       <div className="mt-6 bg-white shadow-md rounded-xl p-5">
//         <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

//         <div className="flex justify-between mb-2 text-gray-600">
//           <span>Total Items</span>
//           <span>{totalItems}</span>
//         </div>

//         <div className="flex justify-between mb-4 text-xl font-bold text-primary">
//           <span>Total</span>
//           <span>₺{totalAmount.toLocaleString()}</span>
//         </div>

//         <button
//           onClick={handleCheckout}
//           className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primaryHover transition font-semibold"
//         >
//           Pay Now
//         </button>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;
import { useCart } from "../context/Auth/cart/CartContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContext";
import toast from "react-hot-toast";
import { checkoutRequest } from "../services/cartService";
import Loading from "../components/ui/Loading";
import CheckoutItems from "../components/checkout/CheckoutItems";
import ShippingForm from "../components/checkout/ShippingForm";
import type { CheckoutFormData } from "../validation/checkoutSchema";

const CheckoutPage = () => {
  const { cartItems, totalAmount, clearCart } = useCart();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

const handleCheckout = async (data: CheckoutFormData) => {
  setLoading(true);

  try {
    await checkoutRequest(token!, {
      shipping: data,
    });

    await clearCart();

    toast.success("Order placed successfully");
    navigate("/order-success");
  } catch {
    toast.error("Checkout failed");
  } finally {
    setLoading(false);
  }
};

  if (loading) return <Loading />;
  if (cartItems.length === 0) return <div>Cart is empty</div>;

  const totalItems = cartItems.reduce((acc, i) => acc + i.quantity, 0);
  console.log(totalAmount, totalItems);
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl mb-6">Checkout</h1>

      <CheckoutItems items={cartItems} />

      <ShippingForm onSubmit={handleCheckout} />
    </div>
  );
};

export default CheckoutPage;
