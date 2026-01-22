import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiHeart, FiShoppingCart, FiClock, FiEye, FiChevronRight } from "react-icons/fi";
import { BsStarFill, BsStarHalf, BsFire } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "../data/products";

const StarRating = ({ rating }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;

  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) =>
        i < full ? (
          <BsStarFill 
            key={i} 
            className="text-amber-500 w-3 h-3" 
          />
        ) : i === full && half ? (
          <BsStarHalf 
            key={i} 
            className="text-amber-500 w-3 h-3" 
          />
        ) : (
          <BsStarFill 
            key={i} 
            className="text-gray-300 w-3 h-3" 
          />
        )
      )}
    </div>
  );
};

export default function TrendingProducts() {
  const [wishlist, setWishlist] = useState([]);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const navigate = useNavigate();

  const toggleWishlist = (id, e) => {
    e?.stopPropagation();
    setWishlist((p) =>
      p.includes(id) ? p.filter((x) => x !== id) : [...p, id]
    );
  };

  const goToDetails = (id) => {
    navigate(`/product/${id}`);
  };

  const addToCart = (product, e) => {
    e?.stopPropagation();
    console.log("Add to cart:", product);
  };

  const buyNow = (id, e) => {
    e?.stopPropagation();
    navigate(`/product/${id}`);
  };

  return (
    <section className="relative py-10 bg-gradient-to-b from-white to-gray-50">
      {/* Background decorations - simplified */}
      <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-orange-500 to-pink-500"></div>
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-orange-100 rounded-full opacity-10 blur-xl"></div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header - compact */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
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
          <p className="text-sm text-gray-600 max-w-xl mx-auto">
            Popular music albums with exclusive discounts
          </p>
        </motion.div>

        {/* Products Grid - compact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
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
                {/* Top Badges - compact */}
                <div className="absolute top-3 left-3 z-10 flex gap-1">
                  <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-[10px] px-2 py-1 rounded-full font-bold shadow-sm">
                    -{product.discount}%
                  </span>
                  
                  {product.stock < 10 && (
                    <span className="bg-gradient-to-r from-orange-500 to-amber-500 text-white text-[10px] px-2 py-1 rounded-full font-bold shadow-sm flex items-center gap-1">
                      <FiClock size={9} /> {product.stock}
                    </span>
                  )}
                </div>

                {/* Wishlist Button */}
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => toggleWishlist(product.id, e)}
                  className="absolute top-3 right-3 z-10 bg-white/80 p-1.5 rounded-full shadow-sm hover:shadow transition-all duration-200"
                >
                  <FiHeart
                    className={`w-3.5 h-3.5 ${
                      isWish 
                        ? "text-red-500 fill-red-500" 
                        : "text-gray-600"
                    }`}
                  />
                </motion.button>

                {/* Image Container - compact */}
                <div className="relative h-40 overflow-hidden">
                  <motion.img
                    src={product.images[0]}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    animate={isHovered ? { scale: 1.05 } : { scale: 1 }}
                  />
                </div>

                {/* Content - compact */}
                <div className="p-4">
                  {/* Category & Title */}
                  <div className="mb-2">
                    <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      {product.category}
                    </span>
                    <h3 className="text-sm font-bold mt-1.5 group-hover:text-blue-600 transition-colors duration-200 line-clamp-1">
                      {product.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-gray-600 mb-3 line-clamp-2 h-8">
                    {product.description}
                  </p>

                  {/* Rating */}
                  <div className="flex items-center gap-1.5 mb-3">
                    <StarRating rating={product.rating} />
                    <span className="text-xs font-bold text-gray-900">
                      {product.rating}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({Math.floor(Math.random() * 200) + 50})
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <span className="text-lg font-bold text-gray-900">
                        {product.price}
                      </span>
                      <span className="text-sm text-gray-400 line-through ml-2">
                        {product.originalPrice}
                      </span>
                    </div>
                    <span className="text-xs font-semibold text-green-600">
                      Save {product.discount}%
                    </span>
                  </div>

                  {/* Action Buttons - compact */}
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => addToCart(product, e)}
                      className="flex-1 bg-gradient-to-r from-gray-800 to-gray-900 text-white py-2 rounded-lg text-sm font-medium hover:shadow-sm transition-all duration-200 flex items-center justify-center gap-1.5"
                    >
                      <FiShoppingCart className="w-3.5 h-3.5" />
                      Add
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => buyNow(product.id, e)}
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

        {/* View All Button - compact */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-8"
        >
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/products')}
            className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-lg text-sm font-medium hover:shadow-md transition-all duration-200 group"
          >
            View All Albums
            <FiChevronRight className="group-hover:translate-x-0.5 transition-transform" />
          </motion.button>
        </motion.div>

      </div>
    </section>
  );
}