import React, { useState, useEffect } from "react";

function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      title: "Professional HD Printing",
      subtitle: "Crystal clear quality for businesses that demand perfection.",
      tag: "PREMIUM QUALITY"
    },
    {
      image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      title: "Custom Packaging Solutions",
      subtitle: "Elevate your brand with high-end custom printed boxes.",
      tag: "FAST DELIVERY"
    },
    {
      image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      title: "Marketing Materials",
      subtitle: "Brochures, flyers, and cards with stunning UV finishes.",
      tag: "BEST PRICES"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Main Image */}
          <img
            src={slide.image}
            alt={slide.title}
            className="h-full w-full object-cover"
          />
          {/* Dark Overlay to make text readable */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
      ))}

      {/* Content Overlay */}
      <div className="relative z-10 flex h-full items-center justify-center px-4 text-center">
        <div className="max-w-4xl">
          {/* Animated Badge */}
          <div className="mb-6 inline-block rounded-full bg-blue-600 px-4 py-1.5 text-xs font-bold uppercase tracking-widest text-white animate-fade-in">
            {slides[currentSlide].tag}
          </div>

          {/* Main Heading */}
          <h1 className="mb-6 text-5xl font-extrabold text-white md:text-7xl lg:text-8xl tracking-tight">
            {slides[currentSlide].title}
          </h1>

          {/* Subheading */}
          <p className="mb-10 text-xl text-gray-200 md:text-2xl font-light">
            {slides[currentSlide].subtitle}
          </p>

          {/* Buttons */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <button className="w-full sm:w-auto rounded-full bg-white px-8 py-4 text-lg font-bold text-black transition-transform hover:scale-105 active:scale-95">
              Get Started Now
            </button>
            <button className="w-full sm:w-auto rounded-full border-2 border-white px-8 py-4 text-lg font-bold text-white backdrop-blur-sm transition-all hover:bg-white hover:text-black">
              View Our Work
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-md hover:bg-white/20"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-md hover:bg-white/20"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-1.5 transition-all duration-300 ${
              index === currentSlide ? "w-12 bg-white" : "w-6 bg-white/40"
            } rounded-full`}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
}

export default HeroBanner;