import React, { useState, useEffect } from "react";
import { 
  FiPrinter, 
  FiBookOpen, 
  FiImage, 
  FiLayers, 
  FiTruck, 
  FiCheckCircle,
  FiStar,
  FiAward,
  FiUsers,
  FiClock,
  FiPackage
} from "react-icons/fi";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

function Services() {
  const [activeService, setActiveService] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const services = [
    {
      id: 1,
      title: "Photo Album Printing",
      icon: <FiBookOpen className="text-4xl" />,
      desc: "Premium quality photo albums with custom covers, glossy & matte finish, and lay-flat binding. Perfect for weddings and special events.",
      features: ["Custom Covers", "Lay-flat Binding", "Premium Paper", "Multiple Sizes"],
      color: "from-orange-500 to-amber-500",
      bgColor: "bg-gradient-to-br from-orange-50 to-amber-50",
      delay: 0.1
    },
    {
      id: 2,
      title: "Digital Photo Printing",
      icon: <FiImage className="text-4xl" />,
      desc: "High-resolution photo prints on premium paper with vibrant colors and long-lasting quality. Archival quality prints.",
      features: ["High Resolution", "Archival Quality", "Multiple Finishes", "Fast Turnaround"],
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-gradient-to-br from-pink-50 to-rose-50",
      delay: 0.2
    },
    {
      id: 3,
      title: "Custom Snapbooks",
      icon: <FiLayers className="text-4xl" />,
      desc: "Modern snapbooks with magnetic closure, personalized covers, and premium pages. Elegant and durable designs.",
      features: ["Magnetic Closure", "Personalized Covers", "Premium Binding", "Custom Layouts"],
      color: "from-purple-500 to-violet-500",
      bgColor: "bg-gradient-to-br from-purple-50 to-violet-50",
      delay: 0.3
    },
    {
      id: 4,
      title: "Bulk Printing Services",
      icon: <FiPrinter className="text-4xl" />,
      desc: "Bulk printing solutions for events, weddings, corporate needs, and promotional materials. Volume discounts available.",
      features: ["Volume Discounts", "Corporate Printing", "Event Printing", "Quick Delivery"],
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-gradient-to-br from-blue-50 to-cyan-50",
      delay: 0.4
    },
    {
      id: 5,
      title: "Fast Delivery",
      icon: <FiTruck className="text-4xl" />,
      desc: "Quick and secure delivery across India with safe packaging and real-time tracking support. Pan-India service.",
      features: ["Pan-India Delivery", "Real-time Tracking", "Safe Packaging", "Express Options"],
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-gradient-to-br from-green-50 to-emerald-50",
      delay: 0.5
    },
    {
      id: 6,
      title: "Quality Assurance",
      icon: <FiCheckCircle className="text-4xl" />,
      desc: "Every product undergoes rigorous quality checks to ensure premium finish and complete customer satisfaction.",
      features: ["100% Quality Check", "Premium Materials", "Satisfaction Guarantee", "Expert Craftsmanship"],
      color: "from-red-500 to-pink-500",
      bgColor: "bg-gradient-to-br from-red-50 to-pink-50",
      delay: 0.6
    },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Wedding Photographer",
      text: "The photo albums from PADMAMBA are absolutely stunning! The quality exceeded my expectations.",
      rating: 5
    },
    {
      name: "Rahul Verma",
      role: "Event Manager",
      text: "Bulk printing for our corporate event was handled perfectly. Professional and timely delivery.",
      rating: 5
    },
    {
      name: "Anjali Patel",
      role: "Professional Photographer",
      text: "The print quality is exceptional. My clients love the premium feel of their photo albums.",
      rating: 5
    }
  ];

  const stats = [
    { number: "10K+", label: "Happy Customers", icon: <FiUsers />, color: "text-blue-600" },
    { number: "50K+", label: "Projects Completed", icon: <FiPackage />, color: "text-green-600" },
    { number: "24/7", label: "Support Available", icon: <FiClock />, color: "text-purple-600" },
    { number: "99%", label: "Satisfaction Rate", icon: <FiAward />, color: "text-orange-600" },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: (delay) => ({
      scale: 1,
      opacity: 1,
      transition: {
        delay: delay,
        type: "spring",
        stiffness: 100
      }
    }),
    hover: {
      y: -15,
      scale: 1.05,
      boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
      transition: {
        type: "spring",
        stiffness: 300
      }
    }
  };

  const fadeInUp = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-34 pb-16 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 -left-40 w-96 h-96 bg-gradient-to-r from-orange-100 to-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute top-1/2 -right-40 w-96 h-96 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/4 left-1/2 transform -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-green-100 to-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 px-4"
      >
        <div className="inline-block mb-6">
          <motion.span 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="inline-block bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold mb-4"
          >
            Premium Printing Solutions
          </motion.span>
        </div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6"
        >
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Our Services
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-xl text-gray-600 max-w-3xl mx-auto mb-10"
        >
          PADMAMBA Printing provides premium photo album and printing services with 
          cutting-edge technology and expert craftsmanship.
        </motion.p>

        {/* Stats Counter */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mt-12"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg border border-gray-100"
            >
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className={`p-2 rounded-full bg-gray-100 ${stat.color}`}>
                  {stat.icon}
                </div>
                <div>
                  <div className="text-3xl font-bold text-gray-900">{stat.number}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Services Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        className="max-w-7xl mx-auto px-4 mb-20"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              custom={service.delay}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              onMouseEnter={() => setActiveService(index)}
              className={`relative overflow-hidden rounded-3xl ${service.bgColor} p-8 border border-gray-200 cursor-pointer transition-all duration-300`}
            >
              {/* Animated Background Element */}
              <div className={`absolute -right-10 -top-10 w-40 h-40 bg-gradient-to-br ${service.color} opacity-10 rounded-full`}></div>
              
              <div className="relative z-10">
                {/* Icon Container */}
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${service.color} text-white mb-6 shadow-lg`}
                >
                  {service.icon}
                </motion.div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>
                
                <p className="text-gray-700 mb-6 leading-relaxed">
                  {service.desc}
                </p>

                {/* Features List */}
                <div className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-center gap-3 text-gray-700"
                    >
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color}`}></div>
                      <span className="text-sm font-medium">{feature}</span>
                    </motion.div>
                  ))}
                </div>

                {/* Action Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-3 rounded-xl bg-gradient-to-r ${service.color} text-white font-semibold mt-4 shadow-md hover:shadow-lg transition-shadow duration-300`}
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Why Choose Us Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto px-4 mb-20"
      >
        <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-12">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl font-bold text-white mb-4 text-center"
            >
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-pink-400">PADMAMBA</span>?
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-gray-300 text-center mb-12 max-w-3xl mx-auto text-lg"
            >
              We combine cutting-edge technology with traditional craftsmanship to deliver exceptional printing solutions.
            </motion.p>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Premium Materials",
                  desc: "We use only the finest papers, inks, and binding materials to ensure your memories last a lifetime.",
                  icon: "✨",
                  delay: 0.1
                },
                {
                  title: "Affordable Excellence",
                  desc: "Get premium quality at competitive prices with flexible packages for every budget.",
                  icon: "💰",
                  delay: 0.2
                },
                {
                  title: "Customer First",
                  desc: "100% satisfaction guarantee with dedicated support and easy customization options.",
                  icon: "❤️",
                  delay: 0.3
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: item.delay }}
                  whileHover={{ scale: 1.05 }}
                  className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700"
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Testimonials Carousel */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-4 mb-20"
      >
        <motion.h2 
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-12"
        >
          What Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Customers Say</span>
        </motion.h2>

        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: true,
          }}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          modules={[EffectCoverflow, Autoplay, Pagination]}
          className="mySwiper"
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide key={index} className="max-w-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="bg-white p-8 rounded-3xl shadow-xl"
              >
                {/* Rating Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FiStar key={i} className="text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-700 text-lg italic mb-8">
                  "{testimonial.text}"
                </p>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto px-4"
      >
        <div className="relative overflow-hidden rounded-3xl">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-90"></div>
          
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '30px'
            }}></div>
          </div>
          
          <div className="relative z-10 p-12 text-center">
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-white mb-6"
            >
              Ready to Bring Your Vision to Life?
            </motion.h3>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-blue-100 mb-8 text-lg"
            >
              Contact us today for a free consultation and sample. Let's create something extraordinary together!
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300"
              >
                Get Free Quote
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-300"
              >
                View Portfolio
              </motion.button>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Services;