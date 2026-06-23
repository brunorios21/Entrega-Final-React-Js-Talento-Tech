import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id);
      if (existing) {
        return prev.map((p) => p.id === product.id ? { ...p, quantity: p.quantity + quantity } : p);
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const clearCart = () => setCart([]);

  const getTotalItems = () => cart.reduce((s, p) => s + (p.quantity || 0), 0);

  const getTotalPrice = () => cart.reduce((s, p) => s + (p.quantity || 0) * (p.precio || 0), 0);

  const updateQuantity = (id, newQty) => {
    setCart((prev) => {
      if (newQty <= 0) return prev.filter((p) => p.id !== id);
      return prev.map((p) => (p.id === id ? { ...p, quantity: newQty } : p));
    });
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, getTotalItems, getTotalPrice, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;
