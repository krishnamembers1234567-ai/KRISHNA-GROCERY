
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Orders: React.FC = () => {
  const navigate = useNavigate();
  const pastOrders = [
    { id: 'ORD-8942', date: '22 Oct 2023', items: 'Saffron, Honey', total: 799, status: 'Delivered' },
    { id: 'ORD-7721', date: '15 Oct 2023', items: 'Darjeeling Tea', total: 899, status: 'Delivered' },
    { id: 'ORD-6512', date: '01 Oct 2023', items: 'Basmati Rice, Mangoes', total: 1420, status: 'Delivered' },
  ];

  return (
    <div className="flex-1 flex flex-col bg-neutral-900 h-full">
      <header className="p-6 border-b border-neutral-800 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-neutral-400"><i className="fa-solid fa-arrow-left"></i></button>
        <h2 className="brand-font text-2xl text-amber-500">My Orders</h2>
      </header>

      <div className="flex-1 p-6 space-y-4 overflow-y-auto">
        {pastOrders.map(order => (
          <div key={order.id} className="bg-neutral-800/50 p-4 rounded-3xl border border-neutral-800 space-y-3">
            <div className="flex justify-between items-center">
              <div>
                <span className="text-[10px] text-neutral-500 uppercase font-bold">{order.date}</span>
                <h4 className="text-sm font-bold text-neutral-100">{order.id}</h4>
              </div>
              <span className="text-[10px] bg-emerald-900/30 text-emerald-500 px-2 py-1 rounded-md font-bold uppercase">{order.status}</span>
            </div>
            <p className="text-[11px] text-neutral-400 line-clamp-1">{order.items}</p>
            <div className="flex justify-between items-center pt-2 border-t border-neutral-700">
              <span className="text-xs font-bold text-amber-500">₹{order.total}</span>
              <button onClick={() => navigate(`/tracking/${order.id}`)} className="text-emerald-500 text-[10px] font-bold uppercase">View Status</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
