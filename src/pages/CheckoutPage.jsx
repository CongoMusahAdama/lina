import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, Shield, MessageCircle, Instagram, Facebook, Ghost, Upload, CheckCircle, Copy, ArrowRight, ArrowLeft, Camera, Phone, MapPin } from "lucide-react";
import Swal from "sweetalert2";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../context/CartContext";
import { API_URL } from "../utils/api";

const CheckoutPage = ({ addOrder }) => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const deliveryFee = 25;
  const totalWithDelivery = cartTotal + deliveryFee;
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [screenshotUrl, setScreenshotUrl] = useState("");
  const [formData, setFormData] = useState({
    customer: "",
    phone: "",
    location: "",
  });

  const MOMO_NUMBER = "0548164756";

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [step]);

  const handleCopy = () => {
    navigator.clipboard.writeText(MOMO_NUMBER);
    Swal.fire({
      title: "Copied!",
      text: "MoMo number copied to clipboard.",
      icon: "success",
      timer: 1000,
      showConfirmButton: false,
      toast: true,
      position: "top-end"
    });
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const formDataUpload = new FormData();
    formDataUpload.append("screenshot", file);

    try {
      const res = await fetch(`${API_URL}/upload/screenshot`, {
        method: "POST",
        body: formDataUpload,
      });
      const data = await res.json();
      if (data.success) {
        setScreenshotUrl(data.url);
      } else {
        Swal.fire("Error", data.message || "Could not upload screenshot.", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Network error during upload.", "error");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const orderData = {
      customer: formData.customer,
      phone: formData.phone,
      location: formData.location,
      items: cartItems.map((i) => ({
        name: i.name,
        qty: i.qty,
        size: i.size || "M",
      })),
      total: totalWithDelivery,
      paymentScreenshot: screenshotUrl,
      paymentMethod: "Direct Payment",
      status: "Pending",
    };

    const res = await addOrder(orderData);
    if (res.success) {
      const order = res.data;
      const itemsList = cartItems.map((i) => `• ${i.name} (${i.qty})`).join("\n");
      const dashboardLink = `${window.location.origin}/admin/orders?search=${order.orderId}`;
      const whatsappMsg =
        `🛍️ *Lina Hair Care - New Order Received!*\n\n` +
        `*Order ID:* ${order.orderId}\n\n` +
        `*Customer Details:*\n` +
        `👤 Name: ${formData.customer}\n` +
        `📞 Phone: ${formData.phone}\n` +
        `📍 Location: ${formData.location}\n\n` +
        `*Items Ordered:*\n${itemsList}\n\n` +
        `*Subtotal:* GH₵${cartTotal.toFixed(2)}\n` +
        `*Delivery:* GH₵${deliveryFee.toFixed(2)}\n` +
        `*Total Amount:* GH₵${totalWithDelivery.toFixed(2)}\n\n` +
        `🔗 *View in Dashboard:* ${dashboardLink}`;

      const whatsappLink = `https://wa.me/233551082163?text=${encodeURIComponent(whatsappMsg)}`;

      clearCart();
      
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#013220", "#FFD700", "#ffffff"]
      });

      Swal.fire({
        title: "Order Successful!",
        html: `
          <div style="text-align: center;">
            <p style="margin-bottom: 1.5rem;">Your order <b>#${order.orderId || order._id}</b> has been received and is being reviewed.</p>
            <p style="font-size: 0.9rem; color: #64748b; margin-bottom: 2rem;">Please click the button below to notify us on WhatsApp for faster processing.</p>
            <a href="${whatsappLink}" target="_blank" rel="noreferrer" id="whatsapp-redirect-btn" class="swal2-confirm swal2-styled" style="background-color: #25D366; display: inline-flex; align-items: center; gap: 0.5rem; text-decoration: none; border-radius: 12px; padding: 1rem 1.5rem;">
               <MessageCircle size={20} />
               Continue to WhatsApp
            </a>
          </div>
        `,
        icon: "success",
        showConfirmButton: false,
        allowOutsideClick: false,
        footer: '<a href="/" style="color: #64748b; text-decoration: none; font-size: 0.8rem;">Return to Homepage</a>',
      });
      
      setTimeout(() => {
        window.open(whatsappLink, "_blank");
      }, 3000);

    }
    setIsSubmitting(false);
  };

  const steps = [
    { id: 1, title: "Delivery", icon: <MapPin size={18} /> },
    { id: 2, title: "Payment", icon: <Shield size={18} /> },
    { id: 3, title: "Confirm", icon: <CheckCircle size={18} /> },
  ];

  return (
    <div className="checkout-page section-padding container" style={{ minHeight: "80vh" }}>
      <div className="checkout-stepper reveal" style={{ marginBottom: "3rem", display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem" }}>
        {steps.map((s, idx) => (
          <React.Fragment key={s.id}>
            <div className={`step-item ${step >= s.id ? "active" : ""}`} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem", opacity: step >= s.id ? 1 : 0.4 }}>
              <div style={{ 
                width: "40px", 
                height: "40px", 
                borderRadius: "50%", 
                background: step >= s.id ? "#013220" : "#e2e8f0", 
                color: "white", 
                display: "flex", 
                alignItems: "center", 
                justifyContent: "center",
                transition: "all 0.3s ease"
              }}>
                {step > s.id ? <CheckCircle size={20} /> : s.icon}
              </div>
              <span style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>{s.title}</span>
            </div>
            {idx < steps.length - 1 && (
              <div style={{ width: "40px", height: "1px", background: step > s.id ? "#013220" : "#e2e8f0", marginTop: "-1.5rem" }}></div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="checkout-grid" style={{ gridTemplateColumns: "1fr 400px", gap: "4rem" }}>
        <div className="checkout-main-content">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="step-content"
              >
                <div className="form-section glass shadowed" style={{ padding: "3rem", borderRadius: "24px" }}>
                  <h3 className="serif" style={{ fontSize: "2rem", marginBottom: "2rem" }}>Where should we deliver?</h3>
                  <div className="form-group-premium" style={{ marginBottom: "1.5rem" }}>
                    <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 700 }}>Full Name</label>
                    <input
                      type="text"
                      placeholder="Ama Serwaa"
                      value={formData.customer}
                      onChange={(e) => setFormData({ ...formData, customer: e.target.value })}
                      style={{ width: "100%", padding: "1rem", borderRadius: "12px", border: "1px solid #e2e8f0" }}
                    />
                  </div>
                  <div className="form-group-premium" style={{ marginBottom: "1.5rem" }}>
                    <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 700 }}>WhatsApp Number</label>
                    <input
                      type="text"
                      placeholder="+233 55 555 5555"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      style={{ width: "100%", padding: "1rem", borderRadius: "12px", border: "1px solid #e2e8f0" }}
                    />
                  </div>
                  <div className="form-group-premium" style={{ marginBottom: "2rem" }}>
                    <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 700 }}>Landing Point / Landmark</label>
                    <input
                      type="text"
                      placeholder="Accra, Osu / Near Total Station"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      style={{ width: "100%", padding: "1rem", borderRadius: "12px", border: "1px solid #e2e8f0" }}
                    />
                  </div>
                  <button
                    disabled={!formData.customer || !formData.phone || !formData.location}
                    onClick={() => setStep(2)}
                    className="cta-button-premium"
                    style={{ width: "100%", justifyContent: "center", borderRadius: "14px" }}
                  >
                    Go to Payment <ArrowRight size={18} />
                  </button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="step-content"
              >
                <div className="form-section glass shadowed" style={{ padding: "3rem", borderRadius: "24px" }}>
                  <h3 className="serif" style={{ fontSize: "2rem", marginBottom: "2rem" }}>Direct Payment</h3>
                  <div className="momo-payment-card" style={{ background: "#013220", color: "white", padding: "2rem", borderRadius: "20px", marginBottom: "2rem", position: "relative", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: "-20px", right: "-20px", opacity: 0.1 }}>
                      <Shield size={120} />
                    </div>
                    <p style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.7, marginBottom: "1rem" }}>Official MTN MoMo / Telecel Cash</p>
                    <div className="flex items-center justify-between" style={{ marginBottom: "0.5rem" }}>
                       <h2 style={{ fontSize: "2.2rem", letterSpacing: "0.05em" }}>054 816 4756</h2>
                       <button onClick={handleCopy} style={{ color: "white", opacity: 0.8 }} title="Copy Number">
                         <Copy size={20} />
                       </button>
                    </div>
                    <p style={{ fontWeight: 700, fontSize: "1rem" }}>Linas_Essentials</p>
                    <div style={{ marginTop: "1.5rem", background: "rgba(255,255,255,0.1)", padding: "0.8rem", borderRadius: "12px", display: "flex", gap: "0.8rem", alignItems: "center" }}>
                      <AlertTriangle size={16} color="#FFD700" />
                      <span style={{ fontSize: "0.75rem", fontWeight: 600 }}>Confirm name before authorising payment</span>
                    </div>
                  </div>

                  <div className="screenshot-tip" style={{ display: "flex", gap: "1rem", marginBottom: "2rem", color: "#64748b", fontSize: "0.9rem" }}>
                    <Camera size={20} />
                    <p>After paying, please take a screenshot of the receipt and upload it in the next step.</p>
                  </div>

                  <div className="flex gap-4">
                    <button onClick={() => setStep(1)} style={{ flex: 1, padding: "1rem", borderRadius: "14px", border: "1px solid #e2e8f0", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
                      <ArrowLeft size={18} /> Back
                    </button>
                    <button onClick={() => setStep(3)} className="cta-button-premium" style={{ flex: 2, justifyContent: "center", borderRadius: "14px" }}>
                      Confirm Payment <ArrowRight size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="step-content"
              >
                <div className="form-section glass shadowed" style={{ padding: "3rem", borderRadius: "24px" }}>
                  <h3 className="serif" style={{ fontSize: "2rem", marginBottom: "1rem" }}>Final Step</h3>
                  <p style={{ color: "#64748b", marginBottom: "2rem" }}>Upload your payment proof to complete your order.</p>
                  
                  <div className="upload-zone" style={{ 
                    border: "2px dashed #e2e8f0", 
                    borderRadius: "20px", 
                    padding: "3rem", 
                    textAlign: "center", 
                    cursor: "pointer", 
                    background: screenshotUrl ? "#f0fdf4" : "#f8fafc",
                    transition: "all 0.3s ease",
                    marginBottom: "2.5rem"
                  }} onClick={() => document.getElementById("proof-upload").click()}>
                    <input type="file" id="proof-upload" hidden accept="image/*" onChange={handleFileUpload} />
                    {isUploading ? (
                      <div className="loader-premium" style={{ width: "30px", height: "30px", borderTopColor: "#013220", margin: "0 auto" }}></div>
                    ) : screenshotUrl ? (
                      <div>
                        <CheckCircle size={40} color="#16a34a" style={{ margin: "0 auto 1rem" }} />
                        <p style={{ fontWeight: 700, color: "#16a34a" }}>Payment Screenshot Received</p>
                        <p style={{ fontSize: "0.8rem", color: "#64748b" }}>Click to change if needed</p>
                      </div>
                    ) : (
                      <div>
                        <Upload size={40} color="#94a3b8" style={{ margin: "0 auto 1rem" }} />
                        <p style={{ fontWeight: 700 }}>Tap to upload proof</p>
                        <p style={{ fontSize: "0.8rem", color: "#64748b" }}>PNG, JPG or Screenshot</p>
                      </div>
                    )}
                  </div>

                  <div className="flex gap-4">
                    <button onClick={() => setStep(2)} disabled={isSubmitting} style={{ flex: 1, padding: "1rem", borderRadius: "14px", border: "1px solid #e2e8f0", fontWeight: 700 }}>
                      Back
                    </button>
                    <button 
                      disabled={!screenshotUrl || isSubmitting || isUploading} 
                      onClick={handleSubmit} 
                      className="cta-button-premium" 
                      style={{ flex: 2, justifyContent: "center", borderRadius: "14px" }}
                    >
                      {isSubmitting ? "Finishing..." : "Confirm & Place Order"}
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="summary-column">
           <div className="glass shadowed" style={{ padding: "2rem", borderRadius: "24px" }}>
              <h4 className="serif" style={{ fontSize: "1.2rem", marginBottom: "1.5rem", borderBottom: "1px solid #f1f5f9", paddingBottom: "1rem" }}>Order Summary</h4>
              <div style={{ maxHeight: "300px", overflowY: "auto", marginBottom: "1.5rem" }}>
                {cartItems.map(item => (
                  <div key={item.cartId} className="flex gap-4" style={{ marginBottom: "1rem" }}>
                     <img src={item.image} style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "8px" }} />
                     <div style={{ flex: 1 }}>
                        <p style={{ fontSize: "0.85rem", fontWeight: 700, margin: 0 }}>{item.name}</p>
                        <p style={{ fontSize: "0.75rem", color: "#64748b" }}>Qty: {item.qty} • {item.selectedSize || "Standard"}</p>
                     </div>
                     <p style={{ fontSize: "0.85rem", fontWeight: 700 }}>GH₵{(item.price * item.qty).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: "2px solid #013220", paddingTop: "1.5rem" }}>
                <div className="flex justify-between" style={{ marginBottom: "0.8rem", fontSize: "0.9rem" }}>
                   <span>Subtotal</span>
                   <span>GH₵{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between" style={{ marginBottom: "1.5rem", fontSize: "0.9rem" }}>
                   <span>Delivery</span>
                   <span style={{ color: "#013220", fontWeight: 700 }}>GH₵{deliveryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between" style={{ fontSize: "1.2rem", fontWeight: 800, color: "#013220" }}>
                   <span>Total</span>
                   <span>GH₵{totalWithDelivery.toFixed(2)}</span>
                </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

