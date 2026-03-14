import React, { useState, useEffect } from "react";
import { Plus, CheckCircle, PackageX, MessageCircle } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useModal } from "../../context/ModalContext";

const ProductCard = ({
  id,
  _id,
  name,
  price,
  discountPrice,
  badge,
  image,
  status,
  stock,
  soldOutAt,
  comesWithPouch,
  sku,
}) => {
  const resolvedId = _id || id;
  const isSoldOut = status === "Sold Out" || stock === 0 || !!soldOutAt;
  const { cartItems, addToCart } = useCart();
  const { openProduct } = useModal();
  const cartItem = cartItems.find((i) => (i._id || i.id) === resolvedId);
  const inCart = !!cartItem;
  const resolvedImage =
    image && !image.startsWith("blob:") ? image : "/midnight.png";
  const currentPrice = discountPrice || price;
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 767);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const addToRecentlyViewed = (product) => {
    const existing = JSON.parse(localStorage.getItem("recentlyViewed") || "[]");
    const filtered = existing.filter((p) => (p._id || p.id) !== (product._id || product.id));
    const updated = [product, ...filtered].slice(0, 10);
    localStorage.setItem("recentlyViewed", JSON.stringify(updated));
  };

  const handleClick = (e) => {
    const productObj = {
      id: resolvedId,
      _id: resolvedId,
      name,
      price,
      discountPrice,
      badge,
      image: resolvedImage,
      sku,
      comesWithPouch
    };
    
    addToRecentlyViewed(productObj);

    if (isMobile || window.innerWidth <= 767) {
      if (!isSoldOut)
        openProduct(productObj);
    }
  };

  return (
    <div
      className="product-card reveal"
      onClick={handleClick}
      style={{
        opacity: isSoldOut ? 0.6 : 1,
        filter: isSoldOut ? "grayscale(100%)" : "none",
      }}
    >
      {sku && (
        <div className="product-sku-tag" style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          background: 'rgba(255,255,255,0.9)',
          padding: '4px 8px',
          borderRadius: '6px',
          fontSize: '0.65rem',
          fontWeight: 700,
          color: '#013220',
          zIndex: 5,
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          {sku}
        </div>
      )}
      <div className="product-image-container">
        {isSoldOut ? (
          <div
            className="product-badge"
            style={{
              backgroundColor: "#ef4444",
              color: "#fff",
              zIndex: 10,
              padding: "0.4rem 1rem",
              fontSize: "0.8rem",
              fontWeight: 800,
            }}
          >
            SOLD OUT
          </div>
        ) : (
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              zIndex: 5,
            }}
          >
            {badge && (
              <div
                className="product-badge"
                style={{ position: "relative", top: 0, left: 0 }}
              >
                {badge}
              </div>
            )}
            {discountPrice && (
              <div
                className="product-badge"
                style={{
                  backgroundColor: "#ef4444",
                  position: "relative",
                  top: 0,
                  left: 0,
                }}
              >
                SALE
              </div>
            )}
          </div>
        )}
        {!isMobile && (
          <div
            className="product-price-badge"
            style={{
              backgroundColor: discountPrice ? "#ef4444" : "#f0fdf4",
              color: discountPrice ? "#fff" : "#16a34a",
              border: discountPrice ? "none" : "1px solid #dcfce7",
            }}
          >
            <span style={{ fontWeight: 800 }}>GH₵{currentPrice}</span>
          </div>
        )}
        {inCart && (
          <div className="product-in-cart-badge">
            <CheckCircle size={14} />
            <span>In Cart</span>
          </div>
        )}
        <img src={resolvedImage} alt={name} className="product-main-image" />
        <img
          src={resolvedImage}
          alt={name}
          className="product-hover-image"
          style={{ filter: "brightness(0.95)" }}
        />
      </div>
      <div className="product-details">
        <h4 className="product-name">{name}</h4>

        {isMobile && (
          <p
            className="product-mobile-subtitle"
            style={{ color: "var(--yellow-accent)", fontWeight: "700" }}
          >
            {badge || "LINA HAIR CARE"}
          </p>
        )}

        {!isMobile && (
          <div className="product-desktop-actions">
            <p
              className="product-price"
              style={{ display: "flex", alignItems: "center", gap: "8px" }}
            >
              {discountPrice && (
                <span
                  style={{
                    textDecoration: "line-through",
                    color: "#94a3b8",
                    fontSize: "0.85em",
                  }}
                >
                  GH₵{price}
                </span>
              )}
              <span
                style={{
                  color: discountPrice ? "#ef4444" : "#16a34a",
                  fontWeight: "700",
                }}
              >
                GH₵{currentPrice}
              </span>
            </p>
            <button
              className="add-to-cart-btn"
              disabled={isSoldOut}
              style={{
                cursor: isSoldOut ? "not-allowed" : "pointer",
                opacity: isSoldOut ? 0.6 : 1,
              }}
              onClick={(e) => {
                e.stopPropagation();
                if (!isSoldOut)
                  addToCart({
                    id: resolvedId,
                    name,
                    price: currentPrice,
                    badge,
                    image: resolvedImage,
                    sku
                  });
              }}
            >
              <Plus size={16} /> {isSoldOut ? "Sold Out" : "Add to Cart"}
            </button>
            <div className="product-social-buy">
              {isSoldOut ? (
                <span
                  className="direct-wa-button"
                  style={{
                    opacity: 0.5,
                    cursor: "not-allowed",
                    background: "#e2e8f0",
                    color: "#94a3b8",
                  }}
                >
                  Currently Unavailable
                </span>
              ) : (
                <a
                  href={`https://wa.me/233551082163?text=${encodeURIComponent(
                    `Hi Lina! I'd like to order:\n\n🛍️ *${name}*${sku ? ` (SKU: ${sku})` : ''}\n💰 Price: GHS${currentPrice}\n🖼️ Product image: ${window.location.origin}${resolvedImage}\n\nPlease confirm availability. Thank you! 🙏`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="direct-wa-button"
                >
                  Direct WhatsApp Order
                </a>
              )}
            </div>
          </div>
        )}

        {isMobile && (
          <div className="product-mobile-actions-wrapper">
            <div className="mobile-buy-info">
              {isSoldOut ? (
                <span className="direct-buy-msg" style={{ color: "#ef4444" }}>
                  <PackageX size={10} style={{ marginRight: "4px" }} />
                  Currently Out of Stock
                </span>
              ) : (
                <span className="direct-buy-msg">
                  <MessageCircle size={10} style={{ marginRight: "4px" }} />
                  Order direct on WhatsApp & IG
                </span>
              )}
            </div>
            <div className="product-mobile-actions">
              <span className="mobile-price">
                {discountPrice && (
                  <span
                    style={{
                      textDecoration: "line-through",
                      color: "#94a3b8",
                      fontSize: "0.85em",
                      marginRight: "4px",
                    }}
                  >
                    GH₵{price}
                  </span>
                )}
                <span style={{ color: discountPrice ? "#ef4444" : "inherit" }}>
                  GH₵{currentPrice}
                </span>
              </span>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {!isSoldOut && (
                  <a
                    href={`https://wa.me/233551082163?text=${encodeURIComponent(
                      `Hi Lina! I'd like a fast order of:\n\n🛍️ *${name}*${sku ? ` (SKU: ${sku})` : ''}\n💰 Price: GHS${currentPrice}`
                    )}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mobile-add-btn"
                    style={{ background: "#25D366" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MessageCircle size={18} color="white" />
                  </a>
                )}
                <button
                  className="mobile-add-btn"
                  disabled={isSoldOut}
                  style={{ background: isSoldOut ? "#ef4444" : "" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!isSoldOut)
                      addToCart({
                        id: resolvedId,
                        name,
                        price: currentPrice,
                        badge,
                        image: resolvedImage,
                        sku
                      });
                  }}
                >
                  {isSoldOut ? (
                    <PackageX size={18} color="white" />
                  ) : (
                    <Plus size={18} color="white" strokeWidth={3} />
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
