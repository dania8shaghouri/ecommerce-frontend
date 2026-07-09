import { BrowserRouter, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ShopPage from "./pages/shop/ShopPage";

import AuthProvider from "./context/Auth/AuthProvider";
import CartProvider from "./context/cart/CartProvider";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

import CartPage from "./pages/CartPage";
import Checkout from "./pages/CheckoutPage";
import OrderSuccessPage from "./pages/OrderSuccessPage";
import OrderErrorPage from "./pages/OrderErrorPage";
import MyOrdersPage from "./pages/MyOrdersPage";

import ProtectedRoute from "./context/Auth/ProtectedRoute";
import CustomerLayout from "./layouts/CustomerLayout";
import AdminLayout from "./features/admin/layouts/AdminLayout";

import AdminProtectedRoute from "./features/admin/routes/AdminProtectedRoute";
import DashboardPage from "./features/admin/pages/admin/DashboardPage";
import WishlistProvider from "./context/Wishlist/WishlistProvider";
import OrderProvider from "./context/Order/OrderProvider";

function App() {
  return (
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>
          <OrderProvider>
            <BrowserRouter>
              <Routes>
                <Route element={<CustomerLayout />}>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/shop" element={<ShopPage />} />
                  <Route path="/product/:id" element={<ProductDetailPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/login" element={<LoginPage />} />

                  <Route element={<ProtectedRoute />}>
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route
                      path="/order-success"
                      element={<OrderSuccessPage />}
                    />
                    <Route path="/order-failed" element={<OrderErrorPage />} />
                    <Route path="/my-orders" element={<MyOrdersPage />} />
                  </Route>
                </Route>
                {/* admin layout */}
                <Route element={<AdminProtectedRoute />}>
                  <Route path="/admin" element={<AdminLayout />}>
                    <Route path="dashboard" element={<DashboardPage />} />
                  </Route>
                </Route>
              </Routes>
            </BrowserRouter>
          </OrderProvider>
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  );
}

export default App;
