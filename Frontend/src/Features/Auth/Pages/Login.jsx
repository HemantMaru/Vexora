import React, { useState } from "react";
import snitch from "../../../assets/snitchLogo.webp"; // Update path if needed
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Hook/useAuth";

const Login = () => {
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();
    const success = await handleLogin({ identifier, password });

    if (success) {
      setIdentifier("");
      setPassword("");
      navigate("/");
    }
  };

  return (
    <section className="w-full h-screen flex flex-col lg:flex-row bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-hidden selection:bg-[var(--text-primary)] selection:text-[var(--bg-primary)]">
      {/* LEFT: CINEMATIC MEDIA (Top banner on Mobile, Full half on Desktop) */}
      <div className="w-full h-[25vh] sm:h-[30vh] lg:h-full lg:w-1/2 relative overflow-hidden group border-b lg:border-b-0 lg:border-r border-[var(--border-color)] shrink-0">
        <img
          src="https://d2d5n4ft74bagm.cloudfront.net/media/shop-by-occasion/ec434243-e6ca-4ccd-85b1-e86576394896/1775473168.jpeg"
          alt="Login Campaign"
          className="w-full h-full object-cover object-top lg:object-center transition-transform duration-[3s] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
        />
        {/* Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none"></div>

        {/* Brand Logo */}
        <div className="absolute top-6 left-6 lg:top-10 lg:left-10 z-10">
          <Link to="/">
            <img
              src={snitch}
              alt="Logo"
              className="h-20 lg:h-25 object-contain filter invert opacity-90 hover:opacity-100 transition-opacity"
            />
          </Link>
        </div>
      </div>

      {/* RIGHT: PREMIUM AUTH FORM */}
      <div className="w-full h-[75vh] sm:h-[70vh] lg:h-full lg:w-1/2 flex items-center justify-center px-6 md:px-12 py-10 overflow-y-auto hide-scrollbar">
        <div className="w-full max-w-md flex flex-col gap-10 my-auto">
          {/* Clean Header */}
          <div className="flex flex-col">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight leading-none mb-2">
              Sign In.
            </h1>
            <p className="text-sm font-medium text-[var(--text-secondary)] mt-2">
              Welcome back. Enter your details to access your account.
            </p>
          </div>

          <form className="flex flex-col gap-6" onSubmit={handleForm}>
            {/* Input: Identifier (Email/Phone) */}
            <div className="group relative border-b border-[var(--border-color)] focus-within:border-[var(--text-primary)] transition-colors duration-300">
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full bg-transparent py-3 text-lg md:text-xl font-medium outline-none placeholder:text-[var(--text-secondary)]/50 tracking-wide peer"
                placeholder="Email or Phone Number *"
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
                className="w-full bg-transparent py-3 text-lg md:text-xl font-medium outline-none placeholder:text-[var(--text-secondary)]/50 tracking-wide peer pr-20"
                placeholder="Password *"
                required
              />
              <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[var(--text-primary)] group-focus-within:w-full transition-all duration-500 ease-out"></div>

              {/* Forgot Password Link */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2">
                <button
                  type="button"
                  className="text-xs font-bold uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                >
                  Forgot?
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button className="group relative w-full bg-[var(--text-primary)] text-[var(--bg-primary)] px-8 py-4 mt-6 overflow-hidden flex items-center justify-center gap-3 hover:opacity-90 transition-opacity">
              <span className="relative z-10 text-xs font-bold uppercase tracking-widest">
                Sign In
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
          <div className="flex flex-col gap-6 mt-2">
            <div className="flex items-center gap-4">
              <div className="flex-1 h-px bg-[var(--border-color)]"></div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)]">
                Or Sign In With
              </p>
              <div className="flex-1 h-px bg-[var(--border-color)]"></div>
            </div>

            {/* Google Button */}
            <button className="w-full flex items-center justify-center gap-3 border border-[var(--border-color)] py-3.5 text-xs font-bold uppercase tracking-widest hover:border-[var(--text-primary)] hover:bg-[var(--bg-secondary)]/50 transition-all duration-300">
              <FcGoogle className="text-lg" />
              <span>Google</span>
            </button>

            {/* Register Link */}
            <p className="text-center text-[11px] text-[var(--text-secondary)] font-bold uppercase tracking-widest mt-2">
              Don't have an account?{" "}
              <Link
                to="/auth/register"
                className="text-[var(--text-primary)] border-b border-[var(--text-primary)] pb-0.5 hover:opacity-70 transition-opacity ml-1"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
