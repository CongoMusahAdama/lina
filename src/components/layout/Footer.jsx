import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Phone, MessageCircle, Mail, Instagram, Facebook, Ghost, ArrowRight } from "lucide-react";

const Footer = () => {
  const location = useLocation();
  if (location.pathname === "/auth" || location.pathname.startsWith("/admin"))
    return null;

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <a href="/" className="logo footer-logo">
              <img
                src="/LHCP logo.jpeg"
                alt="Lina Hair Care Products"
                className="footer-logo-img"
              />
            </a>
            <p className="footer-desc">
              Growing beautiful hair globally. Lina Hair Care Products offers
              premium, natural solutions for all hair types.
            </p>
            <div className="flex flex-col gap-3" style={{ marginTop: "2rem" }}>
              <div className="flex items-center gap-3 footer-desc">
                <Phone size={16} className="text-teal" />
                <span>+233 54 816 4756 (Linas Essential)</span>
              </div>
              <div className="flex items-center gap-3 footer-desc">
                <MessageCircle size={16} className="text-teal" />
                <span>+233 55 108 2163 (WhatsApp/Call)</span>
              </div>
              <div className="flex items-center gap-3 footer-desc">
                <Mail size={16} className="text-teal" />
                <span style={{ fontSize: "0.85rem" }}>
                  info@linahaircare.com
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="footer-heading">Collections</h4>
            <ul className="footer-links">
              <li>
                <Link to="/shop">Hair Growth</Link>
              </li>
              <li>
                <Link to="/shop">Moisturizers</Link>
              </li>
              <li>
                <Link to="/shop">Anti-Dandruff</Link>
              </li>
              <li>
                <Link to="/shop">All Products</Link>
              </li>
              <li style={{ marginTop: "0.5rem", paddingTop: "0.5rem", borderTop: "1px solid #333" }}>
                <Link to="/track" style={{ color: "#FFD700", fontWeight: 700 }}>Track My Order 📦</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Connect With Us</h4>
            <ul className="footer-links">
              <li>
                <a href="https://www.instagram.com/linas_essentials" target="_blank" rel="noreferrer" className="flex items-center gap-2">
                  <Instagram size={16} /> @linas_essentials
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/Lina’s.essentials" target="_blank" rel="noreferrer" className="flex items-center gap-2">
                  <Facebook size={16} /> Lina’s.essentials
                </a>
              </li>
              <li>
                <a href="https://www.tiktok.com/@linas_essentials" target="_blank" rel="noreferrer" className="flex items-center gap-2">
                  <span style={{ fontWeight: 800 }}>T</span> @linas_essentials
                </a>
              </li>
              <li>
                <a href="https://www.snapchat.com/add/Linas_Essentials" target="_blank" rel="noreferrer" className="flex items-center gap-2">
                  <Ghost size={16} /> @Linas_Essentials
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Newsletter</h4>
            <p className="footer-desc" style={{ marginBottom: "1rem" }}>
              Join the Lina family. Get exclusive access to new drops.
            </p>
            <div className="flex">
              <input
                type="text"
                placeholder="YOUR EMAIL"
                style={{
                  padding: "0.8rem",
                  background: "#222",
                  border: "none",
                  color: "white",
                  width: "100%",
                }}
              />
              <button
                className="bg-teal"
                style={{ padding: "0 1rem", color: "white" }}
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 Lina Hair Care Products. All rights reserved.</p>
          <div className="flex gap-8">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
