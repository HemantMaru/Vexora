import React, { useEffect, useState } from "react";
import snitch from "../../../../assets/snitchLogo.webp";
import { CiSearch, CiMenuBurger } from "react-icons/ci";
import { BsHandbag } from "react-icons/bs";
import { VscAccount } from "react-icons/vsc";
import { IoCloseOutline, IoArrowForward } from "react-icons/io5";
import { MdOutlineDarkMode, MdOutlineLightMode } from "react-icons/md";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useProducts } from "../../Hook/useProducts";
import { useSelector } from "react-redux";
import { useCart } from "../../../cart/Hook/useCart";

const Navbar = () => {
  const {
    handleGetProductsSearch,
    handleCreateSearchHistory,
    handlegetSearchHistory,
  } = useProducts();
  const { fetchCart } = useCart();

  const [scrolled, setScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  const recentSearches = useSelector((state) => state.product.SearchHistory);
  const searchResults = useSelector((state) => state.product.searchProducts);
  const cartItems = useSelector((state) => state.cart.cartItems) || [];
  const user = useSelector((state) => state.auth.user);

  const totalCartItems = Array.isArray(cartItems)
    ? cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)
    : 0;

  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      handleGetProductsSearch(searchQuery);
    }
  }, [searchQuery]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      handleCreateSearchHistory(searchQuery);
      setSearchQuery("");
    }
  };

  useEffect(() => {
    handlegetSearchHistory();
    fetchCart();
  }, []);

  useEffect(() => {
    setToggleMenu(false);
    setShowSearch(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = toggleMenu || showSearch ? "hidden" : "auto";
  }, [toggleMenu, showSearch]);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const desktopLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "WishList", path: "/wishlist" },
    { name: "Contact", path: "/contact" },
  ];

  if (user?.role === "seller") {
    desktopLinks.push({ name: "Seller Panel", path: "/seller/dashboard" });
  }

  return (
    <>
      <div className="bg-[var(--text-primary)] text-[var(--bg-primary)] text-[10px] font-bold uppercase tracking-[0.2em] text-center py-2.5 z-50 relative flex justify-center items-center gap-6">
        <span className="w-8 h-px bg-[var(--bg-primary)] opacity-30 hidden sm:block"></span>
        Complimentary Shipping On Orders Over ₹4999
        <span className="w-8 h-px bg-[var(--bg-primary)] opacity-30 hidden sm:block"></span>
      </div>

      <nav
        className={`sticky top-0 w-full z-40 transition-all duration-300 ease-in-out ${
          scrolled
            ? "bg-[var(--bg-primary)]/90 backdrop-blur-md border-b border-[var(--border-color)] py-4 shadow-sm"
            : "bg-[var(--bg-primary)] py-6"
        }`}
      >
        <div className="w-full max-w-[1800px] mx-auto px-6 md:px-12 flex justify-between items-center relative">
          <div className="flex items-center flex-1">
            <button
              onClick={() => setToggleMenu(true)}
              className="lg:hidden text-2xl text-[var(--text-primary)] hover:opacity-70 transition-opacity mr-4"
              aria-label="Menu"
            >
              <CiMenuBurger />
            </button>

            <div className="hidden lg:flex items-center gap-8">
              {desktopLinks.map((item, idx) => (
                <Link
                  key={idx}
                  to={item.path}
                  className="group relative text-xs font-bold uppercase tracking-widest text-[var(--text-primary)] pb-1"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[var(--text-primary)] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                </Link>
              ))}
            </div>
          </div>

          {/* CENTER: Logo (Added translate-y-1 for perfect centering) */}
          <div
            className="absolute left-1/2 transform -translate-x-1/2 translate-y-1 cursor-pointer flex items-center justify-center"
            onClick={() => navigate("/")}
          >
            <img
              className={`object-contain transition-all duration-500 ease-out hover:scale-105 ${
                scrolled ? "h-15 md:h-18 lg:h-22" : "h-18 md:h-20 lg:h-24"
              }`}
              src={snitch}
              alt="Brand Logo"
            />
          </div>

          <div className="flex items-center justify-end gap-5 sm:gap-6 flex-1">
            {/* Desktop Sign In / Sign Up (Only if NOT logged in) */}
            {!user && (
              <div className="hidden xl:flex items-center gap-5 text-[10px] font-bold uppercase tracking-widest text-[var(--text-primary)] mr-2">
                <Link
                  to="/auth/login"
                  className="hover:opacity-60 transition-opacity"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth/register"
                  className="hover:opacity-60 transition-opacity"
                >
                  Sign Up
                </Link>
              </div>
            )}

            <button
              onClick={toggleTheme}
              className="text-xl sm:text-2xl text-[var(--text-primary)] hover:rotate-12 transition-transform"
              title="Toggle Theme"
            >
              {isDark ? <MdOutlineLightMode /> : <MdOutlineDarkMode />}
            </button>

            <button
              onClick={() => {
                setShowSearch(true);
                setSearchQuery("");
              }}
              className="text-2xl sm:text-[26px] text-[var(--text-primary)] hover:scale-110 transition-transform"
              title="Search"
            >
              <CiSearch />
            </button>

            {/* Account Icon (Only if NOT logged in) */}
            {!user && (
              <button
                onClick={() => navigate("/auth/login")}
                className="hidden sm:block text-xl sm:text-[22px] text-[var(--text-primary)] hover:scale-110 transition-transform"
                title="Login"
              >
                <VscAccount />
              </button>
            )}

            <button
              onClick={() => navigate("/cart")}
              className="text-xl sm:text-[22px] text-[var(--text-primary)] hover:scale-110 transition-transform relative"
              title="Shopping Cart"
            >
              <BsHandbag />
              {totalCartItems > 0 && (
                <span className="absolute -bottom-2 -right-2 bg-[var(--text-primary)] text-[var(--bg-primary)] text-[9px] font-black w-[18px] h-[18px] flex items-center justify-center rounded-full shadow-sm border border-[var(--bg-primary)]">
                  {totalCartItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Search Overlay (Logo size & alignment matched) */}
      {showSearch && (
        <div className="fixed inset-0 z-[100] bg-[var(--bg-primary)] flex flex-col animate-fade-in">
          <div className="flex justify-between items-center px-6 md:px-12 py-6 border-b border-[var(--border-color)]">
            <div className="w-8"></div>
            <img
              className="h-10 md:h-12 object-contain translate-y-1"
              src={snitch}
              alt="Logo"
            />
            <button
              onClick={() => setShowSearch(false)}
              className="text-3xl text-[var(--text-primary)] hover:rotate-90 transition-transform duration-300"
            >
              <IoCloseOutline />
            </button>
          </div>
          {/* ... Rest of search code ... */}
        </div>
      )}

      {/* Mobile Drawer (Logo size & alignment matched) */}
      <div
        className={`fixed inset-0 bg-[var(--bg-primary)] z-[110] flex flex-col transform transition-transform duration-500 ease-[cubic-bezier(0.77,0,0.175,1)] ${toggleMenu ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6 md:p-8 flex justify-between items-center border-b border-[var(--border-color)]">
          <img
            className="h-10 md:h-12 object-contain translate-y-1"
            src={snitch}
            alt="Logo"
          />
          <button
            onClick={() => setToggleMenu(false)}
            className="text-3xl text-[var(--text-primary)] hover:rotate-90 transition-transform duration-300"
          >
            <IoCloseOutline />
          </button>
        </div>

        <div className="flex flex-col flex-1 px-8 pt-12 pb-8 overflow-y-auto">
          <div className="flex flex-col gap-8">
            {desktopLinks.map((item, idx) => (
              <div key={idx} className="overflow-hidden">
                <Link
                  to={item.path}
                  onClick={() => setToggleMenu(false)}
                  className={`block text-3xl sm:text-4xl font-black uppercase tracking-tight text-[var(--text-primary)] transform transition-transform duration-700 hover:opacity-70 ${toggleMenu ? "translate-y-0" : "translate-y-full"}`}
                  style={{ transitionDelay: `${idx * 50}ms` }}
                >
                  {item.name}
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-auto flex flex-col gap-6 border-t border-[var(--border-color)] pt-8">
            <button
              onClick={() => {
                setToggleMenu(false);
                setShowSearch(true);
                setSearchQuery("");
              }}
              className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-[var(--text-primary)] hover:opacity-70 transition-opacity"
            >
              <CiSearch className="text-2xl" /> Search
            </button>
            {!user && (
              <Link
                to="/auth/login"
                onClick={() => setToggleMenu(false)}
                className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest text-[var(--text-primary)] hover:opacity-70 transition-opacity"
              >
                <VscAccount className="text-2xl" /> Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
