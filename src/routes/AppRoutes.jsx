import { Route, Routes } from "react-router-dom";
import CartPage from "../pages/Cart/CartPage";
import CheckoutPage from "../pages/Checkout/CheckoutPage";
import HomePage from "../pages/Home/HomePage";
import LoginPage from "../pages/Login/LoginPage";
import OrdersPage from "../pages/Orders/OrdersPage";
import ProductDetailsPage from "../pages/ProductDetails/ProductDetailsPage";
import ProductsPage from "../pages/Products/ProductsPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import RegisterPage from "../pages/Register/RegisterPage";
import WishlistPage from "../pages/Wishlist/WishlistPage";
import MainLayout from "../layouts/MainLayout";
import { NotFound, PageExpired } from "../components/ui";

function AppRoutes() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route element={<HomePage />} path="/" />
        <Route element={<ProductsPage />} path="/products" />
        <Route element={<ProductDetailsPage />} path="/products/:id" />
        <Route element={<CartPage />} path="/cart" />
        <Route element={<WishlistPage />} path="/wishlist" />
        <Route element={<CheckoutPage />} path="/checkout" />
        <Route element={<LoginPage />} path="/login" />
        <Route element={<RegisterPage />} path="/register" />
        <Route element={<OrdersPage />} path="/orders" />
        <Route element={<ProfilePage />} path="/profile" />
        <Route element={<PageExpired />} path="/page-expired" />
        <Route element={<NotFound />} path="*" />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
