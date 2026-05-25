'use client';

import { useEffect } from 'react';
import { useCart } from '@/context/CartContext';

export function CartCleaner() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return null;
}
