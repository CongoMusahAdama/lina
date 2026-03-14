import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Quote } from "lucide-react";
import Hero from "../components/home/Hero";
import ProductCard from "../components/products/ProductCard";
import RecentlyViewed from "../components/products/RecentlyViewed";

const HomePage = ({ products = [], categories = [], user }) => {
  const [activeCategory, setActiveCategory] = useState("all");

  const categoryTabs = [
    { id: "all", label: "All Collections" },
    ...categories.map((c) =>
      typeof c === "object" ? c : { id: c.toLowerCase(), label: c },
    ),
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(
          (entry) =>
            entry.isIntersecting && entry.target.classList.add("active"),
        );
      },
      { threshold: 0.1 },
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [activeCategory]);

  const filteredFeatured = products
    .filter((product) => {
      // Hide if sold out > 3 days ago
      const isSoldOut =
        product.status === "Sold Out" ||
        product.stock === 0 ||
        !!product.soldOutAt;
      if (isSoldOut && product.soldOutAt) {
        const soldDate = new Date(product.soldOutAt);
        const daysSoldOut = (new Date() - soldDate) / (1000 * 60 * 60 * 24);
        if (daysSoldOut > 3) return false;
      }

      // Filter by category
      if (
        activeCategory !== "all" &&
        product.category?.toLowerCase() !== activeCategory.toLowerCase()
      )
        return false;
      // Filter out products with broken blob URLs (blob URLs don't persist across sessions)
      const img = product.image || "";
      if (img.startsWith("blob:")) return false;
      return true;
    })
    // Sort: DB products with real images first (createdAt), then static
    .sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt) : new Date(0);
      const dateB = b.createdAt ? new Date(b.createdAt) : new Date(0);
      return dateB - dateA;
    })
    .slice(0, 16);

  return (
    <>
      <Hero user={user} />
      <section
        id="collections"
        className="section-padding regimes-section"
        style={{
          padding: "5rem 0",
          backgroundColor: "#013220",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Hair Pattern Overlay */}
        <div className="hair-pattern-overlay"></div>

        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div className="flex justify-between items-end mb-12">
            <div className="reveal">
              <span
                className="text-yellow"
                style={{
                  textTransform: "uppercase",
                  letterSpacing: "0.3em",
                  fontSize: "0.8rem",
                  color: "#FFD700",
                }}
              >
                Proven Results
              </span>
            </div>
            <Link
              to="/shop"
              className="nav-link reveal"
              style={{
                marginBottom: "1rem",
                color: "white",
                borderBottomColor: "white",
              }}
            >
              Explore All Products
            </Link>
          </div>

          <div className="regimes-premium-grid">
            <div className="regimes-image-box reveal">
              <div className="image-wrapper-stack">
                <img
                  src="/our hair case.png"
                  alt="Lina Hair Growth"
                  className="regimes-img-1"
                />
                <img
                  src="/our hair case 1.png"
                  alt="Healthy Hair Texture"
                  className="regimes-img-2"
                />
              </div>
            </div>

            <div className="regimes-info-box reveal">
              <div className="premium-accent-line"></div>

              <ul className="regimes-list">
                <li>
                  <CheckCircle size={18} color="#FFD700" />{" "}
                  <span>Deep Moisture Infusion</span>
                </li>
                <li>
                  <CheckCircle size={18} color="#FFD700" />{" "}
                  <span>Scalp Health & Detox</span>
                </li>
                <li>
                  <CheckCircle size={18} color="#FFD700" />{" "}
                  <span>Accelerated Growth Complex</span>
                </li>
              </ul>

              <div className="flex gap-6 mt-8">
                <Link
                  to="/about"
                  className="cta-button-premium"
                  style={{ background: "#FFD700", color: "#013220", padding: "0.8rem 1.8rem", fontSize: "0.8rem" }}
                >
                  <span>Our Story</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        className="section-padding"
        style={{ backgroundColor: "#f9f9f9" }}
      >
        <div className="container">
          <div
            className="center-text reveal"
            style={{ textAlign: "center", marginBottom: "3rem" }}
          >
            <span
              className="text-teal"
              style={{
                textTransform: "uppercase",
                letterSpacing: "0.3em",
                fontSize: "0.8rem",
              }}
            >
              Proven Results
            </span>
            <h2
              className="serif"
              style={{ fontSize: "3rem", marginTop: "0.5rem" }}
            >
              Featured Hair Care
            </h2>

            {/* Category Filter Tabs */}
            <div className="category-pills-container reveal">
              <div className="category-pills-scroll">
                {categoryTabs.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`category-pill-btn ${activeCategory === cat.id ? "active" : ""}`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="product-grid">
            {filteredFeatured.map((product) => (
              <ProductCard
                key={product._id || product.id}
                {...product}
                id={product._id || product.id}
              />
            ))}
          </div>
          <div className="flex justify-center" style={{ marginTop: "5rem" }}>
            <Link to="/shop" className="cta-button-premium reveal">
              Explore Collection
            </Link>
          </div>
        </div>
      </section>

      <RecentlyViewed />

      <section className="section-padding container">
        <div
          className="grid"
          style={{
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "center",
          }}
        >
          <div
            className="reveal"
            style={{ padding: "2rem", border: "1px solid #eee" }}
          >
            <img
              src="/hero1.png"
              alt="Natural Hair Care"
              style={{ width: "100%", height: "500px", objectFit: "cover" }}
            />
          </div>
          <div className="reveal">
            <h2
              className="serif"
              style={{ fontSize: "3.5rem", marginBottom: "2rem" }}
            >
              Grow Beautiful Hair With Lina's Touch.
            </h2>
            <p
              style={{
                fontSize: "1.1rem",
                color: "#666",
                marginBottom: "2.5rem",
              }}
            >
              At Lina Hair Care Products, we believe that healthy hair is a
              crown you never take off. Our organic formulas are crafted for
              those who demand natural purity, effective growth, and cultural
              resonance in their hair care journey.
            </p>
            <Link
              to="/about"
              className="cta-button"
              style={{ textDecoration: "none", display: "inline-block" }}
            >
              Our Story
            </Link>
          </div>
        </div>
      </section>

      <section className="testimonial-section">
        <div className="container">
          <div
            className="center-text reveal"
            style={{ textAlign: "center", marginBottom: "5rem" }}
          >
            <span
              style={{
                textTransform: "uppercase",
                letterSpacing: "0.3em",
                fontSize: "0.8rem",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              Testimonials
            </span>
            <h2
              className="serif"
              style={{ fontSize: "3.5rem", marginTop: "0.5rem" }}
            >
              Real Hair Journeys
            </h2>
          </div>

          <div className="testimonial-grid">
            <div className="testimonial-card reveal">
              <Quote
                className="text-teal"
                size={40}
                strokeWidth={1}
                style={{ marginBottom: "2rem", opacity: 0.8 }}
              />
              <p className="testimonial-text">
                "The most incredible hair growth elixir I've ever used. My edges
                came back in weeks, and the texture of my hair is so much
                softer. Lina Hair Care is truly world-class."
              </p>
              <div className="testimonial-author">
                <strong>Ama Serwaa</strong>
                <span>Natural Hair Enthusiast</span>
              </div>
            </div>

            <div
              className="testimonial-card reveal"
              style={{ transitionDelay: "0.2s" }}
            >
              <Quote
                className="text-teal"
                size={40}
                strokeWidth={1}
                style={{ marginBottom: "2rem", opacity: 0.8 }}
              />
              <p className="testimonial-text">
                "Lina's products transformed how I care for my curls. The deep
                conditioner is a game changer. I don't just have long hair; it's
                healthy and full of life."
              </p>
              <div className="testimonial-author">
                <strong>Kofi Mensah</strong>
                <span>Barber & Stylist</span>
              </div>
            </div>

            <div
              className="testimonial-card reveal"
              style={{ transitionDelay: "0.4s" }}
            >
              <Quote
                className="text-teal"
                size={40}
                strokeWidth={1}
                style={{ marginBottom: "2rem", opacity: 0.8 }}
              />
              <p className="testimonial-text">
                "Exceptional quality. They don't just sell products; they
                provide a complete roadmap to hair health. Every wash day with
                Lina Hair Care feels like a spa treatment."
              </p>
              <div className="testimonial-author">
                <strong>Sarah Baidoo</strong>
                <span>Content Creator</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
