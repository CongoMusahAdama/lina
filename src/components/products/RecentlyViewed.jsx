import React, { useState, useEffect } from "react";
import ProductCard from "./ProductCard";

const RecentlyViewed = () => {
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    const loadRecent = () => {
      const data = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
      setRecent(data);
    };

    loadRecent();
    // Listen for storage changes in the same window
    window.addEventListener("click", loadRecent);
    return () => window.removeEventListener("click", loadRecent);
  }, []);

  if (recent.length === 0) return null;

  return (
    <section className="section-padding recent-products-section">
      <div className="container">
        <div className="section-header reveal" style={{ marginBottom: "3rem" }}>
          <h2 className="serif" style={{ fontSize: "2.5rem" }}>Recently Viewed</h2>
          <p style={{ color: "#64748b" }}>Pick up where you left off in your beauty journey.</p>
        </div>
        
        <div className="product-grid" style={{ 
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "2.5rem"
        }}>
          {recent.map((product) => (
            <ProductCard key={product._id || product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyViewed;
