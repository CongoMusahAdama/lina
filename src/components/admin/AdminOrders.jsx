import React, { useState, useEffect } from "react";
import { Search, Plus, X, Sparkles, Eye, Trash2 } from "lucide-react";
import Swal from "sweetalert2";
import ReceiptModal from "../modals/ReceiptModal";

const AdminOrders = ({ orders, fetchOrders, addOrder, updateOrder, deleteOrder, products }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (showModal) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showModal]);

  const [newOrder, setNewOrder] = useState({
    customer: "",
    phone: "",
    location: "",
    productName: products[0]?.name || "",
    qty: 1,
    payment: "Unpaid",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const prod =
      products.find((p) => p.name === newOrder.productName) || products[0];
    if (!prod) return; // Prevent crash if no products exist
    addOrder({
      customer: newOrder.customer,
      phone: newOrder.phone,
      location: newOrder.location,
      items: [{ name: newOrder.productName, qty: parseInt(newOrder.qty) }],
      total: prod.price * newOrder.qty,
      payment: newOrder.payment,
      status: "Processing",
    });
    setShowModal(false);
    setNewOrder({
      customer: "",
      phone: "",
      location: "",
      productName: products[0]?.name || "",
      qty: 1,
      payment: "Unpaid",
    });
  };

  const filteredOrders = orders.filter((o) => {
    const s = searchTerm.toLowerCase();
    return (
      (o.customer && o.customer.toLowerCase().includes(s)) ||
      (o.orderId && o.orderId.toLowerCase().includes(s)) ||
      (o.phone && o.phone.includes(searchTerm)) ||
      (o._id && o._id.toString().toLowerCase().includes(s))
    );
  });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);

  return (
    <div className="dashboard-view fade-in">
      <header className="admin-header">
        <div className="page-title">
          <h1 className="serif">Order Book</h1>
          <p>Manual WhatsApp Sales Entry — {filteredOrders.length} Records</p>
        </div>
        <div className="admin-search-wrap" style={{ position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
          <input 
            type="text" 
            placeholder="Search customer, ID or phone..." 
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            style={{
              padding: '0.6rem 1rem 0.6rem 2.2rem',
              borderRadius: '10px',
              border: '1px solid #e2e8f0',
              fontSize: '0.85rem',
              width: '240px',
              background: '#f8fafc'
            }}
          />
        </div>
        <div
          className="header-actions"
          style={{ display: "flex", gap: "1rem" }}
        >
          <button
            onClick={() => {
              fetchOrders();
              Swal.fire({
                title: "Syncing...",
                text: "Fetching latest orders from server.",
                icon: "info",
                timer: 1000,
                showConfirmButton: false,
                toast: true,
                position: "top-end",
              });
            }}
            className="cta-button-premium"
            style={{
              padding: "0.8rem 1.2rem",
              fontSize: "0.75rem",
              borderRadius: "12px",
              background: "#f8fafc",
              color: "#64748b",
              border: "1px solid #e2e8f0",
            }}
          >
            <Sparkles size={16} /> Check for New Orders
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="cta-button-premium"
            style={{
              padding: "0.8rem 1.5rem",
              fontSize: "0.75rem",
              borderRadius: "12px",
            }}
          >
            <Plus size={16} /> Record Sale
          </button>
        </div>
      </header>

      {showModal && (
        <div
          className="admin-modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="admin-modal-card modal-narrow"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-pull-handle"></div>
            <div className="modal-header-premium">
              <div>
                <h2 className="serif">Record New Sale</h2>
                <p>Create a manual order for offline or WhatsApp sales.</p>
              </div>
              <button
                onClick={() => setShowModal(false)}
                className="sidebar-minimize-toggle"
              >
                <X size={18} strokeWidth={2} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="admin-modal-form">
              <div className="modal-content-scroll">
                <div className="form-group">
                  <label>Customer Name</label>
                  <input
                    type="text"
                    required
                    value={newOrder.customer}
                    onChange={(e) =>
                      setNewOrder({ ...newOrder, customer: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>WhatsApp / Phone</label>
                  <input
                    type="text"
                    value={newOrder.phone}
                    onChange={(e) =>
                      setNewOrder({ ...newOrder, phone: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Shipping Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Accra, Osu"
                    value={newOrder.location}
                    onChange={(e) =>
                      setNewOrder({ ...newOrder, location: e.target.value })
                    }
                  />
                </div>
                <div className="form-group">
                  <label>Select Product</label>
                  <select
                    value={newOrder.productName}
                    onChange={(e) =>
                      setNewOrder({ ...newOrder, productName: e.target.value })
                    }
                  >
                    {products.length > 0 ? (
                      products.map((p, idx) => (
                        <option key={p._id || p.id || idx} value={p.name}>
                          {p.name}
                        </option>
                      ))
                    ) : (
                      <option disabled>No products available</option>
                    )}
                  </select>
                </div>
                <div
                  className="form-grid-2"
                  style={{
                    gridTemplateColumns: "1fr 1fr",
                    gap: "1rem",
                    marginTop: "0.25rem",
                  }}
                >
                  <div className="form-group">
                    <label>Quantity</label>
                    <input
                      type="number"
                      min="1"
                      value={newOrder.qty}
                      onChange={(e) =>
                        setNewOrder({ ...newOrder, qty: e.target.value })
                      }
                    />
                  </div>
                  <div className="form-group">
                    <label>Payment State</label>
                    <select
                      value={newOrder.payment}
                      onChange={(e) =>
                        setNewOrder({ ...newOrder, payment: e.target.value })
                      }
                    >
                      <option>Unpaid</option>
                      <option>Paid</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-footer-premium">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn-cancel-premium"
                >
                  <X size={16} /> Close
                </button>
                <button
                  type="submit"
                  className="cta-button-premium shadowed"
                  style={{ flex: 2, padding: "1rem", borderRadius: "14px" }}
                >
                  Record Sale
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="admin-card" style={{ padding: "0" }}>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: "50px" }}>#</th>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Proof</th>
                <th>Location</th>
                <th>Price</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((order, index) => (
                <tr key={order._id || order.id}>
                  <td data-label="#">{indexOfFirstItem + index + 1}</td>
                  <td
                    data-label="Order ID"
                    style={{ fontWeight: 700, color: "#013220" }}
                  >
                    #{order.orderId || order.id}
                  </td>
                  <td data-label="Customer">
                    <div style={{ fontWeight: 600 }}>{order.customer}</div>
                    <div style={{ fontSize: "0.75rem", color: "#64748b" }}>
                      {order.phone}
                    </div>
                  </td>
                  <td data-label="Proof">
                    {order.paymentScreenshot ? (
                      <button
                        className="btn-view-proof"
                        onClick={() => {
                          Swal.fire({
                            title: "Payment Screenshot",
                            imageUrl: order.paymentScreenshot,
                            imageAlt: "Payment Proof",
                            confirmButtonColor: "#013220",
                            confirmButtonText: "Great, Close",
                          });
                        }}
                        style={{
                          background: "#f0fdf4",
                          color: "#16a34a",
                          border: "1px solid #dcfce7",
                          padding: "0.4rem 0.8rem",
                          borderRadius: "8px",
                          fontSize: "0.7rem",
                          fontWeight: 800,
                          cursor: "pointer",
                        }}
                      >
                        <Eye
                          size={14}
                          style={{ display: "inline", marginRight: "4px" }}
                        />{" "}
                        View
                      </button>
                    ) : (
                      <span style={{ fontSize: "0.7rem", color: "#94a3b8" }}>
                        None
                      </span>
                    )}
                  </td>
                  <td data-label="Location" style={{ fontSize: "0.85rem" }}>
                    {order.location || "N/A"}
                  </td>
                  <td data-label="Price" style={{ fontWeight: 700 }}>
                    GH₵{order.total}
                  </td>
                  <td data-label="Payment">
                    <span
                      className={`badge ${order.payment === "Paid" ? "badge-paid" : "badge-unpaid"}`}
                    >
                      {order.payment}
                    </span>
                  </td>
                  <td data-label="Status">
                    <span
                      className={`badge badge-${order.status.toLowerCase()}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td data-label="Actions" style={{ textAlign: "center" }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', alignItems: 'center' }}>
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateOrder(order._id || order.id, {
                            status: e.target.value,
                          })
                        }
                        style={{
                          padding: "0.4rem 0.5rem",
                          borderRadius: "8px",
                          border: "1px solid #e2e8f0",
                          background: "#f8fafc",
                          fontWeight: 600,
                          fontSize: "0.75rem",
                          color: "#334155",
                          cursor: "pointer",
                          outline: "none",
                        }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Blocked">Blocked</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                      <button
                        onClick={() => deleteOrder(order._id || order.id)}
                        style={{
                          background: '#fff1f2',
                          color: '#e11d48',
                          border: '1px solid #fee2e2',
                          padding: '0.4rem',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.2s'
                        }}
                        title="Delete Order"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div
            className="pagination-wrapper"
            style={{
              padding: "1.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid #f1f5f9",
            }}
          >
            <span style={{ fontSize: "0.85rem", color: "#64748b" }}>
              Showing {indexOfFirstItem + 1} to{" "}
              {Math.min(indexOfLastItem, filteredOrders.length)} of {filteredOrders.length}{" "}
              lines
            </span>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="pagination-btn"
              >
                Prev
              </button>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="pagination-btn"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {selectedReceipt && (
        <ReceiptModal
          order={selectedReceipt}
          onClose={() => setSelectedReceipt(null)}
        />
      )}
    </div>
  );
};

export default AdminOrders;
