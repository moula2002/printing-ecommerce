import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from "./context/CartContext";
import Navbar from './components/Navbar';
import Layout from './components/Layout';
import Home from './pages/Home';
import Contact from './pages/Contact';

import TrendingProducts from './pages/TrendingProducts';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import MyOrders from './pages/MyOrder';
import Services from './pages/Services';

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="App">
          <Navbar />
          <Layout>
            <Routes>
              {/* HOME PAGE */}
              <Route path="/" element={<Home />} />

              {/* CONTACT PAGE */}
              <Route path="/contact" element={<Contact />} />

               {/* SERVICES PAGE */}
              <Route path="/services" element={<Services/>} />

              {/* PRODUCTS PAGES */}
              <Route path="/products" element={<TrendingProducts />} />
              <Route path="/product/:id" element={<ProductDetailsPage />} />

              {/* CART & CHECKOUT */}
              <Route path="/cart" element={<CartPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />

              {/* ORDERS */}
              <Route path="/myorders" element={<MyOrders />} />
            </Routes>
          </Layout>
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;