import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiClock, FiEye, FiChevronRight } from "react-icons/fi";
import { BsStarFill, BsStarHalf, BsFire } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";

const StarRating = ({ rating }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;

  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) =>
        i < full ? (
          <BsStarFill key={i} className="text-amber-500 w-3 h-3" />
        ) : i === full && half ? (
          <BsStarHalf key={i} className="text-amber-500 w-3 h-3" />
        ) : (
          <BsStarFill key={i} className="text-gray-300 w-3 h-3" />
        )
      )}
    </div>
  );
};

// Toast Notification Component
const ToastNotification = ({ message, isVisible, onClose }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          className="fixed top-4 left-4 z-50 max-w-sm"
        >
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg shadow-lg p-4">
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                <FiShoppingCart className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{message}</p>
                <p className="text-xs opacity-90 mt-1">Product added to cart</p>
              </div>
              <button
                onClick={onClose}
                className="text-white hover:text-gray-200 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {/* Progress bar */}
            <motion.div
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 3, ease: "linear" }}
              className="h-1 bg-white/30 mt-2 origin-left"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default function TrendingProducts() {
  const [wishlist, setWishlist] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();
  
  const { addToCart } = useCart();

  const toggleWishlist = (id, e) => {
    e?.stopPropagation();
    setWishlist((p) =>
      p.includes(id) ? p.filter((x) => x !== id) : [...p, id]
    );
  };

  const goToDetails = (id) => {
    navigate(`/product/${id}`);
  };

  const handleAddToCart = (product, e) => {
    e?.stopPropagation();
    
    // Ensure the product has all required properties
 const cartProduct = {
  id: product.id,
  title: product.title,
  price: product.price,
  images: product.images,
  qty: 1,   // ✅ correct key
};

    
    addToCart(cartProduct);
    
    // Show toast notification
    setToastMessage(`${product.title} added to cart!`);
    setShowToast(true);
    
    // Auto-hide toast after 3 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const buyNow = (product, e) => {
    e?.stopPropagation();
    
    // Clear cart and add only this product for buy now
    const cartProduct = {
      id: product.id,
      title: product.title,
      price: product.price,
      images: product.images,
      quantity: 1,
      ...product
    };
    
    // Create a temporary cart with only this product
    const tempCart = [cartProduct];
    
    // Pass the product directly to checkout without adding to cart context
    // You'll need to handle this in your checkout page
    navigate("/checkout", { 
      state: { 
        buyNowItem: cartProduct,
        isBuyNow: true 
      } 
    });
  };

  return (
    <>
      {/* Toast Notification */}
      <ToastNotification
        message={toastMessage}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />

      <section className="relative py-10 bg-gradient-to-b from-white to-gray-50">
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-orange-500 to-pink-500"></div>
        
        <div className="max-w-6xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-orange-50 to-pink-50 rounded-full mb-2">
              <BsFire className="text-orange-500 w-3 h-3" />
              <span className="text-xs font-semibold text-orange-600 uppercase tracking-wider">
                Trending Now
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              Bestseller{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-500">
                Albums
              </span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map((product, index) => {
              const isWish = wishlist.includes(product.id);
              const isHovered = hoveredProduct === product.id;

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.07 }}
                  whileHover={{ y: -4 }}
                  onHoverStart={() => setHoveredProduct(product.id)}
                  onHoverEnd={() => setHoveredProduct(null)}
                  onClick={() => goToDetails(product.id)}
                  className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden relative border border-gray-100"
                >
                  {/* Product Image */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    
                    {/* Wishlist button */}
                    <button
                      onClick={(e) => toggleWishlist(product.id, e)}
                      className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all"
                    >
                      <FiHeart
                        className={`w-4 h-4 ${
                          isWish
                            ? "fill-red-500 text-red-500"
                            : "text-gray-600"
                        }`}
                      />
                    </button>
                    
                    {/* Discount badge */}
                    {product.discount && (
                      <div className="absolute top-3 left-3 px-2 py-1 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded">
                        -{product.discount}%
                      </div>
                    )}
                  </div>

                  <div className="p-4">
                    <h3 className="text-sm font-bold line-clamp-1 mb-1">{product.title}</h3>
                    <p className="text-xs text-gray-500 line-clamp-2 mb-2">
                      {product.description || "Premium quality album with exclusive content"}
                    </p>
                    
                    <div className="flex items-center gap-1.5 mb-3">
                      <StarRating rating={product.rating} />
                      <span className="text-xs font-bold ml-1">{product.rating}</span>
                      <span className="text-xs text-gray-400">|</span>
                      <span className="text-xs text-gray-500">154 sold</span>
                    </div>

                    <div className="flex items-baseline justify-between mb-4">
                      <div>
                        <span className="text-lg font-bold text-gray-900">{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-xs text-gray-400 line-through ml-2">
                            {product.originalPrice}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <FiClock className="w-3 h-3" />
                        <span>Fast delivery</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => handleAddToCart(product, e)}
                        className="flex-1 bg-gradient-to-r from-gray-800 to-gray-900 text-white py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-1.5 hover:from-gray-900 hover:to-gray-950 transition-all"
                      >
                        <FiShoppingCart className="w-3.5 h-3.5" />
                        Add to Cart
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => buyNow(product, e)}
                        className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white py-2 rounded-lg text-sm font-medium hover:from-orange-600 hover:to-pink-600 transition-all"
                      >
                        Buy Now
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* View all button */}
          <div className="text-center mt-10">
            <motion.button
              whileHover={{ x: 5 }}
              onClick={() => navigate("/products")}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-medium rounded-full hover:shadow-lg transition-all"
            >
              View All Products
              <FiChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </section>
    </>
  );
}