'use client';

import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/posters';
import { EmptyCart } from './EmptyCart';

export function CartSummary() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="border border-border p-6 rounded-none bg-background text-foreground">
      <h2 className="font-serif text-2xl mb-6">
        Twój koszyk ({cartItems.reduce((acc, i) => acc + i.quantity, 0)}{' '}
        {cartItems.reduce((acc, i) => acc + i.quantity, 0) === 1 ? 'produkt' : 'produkty'})
      </h2>

      <div className="space-y-4 mb-8 pb-8 border-b border-border">
        {cartItems.map((item) => (
          <div key={item.id} className="flex gap-4">
            <div className="w-16 h-20 flex-shrink-0 bg-muted overflow-hidden">
              <Image
                src={item.imageUrl}
                alt={item.title}
                width={64}
                height={80}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-foreground truncate">{item.title}</p>
              <p className="text-xs text-muted-foreground">Cyfrowy (JPG)</p>
              <div className="flex flex-wrap items-center justify-between mt-2 gap-2">
                <div className="flex items-center border border-border rounded-none">
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-7 h-7 flex items-center justify-center hover:bg-muted"
                  >-</button>
                  <span className="text-xs font-medium w-6 text-center">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-7 h-7 flex items-center justify-center hover:bg-muted"
                  >+</button>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-sm">
                    {formatPrice(item.price * item.quantity)}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-xs text-muted-foreground hover:text-destructive transition underline underline-offset-2"
                  >
                    Usuń
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-2 text-sm text-foreground">
        <div className="flex justify-between">
          <span>Wartość zamówienia:</span>
          <span>{formatPrice(cartTotal)}</span>
        </div>
        <div className="flex justify-between">
          <span>Dostawa:</span>
          <span>0,00 zł (cyfrowa)</span>
        </div>
        <div className="flex justify-between font-semibold text-base pt-2 border-t border-border">
          <span>SUMA:</span>
          <span>{formatPrice(cartTotal)}</span>
        </div>
      </div>
    </div>
  );
}
