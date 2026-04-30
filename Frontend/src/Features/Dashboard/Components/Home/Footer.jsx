import React from "react";

const Footer = () => {
  const footerLinks = [
    {
      title: "Shop",
      links: ["All Collections", "New Arrivals", "Best Sellers", "Essentials"],
    },
    {
      title: "Company",
      links: ["About Us", "Careers", "Journal", "Stores"],
    },
    {
      title: "Support",
      links: ["Contact Us", "Shipping & Returns", "FAQ", "Track Order"],
    },
    {
      title: "Socials",
      links: ["Instagram", "TikTok", "Twitter / X", "YouTube"],
    },
  ];

  return (
    <footer className="w-full bg-[var(--bg-primary)] pt-20 md:pt-32 overflow-hidden border-t border-[var(--border-color)]">
      {/* Top Section: Grid Layout */}
      <div className="px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 mb-20">
        {/* Left Column: Brand Mission (Spans 4 cols on large screens) */}
        <div className="lg:col-span-4 flex flex-col justify-start">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-6 h-[2px] bg-[var(--text-primary)]"></span>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[var(--text-primary)]">
              Our Vision
            </span>
          </div>
          <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed max-w-sm font-medium">
            Defining the modern aesthetic. Timeless silhouettes built for the
            contemporary lifestyle. Unapologetic style for the bold.
          </p>
        </div>

        {/* Right Columns: Navigation Links (Spans 8 cols) */}
        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-10 sm:gap-6">
          {footerLinks.map((column, idx) => (
            <div key={idx} className="flex flex-col gap-6">
              <h3 className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-primary)]">
                {column.title}
              </h3>
              <div className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <div
                    key={link}
                    className="group cursor-pointer flex items-center w-fit"
                  >
                    <span className="text-sm font-medium text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors duration-300">
                      {link}
                    </span>
                    {/* Animated Dash on Hover */}
                    <span className="w-0 h-[1px] bg-[var(--text-primary)] ml-0 group-hover:w-4 group-hover:ml-3 transition-all duration-300 ease-out"></span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Massive Typography Anchor */}
      <div className="w-full px-6 md:px-12 flex flex-col items-center pointer-events-none select-none">
        {/* The text scales perfectly with the viewport width (vw) */}
        <h1 className="text-[20vw] md:text-[21vw] font-black uppercase tracking-tighter leading-[0.75] text-[var(--text-primary)] mb-[-2vw] md:mb-[-1.5vw]">
          VEXORA
        </h1>
      </div>

      {/* Bottom Bar: Copyright & Legal */}
      <div className="w-full px-6 md:px-12 py-6 md:py-8 border-t border-[var(--border-color)] bg-[var(--bg-primary)] relative z-10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[10px] md:text-xs text-[var(--text-secondary)] font-bold uppercase tracking-widest text-center md:text-left">
          © {new Date().getFullYear()} VEXORA. All rights reserved.
        </p>

        <div className="flex gap-6 text-[10px] md:text-xs text-[var(--text-secondary)] font-bold uppercase tracking-widest">
          <span className="hover:text-[var(--text-primary)] cursor-pointer transition-colors relative group">
            Privacy Policy
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--text-primary)] group-hover:w-full transition-all duration-300"></span>
          </span>
          <span className="hover:text-[var(--text-primary)] cursor-pointer transition-colors relative group">
            Terms of Service
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[var(--text-primary)] group-hover:w-full transition-all duration-300"></span>
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
