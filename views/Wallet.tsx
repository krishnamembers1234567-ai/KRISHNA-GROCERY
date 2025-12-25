
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types';

interface WalletProps {
  user: User | null;
}

const Wallet: React.FC<WalletProps> = ({ user }) => {
  const navigate = useNavigate();
  const coupons = [
    { code: 'GOLD20', title: '20% OFF on Staples', desc: 'Valid for orders above ₹800' },
    { code: 'KRISHNA100', title: 'Flat ₹100 Cashback', desc: 'On using Krishna Wallet for the first time' },
  ];

  return (
    <div className="flex-1 flex flex-col bg-neutral-900">
      <header className="p-6 border-b border-neutral-800 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-neutral-400"><i className="fa-solid fa-arrow-left"></i></button>
        <h2 className="brand-font text-2xl text-amber-500">My Wallet</h2>
      </header>

      <div className="p-6 space-y-8 overflow-y-auto">
        {/* Wallet Balance Card */}
        <div className="bg-gradient-to-br from-emerald-800 to-emerald-950 p-8 rounded-[40px] shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <p className="text-emerald-300 text-xs font-bold uppercase tracking-widest">Available Balance</p>
            <h3 className="text-white text-5xl font-bold mt-2 brand-font">₹{user?.walletBalance || 0}</h3>
            <button className="mt-8 bg-amber-500 text-neutral-900 px-6 py-2 rounded-full text-xs font-bold uppercase shadow-lg">Top Up</button>
          </div>
          <i className="fa-solid fa-wallet absolute -right-4 -bottom-4 text-white/10 text-9xl"></i>
        </div>

        {/* Coupons */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Active Coupons</h4>
          {coupons.map(c => (
            <div key={c.code} className="bg-neutral-800/50 p-4 rounded-3xl border border-neutral-800 flex justify-between items-center relative overflow-hidden">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-amber-500 rounded-r-full"></div>
              <div className="ml-2">
                <h5 className="text-sm font-bold text-neutral-100">{c.title}</h5>
                <p className="text-[10px] text-neutral-500 mt-1">{c.desc}</p>
                <div className="mt-3 inline-block bg-neutral-900 border border-neutral-700 border-dashed px-3 py-1 rounded-md">
                  <span className="text-amber-500 font-mono text-xs font-bold">{c.code}</span>
                </div>
              </div>
              <button className="text-emerald-500 text-[10px] font-bold uppercase">Apply</button>
            </div>
          ))}
        </div>

        {/* Transactions */}
        <div className="space-y-4">
          <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Recent Transactions</h4>
          {[
            { id: 1, type: 'Order #882', amt: -450, date: 'Oct 20' },
            { id: 2, type: 'Top up', amt: 1000, date: 'Oct 18' },
          ].map(tx => (
            <div key={tx.id} className="flex justify-between items-center p-4 bg-neutral-800/30 rounded-2xl">
              <div>
                <p className="text-sm font-bold text-neutral-200">{tx.type}</p>
                <p className="text-[10px] text-neutral-500">{tx.date}</p>
              </div>
              <span className={`font-bold ${tx.amt > 0 ? 'text-emerald-500' : 'text-neutral-400'}`}>
                {tx.amt > 0 ? `+₹${tx.amt}` : `-₹${Math.abs(tx.amt)}`}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wallet;
