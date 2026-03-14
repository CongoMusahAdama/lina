import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Headset, X, Phone, MessageCircle, ArrowRight } from "lucide-react";

const SupportBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  if (location.pathname === "/auth" || location.pathname.startsWith("/admin"))
    return null;

  return (
    <div className={`support-bot-container ${isOpen ? "open" : ""}`}>
      {isOpen ? (
        <div className="support-window">
          <div className="support-header-premium">
            <div className="flex items-center gap-4">
              <div className="support-avatar-pulse">
                <Headset size={22} color="white" />
                <div className="online-indicator"></div>
              </div>
              <div>
                <h4
                  className="serif"
                  style={{
                    fontSize: "1.1rem",
                    margin: 0,
                    letterSpacing: "0.02em",
                  }}
                >
                  Lina Care Support
                </h4>
                <p className="support-status">Online | Always here to help</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="close-support-btn"
            >
              <X size={20} strokeWidth={2} />
            </button>
          </div>

          <div className="support-body-premium">
            <div className="support-msg-bubble">
              <p>
                Hello! Welcome to Lina Hair Care Products. How can we help you
                grow beautiful hair today?
              </p>
            </div>

            <div className="support-action-grid">
              <a href="tel:+233548164756" className="support-action-card">
                <div className="action-icon-circle tel-bg">
                  <Phone size={18} />
                </div>
                <div className="action-details">
                  <span>Call Us Direct & Payment</span>
                  <strong>+233 54 816 4756 (Linas Essential)</strong>
                </div>
                <ArrowRight size={14} className="action-arrow" />
              </a>

              <a
                href="https://wa.me/233551082163"
                target="_blank"
                rel="noreferrer"
                className="support-action-card"
              >
                <div className="action-icon-circle wa-bg">
                  <MessageCircle size={18} />
                </div>
                <div className="action-details">
                  <span>WhatsApp or Call</span>
                  <strong>+233 55 108 2163</strong>
                </div>
                <ArrowRight size={14} className="action-arrow" />
              </a>
            </div>
          </div>

          <div className="support-footer-premium">
            <a
              href="https://wa.me/233551082163"
              target="_blank"
              rel="noreferrer"
              className="whatsapp-sticky-btn"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      ) : (
        <button
          className="support-launcher-premium"
          onClick={() => setIsOpen(true)}
        >
          <div className="launcher-icon-wrap">
            <Headset size={28} color="white" strokeWidth={1.5} />
            <div className="unread-dot"></div>
          </div>
          <span className="launcher-label">Expert Advice</span>
        </button>
      )}
    </div>
  );
};

export default SupportBot;
