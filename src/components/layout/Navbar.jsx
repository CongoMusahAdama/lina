import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, Heart, Menu, X, ArrowRight, Instagram, Facebook, Ghost } from "lucide-react";
import { useCart } from "../../context/CartContext";

const NavCartButton = () => {
  const { cartCount, setIsCartOpen } = useCart();
  return (
    <button
      className="icon-link nav-cart-btn flex items-center gap-2"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsCartOpen(true);
      }}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        color: "inherit",
        position: "relative",
      }}
    >
      <span className="nav-icon-label">Bag</span>
      <span style={{ position: "relative", display: "inline-flex" }}>
        <ShoppingBag size={20} strokeWidth={1.2} />
        {cartCount > 0 && <span className="nav-cart-badge">{cartCount}</span>}
      </span>
    </button>
  );
};

// Internal sub-component for icons that needs ShoppingBag
import { ShoppingBag } from "lucide-react";

const SearchOverlay = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?q=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="search-overlay">
      <div className="search-overlay-backdrop" onClick={onClose}></div>
      <div className="search-overlay-content">
        <button className="search-overlay-close" onClick={onClose}>
          <X size={32} strokeWidth={1.5} />
        </button>
        <div className="container center-text">
          <span className="search-overlay-label">Find Your Glow</span>
          <form onSubmit={handleSearch} className="search-overlay-form">
            <input
              type="text"
              autoFocus
              placeholder="Searching for organic hair solutions..."
              className="search-overlay-input serif"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="search-overlay-btn">
              <ArrowRight size={32} />
            </button>
          </form>
          <div className="search-overlay-suggestions">
            <p>
              Popular:
              <strong
                onClick={() => {
                  setQuery("Shampoo");
                  navigate("/shop?q=Shampoo");
                  onClose();
                }}
              >
                Shampoo
              </strong>
              ,
              <strong
                onClick={() => {
                  setQuery("Elixir");
                  navigate("/shop?q=Elixir");
                  onClose();
                }}
              >
                Elixir
              </strong>
              ,
              <strong
                onClick={() => {
                  setQuery("Butter");
                  navigate("/shop?q=Butter");
                  onClose();
                }}
              >
                Butter
              </strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Navbar = ({ user }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isAuthPage =
    location.pathname === "/auth" || location.pathname.startsWith("/admin");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  if (isAuthPage) return null;

  return (
    <>
      <header className={`header ${isScrolled || !isHome ? "scrolled" : ""}`}>
        <div className="container flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="logo">
              <img
                src="/LHCP logo.jpeg"
                alt="Lina Hair Care Products"
                className="logo-img"
              />
            </Link>
            <nav className="nav-menu desktop-only">
              <Link to="/" className="nav-link">
                Home
              </Link>
              <Link to="/shop" className="nav-link">
                Shop
              </Link>
              <Link to="/collections" className="nav-link">
                Collections
              </Link>
              <Link to="/about" className="nav-link">
                About
              </Link>
              <Link to="/track" className="nav-link" style={{ background: 'rgba(255,215,0,0.1)', padding: '4px 12px', borderRadius: '20px' }}>
                Track Order
              </Link>
              {user && (
                <Link to="/admin" className="nav-link" style={{ color: 'var(--teal-primary)', fontWeight: 700 }}>
                  Dashboard
                </Link>
              )}
            </nav>
          </div>

          <div className="nav-icons">
            <button
              className="icon-link"
              onClick={() => setIsSearchOpen(true)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "inherit",
                position: "relative",
              }}
            >
              <span className="nav-icon-label">Search</span>
              <Search size={20} strokeWidth={1.5} />
            </button>
            <a href="#" className="icon-link desktop-only">
              <Heart size={20} strokeWidth={1.5} />
            </a>
            <NavCartButton />
            <button
              className="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      <div className={`mobile-nav-drawer ${isMobileMenuOpen ? "open" : ""}`}>
        <div className="mobile-nav-header">
          <Link
            to="/"
            className="logo"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <img
              src="/LHCP logo.jpeg"
              alt="Lina Hair Care Products"
              className="logo-img"
            />
          </Link>
          <button
            className="mobile-menu-close"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={28} strokeWidth={1.5} />
          </button>
        </div>
        <nav className="mobile-nav-links">
          {user && (
            <Link
              to="/admin"
              className="mobile-nav-link"
              style={{ color: 'var(--teal-primary)', borderBottom: '2px solid rgba(0,200,200,0.2)' }}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Admin Dashboard 🛠️
            </Link>
          )}
          <Link
            to="/"
            className="mobile-nav-link"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/shop"
            className="mobile-nav-link"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Shop
          </Link>
          <Link
            to="/collections"
            className="mobile-nav-link"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Collections
          </Link>
          <Link
            to="/about"
            className="mobile-nav-link"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/track"
            className="mobile-nav-link"
            style={{ color: '#d97706' }}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Track My Order 📦
          </Link>
        </nav>
        <div className="mobile-nav-footer">
          <div className="mobile-social-links">
            <a href="https://www.instagram.com/linas_essentials" target="_blank" rel="noreferrer">
              <Instagram size={20} />
            </a>
            <a href="https://www.facebook.com/Lina’s.essentials" target="_blank" rel="noreferrer">
              <Facebook size={20} />
            </a>
            <a href="https://www.tiktok.com/@linas_essentials" target="_blank" rel="noreferrer">
              <span style={{ fontWeight: 800 }}>T</span>
            </a>
            <a href="https://www.snapchat.com/add/Linas_Essentials" target="_blank" rel="noreferrer">
              <Ghost size={20} />
            </a>
          </div>
          <p>
            © 2026 Lina Hair Care Products. Growing Beautiful Hair Globally.
          </p>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div
          className="mobile-menu-backdrop"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
