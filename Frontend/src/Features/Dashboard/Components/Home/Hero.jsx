import React from "react";
import snitchbg from "../../../../assets/snitchbg1.webp";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative w-full h-screen flex items-center overflow-hidden bg-[var(--bg-primary)] transition-colors duration-300">
      {/* 1. Cinematic Background Image with Subtle Zoom */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          className="w-full h-full object-cover object-center transform scale-105 animate-[pulse_20s_ease-in-out_infinite] opacity-90"
          loading="lazy"
          src={snitchbg}
          alt="Modern Menswear Collection"
        />
      </div>

      {/* 2. Smart Protective Overlay (Adapts to Light/Dark Mode automatically) */}
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-[var(--bg-primary)] via-[var(--bg-primary)]/70 to-transparent md:w-3/4 lg:w-2/3 transition-colors duration-300"></div>

      {/* 3. Main Content Container */}
      <div className="relative z-20 w-full px-6 md:px-16 lg:px-24 flex flex-col justify-center pt-20 md:pt-0">
        {/* Editorial Eyebrow */}
        <div className="flex items-center gap-4 mb-6 md:mb-8">
          <span className="w-8 md:w-12 h-[2px] bg-[var(--text-primary)]"></span>
          <span className="text-[9px] md:text-[11px] font-bold uppercase tracking-[0.3em] text-[var(--text-primary)]">
            New Arrivals // Season 2026
          </span>
        </div>

        {/* Clean & Premium Typography */}
        <h1 className="text-[4rem] sm:text-6xl md:text-7xl lg:text-[8.5rem] font-black leading-[0.85] tracking-tighter text-[var(--text-primary)] mb-8">
          ELEVATE. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-500 to-gray-300 drop-shadow-sm">
            YOUR.
          </span>{" "}
          <br />
          EVERYDAY.
        </h1>

        {/* Simple & Clear Subtext */}
        <p className="text-sm md:text-base text-[var(--text-secondary)] font-medium max-w-sm md:max-w-md mb-10 leading-relaxed tracking-wide">
          Discover our latest collection. Premium quality, modern fits, and
          timeless essentials crafted for your daily wardrobe.
        </p>

        {/* Ultra-Premium Button (Animation Preserved!) */}
        <button
          onClick={() => navigate("/shop")}
          className="group relative w-fit bg-[var(--text-primary)] text-[var(--bg-primary)] text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] px-12 md:px-14 py-4 md:py-5 overflow-hidden border border-[var(--text-primary)] transition-all hover:shadow-2xl"
        >
          {/* Button Text */}
          <span className="relative z-10 group-hover:text-[var(--text-primary)] transition-colors duration-500 ease-[cubic-bezier(0.87,0,0.13,1)]">
            Explore Collection
          </span>

          {/* Smooth Sweep Animation (Exactly as you wanted) */}
          <div className="absolute inset-0 bg-[var(--bg-primary)] transform -translate-x-full skew-x-12 group-hover:translate-x-0 group-hover:skew-x-0 transition-transform duration-500 ease-[cubic-bezier(0.87,0,0.13,1)]"></div>
        </button>
      </div>
    </section>
  );
};

export default Hero;
