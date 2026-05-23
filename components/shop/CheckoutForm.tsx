'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface CheckoutFormProps {
  onSubmit: (data: { name: string; email: string }) => Promise<void>;
  isLoading?: boolean;
}

export function CheckoutForm({
  onSubmit,
  isLoading = false,
}: CheckoutFormProps) {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name || formData.name.length < 3) {
      newErrors.name = 'Imię i nazwisko musi mieć co najmniej 3 znaki';
    }
    if (!formData.email || !formData.email.includes('@')) {
      newErrors.email = 'Podaj prawidłowy adres e-mail';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-semibold mb-2">
          Imię i Nazwisko *
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, name: e.target.value })
          }
          className="w-full border border-black/10 px-4 py-3 rounded-none"
          placeholder="Jan Kowalski"
          disabled={isLoading}
        />
        {errors.name && (
          <p className="text-xs text-red-600 mt-1">{errors.name}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">
          Adres e-mail *
        </label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData({ ...formData, email: e.target.value })
          }
          className="w-full border border-black/10 px-4 py-3 rounded-none"
          placeholder="jan@example.com"
          disabled={isLoading}
        />
        <p className="text-xs text-zinc-600 mt-2">
          Na ten adres wyślemy linki do pobrania zaraz po opłaceniu. Upewnij
          się, że nie zawiera błędów.
        </p>
        {errors.email && (
          <p className="text-xs text-red-600 mt-1">{errors.email}</p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full rounded-none bg-black text-white hover:bg-zinc-800 py-6 uppercase tracking-[0.15em] font-semibold text-sm"
      >
        {isLoading ? 'Przetwarzanie...' : 'PŁACĘ I POBIERAM TERAZ'}
      </Button>
    </form>
  );
}
