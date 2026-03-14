import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, LayoutDashboard } from "lucide-react";

const Hero = ({ user }) => {
  return (
    <section className="hero">
      <div className="hero-bg-accent hero-bg-accent-1"></div>
      <div className="hero-bg-accent hero-bg-accent-2"></div>

      <img
        src="/image copy.png"
        alt="Lina Hair Care Products"
        className="hero-image active"
      />
      <div className="hero-overlay"></div>

      {/* Admin Quick Back Button */}
      {user && (
        <div style={{ position: 'absolute', top: '100px', left: '2rem', zIndex: 100 }}>
          <Link to="/admin" className="dashboard-shortcut-btn" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
            background: 'rgba(1, 50, 32, 0.8)',
            color: 'white',
            padding: '0.6rem 1rem',
            borderRadius: '12px',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.1)',
            fontSize: '0.8rem',
            fontWeight: 700,
            boxShadow: '0 10px 30px rgba(0,0,0,0.3)'
          }}>
            <LayoutDashboard size={16} />
            <span>Go to Dashboard</span>
          </Link>
        </div>
      )}

      <div className="hero-content-wrapper">
        <div className="hero-content">
          <span className="hero-tagline fade-in">
            Growing Beautiful Hair Globally
          </span>
          <h1 className="hero-slogan serif fade-in-delayed">
            Your journey to healthy hair starts with{" "}
            <span className="text-yellow-accent italic">Lina's touch.</span>
          </h1>
          <div className="hero-actions fade-in-delayed-more">
            <Link to="/shop" className="cta-button-premium">
              <span>Browse The Collection</span>
              <ArrowRight size={18} />
            </Link>
            <Link to="/shop" className="hero-secondary-link">
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <span>Scroll to explore</span>
      </div>
    </section>
  );
};

export default Hero;
