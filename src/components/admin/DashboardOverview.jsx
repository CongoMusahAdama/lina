import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles, Plus, Package, ShoppingCart, Award, AlertTriangle, BarChart3 } from "lucide-react";

const DashboardOverview = ({ products, orders, user }) => {
  const navigate = useNavigate();
  const pendingCount = orders.filter(
    (o) => o.status === "Pending" || o.status === "Processing",
  ).length;
  const lowStockThreshold = 5;
  const lowStock = products.filter((p) => p.stock <= lowStockThreshold).length;
  const totalSales = orders.reduce((sum, o) => sum + (o.total || 0), 0);

  // Pagination for Recent Orders
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentOrders = orders.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  return (
    <div className="dashboard-view fade-in">
      <div className="welcome-banner reveal active">
        <div className="welcome-content">
          <h2 className="serif">
            Welcome Back,{" "}
            {user?.name && user.name !== "Lina Admin" && user.name !== "Admin"
              ? user.name.split(" ")[0]
              : "Lina"}
            !
          </h2>
          <p>
            Growing Beautiful Hair Globally. Here is a summary of your
            performance today.
          </p>
        </div>
        <div className="welcome-decor">
          <Sparkles size={60} className="sparkle-icon" />
        </div>
      </div>

      <header className="admin-header">
        <div className="page-title">
          <h1 className="serif">Performance Overview</h1>
          <p>
            Lina Hair Care Products •{" "}
            {new Date().toLocaleDateString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="header-actions">
          <button
            onClick={() => navigate("/admin/products")}
            className="cta-button-premium shadowed"
            style={{
              padding: "0.8rem 1.75rem",
              fontSize: "0.8rem",
              borderRadius: "14px",
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
            }}
          >
            <Plus size={18} /> Add New Product
          </button>
        </div>
      </header>

      {/* Interactive Stats Cards */}
      <div className="stats-grid">
        <div
          className="stat-card blue interactive"
          onClick={() => navigate("/admin/products")}
        >
          <div className="stat-icon">
            <Package size={24} />
          </div>
          <div className="stat-info">
            <h3>Total Products</h3>
            <span className="stat-number">{products.length}</span>
            <span className="stat-link">View catalog →</span>
          </div>
        </div>

        <div
          className="stat-card green interactive"
          onClick={() => navigate("/admin/orders")}
        >
          <div className="stat-icon">
            <ShoppingCart size={24} />
          </div>
          <div className="stat-info">
            <h3>Total Orders</h3>
            <span className="stat-number">{orders.length}</span>
            <span className="stat-link">Manage sales →</span>
          </div>
        </div>

        <div
          className="stat-card yellow interactive"
          onClick={() => navigate("/admin/receipts")}
        >
          <div className="stat-icon">
            <Award size={24} />
          </div>
          <div className="stat-info">
            <h3>Total Sales</h3>
            <span className="stat-number">
              GH₵{totalSales.toLocaleString()}
            </span>
            <span className="stat-link">Receipts →</span>
          </div>
        </div>

        <div
          className="stat-card orange interactive"
          onClick={() => navigate("/admin/orders")}
        >
          <div className="stat-icon">
            <AlertTriangle size={24} />
          </div>
          <div className="stat-info">
            <h3>Pending</h3>
            <span className="stat-number">{pendingCount}</span>
            <span className="stat-link">Take action →</span>
          </div>
        </div>

      </div>

      <div className="dashboard-grid" style={{ gridTemplateColumns: "1fr" }}>
        <div className="admin-card">
          <div className="card-header">
            <h2>Recent Orders</h2>
            <Link
              to="/admin/orders"
              style={{ fontSize: "0.8rem", color: "#013220", fontWeight: 700 }}
            >
              View All
            </Link>
          </div>
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ width: "40px" }}>#</th>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {currentOrders.map((order, index) => (
                  <tr key={order._id || order.id}>
                    <td data-label="#">{indexOfFirstItem + index + 1}</td>
                    <td data-label="Order ID" style={{ fontWeight: 700 }}>
                      #{order.orderId || order._id}
                    </td>
                    <td data-label="Customer">{order.customer}</td>
                    <td data-label="Total" style={{ fontWeight: 600 }}>
                      GH₵{order.total}
                    </td>
                    <td data-label="Status">
                      <span
                        className={`badge badge-${order.status.toLowerCase()}`}
                      >
                        {order.status}
                      </span>
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
                padding: "1rem",
                display: "flex",
                justifyContent: "center",
                gap: "0.5rem",
                borderTop: "1px solid #f1f5f9",
              }}
            >
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
                className="pagination-btn"
              >
                Prev
              </button>
              <span
                style={{
                  alignSelf: "center",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                }}
              >
                {currentPage} / {totalPages}
              </span>
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
                className="pagination-btn"
              >
                Next
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default DashboardOverview;
