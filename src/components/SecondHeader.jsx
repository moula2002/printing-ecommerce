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
  FiArrowRight,
} from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const NAVBAR_HEIGHT = 68;
const SECOND_HEADER_HEIGHT = 72;

const SecondHeader = () => {
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

  const categories = [
    { name: "Photo Albums", icon: <FiStar />, id: "photo-albums", description: "Premium & custom photo albums" },
    { name: "Snapbooks", icon: <FiPackage />, id: "snapbooks", description: "Modern snap & memory books" },
    { name: "Bill Books", icon: <FiFileText />, id: "bill-books", description: "GST & custom billing books" },
    { name: "Boxes", icon: <FiPackage />, id: "boxes", description: "Corrugated & specialty boxes" },
    { name: "Envelopes", icon: <FiMail />, id: "envelopes", description: "Bubble & poly mailers" },
    { name: "Labels", icon: <FiTag />, id: "labels", description: "Shipping & product labels" },
    { name: "Poly Bags", icon: <FiShoppingBag />, id: "poly-bags", description: "Clear & printed bags" },
    { name: "Tape", icon: <FiScissors />, id: "tape", description: "Packaging & carton tape" },
  ];

  return (
    <>
      {/* ================= DESKTOP ================= */}
      <div
        className="hidden lg:block fixed left-0 right-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200"
        style={{ top: NAVBAR_HEIGHT }}
      >
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between gap-6">

            {/* ALL CATEGORIES */}
            <div className="relative" onMouseLeave={() => setIsCategoriesOpen(false)}>
              <button
                onMouseEnter={() => setIsCategoriesOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl text-sm font-bold"
              >
                <FiGrid />
                All Categories
                <FiChevronDown
                  className={`transition-transform ${isCategoriesOpen ? "rotate-180" : ""}`}
                />
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
                          <div>
                            <div className="text-sm font-bold">{cat.name}</div>
                            <div className="text-[11px] text-gray-500">
                              {cat.description}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* QUICK CATEGORY BAR */}
            <div className="flex-1 flex gap-2 overflow-x-auto no-scrollbar">
              {categories.slice(0, 7).map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.name)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap flex items-center gap-2
                    ${
                      activeCategory === cat.name
                        ? "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-200"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                >
                  {cat.icon}
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ================= MOBILE ================= */}
      <div
        className="lg:hidden fixed left-0 right-0 z-40 bg-white border-b"
        style={{ top: NAVBAR_HEIGHT }}
      >
        <div className="px-4 py-3 flex gap-3 overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveCategory("All Products")}
            className={`px-5 py-2 rounded-full text-xs font-bold ${
              activeCategory === "All Products"
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            All
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.name)}
              className="px-5 py-2 rounded-full text-xs font-bold border whitespace-nowrap"
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* BANNER REMOVED FROM HERE */}
    </>
  );
};

export default SecondHeader;