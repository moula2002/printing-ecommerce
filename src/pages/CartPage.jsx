import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
    FiMinus,
    FiPlus,
    FiTrash2,
    FiArrowLeft,
    FiShield,
    FiCreditCard,
    FiCheck,
    FiShoppingCart,
    FiPackage,
    FiRefreshCw,
    FiLock
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";

export default function CartPage() {
    const { cart, increaseQty, decreaseQty, removeItem, clearCart } = useCart();
    const navigate = useNavigate();
    const [removingItem, setRemovingItem] = useState(null);
    const [showClearConfirm, setShowClearConfirm] = useState(false);
    const [couponCode, setCouponCode] = useState("");
    const [couponApplied, setCouponApplied] = useState(false);
    const [couponError, setCouponError] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    // Fixed price calculations with fallback to prevent NaN
const subtotal = cart.reduce((sum, item) => {
    const price = parseFloat(item.price?.toString().replace("₹", "")) || 0;
    const quantity = item.qty || item.quantity || 1;
    return sum + price * quantity;
}, 0);


    const shipping = subtotal > 100 ? 0 : 9.99;
    const tax = subtotal * 0.08;
    const discount = couponApplied ? subtotal * 0.1 : 0;
    const total = subtotal + shipping + tax - discount;

    const handleRemoveItem = (id) => {
        setRemovingItem(id);
        setTimeout(() => {
            removeItem(id);
            setRemovingItem(null);
        }, 300);
    };

    const handleApplyCoupon = () => {
        if (couponCode.toUpperCase() === "SAVE10") {
            setCouponApplied(true);
            setCouponError("");
        } else if (couponCode.toUpperCase() === "WELCOME15") {
            setCouponApplied(true);
            setCouponError("");
        } else {
            setCouponError("Invalid coupon code. Try 'SAVE10' or 'WELCOME15'");
            setCouponApplied(false);
        }
    };

    const handleCheckout = () => {
        navigate("/checkout");
    };

    const handleContinueShopping = () => {
        navigate("/products");
    };

    const formatPrice = (price) => {
        const num = parseFloat(price);
        return isNaN(num) ? "0.00" : num.toFixed(2);
    };

    const getItemTotal = (item) => {
        const price = parseFloat(item.price) || 0;
        const quantity = parseInt(item.qty) || 0;
        return price * quantity;
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20 pb-20">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="animate-pulse space-y-8">
                        <div className="h-8 bg-gray-200 rounded w-64"></div>
                        <div className="grid lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-4">
                                {[1, 2].map(i => (
                                    <div key={i} className="h-48 bg-gray-200 rounded-xl"></div>
                                ))}
                            </div>
                            <div className="h-64 bg-gray-200 rounded-xl"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (cart.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-32 pb-20"
            >
                <div className="max-w-md mx-auto px-4 text-center">
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="w-40 h-40 mx-auto mb-8 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center"
                    >
                        <FiShoppingCart className="text-gray-400 text-6xl" />
                    </motion.div>

                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="text-3xl font-bold text-gray-800 mb-4"
                    >
                        Your cart is empty
                    </motion.h1>

                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-gray-600 mb-8"
                    >
                        Looks like you haven't added any items to your cart yet.
                    </motion.p>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <button
                            onClick={() => navigate("/")}
                            className="px-8 py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition"
                        >
                            Start Shopping
                        </button>
                    </motion.div>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen bg-gradient-to-b from-gray-50 to-white"
        >
            {/* Header - Height reduced by changing padding from pt-32 to pt-24 and pb-8 to pb-5 */}
            <div className="pt-32 pb-5 bg-gradient-to-r from-gray-900 to-black text-white">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate(-1)}
                                className="p-2 rounded-lg hover:bg-white/10 transition"
                            >
                                <FiArrowLeft size={24} />
                            </button>
                            <div>
                                <h1 className="text-2xl font-bold">Shopping Cart</h1>
                                <p className="text-gray-400 text-sm">{cart.length} {cart.length === 1 ? 'item' : 'items'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 py-8">
                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Left Column - Cart Items */}
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        className="lg:col-span-2 space-y-6"
                    >
                        {/* Cart Items */}
                        <AnimatePresence>
                            {cart.map((item) => {
                                const itemTotal = getItemTotal(item);
                                return (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{
                                            opacity: removingItem === item.id ? 0 : 1,
                                            y: 0,
                                            scale: removingItem === item.id ? 0.9 : 1
                                        }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className={`bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow ${removingItem === item.id ? 'opacity-0' : ''
                                            }`}
                                    >
                                        <div className="flex gap-6">
                                            {/* Product Image */}
                                            <motion.div
                                                whileHover={{ scale: 1.05 }}
                                                className="relative flex-shrink-0 cursor-pointer"
                                                onClick={() => navigate(`/product/${item.id}`)}
                                            >
                                                <img
                                                    src={item.images?.[0] || "https://via.placeholder.com/150"}
                                                    alt={item.title}
                                                    className="w-32 h-32 rounded-xl object-cover"
                                                />
                                                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                                                    {item.qty}
                                                </div>
                                            </motion.div>

                                            {/* Product Details */}
                                            <div className="flex-1">
                                                <div className="flex justify-between items-start">
                                                    <div className="flex-1">
                                                        <h3
                                                            className="font-bold text-lg hover:text-blue-600 cursor-pointer transition"
                                                            onClick={() => navigate(`/product/${item.id}`)}
                                                        >
                                                            {item.title}
                                                        </h3>
                                                        <p className="text-gray-500 text-sm mt-1">{item.category || "Product"}</p>
                                                        <div className="flex items-center gap-4 mt-2">
                                                            <span className="text-sm text-gray-600">Color: Black</span>
                                                            <span className="text-sm text-gray-600">Size: M</span>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-2xl font-bold">₹{formatPrice(item.price)}</p>
                                                        <p className="text-lg font-semibold text-gray-800">₹{formatPrice(itemTotal)}</p>
                                                    </div>
                                                </div>

                                                {/* Quantity Controls & Actions */}
                                                <div className="flex items-center justify-between mt-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-xl">
                                                            <motion.button
                                                                whileTap={{ scale: 0.9 }}
                                                                onClick={() => decreaseQty(item.id)}
                                                                className="w-8 h-8 rounded-full border border-gray-300 bg-white flex items-center justify-center hover:bg-gray-100"
                                                                disabled={item.qty <= 1}
                                                            >
                                                                <FiMinus className={item.qty <= 1 ? "text-gray-400" : "text-gray-700"} />
                                                            </motion.button>
                                                            <motion.span
                                                                key={item.qty}
                                                                initial={{ scale: 0.8 }}
                                                                animate={{ scale: 1 }}
                                                                className="text-lg font-bold w-8 text-center"
                                                            >
                                                                {item.qty}
                                                            </motion.span>
                                                            <motion.button
                                                                whileTap={{ scale: 0.9 }}
                                                                onClick={() => increaseQty(item.id)}
                                                                className="w-8 h-8 rounded-full border border-gray-300 bg-white flex items-center justify-center hover:bg-gray-100"
                                                            >
                                                                <FiPlus className="text-gray-700" />
                                                            </motion.button>
                                                        </div>
                                                        <span className="text-gray-600">
                                                            Total: <span className="font-bold">₹{formatPrice(itemTotal)}</span>
                                                        </span>
                                                    </div>

                                                    <motion.button
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => handleRemoveItem(item.id)}
                                                        className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                                                    >
                                                        <FiTrash2 />
                                                        Remove
                                                    </motion.button>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>

                        {/* Payment Security */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h3 className="font-bold text-xl mb-6 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                                    <FiLock className="text-green-600" />
                                </div>
                                Secure Shopping
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <div className="text-center">
                                    <div className="w-12 h-12 mx-auto rounded-full bg-blue-50 flex items-center justify-center mb-3">
                                        <FiShield className="text-blue-600 text-xl" />
                                    </div>
                                    <p className="font-semibold">SSL Secure</p>
                                    <p className="text-sm text-gray-500">256-bit encryption</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-12 h-12 mx-auto rounded-full bg-green-50 flex items-center justify-center mb-3">
                                        <FiCreditCard className="text-green-600 text-xl" />
                                    </div>
                                    <p className="font-semibold">Safe Payments</p>
                                    <p className="text-sm text-gray-500">PCI compliant</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-12 h-12 mx-auto rounded-full bg-purple-50 flex items-center justify-center mb-3">
                                        <FiPackage className="text-purple-600 text-xl" />
                                    </div>
                                    <p className="font-semibold">Fast Delivery</p>
                                    <p className="text-sm text-gray-500">2-3 business days</p>
                                </div>
                                <div className="text-center">
                                    <div className="w-12 h-12 mx-auto rounded-full bg-yellow-50 flex items-center justify-center mb-3">
                                        <FiRefreshCw className="text-yellow-600 text-xl" />
                                    </div>
                                    <p className="font-semibold">Easy Returns</p>
                                    <p className="text-sm text-gray-500">30-day policy</p>
                                </div>
                            </div>
                        </div>

                        {/* Navigation Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <button
                                onClick={handleContinueShopping}
                                className="flex-1 flex items-center justify-center gap-2 border-2 border-black text-black py-4 rounded-xl font-semibold hover:bg-black hover:text-white transition group"
                            >
                                <FiArrowLeft className="group-hover:-translate-x-1 transition" />
                                Continue Shopping
                            </button>
                        </div>
                    </motion.div>

                    {/* Right Column - Order Summary */}
                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                        className="space-y-6"
                    >
                        {/* Order Summary Card */}
                        <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24 border border-gray-100">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold">Order Summary</h2>
                                <div className="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full">
                                    {cart.length} {cart.length === 1 ? 'item' : 'items'}
                                </div>
                            </div>

                            {/* Pricing Breakdown */}
                            <div className="space-y-4 mb-6">
                                <div className="flex justify-between items-center py-2">
                                    <span className="text-gray-600">Subtotal</span>
                                    <span className="font-semibold">₹{formatPrice(subtotal)}</span>
                                </div>

                                <div className="flex justify-between items-center py-2">
                                    <span className="text-gray-600">Shipping</span>
                                    <span className={`font-semibold ${shipping === 0 ? 'text-green-600' : ''}`}>
                                        {shipping === 0 ? 'FREE' : `$${formatPrice(shipping)}`}
                                    </span>
                                </div>

                                {couponApplied && (
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-green-600 font-semibold">Discount Applied</span>
                                        <span className="font-bold text-green-600">-₹{formatPrice(discount)}</span>
                                    </div>
                                )}

                                <div className="flex justify-between items-center py-2">
                                    <span className="text-gray-600">Tax (8%)</span>
                                    <span className="font-semibold">₹{formatPrice(tax)}</span>
                                </div>

                                <div className="border-t border-gray-200 pt-4 mt-2">
                                    <div className="flex justify-between items-center text-xl font-bold">
                                        <span>Total</span>
                                        <div className="text-right">
                                            <span className="text-2xl">₹{formatPrice(total)}</span>
                                            <p className="text-sm font-normal text-gray-500">Including tax</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* Checkout Button */}
                            <motion.button
                                whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(0,0,0,0.15)" }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleCheckout}
                                className="w-full bg-gradient-to-r from-gray-900 to-black text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3"
                            >
                                <FiLock />
                                Proceed to Secure Checkout
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Clear Cart Confirmation Modal */}
            <AnimatePresence>
                {showClearConfirm && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowClearConfirm(false)}
                            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-8 z-50 w-full max-w-md shadow-2xl"
                        >
                            <div className="text-center mb-6">
                                <div className="w-16 h-16 mx-auto rounded-full bg-red-100 flex items-center justify-center mb-4">
                                    <FiTrash2 className="text-red-600 text-2xl" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">Clear Cart</h3>
                                <p className="text-gray-600">
                                    Are you sure you want to remove all {cart.length} items from your cart?
                                </p>
                                <p className="text-gray-500 text-sm mt-2">This action cannot be undone.</p>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => setShowClearConfirm(false)}
                                    className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-xl font-semibold hover:border-black hover:text-black transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        clearCart();
                                        setShowClearConfirm(false);
                                    }}
                                    className="flex-1 bg-gradient-to-r from-red-600 to-red-700 text-white py-3 rounded-xl font-semibold hover:from-red-700 hover:to-red-800 transition shadow-lg"
                                >
                                    Clear All Items
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </motion.div>
    );
}