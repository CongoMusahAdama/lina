import React, { useState } from "react";
import { Link, useLocation, Routes, Route } from "react-router-dom";
import {
  X,
  LayoutGrid,
  Menu,
  LayoutDashboard,
  Package,
  Layers,
  ShoppingCart,
  BarChart3,
  Globe,
  ShoppingBag,
  LogOut,
  User,
} from "lucide-react";
import Swal from "sweetalert2";
import ReceiptCedi from "../ui/ReceiptCedi";
import DashboardOverview from "./DashboardOverview";
import AdminProducts from "./AdminProducts";
import AdminOrders from "./AdminOrders";
import AdminReceipts from "./AdminReceipts";
import AdminCategories from "./AdminCategories";

const AdminDashboard = ({
  products,
  categories,
  orders,
  fetchOrders,
  addProduct,
  updateProduct,
  deleteProduct,
  addOrder,
  updateOrder,
  deleteOrder,
  setCategories,
  user,
  onLogout,
}) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const location = useLocation();

  const handleMobileLogout = () => {
    Swal.fire({
      title: "Sign Out?",
      text: "Are you sure you want to end your session?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#013220",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Sign Out",
    }).then((result) => {
      if (result.isConfirmed) {
        onLogout();
      }
    });
  };

  return (
    <div className={`dashboard-layout ${isMinimized ? "minimized" : ""}`}>
      {/* Mobile Sidebar Overlay */}
      {isMobileOpen && (
        <div 
          className="admin-sidebar-overlay" 
          onClick={() => setIsMobileOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`admin-sidebar ${isMobileOpen ? "mobile-open" : ""} ${isMinimized ? "minimized" : ""}`}
      >
        {/* Mobile Close Button */}
        <div className="mobile-only" style={{ position: 'absolute', right: '1rem', top: '1rem', zIndex: 1001 }}>
          <button 
            onClick={() => setIsMobileOpen(false)}
            style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', padding: '0.5rem', borderRadius: '50%' }}
          >
            <X size={20} />
          </button>
        </div>

        <div className="sidebar-header">
          {!isMinimized && (
            <div className="flex items-center gap-4">
              <Link to="/" title="Go to Website">
                <img
                  src="/LHCP logo.jpeg"
                  alt="Lina Hair Care"
                  className="admin-logo"
                  style={{ cursor: "pointer" }}
                />
              </Link>
              <div className="admin-profile-hint">
                <h2
                  className="serif"
                  style={{ fontSize: "1rem", color: "white", margin: 0 }}
                >
                  Lina Hair Care
                </h2>
                <p
                  style={{
                    fontSize: "0.65rem",
                    color: "rgba(255,255,255,0.5)",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  {user?.role || "Admin"}
                </p>
              </div>
            </div>
          )}
          <button
            className="sidebar-minimize-toggle"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            {isMinimized ? <LayoutGrid size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="sidebar-nav">
          <Link
            to="/admin"
            className={`sidebar-link ${location.pathname === "/admin" ? "active" : ""}`}
          >
            <LayoutDashboard size={18} />
            <span className="sidebar-text">Dashboard</span>
          </Link>
          <Link
            to="/admin/products"
            className={`sidebar-link ${location.pathname.startsWith("/admin/products") ? "active" : ""}`}
          >
            <Package size={18} />
            <span className="sidebar-text">Products</span>
          </Link>
          <Link
            to="/admin/categories"
            className={`sidebar-link ${location.pathname.startsWith("/admin/categories") ? "active" : ""}`}
          >
            <Layers size={18} />
            <span className="sidebar-text">Categories</span>
          </Link>
          <Link
            to="/admin/orders"
            className={`sidebar-link ${location.pathname.startsWith("/admin/orders") ? "active" : ""}`}
          >
            <ShoppingCart size={18} />
            <span className="sidebar-text">Orders</span>
          </Link>
          <Link
            to="/admin/receipts"
            className={`sidebar-link ${location.pathname.startsWith("/admin/receipts") ? "active" : ""}`}
          >
            <ReceiptCedi size={18} />
            <span className="sidebar-text">Receipts</span>
          </Link>
          <div
            className="sidebar-divider"
            style={{
              margin: "1rem 0",
              height: "1px",
              background: "rgba(255,255,255,0.1)",
            }}
          ></div>
          <Link to="/" className="sidebar-link">
            <Globe size={18} />
            <span className="sidebar-text">View Website</span>
          </Link>
          <Link to="/shop" className="sidebar-link">
            <ShoppingBag size={18} />
            <span className="sidebar-text">Go to Shop</span>
          </Link>
        </nav>

        <div className="sidebar-footer">
          <button
            onClick={onLogout}
            className="logout-btn"
            style={{ width: "100%", border: "none", background: "none" }}
          >
            <LogOut size={18} />
            <span className="sidebar-text">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="admin-main">
        {/* Mobile Nav Toggle */}
        <div className="admin-mobile-nav">
          <div
            className="flex items-center"
            style={{ gap: "0.25rem", marginRight: "0.5rem" }}
          >
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              style={{
                background: "none",
                border: "none",
                padding: "8px",
                display: "flex",
                alignItems: "center",
                color: "#013220",
              }}
            >
              <Menu size={26} />
            </button>
            <Link
              to="/"
              style={{
                color: "#013220",
                display: "flex",
                padding: "8px",
                marginLeft: "-8px",
              }}
              title="View Website"
            >
              <Globe size={22} />
            </Link>
          </div>
          <h2
            className="serif"
            onClick={() => (window.location.href = "/admin")}
            style={{ cursor: "pointer" }}
          >
            Lina Admin
          </h2>
          <div
            className="admin-user-avatar"
            onClick={handleMobileLogout}
            style={{ cursor: "pointer" }}
          >
            <User size={20} />
          </div>
        </div>

        <Routes>
          <Route
            path="/"
            element={
              <DashboardOverview
                products={products}
                orders={orders}
                user={user}
              />
            }
          />
          <Route
            path="/products"
            element={
              <AdminProducts
                products={products}
                categories={categories}
                deleteProduct={deleteProduct}
                addProduct={addProduct}
                updateProduct={updateProduct}
              />
            }
          />
          <Route
            path="/orders"
            element={
              <AdminOrders
                orders={orders}
                fetchOrders={fetchOrders}
                addOrder={addOrder}
                updateOrder={updateOrder}
                deleteOrder={deleteOrder}
                products={products}
              />
            }
          />
          <Route
            path="/receipts"
            element={
              <AdminReceipts orders={orders} updateOrder={updateOrder} />
            }
          />
          <Route
            path="/categories"
            element={
              <AdminCategories
                categories={categories}
                setCategories={setCategories}
              />
            }
          />
          {/* Default to Overview */}
          <Route
            path="*"
            element={
              <DashboardOverview
                products={products}
                orders={orders}
                user={user}
              />
            }
          />
        </Routes>
      </main>

      {/* Admin Bottom Navigation (Mobile) — Pulse-Style */}
      <nav className="admin-bottom-nav">
        {/* Left side: 2 links */}
        <Link
          to="/admin"
          className={`bottom-nav-link ${location.pathname === "/admin" ? "active" : ""}`}
        >
          <LayoutDashboard size={22} />
          <span>Home</span>
        </Link>
        <Link
          to="/admin/products"
          className={`bottom-nav-link ${location.pathname.startsWith("/admin/products") ? "active" : ""}`}
        >
          <Package size={22} />
          <span>Stock</span>
        </Link>

        {/* Center raised FAB button */}
        <div className="bottom-nav-center-slot">
          <Link
            to="/admin/orders"
            className={`bottom-nav-fab ${location.pathname.startsWith("/admin/orders") ? "active" : ""}`}
          >
            <ShoppingCart size={26} />
            <span>Sales</span>
          </Link>
        </div>

        {/* Right side: 2 links */}
        <Link
          to="/admin/receipts"
          className={`bottom-nav-link ${location.pathname.startsWith("/admin/receipts") ? "active" : ""}`}
        >
          <ReceiptCedi size={22} />
          <span>Receipts</span>
        </Link>
      </nav>
    </div>
  );
};

export default AdminDashboard;
