import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";

import Layout from "./components/Layout";
import Home from "./pages/Home";
import TrendingProducts from "./pages/TrendingProducts";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import MyOrder from "./pages/MyOrder"; // ✅ ADD THIS

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Layout>
          <Routes>

            {/* HOME PAGE */}
            <Route path="/" element={<Home />} />

            {/* PRODUCTS PAGE */}
            <Route path="/products" element={<TrendingProducts />} />

            {/* PRODUCT DETAILS PAGE */}
            <Route path="/product/:id" element={<ProductDetailsPage />} />

            {/* CART PAGE */}
            <Route path="/cart" element={<CartPage />} />

            {/* CHECKOUT PAGE */}
            <Route path="/checkout" element={<CheckoutPage />} />

            {/* MY ORDERS PAGE */}
            <Route path="/myorders" element={<MyOrder />} />

          </Routes>
        </Layout>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
