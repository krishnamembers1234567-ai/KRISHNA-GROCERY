
import React, { useState } from 'react';
import { CartItem, User } from '../types';
import { useNavigate } from 'react-router-dom';

interface CartProps {
  cart: CartItem[];
  updateQuantity: (id: string, delta: number) => void;
  user: User | null;
  onClear: () => void;
}

const Cart: React.FC<CartProps> = ({ cart, updateQuantity, user, onClear }) => {
  const navigate = useNavigate();
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = total > 500 ? 0 : 40;
  const platformFee = 2;
  const grandTotal = total + deliveryFee + platformFee;

  if (cart.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-neutral-900">
        <div className="w-32 h-32 bg-neutral-800 rounded-full flex items-center justify-center mb-8 text-neutral-700 text-5xl">
          <i className="fa-solid fa-basket-shopping"></i>
        </div>
        <h2 className="text-xl font-bold text-neutral-200 brand-font">Your basket is empty</h2>
        <p className="text-neutral-500 text-sm mt-2 text-center max-w-[250px]">Add premium staples and gourmet treats to your basket.</p>
        <button onClick={() => navigate('/')} className="mt-10 bg-amber-500 text-neutral-900 font-bold py-4 px-12 rounded-2xl shadow-lg shadow-amber-500/20 active:scale-95 transition-transform uppercase tracking-widest text-xs">Shop Premium</button>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full bg-neutral-900">
      <header className="p-6 border-b border-neutral-800 flex items-center gap-4 sticky top-0 bg-neutral-900 z-10">
        <button onClick={() => navigate(-1)} className="text-neutral-400"><i className="fa-solid fa-arrow-left"></i></button>
        <h2 className="brand-font text-2xl text-amber-500">Your Basket</h2>
      </header>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div className="space-y-4">
          {cart.map(item => (
            <div key={item.id} className="flex gap-4 items-center bg-neutral-800/50 p-4 rounded-3xl border border-neutral-800">
              <img src={item.image} className="w-16 h-16 rounded-xl object-cover" alt={item.name} />
              <div className="flex-1">
                <h5 className="text-sm font-bold text-neutral-100">{item.name}</h5>
                <p className="text-[10px] text-neutral-500">{item.weight}</p>
                <div className="mt-1 text-amber-500 font-bold text-xs">₹{item.price * item.quantity}</div>
              </div>
              <div className="flex items-center bg-neutral-900 rounded-xl border border-neutral-700">
                <button onClick={() => updateQuantity(item.id, -1)} className="p-2 text-neutral-500 hover:text-white transition-colors"><i className="fa-solid fa-minus text-[8px]"></i></button>
                <span className="w-8 text-center text-xs font-bold text-neutral-200">{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)} className="p-2 text-amber-500 hover:text-white transition-colors"><i className="fa-solid fa-plus text-[8px]"></i></button>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-6 space-y-4">
          <div onClick={() => navigate('/wallet')} className="flex items-center bg-emerald-900/10 p-4 rounded-2xl border border-emerald-900/30 group cursor-pointer">
            <div className="w-10 h-10 bg-emerald-900/30 rounded-xl flex items-center justify-center text-emerald-500 mr-4">
              <i className="fa-solid fa-wallet"></i>
            </div>
            <div className="flex-1">
              <h6 className="text-emerald-500 font-bold text-[10px] uppercase tracking-widest">Apply Wallet Credits</h6>
              <p className="text-neutral-400 text-[10px]">Balance: ₹{user?.walletBalance || 0}</p>
            </div>
            <i className="fa-solid fa-chevron-right text-[10px] text-neutral-700 group-hover:text-emerald-500 transition-colors"></i>
          </div>

          <div className="bg-neutral-800/50 border border-neutral-700 rounded-[32px] p-6 space-y-3">
            <h4 className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest mb-2">Bill Details</h4>
            <div className="flex justify-between text-xs">
              <span className="text-neutral-500">Item Total</span>
              <span className="text-neutral-300">₹{total}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-neutral-500">Delivery Fee</span>
              <span className={deliveryFee === 0 ? "text-emerald-500 font-bold" : "text-neutral-300"}>
                {deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-neutral-500">Platform Fee</span>
              <span className="text-neutral-300">₹{platformFee}</span>
            </div>
            <div className="h-px bg-neutral-700 my-2"></div>
            <div className="flex justify-between items-center pt-2">
              <span className="font-bold text-neutral-100">Total Savings</span>
              <span className="text-emerald-500 font-bold text-xs">₹124 saved</span>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6 bg-neutral-900 border-t border-neutral-800">
        <button 
          onClick={() => navigate('/checkout')}
          className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-900 py-4 rounded-2xl font-bold uppercase tracking-widest flex items-center justify-between px-8 shadow-xl shadow-amber-500/10 active:scale-[0.98] transition-all"
        >
          <div className="text-left">
            <p className="text-[10px] opacity-60">Total Amount</p>
            <p className="text-sm">₹{grandTotal}</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs">Select Address</span>
            <i className="fa-solid fa-chevron-right text-xs"></i>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Cart;
