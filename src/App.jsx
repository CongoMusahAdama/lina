import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import "./mobile.css";
import "./Dashboard.css";
import Swal from "sweetalert2";

// --- UTILS & CONTEXT ---
import { apiRequest } from "./utils/api";
import { CartProvider } from "./context/CartContext";
import { ModalProvider } from "./context/ModalContext";

// --- COMPONENTS ---
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import SupportBot from "./components/ui/SupportBot";

// --- PAGES ---
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import AboutPage from "./pages/AboutPage";
import CollectionsPage from "./pages/CollectionsPage";
import AuthPage from "./pages/AuthPage";
import CheckoutPage from "./pages/CheckoutPage";
import TrackingPage from "./pages/TrackingPage";

// --- ADMIN ---
import AdminDashboard from "./components/admin/AdminDashboard";

// --- PROTECTED ROUTE GUARD ---
const ProtectedRoute = ({ user, loading, children }) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader-premium"></div>
      </div>
    );
  }
  if (!user) {
    return <Navigate to="/auth" replace />;
  }
  return children;
};

const App = () => {
  // --- STATE ---
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([
    "Hair Care",
    "Moisturizers",
    "Hair Growth",
    "Men",
    "Anti-Dandruff",
    "Linas Clarifying Shampoo",
    "Linas Minty Detangling Conditioner",
    "Stay Soft Leave-In Conditioner",
    "Linas Deep Conditioner",
    "Moisturizing Hair Growth Butter",
    "Hair Growth Elixir",
    "Ayurvedic Hair Mask",
    "Linas Healing Hair Balm",
    "Linas Beard Booster Oil",
    "Anti Dandruff Shampoo",
    "Anti Dandruff oil",
    "Anti Damdruff cream"
  ]);
  const [orders, setOrders] = useState([]);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    if (!user) return;
    const ordRes = await apiRequest("/orders");
    if (ordRes.success) setOrders(ordRes.data);
  };

  // Initial Data Fetching
  useEffect(() => {
    const initApp = async () => {
      setLoading(true);

      // Load categories first
      const catRes = await apiRequest("/categories");
      if (catRes.success && catRes.data?.length > 0) {
        const uniqueCats = [...new Set(catRes.data.map((c) => c.name.trim()))];
        setCategories(uniqueCats);
      }

      // Load public products
      const prodRes = await apiRequest("/products");
      if (prodRes.success && prodRes.data?.length > 0) {
        setProducts(prodRes.data);

        // Deduplicate and merge categories from products
        const productCategories = prodRes.data
          .map((p) => p.category?.trim())
          .filter(Boolean);
        setCategories((prev) => {
          const combined = [...prev, ...productCategories];
          const normalized = combined.map(
            (c) => c.charAt(0).toUpperCase() + c.slice(1).toLowerCase(),
          );
          return [...new Set(normalized)];
        });
      }

      // Verify Auth (Cookie-based)
      const verifyRes = await apiRequest("/auth/me");
      if (verifyRes.success) {
        setUser(verifyRes.data);
        const ordRes = await apiRequest("/orders");
        if (ordRes.success) setOrders(ordRes.data);
      }

      setLoading(false);
    };
    initApp();
  }, []);

  // Auto-refresh orders for admin every 30 seconds
  useEffect(() => {
    if (!user) return;
    const interval = setInterval(() => {
      fetchOrders();
    }, 30000);
    return () => clearInterval(interval);
  }, [user]);

  const handleLogin = (userData) => {
    if (userData.token) {
      localStorage.setItem("lina_auth_token", userData.token);
    }
    setUser(userData);
  };

  const handleLogout = async () => {
    const result = await Swal.fire({
      title: "Sign Out?",
      text: "Are you sure you want to end your session?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#013220",
      cancelButtonColor: "#64748b",
      confirmButtonText: "Yes, Sign Out",
      background: "#fff",
      color: "#1e293b",
    });

    if (result.isConfirmed) {
      await apiRequest("/auth/logout");
      localStorage.removeItem("lina_auth_token");
      setUser(null);
      Swal.fire({
        title: "Signed Out",
        text: "Come back soon!",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    }
  };

  const addProduct = async (newProduct) => {
    const res = await apiRequest("/products", "POST", newProduct);
    if (res.success) {
      setProducts((prev) => [res.data, ...prev]);
      Swal.fire({
        title: "Product Added!",
        text: `${res.data.name} has been published to the catalog.`,
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    }
    return res.success;
  };

  const updateProduct = async (id, updated) => {
    const res = await apiRequest(`/products/${id}`, "PUT", updated);
    if (res.success) {
      setProducts((prev) => prev.map((p) => (p._id === id ? res.data : p)));
      Swal.fire({
        title: "Updated!",
        text: "Product details have been synchronized.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    }
    return res.success;
  };

  const deleteProduct = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This product will be permanently removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#013220",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const res = await apiRequest(`/products/${id}`, "DELETE", null);
      if (res.success) {
        setProducts((prev) => prev.filter((p) => p._id !== id));
        Swal.fire({
          title: "Deleted!",
          text: "The product has been removed.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
      return res.success;
    }
    return false;
  };

  const addOrder = async (newOrder) => {
    const res = await apiRequest("/orders", "POST", newOrder);
    if (res.success) {
      if (user) {
        setOrders((prev) => [res.data, ...prev]);
        fetchOrders();
      }

      if (res.data.items) {
        res.data.items.forEach((item) => {
          setProducts((prev) =>
            prev.map((p) =>
              p.name === item.name
                ? { ...p, stock: Math.max(0, p.stock - item.qty) }
                : p,
            ),
          );
        });
      }
    }
    return res;
  };

  const updateOrder = async (id, updated) => {
    const res = await apiRequest(`/orders/${id}`, "PUT", updated);
    if (res.success) {
      setOrders((prev) => prev.map((o) => (o._id === id ? res.data : o)));
      Swal.fire({
        title: "Status Updated!",
        text: `Order status has been updated successfully.`,
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });
    } else {
      Swal.fire("Error", res.message || "Could not update order", "error");
    }
    return res.success;
  };

  const deleteOrder = async (id) => {
    const result = await Swal.fire({
      title: "Delete Order?",
      text: "This action cannot be undone. The order record will be permanently removed.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#013220",
      cancelButtonColor: "#ef4444",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      const res = await apiRequest(`/orders/${id}`, "DELETE", null);
      if (res.success) {
        setOrders((prev) => prev.filter((o) => (o._id || o.id) !== id));
        Swal.fire({
          title: "Deleted!",
          text: "The order record has been removed.",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
      return res.success;
    }
    return false;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loader-premium"></div>
      </div>
    );
  }

  return (
    <Router>
      <CartProvider>
        <ModalProvider>
          <div className="app">
            <Navbar user={user} />
            <Routes>
              <Route
                path="/"
                element={
                  <HomePage products={products} categories={categories} user={user} />
                }
              />
              <Route
                path="/shop"
                element={
                  <ShopPage products={products} categories={categories} />
                }
              />
              <Route path="/collections" element={<CollectionsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route
                path="/auth"
                element={<AuthPage onLogin={handleLogin} />}
              />
              <Route
                path="/checkout"
                element={<CheckoutPage addOrder={addOrder} />}
              />
              <Route path="/track" element={<TrackingPage />} />
              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute user={user} loading={loading}>
                    <AdminDashboard
                      products={products}
                      categories={categories}
                      orders={orders}
                      fetchOrders={fetchOrders}
                      addProduct={addProduct}
                      updateProduct={updateProduct}
                      deleteProduct={deleteProduct}
                      addOrder={addOrder}
                      updateOrder={updateOrder}
                      deleteOrder={deleteOrder}
                      setCategories={setCategories}
                      user={user}
                      onLogout={handleLogout}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>
            <Footer />
            <SupportBot />
          </div>
        </ModalProvider>
      </CartProvider>
    </Router>
  );
};

export default App;
