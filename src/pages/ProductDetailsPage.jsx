import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  FiShoppingCart,
  FiMinus,
  FiPlus,
  FiArrowLeft,
  FiStar,
  FiCheck,
  FiChevronRight,
  FiCreditCard,
  FiTruck,
  FiPackage,
  FiTrendingUp,
  FiRefreshCw,
  FiUsers,
  FiInfo,
  FiAlertCircle
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState("Black");
  const [showAddedToCart, setShowAddedToCart] = useState(false);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("description");
  const [showBuyNowConfirm, setShowBuyNowConfirm] = useState(false);
  const [zoomImage, setZoomImage] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
  const [isSharing, setIsSharing] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [id]);

  const product = products.find(p => p.id === Number(id));

  const enhancedProduct = useMemo(() => {
    if (!product) return null;

    const cleanPrice = typeof product.price === 'string'
      ? parseFloat(product.price.replace(/[^\d.]/g, ''))
      : product.price;

    // Calculate discount percentage
    const discount = cleanPrice ? Math.round((1 - cleanPrice / (cleanPrice * 1.3)) * 100) : 0;

    return {
      ...product,
      price: cleanPrice || 0,
      originalPrice: cleanPrice ? cleanPrice * 1.3 : 0,
      discountPercentage: discount,
      category: product.category || "Electronics",
      brand: product.brand || "Premium Brand",
      rating: product.rating || 4.5,
      reviews: product.reviews || 128,
      inStock: product.inStock !== undefined ? product.inStock : true,
      sku: product.sku || `SKU-${product.id}`,
      weight: product.weight || "1.2 kg",
      dimensions: product.dimensions || "30 x 20 x 10 cm",
      tags: product.tags || ["Popular", "New Arrival", "Limited"],
      colors: product.colors || [
        { name: "Black", value: "#000000", hex: "#000000", inStock: true },
        { name: "Blue", value: "#3B82F6", hex: "#3B82F6", inStock: true },
        { name: "Red", value: "#EF4444", hex: "#EF4444", inStock: true },
        { name: "Green", value: "#10B981", hex: "#10B981", inStock: false }
      ],
      sizes: product.sizes || ["S", "M", "L", "XL"],
      features: product.features || [
        "High-quality materials",
        "Water resistant",
        "Eco-friendly packaging",
        "1-year warranty"
      ],
      specifications: product.specifications || [
        { label: "Material", value: "Premium Cotton" },
        { label: "Origin", value: "Made in India" },
        { label: "Care Instructions", value: "Machine Wash Cold" }
      ],
      warranty: product.warranty || "1 year manufacturer warranty",
      availability: product.availability || "In Stock",
      soldCount: product.soldCount || 250,
      stockCount: product.stockCount || 50,
      ratingBreakdown: product.ratingBreakdown || {
        5: 65,
        4: 20,
        3: 10,
        2: 3,
        1: 2
      }
    };
  }, [product]);

  const handleAddToCart = () => {
    if (!enhancedProduct) return;

    addToCart({
      ...enhancedProduct,
      size: selectedSize,
      color: selectedColor
    }, quantity);

    setShowAddedToCart(true);
    setTimeout(() => setShowAddedToCart(false), 3000);
  };

  const handleBuyNow = () => {
    if (!enhancedProduct) return;

    navigate("/checkout", {
      state: {
        buyNowItem: {
          id: enhancedProduct.id,
          title: enhancedProduct.title,
          price: enhancedProduct.price,   
          images: enhancedProduct.images,
          qty: quantity,                 
          category: enhancedProduct.category,
          size: selectedSize,
          color: selectedColor,
        }
      }
    });
  };


  const handleBuyNowWithConfirm = () => {
    setShowBuyNowConfirm(true);
  };

  const handleBack = () => {
    navigate(-1);
  };


  const handleImageZoom = (e) => {
    if (!zoomImage) return;

    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  const getRatingStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FiStar
          key={i}
          className={`${i <= Math.floor(rating) ? 'fill-current text-amber-500' : 'text-gray-300'}`}
        />
      );
    }
    return stars;
  };

  if (!enhancedProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <FiAlertCircle className="text-gray-400 text-4xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Product Not Found</h2>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist or has been removed.</p>
          <button
            onClick={() => navigate("/")}
            className="px-8 py-3 bg-gradient-to-r from-gray-900 to-black text-white rounded-xl font-bold hover:shadow-xl transition-all"
          >
            Continue Shopping
          </button>
        </motion.div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="animate-pulse space-y-8 w-full max-w-6xl mx-auto px-4">
          <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-24"></div>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="h-[500px] bg-gradient-to-r from-gray-200 to-gray-300 rounded-2xl"></div>
            <div className="space-y-6">
              <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-full"></div>
              <div className="h-12 bg-gradient-to-r from-gray-200 to-gray-300 rounded w-32"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30"
    >

      {/* Success Notification */}
      <AnimatePresence>
        {showAddedToCart && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-24 right-6 z-50 bg-gradient-to-r from-emerald-500 to-green-500 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 backdrop-blur-sm"
          >
            <div className="p-1 bg-white/20 rounded-full">
              <FiCheck className="text-xl" />
            </div>
            <span className="font-medium">Added to cart successfully!</span>
          </motion.div>
        )}

        {isSharing && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className="fixed top-24 right-6 z-50 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-xl shadow-2xl flex items-center gap-3 backdrop-blur-sm"
          >
            <div className="p-1 bg-white/20 rounded-full">
              <FiCheck className="text-xl" />
            </div>
            <span className="font-medium">Link copied to clipboard!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="pt-33 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation - Desktop */}
        <nav className="hidden lg:flex items-center text-sm text-gray-600 mb-8">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 hover:text-black transition-all group"
          >
            <div className="p-1.5 bg-gray-100 rounded-lg group-hover:bg-black group-hover:text-white transition">
              <FiArrowLeft className="text-lg" />
            </div>
            <span className="group-hover:translate-x-1 transition-transform">Back</span>
          </button>
          <FiChevronRight className="mx-2 text-gray-400" />
          <button onClick={() => navigate("/")} className="hover:text-black transition">Home</button>
          <FiChevronRight className="mx-2 text-gray-400" />
          <button onClick={() => navigate(`/category/${enhancedProduct.category.toLowerCase()}`)}
            className="hover:text-black transition capitalize">
            {enhancedProduct.category}
          </button>
          <FiChevronRight className="mx-2 text-gray-400" />
          <span className="text-gray-900 font-medium truncate max-w-xs">{enhancedProduct.title}</span>
        </nav>

        {/* Main Product Grid */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Images */}
          <div>
            <div className="relative group">
              <motion.div
                key={selectedImageIndex}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-xl border border-gray-100 p-6 ${zoomImage ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
                onClick={() => setZoomImage(!zoomImage)}
                onMouseMove={handleImageZoom}
                onMouseLeave={() => setZoomPosition({ x: 0, y: 0 })}
              >
                <img
                  src={enhancedProduct.images[selectedImageIndex]}
                  alt={enhancedProduct.title}
                  className="w-full h-[400px] object-contain group-hover:scale-105 transition-transform duration-700"
                  style={{
                    transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    transform: zoomImage ? 'scale(2)' : 'scale(1)'
                  }}
                />

                {/* Zoom Hint */}
                {!zoomImage && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute bottom-4 right-4 px-3 py-1 bg-black/80 text-white text-xs rounded-full backdrop-blur-sm"
                  >
                    Click to zoom
                  </motion.div>
                )}
              </motion.div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-3 mt-6 overflow-x-auto pb-2 px-1">
              {enhancedProduct.images.map((img, index) => (
                <motion.button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex-shrink-0 w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${selectedImageIndex === index ?
                    'border-black shadow-lg scale-105' :
                    'border-gray-200 hover:border-gray-300'}`}
                >
                  <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-block px-4 py-1.5 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 text-sm font-semibold rounded-full">
                  {enhancedProduct.brand}
                </span>
                <div className="flex items-center gap-1 text-amber-500">
                  {getRatingStars(enhancedProduct.rating)}
                  <span className="ml-2 text-sm text-gray-600">
                    {enhancedProduct.rating.toFixed(1)} ({enhancedProduct.reviews} reviews)
                  </span>
                </div>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">{enhancedProduct.title}</h1>

              <div className="flex items-center gap-4">
                <div className="text-3xl font-bold text-gray-900">₹{enhancedProduct.price.toLocaleString('en-IN')}</div>
                <div className="text-xl text-gray-400 line-through">₹{enhancedProduct.originalPrice.toLocaleString('en-IN')}</div>
                <div className="px-3 py-1 bg-red-100 text-red-600 font-bold rounded-full">
                  Save ₹{(enhancedProduct.originalPrice - enhancedProduct.price).toLocaleString('en-IN')}
                </div>
              </div>
            </div>


            {/* Short Description */}
            <p className="text-gray-600 leading-relaxed border-b border-gray-100 pb-6">
              {enhancedProduct.description}
            </p>

            {/* Product Options */}
            <div className="space-y-6">
              {/* Color Selection */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">Select Color</h3>
                  <span className="text-sm text-gray-500">Selected: {selectedColor}</span>
                </div>
                <div className="flex gap-3">
                  {enhancedProduct.colors.map((color, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setSelectedColor(color.name)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      disabled={!color.inStock}
                      className={`relative w-12 h-12 rounded-full border-4 transition-all ${selectedColor === color.name ?
                        'border-black ring-2 ring-offset-2 ring-black' :
                        'border-gray-200'} ${!color.inStock ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-300'}`}
                      style={{ backgroundColor: color.hex }}
                    >
                      {selectedColor === color.name && (
                        <FiCheck className="absolute inset-0 m-auto text-white text-lg" />
                      )}
                      {!color.inStock && (
                        <div className="absolute inset-0 bg-gray-500/50 rounded-full flex items-center justify-center">
                          <div className="w-8 h-px bg-white rotate-45"></div>
                        </div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div className="space-y-3">
                <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
                  {enhancedProduct.sizes.map((size, index) => (
                    <motion.button
                      key={index}
                      onClick={() => setSelectedSize(size)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`px-4 py-3 rounded-xl font-medium transition-all ${selectedSize === size ?
                        'bg-black text-white shadow-lg' :
                        'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      {size}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Quantity and Total */}
              <div className="flex items-center justify-between py-4 border-y border-gray-100">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Quantity</h3>
                  <div className="flex items-center gap-4">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 active:bg-gray-100"
                    >
                      <FiMinus />
                    </motion.button>
                    <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 active:bg-gray-100"
                    >
                      <FiPlus />
                    </motion.button>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-500">Total Price</div>
                  <div className="text-2xl font-bold text-emerald-600">
                    ₹{(quantity * enhancedProduct.price).toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  disabled={!enhancedProduct.inStock}
                  className={`py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${enhancedProduct.inStock ?
                    'bg-gradient-to-r from-gray-900 to-black text-white hover:shadow-xl' :
                    'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                >
                  <FiShoppingCart />
                  {enhancedProduct.inStock ? 'Add to Cart' : 'Out of Stock'}
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBuyNowWithConfirm}
                  disabled={!enhancedProduct.inStock}
                  className={`py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all ${enhancedProduct.inStock ?
                    'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:shadow-xl' :
                    'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                >
                  <FiCreditCard /> Buy Now
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mt-16 border-t border-gray-200 pt-12">
          <div className="flex gap-8 border-b border-gray-200 overflow-x-auto">
            {[
              { id: "description", label: "Description", icon: FiInfo },
              { id: "features", label: "Features", icon: FiCheck },
              { id: "specifications", label: "Specifications", icon: FiPackage },
              { id: "reviews", label: "Reviews", icon: FiUsers },
            ].map((tab) => (
              <motion.button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                whileHover={{ scale: 1.05 }}
                className={`flex items-center gap-2 pb-4 font-bold capitalize whitespace-nowrap transition-all ${activeTab === tab.id ?
                  'text-black border-b-2 border-black' :
                  'text-gray-400 hover:text-gray-600'}`}
              >
                <tab.icon />
                {tab.label}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="py-8"
            >
              {activeTab === "description" && (
                <div className="space-y-6">
                  <p className="text-gray-600 leading-relaxed">{enhancedProduct.description}</p>
                  <div className="grid md:grid-cols-3 gap-6 mt-6">
                    <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-100">
                      <h4 className="font-bold text-lg mb-3">Product Details</h4>
                      <ul className="space-y-3">
                        <li className="flex justify-between">
                          <span className="font-medium text-gray-700">SKU:</span>
                          <span className="text-gray-900">{enhancedProduct.sku}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="font-medium text-gray-700">Weight:</span>
                          <span className="text-gray-900">{enhancedProduct.weight}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="font-medium text-gray-700">Dimensions:</span>
                          <span className="text-gray-900">{enhancedProduct.dimensions}</span>
                        </li>
                        <li className="flex justify-between">
                          <span className="font-medium text-gray-700">Brand:</span>
                          <span className="text-gray-900">{enhancedProduct.brand}</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-100">
                      <h4 className="font-bold text-lg mb-3">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {enhancedProduct.tags.map((tag, index) => (
                          <span key={index} className="px-3 py-1 bg-white border border-gray-200 text-gray-700 rounded-full text-sm hover:bg-gray-50 transition">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl border border-gray-100">
                      <h4 className="font-bold text-lg mb-3">Sales Info</h4>
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <FiTrendingUp className="text-emerald-600" />
                          <span className="font-medium">{enhancedProduct.soldCount} units sold</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FiStar className="text-amber-500" />
                          <span className="font-medium">{enhancedProduct.rating.toFixed(1)} average rating</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FiUsers className="text-blue-600" />
                          <span className="font-medium">{enhancedProduct.reviews} reviews</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "features" && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Key Features</h3>
                  <ul className="grid md:grid-cols-2 gap-4">
                    {enhancedProduct.features.map((feature, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start gap-3 p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 hover:border-gray-200 transition"
                      >
                        <div className="p-2 bg-emerald-100 rounded-lg">
                          <FiCheck className="text-emerald-600" />
                        </div>
                        <div>
                          <span className="font-medium text-gray-900">{feature}</span>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === "specifications" && (
                <div className="space-y-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Technical Specifications</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    {enhancedProduct.specifications.map((spec, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex justify-between items-center p-4 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100 hover:bg-gray-50 transition"
                      >
                        <span className="font-bold text-gray-700">{spec.label}</span>
                        <span className="text-gray-900 font-medium">{spec.value}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "reviews" && (
                <div className="space-y-8">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">Customer Reviews</h3>
                      <div className="flex items-center gap-4 mt-4">
                        <div className="text-center">
                          <div className="text-5xl font-bold text-gray-900">{enhancedProduct.rating.toFixed(1)}</div>
                          <div className="flex items-center justify-center gap-1 text-amber-500 mt-2">
                            {getRatingStars(enhancedProduct.rating)}
                          </div>
                          <p className="text-gray-500 text-sm mt-1">{enhancedProduct.reviews} total reviews</p>
                        </div>
                        <div className="space-y-2">
                          {[5, 4, 3, 2, 1].map((star) => (
                            <div key={star} className="flex items-center gap-2">
                              <span className="text-sm w-8">{star} star</span>
                              <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${enhancedProduct.ratingBreakdown[star] || 0}%` }}
                                  className="h-full bg-amber-500"
                                />
                              </div>
                              <span className="text-sm text-gray-600 w-8">{enhancedProduct.ratingBreakdown[star] || 0}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    <button className="px-6 py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition">
                      Write a Review
                    </button>
                  </div>
                  <div className="space-y-6">
                    {[1, 2, 3].map((review) => (
                      <motion.div
                        key={review}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: review * 0.1 }}
                        className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl border border-gray-100"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center font-bold text-gray-700">
                              U{review}
                            </div>
                            <div>
                              <h4 className="font-bold">User {review}</h4>
                              <div className="flex items-center gap-1 text-amber-500 text-sm">
                                <FiStar className="fill-current" /><FiStar className="fill-current" /><FiStar className="fill-current" /><FiStar className="fill-current" /><FiStar />
                              </div>
                            </div>
                          </div>
                          <span className="text-gray-500 text-sm">2 weeks ago</span>
                        </div>
                        <p className="text-gray-600 mb-3">
                          {review === 1 && "Excellent product quality and fast delivery. Highly recommended! The material feels premium and the fit is perfect."}
                          {review === 2 && "Great value for money. The product exceeded my expectations. Customer service was also very helpful when I had questions about sizing."}
                          {review === 3 && "Good product overall, but delivery took longer than expected. The quality is good for the price point."}
                        </p>
                        <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
                          <span className="text-sm text-gray-500">Was this review helpful?</span>
                          <button className="text-sm text-blue-600 hover:text-blue-700">Yes</button>
                          <button className="text-sm text-gray-500 hover:text-gray-700">No</button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "delivery" && (
                <div className="space-y-8">
                  <h3 className="text-2xl font-bold text-gray-900">Shipping & Delivery</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-xl border border-blue-100">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <FiDelivery className="text-blue-600 text-xl" />
                        </div>
                        <h4 className="font-bold text-lg">Standard Delivery</h4>
                      </div>
                      <p className="text-gray-600 mb-4">Free for orders over ₹{enhancedProduct.delivery.freeThreshold}</p>
                      <div className="text-2xl font-bold text-gray-900">{enhancedProduct.delivery.standard}</div>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-50 to-white p-6 rounded-xl border border-emerald-100">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-emerald-100 rounded-lg">
                          <FiTruck className="text-emerald-600 text-xl" />
                        </div>
                        <h4 className="font-bold text-lg">Express Delivery</h4>
                      </div>
                      <p className="text-gray-600 mb-4">Additional charges apply</p>
                      <div className="text-2xl font-bold text-gray-900">{enhancedProduct.delivery.express}</div>
                    </div>
                    <div className="bg-gradient-to-br from-purple-50 to-white p-6 rounded-xl border border-purple-100">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <FiRefreshCw className="text-purple-600 text-xl" />
                        </div>
                        <h4 className="font-bold text-lg">Returns Policy</h4>
                      </div>
                      <p className="text-gray-600 mb-4">Easy and hassle-free returns</p>
                      <div className="text-2xl font-bold text-gray-900">{enhancedProduct.delivery.returnPolicy}</div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Buy Now Confirmation Modal */}
      <AnimatePresence>
        {showBuyNowConfirm && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowBuyNowConfirm(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-8 z-50 w-full max-w-md shadow-2xl"
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-blue-100 to-blue-200 flex items-center justify-center mb-4">
                  <FiCreditCard className="text-blue-600 text-2xl" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Buy Now</h3>
                <p className="text-gray-600">
                  You're about to purchase this item directly. Your cart will not be affected.
                </p>
              </div>
              <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 mb-6 border border-gray-100">
                <div className="flex items-center gap-4 mb-3">
                  <img
                    src={enhancedProduct.images[0]}
                    alt={enhancedProduct.title}
                    className="w-16 h-16 rounded-lg object-cover border border-gray-200"
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-sm line-clamp-2">{enhancedProduct.title}</h4>
                    <div className="flex items-center gap-2 mt-1 flex-wrap">
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded">Qty: {quantity}</span>
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded">Size: {selectedSize}</span>
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded">Color: {selectedColor}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-emerald-600">₹{(quantity * enhancedProduct.price).toLocaleString('en-IN')}</div>
                    <div className="text-xs text-gray-500 line-through">₹{(quantity * enhancedProduct.originalPrice).toLocaleString('en-IN')}</div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBuyNow}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-bold hover:from-blue-700 hover:to-blue-800 transition shadow-lg"
                >
                  Proceed to Checkout
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowBuyNowConfirm(false)}
                  className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:border-black hover:text-black transition"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}