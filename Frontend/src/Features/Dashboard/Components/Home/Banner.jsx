import React from "react";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();

  return (
    // Height adjusted to be substantial but not take up the whole screen
    <section className="relative w-full h-[60vh] md:h-[75vh] flex items-center justify-center overflow-hidden bg-black mt-10 md:mt-20">
      {/* 1. Cinematic Background Image Container */}
      <div className="absolute inset-0 w-full h-full group">
        {/* High-quality placeholder image - You can replace the src with your own campaign image */}
        <img
          src="https://images.unsplash.com/photo-1561069934-eee225952461?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2xvdGhzJTIwYmclMjB3aXRoJTIwZGlzY291bnR8ZW58MHx8MHx8fDA%3D"
          alt="Campaign Banner"
          loading="lazy"
          className="w-full h-full object-cover object-top opacity-70 transform group-hover:scale-105 transition-transform duration-[2s] ease-out"
        />
        {/* Deep Gradient Overlay to make the white text pop */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
      </div>

      {/* 2. Focused Center Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <span className="text-white/80 text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] mb-4">
          The Signature Edit
        </span>

        <h2 className="text-5xl sm:text-6xl md:text-[7rem] font-black text-white uppercase tracking-tighter leading-[0.9] mb-8">
          FIND YOUR <br /> PERFECT FIT
        </h2>

        <button
          onClick={() => navigate("/shop")}
          className="bg-white text-black text-xs md:text-sm font-bold uppercase tracking-[0.2em] px-12 py-4 hover:bg-black hover:text-white border border-white transition-all duration-300"
        >
          Shop The Edit
        </button>
      </div>

      {/* 3. Modern Scrolling Marquee Bar at the bottom */}
      <div className="absolute bottom-0 w-full overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)] py-2.5 md:py-3 z-20 border-t border-[var(--border-color)]">
        <div
          className="whitespace-nowrap flex items-center text-[9px] md:text-[11px] font-bold uppercase tracking-[0.25em]"
          style={{ animation: "marquee 25s linear infinite" }}
        >
          {/* We repeat the text multiple times so it loops seamlessly */}
          <span className="mx-4">✦ FREE SHIPPING ON ORDERS OVER ₹1999</span>
          <span className="mx-4">✦ 7 DAYS EASY RETURNS</span>
          <span className="mx-4">✦ PREMIUM CRAFTSMANSHIP</span>
          <span className="mx-4">✦ CASH ON DELIVERY AVAILABLE</span>

          <span className="mx-4">✦ FREE SHIPPING ON ORDERS OVER ₹1999</span>
          <span className="mx-4">✦ 7 DAYS EASY RETURNS</span>
          <span className="mx-4">✦ PREMIUM CRAFTSMANSHIP</span>
          <span className="mx-4">✦ CASH ON DELIVERY AVAILABLE</span>
        </div>

        {/* Inline CSS Keyframes for the Marquee animation (No need to touch tailwind.config.js) */}
        <style>
          {`
            @keyframes marquee {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
          `}
        </style>
      </div>
    </section>
  );
};

export default Banner;
