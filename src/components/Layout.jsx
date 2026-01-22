import React from "react";
import Navbar from "./Navbar";
import SecondHeader from "./SecondHeader";
import Footer from "./Footer"; // ✅ FIXED PATH

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top Navbar */}
      <Navbar />

      {/* Categories / Second Header */}
      <SecondHeader />

      {/* Page Content */}
      <main >
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Layout;
