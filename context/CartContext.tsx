"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

export interface CartItem {
  id: string; // equals slug (unique per poster)
  slug: string;
  title: string;
  artist: string;
  imageUrl: string;
  price: number; // unit price in grosze
  addedAt: number; // timestamp
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: Omit<CartItem, "id" | "addedAt" | "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number; // total in grosze
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load cart from LocalStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem("poster_shop_cart")
      if (stored) {
        /* eslint-disable-next-line react-hooks/set-state-in-effect */
        setCartItems(JSON.parse(stored))
      }
    } catch (e) {
      console.error("Error reading cart from localStorage", e)
    }
    setIsLoaded(true)
  }, [])

  // Save cart to LocalStorage on change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("poster_shop_cart", JSON.stringify(cartItems))
    }
  }, [cartItems, isLoaded])

  const addToCart = (newItem: Omit<CartItem, "id" | "addedAt" | "quantity">) => {
    const id = newItem.slug;
    
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === id);
      if (existing) {
        return prev.map((item) => 
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...newItem, id, quantity: 1, addedAt: Date.now() }];
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prev) => 
      prev.map((item) => item.id === id ? { ...item, quantity } : item)
    );
  };

  const clearCart = React.useCallback(() => {
    setCartItems([])
  }, [])

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0)
  const cartTotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0)

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
