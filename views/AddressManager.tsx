
import React from 'react';
import { useNavigate } from 'react-router-dom';

const AddressManager: React.FC = () => {
  const navigate = useNavigate();
  const addresses = [
    { id: 1, tag: 'Home', address: '402, Elite Residency, Gated Community, Mumbai', icon: 'fa-house' },
    { id: 2, tag: 'Office', address: 'Floor 12, Corporate Tower, BKC, Mumbai', icon: 'fa-briefcase' },
  ];

  return (
    <div className="flex-1 flex flex-col bg-neutral-900">
      <header className="p-6 border-b border-neutral-800 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-neutral-400"><i className="fa-solid fa-arrow-left"></i></button>
        <h2 className="brand-font text-2xl text-amber-500">My Addresses</h2>
      </header>

      <div className="p-6 space-y-4 flex-1 overflow-y-auto">
        {addresses.map(addr => (
          <div key={addr.id} className="bg-neutral-800/50 p-5 rounded-3xl border border-neutral-800 flex gap-4 relative">
            <div className="w-10 h-10 bg-emerald-900/30 rounded-xl flex items-center justify-center text-emerald-500 shrink-0">
              <i className={`fa-solid ${addr.icon}`}></i>
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h5 className="text-sm font-bold text-neutral-100">{addr.tag}</h5>
                <button className="text-neutral-600"><i className="fa-solid fa-ellipsis-vertical"></i></button>
              </div>
              <p className="text-xs text-neutral-500 mt-1 leading-relaxed">{addr.address}</p>
            </div>
          </div>
        ))}

        <button className="w-full border-2 border-dashed border-neutral-700 p-6 rounded-3xl flex flex-col items-center gap-2 hover:border-amber-500/50 transition-all">
          <div className="w-10 h-10 bg-neutral-800 rounded-full flex items-center justify-center text-amber-500">
            <i className="fa-solid fa-plus"></i>
          </div>
          <span className="text-xs font-bold text-neutral-400">Add New Address</span>
        </button>
      </div>
    </div>
  );
};

export default AddressManager;
