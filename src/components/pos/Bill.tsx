import { forwardRef, useState } from 'react';
import { format } from 'date-fns';
import { businessInfo } from '@/data/mockData';
import { CartItem, Customer } from '@/stores/cartStore';

interface Order {
  orderNumber: string;
  items: CartItem[];
  customer: Customer | null;
  subtotal: number;
  taxAmount: number;
  discountAmount: number;
  deliveryFee?: number;
  total: number;
  paymentMethod?: 'cash' | 'card' | 'wallet';
  orderType?: 'dine_in' | 'take_away' | 'delivery';
  createdAt: Date;
  cashierName: string;
  serverName?: string | null;
  tableId?: number | null;
  rider?: { name: string } | null;
  customerAddress?: string | null;
}

interface BillProps {
  order: Order;
}

const Bill = forwardRef<HTMLDivElement, BillProps>(({ order }, ref) => {
  const [logoError, setLogoError] = useState(false);

  const logoSrc = `/logo.jpeg?v=${Date.now()}`;
  const name = businessInfo.name;
  const address = businessInfo.address;
  const city = businessInfo.city;
  const phone = businessInfo.phone;
  const website = businessInfo.website;
  const paymentMethodLabel = {
    cash: 'Cash',
    card: 'Card',
    wallet: 'Digital Wallet',
  };

  return (
    <div
      ref={ref}
      className="receipt-print bg-white text-black p-4 font-mono text-xs mx-auto"
      style={{ width: '80mm' }}
    >
      {/* Logo Section - Outside Box */}
      <div className="text-center mb-2">
        {!logoError ? (
          <img
            src={logoSrc}
            alt="Logo"
            className="max-w-[123px] mx-auto object-contain"
            onError={() => setLogoError(true)}
          />
        ) : (
          <div className="text-2xl mb-1">☕</div>
        )}
      </div>

      {/* Header Box */}
      <div className="text-center mb-4 border-2 border-black p-2">
        <div className="text-[15px] leading-tight font-bold">
          <p>{address}</p>
          <p>{city}</p>
          {phone && <p>{phone}</p>}
        </div>
        <div className="border-t border-dotted border-black my-1" />
        <p className="text-[13px] uppercase font-bold">Designed & Developed By Genai Tech</p>
      </div>

      {/* Large Token / Order Number Box */}
      <div className="text-center mb-4 border-2 border-black py-2">
        <h2 className="text-[25px] font-bold">{order.orderNumber}</h2>
      </div>

      {/* Order Info Section */}
      <div className="mb-3 text-[14px] space-y-1">
        <div className="flex justify-between items-end">
          <div className="flex gap-2">
            <span>Invoice #:</span>
            <span className="font-bold">{order.orderNumber}</span>
          </div>
          <span className="font-bold text-right">DAY-0002</span>
        </div>
        <div className="flex justify-between items-center py-1">
          <span>Restaurant:</span>
          <span className="text-[17px] font-bold uppercase text-right leading-none">{name}</span>
        </div>
        <div className="flex justify-between">
          <span>Cashier:</span>
          <span>{order.cashierName}</span>
        </div>
        <div className="flex justify-between">
          <span>Type:</span>
          <span className="font-bold uppercase">{order.orderType?.replace('_', ' ') || 'DINE IN'}</span>
        </div>
        <div className="flex justify-between">
          <span>{format(order.createdAt, 'dd-MMM-yy')}</span>
          <span className="text-right">{format(order.createdAt, 'h:mm a')}</span>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-black mb-2" />

      {/* Items Table */}
      <table className="w-full text-[14px]">
        <thead>
          <tr className="border-b border-black">
            <th className="text-left py-1 font-bold">Qty</th>
            <th className="text-left py-1 font-bold pl-2">Item</th>
            <th className="text-right py-1 font-bold">Rate</th>
            <th className="text-right py-1 font-bold">Amount</th>
          </tr>
        </thead>
        <tbody className="font-bold">
          {order.items.map((item) => (
            <tr key={item.product.id}>
              <td className="py-1 text-left">{item.quantity}</td>
              <td className="py-1 pl-2 text-left uppercase">{item.product.name}</td>
              <td className="text-right py-1">{item.product.price}</td>
              <td className="text-right py-1">{item.lineTotal}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals Section */}
      <div className="mt-2 space-y-1 text-[14px]">
        <div className="flex justify-between">
          <span>SubTotal :</span>
          <span className="font-bold">{order.subtotal}</span>
        </div>
        <div className="flex justify-between bg-gray-100 p-1 font-bold text-[20px]">
          <span>Net Bill :</span>
          <span>{order.total}</span>
        </div>
        {order.discountAmount > 0 && (
          <div className="flex justify-between">
            <span>Discount :</span>
            <span>{order.discountAmount}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span>TIP :</span>
          <span></span>
        </div>
      </div>

      {/* Empty Space before footer */}
      <div className="my-4" />

      {/* Footer Box */}
      <div className="text-center border-2 border-black p-2">
        <p className="text-[14px] font-bold uppercase mb-1">!!!!FOR THE LOVE OF FOOD !!!!</p>
        <p className="text-[11px] font-bold uppercase whitespace-nowrap">Powered By: GENAI TECHNOLOGY +923342826675.</p>
      </div>

      {/* End marker spacer */}
      <div className="h-4" />
    </div>

  );
});

Bill.displayName = 'Bill';

export default Bill;
