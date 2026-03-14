import React, { useState, useEffect } from "react";
import { X, Minus, Plus, ShoppingBag, MessageCircle, Instagram, CheckCircle } from "lucide-react";
import { useModal } from "../../context/ModalContext";
import { useCart } from "../../context/CartContext";

const ProductDetailModal = () => {
  const { selectedProduct, closeProduct } = useModal();
  const { addToCart } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  useEffect(() => {
    if (selectedProduct) {
      setQty(1);
      const availableSizes = selectedProduct.sizes || [];
      if (availableSizes.length > 0) {
        setSize(availableSizes[0]);
      } else {
        setSize("");
      }
    }
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  const handleAdd = () => {
    const qtyNum = parseInt(qty) || 1;
    for (let i = 0; i < qtyNum; i++) {
      addToCart(selectedProduct, size);
    }

    setJustAdded(true);
    setTimeout(() => {
      setJustAdded(false);
      closeProduct();
    }, 800);
  };

  const {
    name,
    price,
    discountPrice,
    discountPercentage,
    badge,
    image,
    sizes,
  } = selectedProduct;

  const finalDiscountPrice =
    discountPrice ||
    (discountPercentage > 0
      ? (price * (1 - discountPercentage / 100)).toFixed(2)
      : null);

  return (
    <div className="product-modal-backdrop" onClick={closeProduct}>
      <div
        className="product-modal-window"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={closeProduct}>
          <X size={24} />
        </button>

        <div className="modal-scroll-area">
          <div className="modal-image-container">
            <img src={image} alt={name} />
            {badge && <div className="modal-badge">{badge}</div>}
          </div>

          <div className="modal-info">
            <h2 className="modal-title serif">{name}</h2>
            {selectedProduct.sku && (
              <p className="modal-sku" style={{ fontSize: '0.75rem', color: '#64748b', marginBottom: '0.5rem', fontWeight: 600 }}>
                Product ID: {selectedProduct.sku}
              </p>
            )}
            <p className="modal-price" style={{ color: "#16a34a", fontWeight: "700" }}>
              {finalDiscountPrice ? (
                <>
                  <span
                    style={{
                      textDecoration: "line-through",
                      color: "#94a3b8",
                      fontSize: "0.85em",
                      marginRight: "0.5rem",
                    }}
                  >
                    GH₵{price}
                  </span>
                  <span style={{ color: "#ef4444" }}>
                    GH₵{finalDiscountPrice}
                  </span>
                </>
              ) : (
                `GH₵${price}`
              )}
            </p>
            
            {sizes && sizes.length > 0 && (
              <div className="modal-sizes-container">
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748b', display: 'block', marginBottom: '0.5rem' }}>Select Size</span>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {sizes.map((s, idx) => (
                    <button
                      key={idx}
                      className={`size-chip-premium ${size === s ? 'active' : ''}`}
                      onClick={() => setSize(s)}
                      style={{
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        border: size === s ? '1px solid #013220' : '1px solid #e2e8f0',
                        background: size === s ? '#013220' : '#f8fafc',
                        color: size === s ? 'white' : '#013220'
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="modal-qty-selector">
              <span>Quantity</span>
              <div className="modal-qty-controls">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="modal-qty-btn"
                >
                  <Minus size={18} />
                </button>
                <span className="modal-qty-num">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="modal-qty-btn"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

              <div className="modal-actions">
                <button
                  className={`modal-add-btn ${justAdded ? "success" : ""}`}
                  onClick={handleAdd}
                >
                  {justAdded ? (
                    <>
                      <CheckCircle size={20} /> In Your Cart!
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={20} /> Add to Cart — <span style={{ color: "var(--yellow-accent)", fontWeight: "800" }}>{badge || "Natural"}</span>
                    </>
                  )}
                </button>

                <div className="modal-social-grid">
                  <a
                    href={`https://wa.me/233551082163?text=${encodeURIComponent(`Hi Lina Hair Care! I'm interested in ordering:
🛍️ *Product:* ${name}${selectedProduct.sku ? ` (ID: ${selectedProduct.sku})` : ''}
📏 *Size:* ${size || 'Standard'}
🔢 *Quantity:* ${qty}
💰 *Price:* GH₵${finalDiscountPrice || price} each
🖼️ *Image:* ${window.location.origin}${image}

Can you help me?`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="modal-social-btn wa"
                  >
                    <MessageCircle size={20} /> WhatsApp
                  </a>
                  <a
                    href="https://www.instagram.com/linas_essentials"
                    target="_blank"
                    rel="noreferrer"
                    className="modal-social-btn ig"
                  >
                    <Instagram size={20} /> Instagram
                  </a>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailModal;
