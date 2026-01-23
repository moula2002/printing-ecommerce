import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiShoppingCart,
  FiStar,
  FiHeart,
  FiClock,
  FiChevronLeft,
  FiChevronRight,
  FiCheck,
  FiZap
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";

// Toast Notification Component (same as TrendingProducts)
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

/* 🔹 DUMMY PRODUCTS WITH WORKING IMAGES */
const products = [
  {
    id: 1,
    title: "Custom Printed Boxes",
    category: "Packaging",
    image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=400",
    price: 1299, // ✅ NUMBER
    originalPrice: 1899,
    discount: "32% off",
    rating: 4.8,
    reviews: 156,
    timeLeft: "2 days",
    isNew: true,
    isBestSeller: true,
    features: ["Free Shipping", "Custom Design"]
  },
  {
    id: 2,
    title: "Brand Stickers & Labels",
    category: "Printing",
    image: "https://images.unsplash.com/photo-1616627988118-39b4f5c0d7e1?w=400",
    price: 499,
    originalPrice: 799,
    discount: "38% off",
    rating: 4.6,
    reviews: 98,
    timeLeft: "1 day",
    isNew: true,
    features: ["Waterproof", "Die-cut"]
  },
  {
    id: 3,
    title: "Printed Poly Bags",
    category: "Packaging",
    image: "https://images.unsplash.com/photo-1586864387967-d02ef85d93e8?w=400",
    price: 899,
    originalPrice: 1299,
    discount: "31% off",
    rating: 4.5,
    reviews: 87,
    timeLeft: "3 days",
    isBestSeller: true,
    features: ["Eco-friendly", "Reusable"]
  },
  {
    id: 4,
    title: "Premium Business Cards",
    category: "Printing",
    image: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=400",
    price: 299,
    originalPrice: 499,
    discount: "40% off",
    rating: 4.7,
    reviews: 189,
    timeLeft: "1 day",
    features: ["Spot UV", "Embossed"]
  },
  {
    id: 5,
    title: "Custom Packaging Tape",
    category: "Branding",
    image: "https://images.unsplash.com/photo-1598514983318-2f64f8f4796c?w=400",
    price: 349,
    originalPrice: 599,
    discount: "42% off",
    rating: 4.4,
    reviews: 76,
    timeLeft: "5 days",
    isNew: true,
    features: ["Branded", "Waterproof"]
  },
  {
    id: 6,
    title: "Brochure Printing",
    category: "Marketing",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400",
    price: 799,
    originalPrice: 1199,
    discount: "33% off",
    rating: 4.6,
    reviews: 112,
    timeLeft: "3 days",
    features: ["Glossy", "Foldable"]
  },
];


function LatestProducts() {
  const scrollContainerRef = useRef(null);
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState([]);
  const [hoveredProductId, setHoveredProductId] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  
  const { addToCart } = useCart();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (scrollContainerRef.current) {
      observer.observe(scrollContainerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const goToDetails = (id) => {
    navigate(`/product/${id}`);
  };

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -300, behavior: "smooth" });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 300, behavior: "smooth" });
  };

  const toggleWishlist = (id, e) => {
    e?.stopPropagation();
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(productId => productId !== id) : [...prev, id]
    );
  };

  const handleAddToCart = (product, e) => {
    e?.stopPropagation();
    
    // Ensure the product has all required properties
    const cartProduct = {
      id: product.id,
      title: product.title,
      price: product.price,
      images: [product.image], // Convert single image to array
      qty: 1,
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

    const buyNowProduct = {
      id: product.id,
      title: product.title,
      price: product.price,
      images: [product.image], // Convert single image to array
      qty: 1,
    };

    navigate("/checkout", {
      state: { buyNowItem: buyNowProduct }
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

      <section className="relative bg-gradient-to-b from-gray-50 to-white py-12 overflow-hidden">
        {/* Minimal background decoration */}
        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-100 rounded-full opacity-10 blur-xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-100 rounded-full opacity-10 blur-xl"></div>

        <div className="max-w-6xl mx-auto px-4 relative z-10">
          {/* COMPACT HEADER */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4 }}
            className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
          >
            <div>
              <div className="flex items-center gap-1 mb-1">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
                  Hot Products
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Trending</span>
              </h2>
              <p className="text-sm text-gray-600 mt-1 max-w-xl">
                Exclusive discounts on premium printed products
              </p>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden sm:flex items-center gap-1 text-xs text-gray-500">
                <FiZap className="text-orange-500" />
                <span>Daily updates</span>
              </div>
              <div className="flex gap-1">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={scrollLeft}
                  className="p-2 border border-gray-200 rounded-full bg-white shadow-sm hover:shadow hover:border-blue-200 transition-all duration-200"
                >
                  <FiChevronLeft className="w-4 h-4" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={scrollRight}
                  className="p-2 border border-gray-200 rounded-full bg-white shadow-sm hover:shadow hover:border-blue-200 transition-all duration-200"
                >
                  <FiChevronRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>

          {/* COMPACT PRODUCTS ROW */}
          <motion.div
            ref={scrollContainerRef}
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex gap-5 overflow-x-auto scrollbar-hide pb-6 px-1"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.map((product, index) => {
              const isWish = wishlist.includes(product.id);
              const isProductHovered = hoveredProductId === product.id;

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.3, delay: index * 0.07 }}
                  whileHover={{ y: -4 }}
                  onHoverStart={() => setHoveredProductId(product.id)}
                  onHoverEnd={() => setHoveredProductId(null)}
                  onClick={() => goToDetails(product.id)}
                  className="min-w-[260px] flex-shrink-0 bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group relative overflow-hidden border border-gray-100"
                >
                  {/* TOP BADGES */}
                  <div className="absolute top-3 left-3 z-10 flex gap-1">
                    {product.isNew && (
                      <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                        NEW
                      </span>
                    )}
                    {product.isBestSeller && (
                      <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-bold">
                        TOP
                      </span>
                    )}
                  </div>

                  {/* DISCOUNT BADGE */}
                  <div className="absolute top-3 right-3 z-10">
                    <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow">
                      {product.discount}
                    </span>
                  </div>

                  {/* IMAGE CONTAINER */}
                  <div className="relative h-48 overflow-hidden">
                    <motion.img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      animate={isProductHovered ? { scale: 1.05 } : { scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    
                    {/* WISHLIST BUTTON */}
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={(e) => toggleWishlist(product.id, e)}
                      className="absolute top-12 right-3 bg-white/80 p-2 rounded-full shadow-sm hover:shadow transition-all duration-200"
                    >
                      <FiHeart
                        className={`w-4 h-4 ${
                          isWish
                            ? "text-red-500 fill-red-500"
                            : "text-gray-600"
                        }`}
                      />
                    </motion.button>

                    {/* TIMER BADGE */}
                    <div className="absolute bottom-2 left-2 bg-black/70 text-white text-[10px] px-2 py-1 rounded flex items-center gap-1">
                      <FiClock className="w-2.5 h-2.5" />
                      {product.timeLeft}
                    </div>
                  </div>

                  {/* PRODUCT INFO */}
                  <div className="p-4">
                    {/* CATEGORY & TITLE */}
                    <span className="text-xs font-semibold text-blue-600">
                      {product.category}
                    </span>
                    <h3 className="text-sm font-bold text-gray-900 mt-1 line-clamp-2 h-10">
                      {product.title}
                    </h3>

                    {/* FEATURES */}
                    <div className="flex flex-wrap gap-1 my-2">
                      {product.features.slice(0, 2).map((feature, idx) => (
                        <span
                          key={idx}
                          className="flex items-center gap-0.5 text-[10px] text-gray-600 bg-gray-50 px-1.5 py-0.5 rounded"
                        >
                          <FiCheck className="w-2.5 h-2.5 text-green-500" />
                          {feature}
                        </span>
                      ))}
                    </div>

                    {/* RATING */}
                    <div className="flex items-center gap-1.5 mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <FiStar
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(product.rating)
                                ? "text-amber-500 fill-amber-500"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs font-bold text-gray-900">
                        {product.rating}
                      </span>
                      <span className="text-xs text-gray-500">
                        ({product.reviews})
                      </span>
                    </div>

                    {/* PRICE */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-bold text-gray-900">
                            {product.price}
                          </span>
                          <span className="text-sm text-gray-400 line-through">
                            {product.originalPrice}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* ACTION BUTTONS */}
                    <div className="flex gap-2">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={(e) => handleAddToCart(product, e)}
                        className="flex-1 bg-gradient-to-r from-gray-800 to-gray-900 text-white py-2 rounded-lg text-sm font-medium hover:shadow-sm transition-all duration-200 flex items-center justify-center gap-1.5"
                      >
                        <FiShoppingCart className="w-3.5 h-3.5" />
                        Add to Cart
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={(e) => buyNow(product, e)}
                        className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 text-white py-2 rounded-lg text-sm font-medium hover:shadow-sm transition-all duration-200"
                      >
                        Buy Now
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* VIEW ALL BUTTON */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="text-center mt-8"
          >
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/products')}
              className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg text-sm font-medium hover:shadow-md transition-all duration-200 group"
            >
              View All Products
              <FiChevronRight className="group-hover:translate-x-0.5 transition-transform" />
            </motion.button>
          </motion.div>
        </div>
      </section>
    </>
  );
}

export default LatestProducts;