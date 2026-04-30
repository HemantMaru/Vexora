import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft, FiBox, FiPlus, FiArrowRight } from "react-icons/fi";

const SellerDashboard = () => {
  const navigate = useNavigate();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    // Background uses secondary color for that premium "layered" look
    <div className="min-h-screen w-full bg-[var(--bg-secondary)] text-[var(--text-primary)] p-4 md:p-8 lg:p-12 font-sans transition-colors duration-300">
      <div
        className={`max-w-6xl mx-auto transition-all duration-1000 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] transform ${
          isMounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* TOP NAVIGATION BAR */}
        <div className="flex items-center justify-between mb-12 md:mb-20">
          <button
            onClick={() => navigate(-1)} // 👈 Ye raha tera Back Button
            className="group flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-[var(--text-primary)] hover:shadow-md transition-all duration-300 text-sm font-bold uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            <FiArrowLeft
              className="group-hover:-translate-x-1 transition-transform"
              size={16}
            />
            Return
          </button>

          <div className="flex items-center gap-3 bg-[var(--bg-primary)] border border-[var(--border-color)] px-4 py-1.5 rounded-full shadow-sm">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-primary)]">
              Seller Active
            </span>
          </div>
        </div>

        {/* HEADER SECTION */}
        <div className="mb-12 md:mb-16">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-[var(--text-primary)] mb-4">
            Welcome back.
          </h1>
          <p className="text-lg text-[var(--text-secondary)] font-medium max-w-xl">
            What would you like to do today? Manage your existing inventory or
            launch a new piece to the world.
          </p>
        </div>

        {/* BENTO BOX GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* CARD 01: YOUR PRODUCTS */}
          <div
            onClick={() => navigate("/sellerProduct")}
            className="group cursor-pointer bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-[2rem] p-8 md:p-10 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between min-h-[320px] relative overflow-hidden"
          >
            {/* Soft background icon */}
            <FiBox className="absolute -right-8 -top-8 text-[15rem] text-[var(--text-secondary)] opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-700 pointer-events-none" />

            <div>
              <div className="w-14 h-14 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center justify-center text-[var(--text-primary)] mb-8 group-hover:scale-110 transition-transform duration-500 shadow-sm">
                <FiBox size={24} strokeWidth={2} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--text-primary)] mb-3">
                Inventory
              </h2>
              <p className="text-[var(--text-secondary)] font-medium leading-relaxed max-w-[80%]">
                View, edit, and track the performance of your currently listed
                products.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-2 text-[var(--text-primary)] font-bold text-sm uppercase tracking-widest">
              Manage Products
              <FiArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
            </div>
          </div>

          {/* CARD 02: ADD PRODUCT */}
          <div
            onClick={() => navigate("/addProduct")}
            className="group cursor-pointer bg-[var(--text-primary)] border border-[var(--text-primary)] rounded-[2rem] p-8 md:p-10 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)] hover:-translate-y-1 transition-all duration-500 flex flex-col justify-between min-h-[320px] relative overflow-hidden"
          >
            {/* Inverted Card (Dark/Light flipped) for high contrast & attention */}

            <FiPlus className="absolute -right-8 -top-8 text-[15rem] text-[var(--bg-primary)] opacity-10 group-hover:opacity-20 group-hover:scale-110 group-hover:rotate-12 transition-all duration-700 pointer-events-none" />

            <div>
              <div className="w-14 h-14 rounded-2xl bg-[var(--bg-primary)]/10 backdrop-blur-md border border-[var(--bg-primary)]/20 flex items-center justify-center text-[var(--bg-primary)] mb-8 group-hover:scale-110 transition-transform duration-500">
                <FiPlus size={28} strokeWidth={2.5} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-[var(--bg-primary)] mb-3">
                New Release
              </h2>
              <p className="text-[var(--bg-primary)]/70 font-medium leading-relaxed max-w-[80%]">
                Draft a new listing, upload high-quality assets, and set your
                pricing.
              </p>
            </div>

            <div className="mt-8 flex items-center gap-2 text-[var(--bg-primary)] font-bold text-sm uppercase tracking-widest">
              Create Listing
              <FiArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
