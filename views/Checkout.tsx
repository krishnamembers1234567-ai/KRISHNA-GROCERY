
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem, User } from '../types';
import { backend } from '../services/backend';

interface CheckoutProps {
  cart: CartItem[];
  user: User | null;
  onClear: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({ cart, user, onClear }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState('upi');
  const [paymentConfig, setPaymentConfig] = useState(backend.getPaymentConfig());

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const delivery = total > 500 ? 0 : 40;
  const platform = 2;
  const grandTotal = total + delivery + platform;

  useEffect(() => {
    // Select first enabled payment method by default
    const config = backend.getPaymentConfig();
    setPaymentConfig(config);
    const firstEnabled = Object.entries(config).find(([_, enabled]) => enabled);
    if (firstEnabled) setPayment(firstEnabled[0]);
  }, []);

  const handlePlaceOrder = () => {
    if (!user) return;
    if (payment === 'wallet' && user.walletBalance < grandTotal) {
      return alert("Insufficient Wallet Balance! Please Top Up.");
    }

    setLoading(true);
    
    setTimeout(() => {
      try {
        const order = backend.placeOrder(user, cart, grandTotal, payment);
        if (payment === 'wallet') {
          backend.processTransaction(user, grandTotal, 'debit', `Order ${order.id}`);
        }
        onClear();
        navigate(`/tracking/${order.id}`);
      } catch (err: any) {
        alert(err.message);
      } finally {
        setLoading(false);
      }
    }, 1500);
  };

  const paymentMethodsList = [
    { id: 'upi', label: 'UPI (GPay / PhonePe)', icon: 'fa-qrcode' },
    { id: 'card', label: 'Credit / Debit Card', icon: 'fa-credit-card' },
    { id: 'netbanking', label: 'Net Banking', icon: 'fa-building-columns' },
    { id: 'wallet', label: `Krishna Wallet (₹${user?.walletBalance || 0})`, icon: 'fa-wallet' },
    { id: 'cod', label: 'Cash on Delivery', icon: 'fa-hand-holding-dollar' },
  ].filter(m => (paymentConfig as any)[m.id]);

  return (
    <div className="flex-1 flex flex-col bg-neutral-900">
      <header className="p-6 border-b border-neutral-800 flex items-center gap-4 sticky top-0 bg-neutral-900 z-10">
        <button onClick={() => navigate(-1)} className="text-neutral-400"><i className="fa-solid fa-arrow-left"></i></button>
        <h2 className="brand-font text-2xl text-amber-500">Checkout</h2>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 pb-32">
        <div className="bg-neutral-800/50 p-5 rounded-3xl border border-neutral-800">
          <div className="flex justify-between items-center mb-3">
            <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Delivery Address</h4>
            <button className="text-amber-500 text-[10px] font-bold uppercase">Change</button>
          </div>
          <div className="flex gap-4 items-start">
            <div className="w-10 h-10 bg-emerald-900/30 rounded-xl flex items-center justify-center text-emerald-500">
              <i className="fa-solid fa-house"></i>
            </div>
            <div>
              <p className="text-sm font-bold text-neutral-100">Home</p>
              <p className="text-xs text-neutral-500 leading-relaxed mt-1">653, Vidisha Rd, Kalyan Nagar, Bhanpur, Bhopal, MP 462001</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Payment Method</h4>
            {user?.role === 'admin' && <span className="text-[8px] bg-amber-500/20 text-amber-500 px-2 py-0.5 rounded font-bold">ADMIN VIEW</span>}
          </div>
          <div className="grid gap-3">
            {paymentMethodsList.length > 0 ? paymentMethodsList.map(method => (
              <button 
                key={method.id}
                onClick={() => setPayment(method.id)}
                className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all ${payment === method.id ? 'border-amber-500 bg-amber-500/10' : 'border-neutral-800 bg-neutral-800/30'}`}
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${payment === method.id ? 'bg-amber-500/20 text-amber-500' : 'bg-neutral-900 text-neutral-500'}`}>
                  <i className={`fa-solid ${method.icon}`}></i>
                </div>
                <span className={`text-sm font-medium ${payment === method.id ? 'text-neutral-100' : 'text-neutral-400'}`}>{method.label}</span>
                {payment === method.id && <i className="fa-solid fa-circle-check ml-auto text-amber-500"></i>}
              </button>
            )) : (
              <div className="text-center py-6 bg-neutral-800/30 rounded-2xl border border-dashed border-neutral-700">
                <p className="text-xs text-neutral-500 italic">No payment methods available. Please contact support.</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-neutral-800 border border-neutral-700 rounded-3xl p-5 space-y-3">
          <h4 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2">Order Summary</h4>
          <div className="flex justify-between text-xs">
            <span className="text-neutral-500">Item Total</span>
            <span className="text-neutral-300">₹{total}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-neutral-500">Delivery Fee</span>
            <span className={delivery === 0 ? "text-emerald-500 font-bold" : "text-neutral-300"}>{delivery === 0 ? 'FREE' : `₹${delivery}`}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-neutral-500">Platform Fee</span>
            <span className="text-neutral-300">₹{platform}</span>
          </div>
          <div className="h-px bg-neutral-700 mt-2"></div>
          <div className="flex justify-between items-center pt-2">
            <span className="font-bold text-neutral-100">Grand Total</span>
            <span className="text-amber-500 text-xl font-bold">₹{grandTotal}</span>
          </div>
        </div>
      </div>

      <div className="p-6 bg-neutral-900 border-t border-neutral-800 fixed bottom-0 left-0 right-0 max-w-md mx-auto">
        <button 
          onClick={handlePlaceOrder}
          disabled={loading || paymentMethodsList.length === 0}
          className="w-full bg-amber-500 text-neutral-900 py-4 rounded-2xl font-bold uppercase tracking-widest flex items-center justify-center gap-3 shadow-lg shadow-amber-500/20 active:scale-95 disabled:opacity-50"
        >
          {loading ? <i className="fa-solid fa-spinner animate-spin"></i> : `Pay ₹${grandTotal} & Place Order`}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
