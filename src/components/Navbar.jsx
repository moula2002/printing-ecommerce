import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiUser,
  FiShoppingCart,
  FiChevronDown,
  FiX,
  FiPackage,
  FiHome,
  FiGrid,
  FiMail,
  FiSearch,
  FiShoppingBag
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import SignInDrawer from "../pages/auth/SignInDrawer";
import CreateAccountDrawer from "../pages/auth/CreateAccountDrawer";

const Navbar = () => {
  const navigate = useNavigate();
  const { cart } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  const [isScrolled, setIsScrolled] = useState(false);
  const [openSignIn, setOpenSignIn] = useState(false);
  const [openCreate, setOpenCreate] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const dropdownRef = useRef(null);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowMobileSearch(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navItems = [
    { name: "Services", icon: <FiGrid />, path: "/services" },
    { name: "Contact", icon: <FiMail />, path: "/contact" }
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setShowMobileSearch(false);
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#FAF9F6]/95 backdrop-blur-md shadow-lg py-2"
            : "bg-[#FAF9F6] py-3"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            
            {/* LEFT */}
            <div className="flex items-center gap-4 flex-shrink-0">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100/80 transition-colors"
              >
                <FiMenu size={24} />
              </motion.button>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/" className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                    <FiPackage className="text-white" />
                  </div>
                  <span className="font-bold text-xl hidden sm:block tracking-tight">
                    PADMAMBA
                  </span>
                </Link>
              </motion.div>
            </div>

            {/* 🔥 DESKTOP SEARCH BAR */}
            <div className="hidden md:block flex-1 max-w-2xl mx-4">
              <form onSubmit={handleSearchSubmit}>
                <div className="relative">
                  <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    ref={searchRef}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products, brands, and more..."
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20 focus:outline-none transition-all duration-300"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 hover:text-gray-900"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3 md:gap-4">
              {/* MOBILE SEARCH BUTTON */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowMobileSearch(!showMobileSearch)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FiSearch size={22} />
              </motion.button>

              <nav className="hidden lg:flex gap-8">
                {navItems.map((item) => (
                  <motion.div
                    key={item.name}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to={item.path}
                      className="font-semibold text-gray-700 hover:text-gray-900 relative group"
                    >
                      {item.name}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gray-900 group-hover:w-full transition-all duration-300"></span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/cart")}
                className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FiShoppingCart size={22} />
                {totalItems > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-[11px] w-5 h-5 rounded-full flex items-center justify-center shadow-md"
                  >
                    {totalItems}
                  </motion.span>
                )}
              </motion.button>

              {/* ACCOUNT DROPDOWN */}
              <div className="relative" ref={dropdownRef}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-gray-900 to-black text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <FiUser />
                  <span className="hidden md:block">Account</span>
                  <FiChevronDown
                    className={`transition-transform duration-300 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </motion.button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-3 w-56 bg-white shadow-2xl rounded-xl overflow-hidden border border-gray-100 z-50"
                    >
                      <div className="p-2">
                        <button
                          onClick={() => {
                            setOpenSignIn(true);
                            setIsDropdownOpen(false);
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-3"
                        >
                          <FiUser className="text-gray-600" />
                          <div>
                            <p className="font-semibold">Sign In</p>
                            <p className="text-sm text-gray-500">Access your account</p>
                          </div>
                        </button>

                        <button
                          onClick={() => {
                            setOpenCreate(true);
                            setIsDropdownOpen(false);
                          }}
                          className="w-full px-4 py-3 text-left hover:bg-gray-50 rounded-lg transition-colors flex items-center gap-3"
                        >
                          <div className="w-6 h-6 rounded-full border-2 border-gray-900 flex items-center justify-center">
                            <span className="text-xs font-bold">+</span>
                          </div>
                          <div>
                            <p className="font-semibold">Create Account</p>
                            <p className="text-sm text-gray-500">New to Padmamba?</p>
                          </div>
                        </button>

                        <div className="border-t border-gray-100 my-2"></div>

                        <Link
                          to="/myorders"
                          onClick={() => setIsDropdownOpen(false)}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 rounded-lg transition-colors w-full"
                        >
                          <FiShoppingBag className="text-gray-600" />
                          <div>
                            <p className="font-semibold">My Orders</p>
                            <p className="text-sm text-gray-500">Track & manage orders</p>
                          </div>
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* MOBILE SEARCH BAR - Slides down when active */}
          <AnimatePresence>
            {showMobileSearch && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="md:hidden overflow-hidden"
              >
                <form onSubmit={handleSearchSubmit} className="pt-4 pb-2">
                  <div className="relative">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      ref={searchRef}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search products..."
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-gray-900 focus:ring-2 focus:ring-gray-900/20 focus:outline-none transition-all duration-300"
                      autoFocus
                    />
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => setSearchQuery("")}
                        className="absolute right-12 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      >
                        <FiX size={18} />
                      </button>
                    )}
                    <button
                      type="submit"
                      className="absolute right-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-black transition-colors"
                    >
                      Go
                    </button>
                  </div>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* MOBILE SIDE MENU - Enhanced with smoother animation */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3, ease: "easeInOut" }}
              className="fixed left-0 top-0 bottom-0 w-80 bg-[#FAF9F6] z-[70] p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                    <FiPackage className="text-white" />
                  </div>
                  <span className="font-bold text-xl">PADMAMBA</span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <FiX size={24} />
                </motion.button>
              </div>

              <div className="space-y-2">
                <motion.div
                  whileTap={{ scale: 0.98 }}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <Link
                    to="/"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-4 p-4 hover:bg-gray-100 rounded-xl transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gray-900/10 flex items-center justify-center group-hover:bg-gray-900/20 transition-colors">
                      <FiHome className="text-gray-700" />
                    </div>
                    <span className="font-semibold">Home</span>
                  </Link>
                </motion.div>

                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    whileTap={{ scale: 0.98 }}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <Link
                      to={item.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="flex items-center gap-4 p-4 hover:bg-gray-100 rounded-xl transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gray-900/10 flex items-center justify-center group-hover:bg-gray-900/20 transition-colors">
                        {item.icon}
                      </div>
                      <span className="font-semibold">{item.name}</span>
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="absolute bottom-6 left-6 right-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setOpenSignIn(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full bg-gradient-to-r from-gray-900 to-black text-white py-3.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Sign In
                </motion.button>
                <p className="text-center text-gray-500 text-sm mt-4">
                  New customer?{" "}
                  <button
                    onClick={() => {
                      setOpenCreate(true);
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-gray-900 font-semibold hover:underline"
                  >
                    Create account
                  </button>
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <SignInDrawer
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
        onSignUpClick={() => {
          setOpenSignIn(false);
          setOpenCreate(true);
        }}
      />
      <CreateAccountDrawer
        open={openCreate}
        onClose={() => setOpenCreate(false)}
      />
    </>
  );
};

export default Navbar;