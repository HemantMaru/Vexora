import React, { useState } from "react";
import snitch from "../../../assets/snitchLogo.webp"; // Update path if needed
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Hook/useAuth";

const Register = () => {
  const { handleRegister } = useAuth();
  const navigate = useNavigate();

  const [isSeller, setIsSeller] = useState(false);
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();
    const success = await handleRegister({
      fullname,
      email,
      contact,
      password,
      isSeller,
    });
    if (success) {
      setFullname("");
      setContact("");
      setEmail("");
      setPassword("");
      setIsSeller(false);
      navigate("/");
    }
  };

  return (
    <section className="w-full h-screen flex flex-col lg:flex-row bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-hidden selection:bg-[var(--text-primary)] selection:text-[var(--bg-primary)]">
      {/* LEFT: PREMIUM AUTH FORM (Order 2 on Mobile, Order 1 on Desktop) */}
      <div className="w-full h-[75vh] sm:h-[70vh] lg:h-full lg:w-1/2 order-2 lg:order-1 flex items-center justify-center px-6 md:px-12 py-10 overflow-y-auto hide-scrollbar">
        <div className="w-full max-w-md flex flex-col gap-10 my-auto">
          {/* Clean Header */}
          <div className="flex flex-col">
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight leading-tight mb-2">
              Create <br /> Account.
            </h1>
            <p className="text-sm font-medium text-[var(--text-secondary)] mt-2">
              Sign up to explore our latest collections and exclusive offers.
            </p>
          </div>

          <form className="flex flex-col gap-6" onSubmit={handleForm}>
            {/* Input: Full Name */}
            <div className="group relative border-b border-[var(--border-color)] focus-within:border-[var(--text-primary)] transition-colors duration-300">
              <input
                type="text"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                className="w-full bg-transparent py-3 text-lg md:text-xl font-medium outline-none placeholder:text-[var(--text-secondary)]/50 tracking-wide peer"
                placeholder="Full Name *"
                required
              />
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[var(--text-primary)] group-focus-within:w-full transition-all duration-500 ease-out"></div>
            </div>

            {/* Input: Email */}
            <div className="group relative border-b border-[var(--border-color)] focus-within:border-[var(--text-primary)] transition-colors duration-300">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent py-3 text-lg md:text-xl font-medium outline-none placeholder:text-[var(--text-secondary)]/50 tracking-wide peer"
                placeholder="Email Address *"
                required
              />
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[var(--text-primary)] group-focus-within:w-full transition-all duration-500 ease-out"></div>
            </div>

            {/* Input: Phone */}
            <div className="group relative border-b border-[var(--border-color)] focus-within:border-[var(--text-primary)] transition-colors duration-300">
              <input
                type="tel"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="w-full bg-transparent py-3 text-lg md:text-xl font-medium outline-none placeholder:text-[var(--text-secondary)]/50 tracking-wide peer"
                placeholder="Phone Number *"
                required
              />
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[var(--text-primary)] group-focus-within:w-full transition-all duration-500 ease-out"></div>
            </div>

            {/* Input: Password */}
            <div className="group relative border-b border-[var(--border-color)] focus-within:border-[var(--text-primary)] transition-colors duration-300">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent py-3 text-lg md:text-xl font-medium outline-none placeholder:text-[var(--text-secondary)]/50 tracking-wide peer"
                placeholder="Password *"
                required
              />
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[var(--text-primary)] group-focus-within:w-full transition-all duration-500 ease-out"></div>
            </div>

            {/* Seller Checkbox */}
            <label className="flex items-center gap-3 cursor-pointer group w-fit mt-4">
              <div className="relative flex items-center justify-center w-5 h-5">
                <input
                  type="checkbox"
                  checked={isSeller}
                  onChange={(e) => setIsSeller(e.target.checked)}
                  className="peer appearance-none w-5 h-5 border border-[var(--border-color)] checked:bg-[var(--text-primary)] checked:border-[var(--text-primary)] transition-all duration-300 cursor-pointer rounded-sm"
                />
                <svg
                  className="absolute w-3 h-3 text-[var(--bg-primary)] opacity-0 peer-checked:opacity-100 pointer-events-none transition-opacity duration-300 scale-50 peer-checked:scale-100"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <span className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors">
                Register as a Seller
              </span>
            </label>

            {/* Submit Button */}
            <button className="group relative w-full bg-[var(--text-primary)] text-[var(--bg-primary)] px-8 py-4 mt-4 overflow-hidden flex items-center justify-center gap-3 hover:opacity-90 transition-opacity">
              <span className="relative z-10 text-xs font-bold uppercase tracking-widest">
                Create Account
              </span>
              <svg
                className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
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

          {/* Social Options */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-[var(--border-color)]"></div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)]">
                Or Sign Up With
              </p>
              <div className="flex-1 h-px bg-[var(--border-color)]"></div>
            </div>

            {/* Google Button */}
            <button className="w-full flex items-center justify-center gap-3 border border-[var(--border-color)] py-3.5 text-xs font-bold uppercase tracking-widest hover:border-[var(--text-primary)] hover:bg-[var(--bg-secondary)]/50 transition-all duration-300">
              <FcGoogle className="text-lg" />
              <span>Google</span>
            </button>

            {/* Login Link */}
            <p className="text-center text-[11px] text-[var(--text-secondary)] font-bold uppercase tracking-widest mt-2">
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="text-[var(--text-primary)] border-b border-[var(--text-primary)] pb-0.5 hover:opacity-70 transition-opacity ml-1"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT: CINEMATIC MEDIA (Order 1 on Mobile, Order 2 on Desktop) */}
      <div className="w-full h-[25vh] sm:h-[30vh] lg:h-full lg:w-1/2 order-1 lg:order-2 relative overflow-hidden group border-b lg:border-b-0 lg:border-l border-[var(--border-color)] shrink-0">
        <img
          src="https://d2d5n4ft74bagm.cloudfront.net/media/shop-by-occasion/0dfa8703-2d45-40c5-b846-0d296a6d165f/1776166880.jpeg"
          alt="Register Campaign"
          className="w-full h-full object-cover object-top lg:object-center transition-transform duration-[3s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
        />

        {/* Subtle Dark Gradient Overlay for Logo visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none"></div>

        {/* Brand Logo */}
        <div className="absolute top-6 right-6 lg:top-10 lg:right-10 z-10">
          <Link to="/">
            <img
              src={snitch}
              alt="Logo"
              className="h-20 lg:h-25 object-contain filter invert opacity-90 hover:opacity-100 transition-opacity"
            />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Register;
