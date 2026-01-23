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
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);

    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
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

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#FAF9F6]/95 backdrop-blur-md shadow-lg"
            : "bg-[#FAF9F6]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            
            {/* LEFT */}
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100/80"
              >
                <FiMenu size={24} />
              </button>

              <Link to="/" className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-gray-900 flex items-center justify-center">
                  <FiPackage className="text-white" />
                </div>
                <span className="font-bold text-xl hidden sm:block">
                  PADMAMBA
                </span>
              </Link>
            </div>

            {/* 🔥 SEARCH BAR (MOBILE + DESKTOP) */}
            <div className="flex-1 w-full sm:max-w-md">
              <div className="relative">
                <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200"
                />
              </div>
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-4">
              <nav className="hidden lg:flex gap-8">
                {navItems.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="font-semibold text-gray-700 hover:text-gray-900"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              <button
                onClick={() => navigate("/cart")}
                className="relative p-2 rounded-lg hover:bg-gray-100"
              >
                <FiShoppingCart size={22} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-[11px] w-5 h-5 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* ACCOUNT DROPDOWN */}
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-black text-white rounded-xl"
                >
                  <FiUser />
                  <span className="hidden md:block">Account</span>
                  <FiChevronDown
                    className={`transition ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-3 w-52 bg-white shadow-xl rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() => {
                          setOpenSignIn(true);
                          setIsDropdownOpen(false);
                        }}
                        className="w-full px-5 py-3 text-left hover:bg-gray-50"
                      >
                        Sign In
                      </button>

                      <button
                        onClick={() => {
                          setOpenCreate(true);
                          setIsDropdownOpen(false);
                        }}
                        className="w-full px-5 py-3 text-left hover:bg-gray-50"
                      >
                        Create Account
                      </button>

                      <Link
                        to="/myorders"
                        className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 w-full"
                      >
                        <FiShoppingBag />
                        <span>My Orders</span>
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* MOBILE SIDE MENU (UNCHANGED) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-[60]"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              className="fixed left-0 top-0 bottom-0 w-72 bg-[#FAF9F6] z-[70] p-6"
            >
              <div className="flex justify-between mb-6">
                <span className="font-bold text-xl">Menu</span>
                <button onClick={() => setIsMobileMenuOpen(false)}>
                  <FiX size={22} />
                </button>
              </div>

              <Link
                to="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex gap-3 p-3 hover:bg-gray-100 rounded-lg"
              >
                <FiHome /> Home
              </Link>

              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex gap-3 p-3 hover:bg-gray-100 rounded-lg"
                >
                  {item.icon}
                  {item.name}
                </Link>
              ))}

              <button
                onClick={() => {
                  setOpenSignIn(true);
                  setIsMobileMenuOpen(false);
                }}
                className="mt-6 w-full bg-black text-white py-3 rounded-xl"
              >
                Sign In
              </button>
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
