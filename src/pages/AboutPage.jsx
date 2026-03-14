import React, { useEffect } from "react";
import { Shield, Globe, Award, Phone, MessageCircle, Mail, Instagram, Facebook, Ghost } from "lucide-react";

const AboutPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
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
  }, []);

  return (
    <div className="about-page">
      <section className="about-hero">
        <div className="container center-text reveal">
          <span
            style={{
              textTransform: "uppercase",
              letterSpacing: "0.5em",
              fontSize: "0.9rem",
            }}
          >
            Lina Hair Care Products
          </span>
          <h1 className="serif" style={{ fontSize: "5rem", marginTop: "1rem" }}>
            Our Ethics
          </h1>
        </div>
      </section>

      <section className="section-padding container">
        <div className="about-story-grid">
          <div className="reveal">
            <span
              style={{
                textTransform: "uppercase",
                letterSpacing: "0.3em",
                fontSize: "0.8rem",
                color: "#013220",
              }}
            >
              Established 2025
            </span>
            <h2
              className="serif"
              style={{
                fontSize: "3.5rem",
                marginTop: "1rem",
                marginBottom: "2rem",
              }}
            >
              A Legacy of Organic Hair Growth.
            </h2>
            <p
              style={{
                fontSize: "1.2rem",
                color: "#666",
                lineHeight: "1.8",
                marginBottom: "2rem",
              }}
            >
              Lina Hair Care Products was born from a simple yet profound
              realization: that natural ingredients are the ultimate key to hair
              health and confidence. For years, we have been researching the
              most effective botanical oils and butters.
            </p>
            <p style={{ color: "#666", lineHeight: "1.8" }}>
              Our journey began with handmade growth elixirs in a small kitchen.
              Today, we are proud to be a premier destination for those who seek
              hair care that reflects their natural beauty and uncompromising
              desire for growth.
            </p>
          </div>
          <div className="heritage-image-wrapper reveal">
            <img
              src="/image_copy.png"
              alt="Lina Hair Care Natural Ingredients"
              style={{
                width: "100%",
                height: "600px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          </div>
        </div>
      </section>

      <section
        className="section-padding"
        style={{
          backgroundColor: "#013220",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="hair-pattern-overlay"></div>
        <div className="container" style={{ position: "relative", zIndex: 2 }}>
          <div
            className="center-text reveal"
            style={{ textAlign: "center", marginBottom: "5rem" }}
          >
            <span
              style={{
                textTransform: "uppercase",
                letterSpacing: "0.3em",
                fontSize: "0.8rem",
                color: "#FFD700",
              }}
            >
              Our Philosophy
            </span>
            <h2
              className="serif"
              style={{ fontSize: "3.5rem", marginTop: "1rem", color: "white" }}
            >
              Values That Define Us
            </h2>
          </div>

          <div className="values-grid">
            <div
              className="value-card reveal"
              style={{
                backgroundColor: "rgba(255,255,255,0.05)",
                borderColor: "rgba(255,255,255,0.1)",
              }}
            >
              <div className="value-icon" style={{ color: "#FFD700" }}>
                <Shield size={30} strokeWidth={1.5} />
              </div>
              <h4
                className="serif"
                style={{
                  fontSize: "1.8rem",
                  marginBottom: "1.5rem",
                  color: "white",
                }}
              >
                Pure Ingredients
              </h4>
              <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: "1.6" }}>
                We source only the finest natural botanicals, from organic shea
                butter to pure essential oils, ensuring every jar is potent.
              </p>
            </div>

            <div
              className="value-card reveal"
              style={{
                transitionDelay: "0.2s",
                backgroundColor: "rgba(255,255,255,0.05)",
                borderColor: "rgba(255,255,255,0.1)",
              }}
            >
              <div className="value-icon" style={{ color: "#FFD700" }}>
                <Globe size={30} strokeWidth={1.5} />
              </div>
              <h4
                className="serif"
                style={{
                  fontSize: "1.8rem",
                  marginBottom: "1.5rem",
                  color: "white",
                }}
              >
                Global Reach
              </h4>
              <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: "1.6" }}>
                Our brand is inspired by African botanical secrets, formulated
                to serve beautiful hair globally across all textures.
              </p>
            </div>

            <div
              className="value-card reveal"
              style={{
                transitionDelay: "0.4s",
                backgroundColor: "rgba(255,255,255,0.05)",
                borderColor: "rgba(255,255,255,0.1)",
              }}
            >
              <div className="value-icon" style={{ color: "#FFD700" }}>
                <Award size={30} strokeWidth={1.5} />
              </div>
              <h4
                className="serif"
                style={{
                  fontSize: "1.8rem",
                  marginBottom: "1.5rem",
                  color: "white",
                }}
              >
                Customer Care
              </h4>
              <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: "1.6" }}>
                Lina Hair Care is a partner in your hair journey. We provide
                personalized advice for every customer's unique needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="contact-luxury-section section-padding"
        style={{ backgroundColor: "#013220", color: "white" }}
      >
        <div className="hair-pattern-overlay"></div>
        <div className="container" style={{ position: "relative", zIndex: 5 }}>
          <div className="flex flex-col md:flex-row gap-8 items-start mb-16">
            <div className="reveal" style={{ flex: 1 }}>
              <span
                className="text-yellow"
                style={{
                  textTransform: "uppercase",
                  letterSpacing: "0.4em",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                }}
              >
                Get in Touch
              </span>
              <h2
                className="serif"
                style={{ fontSize: "4.5rem", marginTop: "1rem", lineHeight: 1 }}
              >
                Contact <br />
                Lina Hair Care
              </h2>
            </div>
            <div className="reveal" style={{ flex: 1, paddingTop: "2.5rem" }}>
              <p
                style={{
                  fontSize: "1.25rem",
                  color: "rgba(255,255,255,0.7)",
                  lineHeight: "1.8",
                  maxWidth: "500px",
                }}
              >
                Whether you have a question about our collections, need
                personalized hair growth advice, or want to discuss a wholesale
                partnership, we are here to assist you.
              </p>
            </div>
          </div>

          <div className="contact-luxury-grid">
            <div className="contact-main-card reveal">
              <div className="contact-methods-stack">
                <div className="contact-premium-item">
                  <div className="icon-wrap">
                    <Phone size={24} />
                  </div>
                  <div className="text-wrap">
                    <label>Call & Payment</label>
                    <a href="tel:+233548164756">+233 54 816 4756 (Linas Essential)</a>
                  </div>
                </div>

                <div className="contact-premium-item">
                  <div
                    className="icon-wrap"
                    style={{ backgroundColor: "#25D366" }}
                  >
                    <MessageCircle size={24} />
                  </div>
                  <div className="text-wrap">
                    <label>WhatsApp / Call</label>
                    <a href="https://wa.me/233551082163">+233 55 108 2163</a>
                  </div>
                </div>

                <div className="contact-premium-item">
                  <div className="icon-wrap">
                    <Mail size={24} />
                  </div>
                  <div className="text-wrap">
                    <label>Professional Inquiries</label>
                    <a href="mailto:info@linahaircare.com">
                      info@linahaircare.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="social-community-card reveal"
              style={{ transitionDelay: "0.2s" }}
            >
              <h3 className="serif" style={{ fontSize: "2rem", marginBottom: "1.5rem" }}>Join Our Community</h3>
              <p style={{ color: "rgba(255,255,255,0.7)", marginBottom: "2rem" }}>Follow our journey and share your results.</p>
              <div className="contact-social-pills">
                <a href="https://www.instagram.com/linas_essentials" target="_blank" rel="noreferrer" className="social-pill">
                  <Instagram size={18} />
                  <span>Instagram</span>
                </a>
                <a href="https://www.facebook.com/Lina’s.essentials" target="_blank" rel="noreferrer" className="social-pill">
                  <Facebook size={18} />
                  <span>Facebook</span>
                </a>
                <a href="https://www.tiktok.com/@linas_essentials" target="_blank" rel="noreferrer" className="social-pill">
                  <span style={{ fontWeight: 800 }}>T</span>
                  <span>TikTok</span>
                </a>
                <a href="https://www.snapchat.com/add/Linas_Essentials" target="_blank" rel="noreferrer" className="social-pill">
                  <Ghost size={18} />
                  <span>Snapchat</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
