import React from "react";
import HeroBanner from "../components/HeroBanner";
import TrendingProducts from "../pages/TrendingProducts";
import LatestProducts from "./LatestProducts";

function Home() {
  return (
    <div>
      {/* 🔥 HERO BANNER */}
      <HeroBanner />

      {/* ⭐ TRENDING PRODUCTS  */}
      <TrendingProducts />

      {/* LATEST PRODUCTS */}
      <LatestProducts/>
    </div>
  );
}

export default Home;
