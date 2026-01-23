import React, { useState } from "react";
import {
  FiChevronDown,
  FiPackage,
  FiMail,
  FiTag,
  FiFileText,
  FiShoppingBag,
  FiScissors,
  FiStar,
  FiGrid,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const NAVBAR_HEIGHT = 60;

const SecondHeader = () => {
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const categories = [
    { name: "Photo Albums", icon: <FiStar />, id: "photo-albums" },
    { name: "Snapbooks", icon: <FiPackage />, id: "snapbooks" },
    { name: "Bill Books", icon: <FiFileText />, id: "bill-books" },
    { name: "Boxes", icon: <FiPackage />, id: "boxes" },
    { name: "Envelopes", icon: <FiMail />, id: "envelopes" },
    { name: "Labels", icon: <FiTag />, id: "labels" },
    { name: "Poly Bags", icon: <FiShoppingBag />, id: "poly-bags" },
    { name: "Tape", icon: <FiScissors />, id: "tape" },
  ];

  return (
    <>
      {/* ================= DESKTOP DROPDOWN ================= */}
      <div
        className="hidden lg:block fixed left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-200"
        style={{ top: NAVBAR_HEIGHT }}
      >
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center gap-6">

            {/* DESKTOP ALL CATEGORIES */}
            <div className="relative" onMouseLeave={() => setIsCategoriesOpen(false)}>
              <button
                onMouseEnter={() => setIsCategoriesOpen(true)}
                className="flex items-center gap-2 px-5 py-2 bg-black text-white rounded-xl text-sm font-bold shadow mt-2"
              >

                <FiGrid />
                All Categories
                <FiChevronDown className={`transition ${isCategoriesOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {isCategoriesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 mt-3 w-[420px] bg-white rounded-2xl shadow-2xl border z-50"
                  >
                    <div className="p-4 grid grid-cols-2 gap-3">
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => {
                            setActiveCategory(cat.name);
                            setIsCategoriesOpen(false);
                          }}
                          className="flex gap-3 p-3 rounded-xl hover:bg-gray-50 text-left"
                        >
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            {cat.icon}
                          </div>
                          <div className="font-semibold text-sm">{cat.name}</div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </div>
      </div>

      {/* ================= MOBILE DROPDOWN ONLY ================= */}
      <div
        className="lg:hidden fixed left-0 right-0 z-40 bg-white border-b"

        style={{ top: NAVBAR_HEIGHT }}
      >
        <div className="px-4 py-3">

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="w-full flex items-center justify-between px-4 py-2 bg-black text-white rounded-lg font-bold"
          >
            <div className="flex items-center gap-2">
              <FiGrid />
              All Categories
            </div>
            <FiChevronDown className={`transition ${isMobileOpen ? "rotate-180" : ""}`} />
          </button>

          {/* MOBILE DROPDOWN LIST */}
          <AnimatePresence>
            {isMobileOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white border rounded-xl shadow-lg mt-2 overflow-hidden"
              >
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.name);
                      setIsMobileOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 border-b last:border-none hover:bg-gray-50 text-sm font-semibold"
                  >
                    {cat.icon}
                    {cat.name}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>
    </>
  );
};

export default SecondHeader;
