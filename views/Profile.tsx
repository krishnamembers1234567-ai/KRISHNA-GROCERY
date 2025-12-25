
import React from 'react';
import { User, UserRole } from '../types';
import { BottomNav } from '../components/Layout';
import { useNavigate } from 'react-router-dom';

interface ProfileProps {
  user: User;
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const menuItems = [
    { icon: 'fa-bag-shopping', label: 'My Orders', color: 'text-amber-500', path: '/orders' },
    { icon: 'fa-wallet', label: 'Wallet & Coupons', color: 'text-emerald-500', path: '/wallet' },
    { icon: 'fa-location-dot', label: 'Addresses', color: 'text-red-500', path: '/addresses' },
    { icon: 'fa-credit-card', label: 'Payments', color: 'text-blue-500', path: '#' },
    { icon: 'fa-gift', label: 'Offers', color: 'text-purple-500', path: '#' },
    { icon: 'fa-headset', label: 'Help & Support', color: 'text-neutral-400', path: '/help' },
  ];

  return (
    <div className="flex-1 pb-24 flex flex-col bg-neutral-900">
      <header className="p-8 bg-gradient-to-b from-neutral-800 to-neutral-900 border-b border-neutral-800 relative overflow-hidden">
        <div className="flex items-center gap-6 relative z-10">
          <div className="w-20 h-20 rounded-3xl border-2 border-amber-500 p-1 bg-neutral-900 shadow-2xl shadow-amber-500/20">
            <img src={`https://ui-avatars.com/api/?name=${user.name}&background=D4AF37&color=171717`} className="w-full h-full rounded-2xl object-cover" alt="" />
          </div>
          <div>
            <h2 className="brand-font text-2xl text-neutral-100">{user.name}</h2>
            <p className="text-neutral-500 text-sm">{user.phone}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="bg-amber-500/20 text-amber-500 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-500/30 tracking-widest uppercase">
                {user.role === UserRole.CUSTOMER ? 'KRISHNA GOLD' : user.role === UserRole.ADMIN ? 'SUPER ADMIN' : 'ELITE PARTNER'}
              </span>
            </div>
          </div>
        </div>
        <div className="absolute -right-10 -top-10 w-40 h-40 bg-amber-500/5 rounded-full blur-3xl"></div>
      </header>

      {user.role === UserRole.ADMIN && (
        <div className="px-6 pt-6">
          <button 
            onClick={() => navigate('/admin')}
            className="w-full bg-amber-500/10 text-amber-500 border border-amber-500/30 p-4 rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3"
          >
            <i className="fa-solid fa-gauge-high"></i>
            Enter Dashboard
          </button>
        </div>
      )}

      {user.role === UserRole.PARTNER && (
        <div className="px-6 pt-6">
          <button 
            onClick={() => navigate('/delivery')}
            className="w-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 p-4 rounded-2xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-3"
          >
            <i className="fa-solid fa-motorcycle"></i>
            Duty Dashboard
          </button>
        </div>
      )}

      <div className="p-6 grid grid-cols-2 gap-4">
        <div onClick={() => navigate('/wallet')} className="bg-neutral-800 p-5 rounded-3xl border border-neutral-700 cursor-pointer hover:border-amber-500/30 transition-all">
          <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-widest">Wallet</span>
          <p className="text-2xl font-bold text-amber-500 mt-1 brand-font">₹{user.walletBalance}</p>
        </div>
        <div onClick={() => navigate('/orders')} className="bg-neutral-800 p-5 rounded-3xl border border-neutral-700 cursor-pointer hover:border-amber-500/30 transition-all">
          <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-widest">Orders</span>
          <p className="text-2xl font-bold text-neutral-100 mt-1 brand-font">12 Total</p>
        </div>
      </div>

      <div className="px-6 space-y-2">
        {menuItems.map((item, idx) => (
          <div 
            key={idx} 
            onClick={() => item.path !== '#' && navigate(item.path)}
            className="flex items-center justify-between p-4 bg-neutral-800/30 rounded-2xl hover:bg-neutral-800 transition-all cursor-pointer group border border-transparent hover:border-neutral-700"
          >
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-xl bg-neutral-800 flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform shadow-lg`}>
                <i className={`fa-solid ${item.icon}`}></i>
              </div>
              <span className="text-sm font-medium text-neutral-300">{item.label}</span>
            </div>
            <i className="fa-solid fa-chevron-right text-[10px] text-neutral-700 group-hover:text-amber-500 transition-colors"></i>
          </div>
        ))}

        <button 
          onClick={onLogout}
          className="w-full mt-6 py-4 rounded-2xl bg-neutral-800 text-red-500 font-bold border border-red-900/30 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <i className="fa-solid fa-power-off text-xs"></i>
          Logout Session
        </button>
      </div>

      <BottomNav cartCount={0} />
    </div>
  );
};

export default Profile;
