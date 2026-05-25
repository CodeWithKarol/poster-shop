import { formatPrice } from '@/lib/posters';

interface OrderConfirmationEmailProps {
  orderNumber: string;
  customerName: string;
  products: Array<{
    slug: string;
    title: string;
    price: number;
    quantity?: number;
  }>;
}

export function OrderConfirmationEmail({
  orderNumber,
  customerName,
  products,
}: OrderConfirmationEmailProps) {
  const total = products.reduce((sum, p) => sum + p.price * (p.quantity || 1), 0);

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', lineHeight: '1.5' }}>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>
        Sukces! 🎉 Twoje plakaty czekają.
      </h1>

      <p>
        Cześć {customerName},
        <br />
        Twoje zamówienie <strong>#{orderNumber}</strong> zostało pomyślnie
        opłacone. Plik JPG znajduje się w załączniku tego
        emaila.
      </p>

      <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginTop: '20px' }}>
        Zawartość zamówienia:
      </h2>
      <ul>
        {products.map((p) => (
          <li key={p.slug}>
            {p.title} {p.quantity && p.quantity > 1 ? `x ${p.quantity}` : ''} – {formatPrice(p.price * (p.quantity || 1))} (JPG w załączniku)
          </li>
        ))}
      </ul>

      <p style={{ fontSize: '14px', color: '#666', marginTop: '10px' }}>
        <strong>Suma: {formatPrice(total)}</strong>
      </p>

      <div
        style={{
          marginTop: '30px',
          padding: '15px',
          backgroundColor: '#f5f5f5',
          borderRadius: '0px',
        }}
      >
        <h3 style={{ fontSize: '14px', fontWeight: 'bold' }}>💡 Pro Tip:</h3>
        <p style={{ fontSize: '13px', color: '#666', margin: '10px 0 0 0' }}>
          Aby uzyskać niesamowity efekt głębi kolorów, przekaż pliki do drukarni
          z prośbą o wydruk na papierze matowym, gramatura min. 180-200g. Druk
          pigmentowy jest najtrwalszy i nie blaknie przez lata.
        </p>
      </div>

       <p style={{ fontSize: '12px', color: '#999', marginTop: '30px' }}>
         Pytania? Odpisz na tego emaila lub odwiedź pliknaplakat.pl
       </p>
    </div>
  );
}
