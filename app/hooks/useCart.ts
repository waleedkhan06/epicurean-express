"use client";

import { useState, useCallback, useEffect } from "react";
import { CartItem, MenuItem } from "@/app/types";

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("epicurean-cart");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch {
        localStorage.removeItem("epicurean-cart");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("epicurean-cart", JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((item: MenuItem, options?: Record<string, string>) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) => i.id === item.id && JSON.stringify(i.selectedOptions) === JSON.stringify(options)
      );
      if (existing) {
        return prev.map((i) =>
          i.id === item.id && JSON.stringify(i.selectedOptions) === JSON.stringify(options)
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...item, quantity: 1, selectedOptions: options }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((itemId: string, options?: Record<string, string>) => {
    setItems((prev) =>
      prev.filter(
        (i) => !(i.id === itemId && JSON.stringify(i.selectedOptions) === JSON.stringify(options))
      )
    );
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number, options?: Record<string, string>) => {
    if (quantity <= 0) {
      removeItem(itemId, options);
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.id === itemId && JSON.stringify(i.selectedOptions) === JSON.stringify(options)
          ? { ...i, quantity }
          : i
      )
    );
  }, [removeItem]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return {
    items,
    isOpen,
    setIsOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    totalItems,
    totalPrice,
  };
}
