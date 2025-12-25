
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { backend } from '../services/backend';

const Delivery: React.FC = () => {
  const navigate = useNavigate();
  const [online, setOnline] = useState(true);
  const [activeTask, setActiveTask] = useState<any>(null);

  const pendingOrders = backend.getOrders().filter(o => o.status === 'Accepted' || o.status === 'Pending');

  const acceptOrder = (order: any) => {
    backend.updateOrderStatus(order.id, 'Out for Delivery');
    setActiveTask(order);
  };

  return (
    <div className="flex-1 flex flex-col bg-neutral-900 min-h-screen pb-10">
      <header className="p-6 bg-emerald-950/20 border-b border-emerald-900/30 flex justify-between items-center">
        <div>
          <h2 className="brand-font text-emerald-500 text-2xl">Partner App</h2>
          <p className="text-neutral-500 text-[10px] font-bold uppercase tracking-widest">{online ? 'Available for Duty' : 'Currently Offline'}</p>
        </div>
        <button 
          onClick={() => setOnline(!online)}
          className={`px-4 py-1.5 rounded-full text-[10px] font-bold border transition-all ${online ? 'bg-emerald-700 text-white border-emerald-600' : 'bg-neutral-800 text-neutral-500 border-neutral-700'}`}
        >
          {online ? 'ONLINE' : 'OFFLINE'}
        </button>
      </header>

      <div className="p-6 space-y-6">
        {/* Active Task */}
        {activeTask ? (
          <div className="bg-emerald-900/20 border-2 border-emerald-700/50 rounded-[40px] p-6 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-neutral-100">Live Delivery</h3>
              <span className="text-[10px] bg-emerald-700 px-2 py-0.5 rounded-full text-white font-bold">PICKED</span>
            </div>
            <div className="bg-neutral-900/50 p-4 rounded-2xl space-y-2">
              <p className="text-[10px] text-neutral-500 uppercase font-bold">Customer Address</p>
              <p className="text-xs text-neutral-200">Flat 402, Elite Residency, Andheri West</p>
            </div>
            <button 
              onClick={() => {
                backend.updateOrderStatus(activeTask.id, 'Delivered');
                setActiveTask(null);
              }}
              className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold uppercase text-xs shadow-xl shadow-emerald-900/20"
            >
              Complete Delivery
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <h4 className="font-bold text-neutral-200">Nearby Assignments</h4>
            {online ? (
              pendingOrders.length > 0 ? (
                pendingOrders.map(order => (
                  <div key={order.id} className="bg-neutral-800 border border-neutral-700 rounded-3xl p-5 space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-xs text-neutral-400">Order from Krishna Premium Store</p>
                        <p className="text-sm font-bold text-neutral-100 mt-1">₹{order.total} • {order.items.length} items</p>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-emerald-500 block uppercase font-bold">Payout</span>
                        <p className="text-lg font-bold text-emerald-500">₹85</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <button className="flex-1 bg-neutral-900 text-neutral-500 py-3 rounded-xl text-[10px] font-bold uppercase">Decline</button>
                      <button 
                        onClick={() => acceptOrder(order)}
                        className="flex-2 bg-emerald-700 text-white py-3 rounded-xl text-[10px] font-bold uppercase"
                      >
                        Accept Trip
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-10 bg-neutral-800/30 rounded-3xl border border-dashed border-neutral-700">
                  <i className="fa-solid fa-clock text-neutral-700 text-3xl mb-3"></i>
                  <p className="text-xs text-neutral-500">Searching for orders nearby...</p>
                </div>
              )
            ) : (
              <div className="text-center py-10">
                <p className="text-xs text-neutral-500">Go online to see orders</p>
              </div>
            )}
          </div>
        )}

        {/* Performance */}
        <div className="space-y-4">
          <h4 className="font-bold text-neutral-200">Trip Performance</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-neutral-800 p-5 rounded-3xl border border-neutral-700">
              <span className="text-[10px] text-neutral-500 font-bold uppercase block mb-1">Total Trips</span>
              <p className="text-2xl font-bold text-neutral-100">142</p>
            </div>
            <div className="bg-neutral-800 p-5 rounded-3xl border border-neutral-700">
              <span className="text-[10px] text-neutral-500 font-bold uppercase block mb-1">Today Earnings</span>
              <p className="text-2xl font-bold text-emerald-500">₹1,240</p>
            </div>
          </div>
        </div>

        <button onClick={() => navigate('/')} className="w-full text-neutral-600 text-[10px] font-bold uppercase tracking-widest mt-6">
          Return to Customer App
        </button>
      </div>

      <style>{`
        .flex-2 { flex: 2; }
      `}</style>
    </div>
  );
};

export default Delivery;
