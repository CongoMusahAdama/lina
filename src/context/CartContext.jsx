import React, { createContext, useContext, useState } from "react";
import Toast from "../components/ui/Toast";
import CartDrawer from "../components/cart/CartDrawer";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const addToast = (name) => {
    setToast(name);
    setTimeout(() => setToast(null), 3000);
  };

  const addToCart = (product, selectedSize) => {
    setCartItems((prev) => {
      const cartId = selectedSize ? `${product._id || product.id}-${selectedSize}` : (product._id || product.id);
      const existing = prev.find((i) => i.cartId === cartId);
      if (existing)
        return prev.map((i) =>
          i.cartId === cartId ? { ...i, qty: i.qty + 1 } : i,
        );
      return [...prev, { ...product, cartId, selectedSize, qty: 1 }];
    });
    addToast(product.name);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartId) =>
    setCartItems((prev) => prev.filter((i) => i.cartId !== cartId));

  const updateQty = (cartId, delta) => {
    setCartItems((prev) =>
      prev.map((i) =>
        i.cartId === cartId ? { ...i, qty: Math.max(1, i.qty + delta) } : i,
      ),
    );
  };

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce((sum, i) => sum + i.qty, 0);
  const cartTotal = cartItems.reduce(
    (sum, i) => sum + parseFloat(i.price) * i.qty,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        toast,
        setToast,
      }}
    >
      {children}
      <Toast />
      <CartDrawer />
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
