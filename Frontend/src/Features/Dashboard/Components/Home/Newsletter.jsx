import React, { useState } from "react";
import { useAuth } from "../../../Auth/Hook/useAuth";

const Newsletter = () => {
  const { handleSubscribe } = useAuth();
  const [email, setEmail] = useState("");

  const handleSubscribed = async (e) => {
    // Moved preventDefault here to handle "Enter" key submits properly
    e.preventDefault();
    if (!email) return;

    const success = await handleSubscribe({ email });
    if (success) {
      setEmail("");
    }
  };

  return (
    <section className="relative w-full px-6 py-24 md:py-32 bg-[var(--bg-primary)] flex justify-center border-t border-[var(--border-color)] overflow-hidden">
      {/* Subtle Background Glow (Adds depth without breaking the minimal vibe) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--text-primary)] opacity-[0.02] rounded-full blur-3xl pointer-events-none"></div>

      <div className="flex flex-col items-center text-center w-full max-w-3xl relative z-10">
        {/* Editorial Eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          <span className="w-8 h-[1px] bg-[var(--text-primary)]"></span>
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] text-[var(--text-primary)]">
            Unlock Exclusives
          </span>
          <span className="w-8 h-[1px] bg-[var(--text-primary)]"></span>
        </div>

        {/* Aggressive, High-End Typography */}
        <h2 className="text-5xl md:text-[5.5rem] font-black uppercase tracking-tighter text-[var(--text-primary)] leading-[0.85] mb-6">
          JOIN THE <br className="md:hidden" /> CLUB.
        </h2>

        <p className="text-sm md:text-base text-[var(--text-secondary)] font-medium max-w-lg mb-12 tracking-wide">
          Sign up for early access to limited drops, exclusive sales, and
          unfiltered editorial content. No spam, just pure style.
        </p>

        {/* Premium Input Form */}
        <form
          className="w-full flex flex-col md:flex-row items-center gap-6 md:gap-0 relative group"
          onSubmit={handleSubscribed}
        >
          <input
            type="email"
            placeholder="ENTER YOUR EMAIL"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // Huge input text for modern look, changing border color on focus
            className="w-full bg-transparent border-b-2 border-[var(--border-color)] text-[var(--text-primary)] px-2 py-4 md:py-5 text-lg md:text-2xl font-light placeholder-[var(--text-secondary)]/40 outline-none focus:border-[var(--text-primary)] transition-colors rounded-none uppercase tracking-widest"
            required
          />

          <button
            type="submit"
            // Button attaches beautifully to the right side on desktop
            className="w-full md:w-auto md:absolute md:right-0 md:bottom-3 bg-[var(--text-primary)] text-[var(--bg-primary)] px-10 py-4 md:py-3 text-xs font-bold uppercase tracking-[0.2em] hover:bg-[var(--text-secondary)] active:scale-95 transition-all flex justify-center items-center gap-3"
          >
            Subscribe
            {/* Animated Arrow Icon */}
            <svg
              className="w-4 h-4 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </button>
        </form>

        {/* Trust Disclaimer (Crucial for e-commerce credibility) */}
        <p className="text-[9px] md:text-[10px] text-[var(--text-secondary)] mt-8 font-semibold tracking-widest uppercase">
          By subscribing, you agree to our Terms of Service & Privacy Policy.
        </p>
      </div>
    </section>
  );
};

export default Newsletter;
