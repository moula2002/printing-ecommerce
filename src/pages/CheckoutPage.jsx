import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { 
  FiLock, 
  FiCreditCard, 
  FiTruck, 
  FiCheckCircle, 
  FiUser, 
  FiMail, 
  FiPhone, 
  FiMapPin,
  FiHome,
  FiCalendar,
  FiShield,
  FiClock,
  FiRefreshCw,
  FiPackage,
  FiChevronLeft,
  FiCreditCard as FiCard
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function CheckoutPage() {
  const { cart, clearCart, couponApplied } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    payment: "cod",
    cardNumber: "",
    cardExpiry: "",
    cardCvc: ""
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [activeStep, setActiveStep] = useState(1);
  const [showCardDetails, setShowCardDetails] = useState(false);

  // Calculate order totals
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const tax = subtotal * 0.08;
  const shipping = subtotal > 1000 ? 0 : 100;
  const discount = couponApplied ? subtotal * 0.1 : 0;
  const total = subtotal + tax + shipping - discount;

  useEffect(() => {
    // Generate random order ID
    setOrderId(`ORD-${Math.floor(100000 + Math.random() * 900000)}`);
    
    // Pre-fill form from localStorage if available
    const savedForm = localStorage.getItem('checkoutForm');
    if (savedForm) {
      setForm(JSON.parse(savedForm));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Format card number with spaces
    let formattedValue = value;
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim().slice(0, 19);
    } else if (name === 'cardExpiry') {
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d)/, '$1/$2').slice(0, 5);
    } else if (name === 'cardCvc') {
      formattedValue = value.replace(/\D/g, '').slice(0, 3);
    } else if (name === 'phone') {
      formattedValue = value.replace(/\D/g, '').slice(0, 10);
    } else if (name === 'pincode') {
      formattedValue = value.replace(/\D/g, '').slice(0, 6);
    }
    
    setForm({ ...form, [name]: formattedValue });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
    
    // Save form to localStorage
    localStorage.setItem('checkoutForm', JSON.stringify({ ...form, [name]: formattedValue }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!form.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!/^\d{10}$/.test(form.phone.replace(/\D/g, ''))) {
      newErrors.phone = "Invalid phone number (10 digits)";
    }
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(form.pincode.replace(/\D/g, ''))) {
      newErrors.pincode = "Invalid pincode (6 digits)";
    }
    
    if (form.payment === "online") {
      const cleanCardNumber = form.cardNumber.replace(/\s/g, '');
      if (!cleanCardNumber.trim()) newErrors.cardNumber = "Card number is required";
      else if (!/^\d{16}$/.test(cleanCardNumber)) newErrors.cardNumber = "Invalid card number (16 digits)";
      
      if (!form.cardExpiry.trim()) newErrors.cardExpiry = "Expiry date is required";
      else if (!/^\d{2}\/\d{2}$/.test(form.cardExpiry)) newErrors.cardExpiry = "Invalid expiry (MM/YY)";
      
      if (!form.cardCvc.trim()) newErrors.cardCvc = "CVC is required";
      else if (!/^\d{3}$/.test(form.cardCvc)) newErrors.cardCvc = "Invalid CVC (3 digits)";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePlaceOrder = async () => {
    if (!validateForm()) {
      alert("Please fix the errors before proceeding");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate payment processing
    setTimeout(() => {
      // Save order to localStorage
      const orderData = {
        id: orderId,
        date: new Date().toISOString(),
        items: cart,
        total: total,
        shipping: {
          address: form.address,
          city: form.city,
          pincode: form.pincode
        },
        customer: {
          name: form.name,
          email: form.email,
          phone: form.phone
        },
        payment: form.payment
      };
      
      // Save order to localStorage
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      localStorage.setItem('orders', JSON.stringify([...existingOrders, orderData]));
      
      // Clear saved form data
      localStorage.removeItem('checkoutForm');
      
      setIsSubmitting(false);
      setOrderPlaced(true);
      
      // Clear cart after 2 seconds
      setTimeout(() => {
        clearCart();
      }, 2000);
    }, 2000);
  };

  const handleOnlinePayment = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    // Simulate payment processing
    setTimeout(() => {
      // After successful payment simulation, place the order
      handlePlaceOrder();
    }, 1500);
  };

  const formatPrice = (price) => {
    return price.toFixed(2);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const stepVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 }
  };

  if (orderPlaced) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 pt-32 pb-20 flex items-center justify-center"
      >
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
            className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center"
          >
            <FiCheckCircle className="text-white text-6xl" />
          </motion.div>
          
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            Order Confirmed!
          </motion.h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-gray-600 mb-8"
          >
            Thank you for your purchase. Your order <span className="font-bold text-emerald-600">{orderId}</span> has been confirmed.
          </motion.p>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-8 mb-8"
          >
            <div className="text-left space-y-4">
              <div className="flex justify-between items-center pb-4 border-b">
                <span className="text-gray-600">Order ID:</span>
                <span className="font-bold">{orderId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Total Amount:</span>
                <span className="text-2xl font-bold text-emerald-600">₹{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Payment Method:</span>
                <span className="font-semibold">
                  {form.payment === "cod" ? "Cash on Delivery" : "Online Payment"}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Estimated Delivery:</span>
                <span className="font-semibold">2-3 Business Days</span>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => navigate("/orders")}
              className="px-8 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition shadow-lg"
            >
              View Order Details
            </button>
            <button
              onClick={() => navigate("/")}
              className="px-8 py-3 border-2 border-emerald-600 text-emerald-600 rounded-xl font-semibold hover:bg-emerald-50 transition"
            >
              Continue Shopping
            </button>
          </motion.div>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 pt-8 border-t border-gray-200"
          >
            <p className="text-gray-500 text-sm">
              A confirmation email has been sent to <span className="font-semibold">{form.email}</span>
            </p>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50"
    >
      {/* Header */}
      <div className="pt-24 pb-8 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.button
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            onClick={() => navigate("/cart")}
            className="flex items-center gap-2 mb-6 text-gray-300 hover:text-white transition"
          >
            <FiChevronLeft />
            Back to Cart
          </motion.button>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-3xl font-bold">Secure Checkout</h1>
              <p className="text-gray-400 mt-2">Complete your purchase in just a few steps</p>
            </div>
            
            <div className="flex items-center gap-4 bg-white/10 px-6 py-3 rounded-xl">
              <div className="text-center">
                <div className="text-2xl font-bold">{cart.length}</div>
                <div className="text-xs text-gray-300">Items</div>
              </div>
              <div className="h-12 w-px bg-white/20"></div>
              <div className="text-center">
                <div className="text-2xl font-bold">₹{formatPrice(total)}</div>
                <div className="text-xs text-gray-300">Total</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-12">
          {[1, 2, 3].map((step) => (
            <React.Fragment key={step}>
              <motion.div
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                transition={{ delay: step * 0.1 }}
                className={`flex flex-col items-center ${step <= activeStep ? 'text-black' : 'text-gray-400'}`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${step <= activeStep ? 'bg-black text-white' : 'bg-gray-200'}`}>
                  {step === 1 && <FiUser />}
                  {step === 2 && <FiCard />}
                  {step === 3 && <FiCheckCircle />}
                </div>
                <span className="text-sm font-semibold">
                  {step === 1 && 'Details'}
                  {step === 2 && 'Payment'}
                  {step === 3 && 'Confirm'}
                </span>
              </motion.div>
              {step < 3 && (
                <div className={`flex-1 h-1 ${step < activeStep ? 'bg-black' : 'bg-gray-200'}`}></div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-2 space-y-8"
          >
            {/* Contact Information */}
            <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                  <FiUser className="text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Contact Information</h3>
                  <p className="text-gray-600 text-sm">We'll use this to send order updates</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                    <FiUser className="text-gray-400" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={`w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                    <FiMail className="text-gray-400" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className={`w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                    <FiPhone className="text-gray-400" />
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="10-digit mobile number"
                    className={`w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-2">{errors.phone}</p>}
                </div>
              </div>
            </motion.div>

            {/* Shipping Address */}
            <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                  <FiMapPin className="text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Shipping Address</h3>
                  <p className="text-gray-600 text-sm">Where should we deliver your order?</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 flex items-center gap-2">
                    <FiHome className="text-gray-400" />
                    Complete Address *
                  </label>
                  <textarea
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="House no., Building, Street, Area"
                    rows="3"
                    className={`w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition ${errors.address ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.address && <p className="text-red-500 text-sm mt-2">{errors.address}</p>}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2">City *</label>
                    <input
                      type="text"
                      name="city"
                      value={form.city}
                      onChange={handleChange}
                      placeholder="Enter your city"
                      className={`w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.city && <p className="text-red-500 text-sm mt-2">{errors.city}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Pincode *</label>
                    <input
                      type="text"
                      name="pincode"
                      value={form.pincode}
                      onChange={handleChange}
                      placeholder="6-digit pincode"
                      className={`w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition ${errors.pincode ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.pincode && <p className="text-red-500 text-sm mt-2">{errors.pincode}</p>}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Payment Method */}
            <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <FiCreditCard className="text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Payment Method</h3>
                  <p className="text-gray-600 text-sm">Choose how you want to pay</p>
                </div>
              </div>

              <div className="space-y-6">
                {/* Cash on Delivery */}
                <motion.label
                  whileTap={{ scale: 0.98 }}
                  className={`block p-6 border-2 rounded-2xl cursor-pointer transition-all ${form.payment === "cod" ? 'border-green-500 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="cod"
                    checked={form.payment === "cod"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-4">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${form.payment === "cod" ? 'border-green-500' : 'border-gray-300'}`}>
                      {form.payment === "cod" && <div className="w-3 h-3 rounded-full bg-green-500"></div>}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold">Cash on Delivery</span>
                        <FiTruck className="text-gray-400" />
                      </div>
                      <p className="text-gray-600 text-sm mt-1">Pay when you receive your order</p>
                    </div>
                  </div>
                </motion.label>

                {/* Online Payment */}
                <motion.label
                  whileTap={{ scale: 0.98 }}
                  className={`block p-6 border-2 rounded-2xl cursor-pointer transition-all ${form.payment === "online" ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="online"
                    checked={form.payment === "online"}
                    onChange={(e) => {
                      handleChange(e);
                      setShowCardDetails(true);
                    }}
                    className="sr-only"
                  />
                  <div className="flex items-center gap-4">
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${form.payment === "online" ? 'border-blue-500' : 'border-gray-300'}`}>
                      {form.payment === "online" && <div className="w-3 h-3 rounded-full bg-blue-500"></div>}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold">Online Payment</span>
                        <FiShield className="text-gray-400" />
                      </div>
                      <p className="text-gray-600 text-sm mt-1">Pay securely with credit/debit card</p>
                    </div>
                  </div>
                </motion.label>

                {/* Card Details (Conditional) */}
                <AnimatePresence>
                  {form.payment === "online" && showCardDetails && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="grid md:grid-cols-3 gap-6 p-6 bg-gray-50 rounded-xl">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-semibold mb-2">Card Number *</label>
                          <input
                            type="text"
                            name="cardNumber"
                            value={form.cardNumber}
                            onChange={handleChange}
                            placeholder="1234 5678 9012 3456"
                            maxLength="19"
                            className={`w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${errors.cardNumber ? 'border-red-500' : 'border-gray-300'}`}
                          />
                          {errors.cardNumber && <p className="text-red-500 text-sm mt-2">{errors.cardNumber}</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-semibold mb-2">Expiry *</label>
                            <input
                              type="text"
                              name="cardExpiry"
                              value={form.cardExpiry}
                              onChange={handleChange}
                              placeholder="MM/YY"
                              maxLength="5"
                              className={`w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${errors.cardExpiry ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.cardExpiry && <p className="text-red-500 text-sm mt-2">{errors.cardExpiry}</p>}
                          </div>
                          <div>
                            <label className="block text-sm font-semibold mb-2">CVC *</label>
                            <input
                              type="text"
                              name="cardCvc"
                              value={form.cardCvc}
                              onChange={handleChange}
                              placeholder="123"
                              maxLength="3"
                              className={`w-full p-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${errors.cardCvc ? 'border-red-500' : 'border-gray-300'}`}
                            />
                            {errors.cardCvc && <p className="text-red-500 text-sm mt-2">{errors.cardCvc}</p>}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Order Summary */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            {/* Order Summary Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-24 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                  <FiPackage className="text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Order Summary</h3>
                  <p className="text-gray-600 text-sm">Review your items</p>
                </div>
              </div>

              {/* Order Items */}
              <div className="space-y-4 mb-6 max-h-96 overflow-y-auto pr-2">
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-4 py-4 border-b border-gray-100"
                  >
                    <div className="relative">
                      <img
                        src={item.images?.[0] || "https://via.placeholder.com/150"}
                        alt={item.title}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      <div className="absolute -top-2 -right-2 bg-black text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                        {item.qty}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-sm line-clamp-1">{item.title}</h4>
                      <p className="text-gray-500 text-sm">{item.category}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">₹{formatPrice(item.price * item.qty)}</p>
                      <p className="text-gray-500 text-sm">₹{item.price} each</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Pricing Breakdown */}
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₹{formatPrice(subtotal)}</span>
                </div>
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Shipping</span>
                  <span className={`font-semibold ${shipping === 0 ? 'text-green-600' : ''}`}>
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>
                
                {couponApplied && (
                  <div className="flex justify-between items-center py-2">
                    <span className="text-green-600 font-semibold">Discount</span>
                    <span className="font-bold text-green-600">-₹{formatPrice(discount)}</span>
                  </div>
                )}
                
                <div className="flex justify-between items-center py-2">
                  <span className="text-gray-600">Tax (8%)</span>
                  <span className="font-semibold">₹{formatPrice(tax)}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mt-4">
                  <div className="flex justify-between items-center text-xl font-bold">
                    <span>Total</span>
                    <div className="text-right">
                      <span className="text-2xl">₹{formatPrice(total)}</span>
                      <p className="text-sm font-normal text-gray-500">Including all taxes</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Information */}
              <div className="bg-blue-50 rounded-xl p-4 mb-8">
                <div className="flex items-center gap-3 mb-3">
                  <FiClock className="text-blue-600" />
                  <span className="font-semibold">Delivery Information</span>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                    <span>Estimated delivery: 2-3 business days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                    <span>Free shipping on orders over ₹1000</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                    <span>30-day easy returns policy</span>
                  </div>
                </div>
              </div>

              {/* Place Order Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={form.payment === "online" ? handleOnlinePayment : handlePlaceOrder}
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-gray-900 to-black text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <FiRefreshCw className="animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <FiLock />
                    {form.payment === "online" ? "Pay Now" : "Place Order"}
                  </>
                )}
              </motion.button>
              
              <p className="text-center text-gray-500 text-xs mt-4">
                By placing your order, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>

          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}