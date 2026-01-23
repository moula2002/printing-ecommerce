import React, { useState, useEffect } from "react";
import { 
  FiPhone, 
  FiMail, 
  FiMapPin, 
  FiSend, 
  FiClock,
  FiCheck,
  FiAlertCircle,
  FiChevronRight,
  FiMessageSquare,
  FiCalendar
} from "react-icons/fi";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [activeField, setActiveField] = useState(null);
  
  // Media queries for responsive design
  const isMobile = useMediaQuery({ maxWidth: 640 });
  const isTablet = useMediaQuery({ minWidth: 641, maxWidth: 1024 });
  const isDesktop = useMediaQuery({ minWidth: 1025 });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call with more realistic delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      console.log("Form submitted:", formData);
      
      setSubmitStatus("success");
      setFormData({ 
        name: "", 
        email: "", 
        phone: "", 
        subject: "", 
        message: "" 
      });
      
      // Reset status after 4 seconds
      setTimeout(() => setSubmitStatus(null), 4000);
    } catch (error) {
      setSubmitStatus("error");
      setTimeout(() => setSubmitStatus(null), 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants with responsive adjustments
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.05 : 0.1,
        delayChildren: isMobile ? 0.1 : 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: isMobile ? 10 : 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: isMobile ? 15 : 12
      }
    }
  };

  const cardVariants = {
    hidden: { scale: isMobile ? 0.98 : 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    },
    hover: {
      y: isMobile ? -3 : -5,
      boxShadow: isMobile ? "0 10px 25px rgba(0,0,0,0.1)" : "0 20px 40px rgba(0,0,0,0.1)",
      transition: {
        type: "spring",
        stiffness: 300
      }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: isMobile ? 0 : -20, y: isMobile ? 20 : 0 },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        delay: isMobile ? 0.1 : 0.3
      }
    }
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: isMobile ? 1.02 : 1.05,
      boxShadow: "0 10px 25px rgba(59, 130, 246, 0.5)",
      transition: {
        type: "spring",
        stiffness: 400
      }
    },
    tap: { scale: 0.95 }
  };

  const contactItems = [
    {
      icon: <FiPhone className="text-xl" />,
      title: "Phone Number",
      detail: "+91 98765 43210",
      subdetail: "Mon-Sat, 9:00 AM - 7:00 PM",
      color: "from-blue-500 to-cyan-400",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
      href: "tel:+919876543210"
    },
    {
      icon: <FiMail className="text-xl" />,
      title: "Email Address",
      detail: "padmambaprinting@gmail.com",
      subdetail: "We respond within 24 hours",
      color: "from-purple-500 to-pink-400",
      bgColor: "bg-gradient-to-br from-purple-50 to-pink-50",
      href: "mailto:padmambaprinting@gmail.com"
    },
    {
      icon: <FiMapPin className="text-xl" />,
      title: "Our Location",
      detail: "Bangalore, Karnataka, India",
      subdetail: "Visit our printing facility",
      color: "from-green-500 to-emerald-400",
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
      href: "https://maps.google.com/?q=Bangalore+Karnataka+India"
    }
  ];

  const businessHours = [
    { day: "Monday - Friday", time: "9:00 AM - 7:00 PM", color: "text-blue-600", icon: <FiCalendar /> },
    { day: "Saturday", time: "10:00 AM - 5:00 PM", color: "text-blue-600", icon: <FiCalendar /> },
    { day: "Sunday", time: "Closed", color: "text-red-500", icon: <FiClock /> }
  ];

  // Responsive text sizes
  const getResponsiveText = {
    heroTitle: isMobile ? "text-4xl" : isTablet ? "text-5xl" : "text-6xl lg:text-7xl",
    sectionTitle: isMobile ? "text-2xl" : "text-3xl",
    cardTitle: isMobile ? "text-lg" : "text-xl",
    bodyText: isMobile ? "text-base" : "text-lg"
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-20 md:pt-32 pb-8 md:pb-12 px-4 sm:px-6 overflow-hidden">
      {/* Animated Background Elements - Reduced on mobile */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {!isMobile && (
          <>
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 md:opacity-30 animate-pulse"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 md:opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 md:opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
          </>
        )}
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Hero Header - Mobile Optimized */}
        <motion.div 
          initial={{ y: isMobile ? -20 : -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className={`${getResponsiveText.heroTitle} font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent mb-3 md:mb-4 px-2`}>
            Get in Touch
          </h1>
          <p className={`${getResponsiveText.bodyText} text-gray-600 max-w-2xl md:max-w-3xl mx-auto px-2`}>
            Have questions about our printing services? We're here to help and ready to bring your creative ideas to life.
          </p>
          
          {/* Quick Contact Buttons for Mobile */}
          {isMobile && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-3 mt-6"
            >
              <a
                href="tel:+919876543210"
                className="bg-blue-600 text-white px-4 py-3 rounded-lg font-medium text-sm inline-flex items-center gap-2"
              >
                <FiPhone className="text-sm" />
                Call Now
              </a>
              <a
                href="mailto:padmambaprinting@gmail.com"
                className="bg-white text-blue-600 border border-blue-600 px-4 py-3 rounded-lg font-medium text-sm inline-flex items-center gap-2"
              >
                <FiMail className="text-sm" />
                Email
              </a>
            </motion.div>
          )}
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
          {/* Left Column - Contact Information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div 
              variants={itemVariants}
              className="bg-gradient-to-br from-white to-gray-50 shadow-lg md:shadow-2xl rounded-2xl md:rounded-3xl p-6 md:p-8 mb-6 md:mb-8 border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-6 md:mb-8">
                <span className="bg-gradient-to-r from-blue-600 to-cyan-500 w-1.5 md:w-2 h-8 md:h-10 rounded-full"></span>
                <h2 className={`${getResponsiveText.sectionTitle} font-bold text-gray-900`}>
                  Contact Information
                </h2>
              </div>
              
              <div className="space-y-4 md:space-y-6">
                {contactItems.map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.href}
                    target={item.href.includes('maps') ? "_blank" : "_self"}
                    rel={item.href.includes('maps') ? "noopener noreferrer" : ""}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    whileTap={{ scale: 0.98 }}
                    custom={index}
                    className={`${item.bgColor} p-4 md:p-6 rounded-xl md:rounded-2xl border border-gray-200 block transition-all duration-300`}
                  >
                    <div className="flex items-start gap-3 md:gap-4">
                      <div className={`p-3 md:p-4 rounded-lg md:rounded-xl bg-gradient-to-br ${item.color} text-white shadow-md md:shadow-lg transform transition-transform duration-300 hover:scale-105 flex-shrink-0`}>
                        {item.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`${getResponsiveText.cardTitle} font-bold text-gray-900 truncate`}>{item.title}</h3>
                        <p className="text-gray-800 text-sm md:text-base mt-1 md:mt-2 font-medium break-words">{item.detail}</p>
                        <p className="text-gray-600 text-xs md:text-sm mt-1 truncate">{item.subdetail}</p>
                      </div>
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Business Hours Card */}
            <motion.div
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover={isMobile ? {} : "hover"}
              className="bg-gradient-to-br from-white to-gray-50 shadow-lg md:shadow-2xl rounded-2xl md:rounded-3xl p-6 md:p-8 border border-gray-100"
            >
              <div className="flex items-center gap-3 mb-6">
                <FiClock className="text-blue-600 text-xl" />
                <h3 className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-gray-900`}>
                  Business Hours
                </h3>
              </div>
              
              <div className="space-y-3 md:space-y-4">
                {businessHours.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: isMobile ? -10 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex justify-between items-center py-3 md:py-4 border-b border-gray-100 last:border-0"
                  >
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="text-gray-500">{item.icon}</div>
                      <span className="font-medium text-gray-700 text-sm md:text-base">{item.day}</span>
                    </div>
                    <span className={`font-semibold text-sm md:text-base ${item.color}`}>
                      {item.time}
                    </span>
                  </motion.div>
                ))}
              </div>
              
              {/* Mobile-optimized info box */}
              <div className={`mt-6 p-3 md:p-4 ${isMobile ? 'bg-blue-50 rounded-lg' : 'bg-blue-50 rounded-xl'}`}>
                <div className="flex items-start gap-2 md:gap-3">
                  <FiMessageSquare className="text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-blue-800 text-xs md:text-sm font-medium">
                      <span className="font-bold">Response Time:</span> 1-2 business hours
                    </p>
                    <p className="text-blue-700 text-xs md:text-sm mt-1">
                      For urgent matters, please call us directly
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Contact Form */}
          <motion.div
            variants={formVariants}
            initial="hidden"
            animate="visible"
            className="bg-gradient-to-br from-white to-gray-50 shadow-lg md:shadow-2xl rounded-2xl md:rounded-3xl p-6 md:p-8 border border-gray-100"
          >
            <div className="mb-6 md:mb-8">
              <div className="flex items-center gap-3 mb-3">
                <span className="bg-gradient-to-r from-purple-600 to-pink-500 w-1.5 md:w-2 h-8 md:h-10 rounded-full"></span>
                <h2 className={`${getResponsiveText.sectionTitle} font-bold text-gray-900`}>
                  Send Us a Message
                </h2>
              </div>
              <p className="text-gray-600 text-sm md:text-base">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>
            </div>
            
            {/* Status Messages - Mobile Optimized */}
            {submitStatus === "success" && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mb-4 md:mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl md:rounded-2xl flex items-start gap-3 md:gap-4"
              >
                <div className="bg-green-100 p-2 rounded-full flex-shrink-0">
                  <FiCheck className="text-green-600 text-lg md:text-xl" />
                </div>
                <div>
                  <h4 className="font-bold text-green-800 text-sm md:text-base">Message Sent Successfully!</h4>
                  <p className="text-green-700 text-xs md:text-sm mt-1">Thank you for contacting us. We'll get back to you within 24 hours.</p>
                </div>
              </motion.div>
            )}
            
            {submitStatus === "error" && (
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="mb-4 md:mb-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-xl md:rounded-2xl flex items-start gap-3 md:gap-4"
              >
                <div className="bg-red-100 p-2 rounded-full flex-shrink-0">
                  <FiAlertCircle className="text-red-600 text-lg md:text-xl" />
                </div>
                <div>
                  <h4 className="font-bold text-red-800 text-sm md:text-base">Oops! Something went wrong.</h4>
                  <p className="text-red-700 text-xs md:text-sm mt-1">Please try again or contact us directly via phone/email.</p>
                </div>
              </motion.div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <motion.div whileHover={{ scale: isMobile ? 1.01 : 1.02 }} whileTap={{ scale: 0.98 }}>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm md:text-base">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setActiveField('name')}
                    onBlur={() => setActiveField(null)}
                    placeholder="John Doe"
                    required
                    className={`w-full border-2 ${activeField === 'name' ? 'border-blue-500' : 'border-gray-200'} px-4 py-3 md:px-5 md:py-4 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent transition-all duration-300 bg-white text-sm md:text-base`}
                  />
                </motion.div>

                <motion.div whileHover={{ scale: isMobile ? 1.01 : 1.02 }} whileTap={{ scale: 0.98 }}>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm md:text-base">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setActiveField('email')}
                    onBlur={() => setActiveField(null)}
                    placeholder="john@example.com"
                    required
                    className={`w-full border-2 ${activeField === 'email' ? 'border-blue-500' : 'border-gray-200'} px-4 py-3 md:px-5 md:py-4 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent transition-all duration-300 bg-white text-sm md:text-base`}
                  />
                </motion.div>
              </div>

              <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                <motion.div whileHover={{ scale: isMobile ? 1.01 : 1.02 }} whileTap={{ scale: 0.98 }}>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm md:text-base">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => setActiveField('phone')}
                    onBlur={() => setActiveField(null)}
                    placeholder="+91 98765 43210"
                    className={`w-full border-2 ${activeField === 'phone' ? 'border-blue-500' : 'border-gray-200'} px-4 py-3 md:px-5 md:py-4 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent transition-all duration-300 bg-white text-sm md:text-base`}
                  />
                </motion.div>

                <motion.div whileHover={{ scale: isMobile ? 1.01 : 1.02 }} whileTap={{ scale: 0.98 }}>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm md:text-base">
                    Subject
                  </label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    onFocus={() => setActiveField('subject')}
                    onBlur={() => setActiveField(null)}
                    className={`w-full border-2 ${activeField === 'subject' ? 'border-blue-500' : 'border-gray-200'} px-4 py-3 md:px-5 md:py-4 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent transition-all duration-300 bg-white text-sm md:text-base appearance-none`}
                    style={{ WebkitAppearance: 'none', MozAppearance: 'none' }}
                  >
                    <option value="">Select a subject</option>
                    <option value="business-cards">Business Cards</option>
                    <option value="brochures">Brochures & Flyers</option>
                    <option value="banners">Banners & Signage</option>
                    <option value="packaging">Packaging</option>
                    <option value="other">Other</option>
                  </select>
                </motion.div>
              </div>

              <motion.div whileHover={{ scale: isMobile ? 1.01 : 1.02 }} whileTap={{ scale: 0.98 }}>
                <label className="block text-gray-700 font-semibold mb-2 text-sm md:text-base">
                  Your Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onFocus={() => setActiveField('message')}
                  onBlur={() => setActiveField(null)}
                  placeholder="Tell us about your printing requirements, quantity, timeline, and any specific details..."
                  rows={isMobile ? 4 : 5}
                  required
                  className={`w-full border-2 ${activeField === 'message' ? 'border-blue-500' : 'border-gray-200'} px-4 py-3 md:px-5 md:py-4 rounded-lg md:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-transparent transition-all duration-300 bg-white text-sm md:text-base resize-none`}
                />
              </motion.div>

              <motion.div
                variants={buttonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                className="text-center pt-2 md:pt-4"
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-6 py-4 md:px-10 md:py-5 rounded-xl md:rounded-2xl font-semibold hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2 md:gap-3 w-full md:w-auto text-base md:text-lg shadow-lg"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4 md:h-5 md:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span className="md:ml-2">Sending...</span>
                    </>
                  ) : (
                    <>
                      <FiSend className="text-lg md:text-xl" />
                      <span>Send Message</span>
                      {!isMobile && <FiChevronRight className="text-xl" />}
                    </>
                  )}
                </button>
              </motion.div>
            </form>
            
            {/* Additional Info - Mobile Optimized */}
            <motion.div
              initial={{ opacity: 0, y: isMobile ? 10 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-6 md:mt-10 pt-6 md:pt-8 border-t border-gray-100"
            >
              <div className={`${isMobile ? 'p-3 rounded-lg' : 'p-4 md:p-6 rounded-2xl'} bg-gradient-to-r from-gray-50 to-white shadow-sm`}>
                <div className="flex items-center gap-2 md:gap-3">
                  <div className="bg-blue-100 p-2 rounded-full flex-shrink-0">
                    <FiClock className="text-blue-600 text-sm md:text-base" />
                  </div>
                  <div>
                    <p className="text-gray-800 font-medium text-sm md:text-base">
                      <span className="text-blue-600">1-2 business hours</span> response time
                    </p>
                    <p className="text-gray-600 text-xs md:text-sm mt-1">
                      For urgent inquiries, call us directly at +91 98765 43210
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* CTA Banner - Mobile Optimized */}
        <motion.div
          initial={{ opacity: 0, y: isMobile ? 20 : 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-2xl md:rounded-3xl p-6 md:p-8 text-center text-white shadow-xl md:shadow-2xl"
        >
          <h3 className={`${isMobile ? 'text-xl' : 'text-2xl md:text-3xl'} font-bold mb-2 md:mb-3`}>
            Ready to Start Your Printing Project?
          </h3>
          <p className="text-blue-100 mb-4 md:mb-6 text-sm md:text-base max-w-2xl mx-auto">
            Contact us today for a free consultation and quote. Let's create something amazing together!
          </p>
          <div className="flex flex-wrap gap-3 md:gap-4 justify-center">
            <motion.a
              href="tel:+919876543210"
              whileHover={{ scale: isMobile ? 1.02 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-blue-600 px-4 py-3 md:px-6 md:py-3 rounded-lg md:rounded-xl font-semibold hover:bg-blue-50 transition-colors duration-300 inline-flex items-center justify-center gap-2 text-sm md:text-base w-full md:w-auto"
            >
              <FiPhone className="text-sm md:text-base" />
              Call Now
            </motion.a>
            <motion.a
              href="mailto:padmambaprinting@gmail.com"
              whileHover={{ scale: isMobile ? 1.02 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent border border-white text-white px-4 py-3 md:px-6 md:py-3 rounded-lg md:rounded-xl font-semibold hover:bg-white/10 transition-colors duration-300 inline-flex items-center justify-center gap-2 text-sm md:text-base w-full md:w-auto mt-2 md:mt-0"
            >
              <FiMail className="text-sm md:text-base" />
              Email Us
            </motion.a>
          </div>
        </motion.div>

        {/* Map/Address Section for Mobile */}
        {isMobile && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6 bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FiMapPin className="text-blue-600" />
              Visit Our Studio
            </h3>
            <div className="space-y-4">
              <div className="bg-gray-100 rounded-xl p-4 h-48 flex items-center justify-center">
                <div className="text-center">
                  <FiMapPin className="text-3xl text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 text-sm">
                    Bangalore, Karnataka<br />
                    India
                  </p>
                </div>
              </div>
              <a
                href="https://maps.google.com/?q=Bangalore+Karnataka+India"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg font-medium"
              >
                Open in Google Maps
              </a>
            </div>
          </motion.div>
        )}
      </div>

      {/* Bottom Padding for Mobile */}
      <div className={`${isMobile ? 'h-8' : 'h-12'}`}></div>
    </div>
  );
}

export default Contact;