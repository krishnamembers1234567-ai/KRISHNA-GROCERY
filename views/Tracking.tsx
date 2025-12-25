
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const Tracking: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState(0);

  const steps = [
    { label: 'Order Placed', time: '10:02 AM', icon: 'fa-file-invoice-dollar' },
    { label: 'Merchant Accepted', time: '10:05 AM', icon: 'fa-store' },
    { label: 'Partner at Store', time: '10:12 AM', icon: 'fa-motorcycle' },
    { label: 'Out for Delivery', time: 'Pending', icon: 'fa-box-open' },
    { label: 'Delivered', time: 'Pending', icon: 'fa-house-circle-check' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStatus(prev => (prev < 2 ? prev + 1 : prev));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex-1 flex flex-col bg-neutral-900">
      <div className="h-64 bg-neutral-800 relative flex items-center justify-center overflow-hidden">
        {/* Placeholder for real Map integration */}
        <div className="absolute inset-0 opacity-30 bg-[url('https://picsum.photos/seed/map/800/600')] bg-cover"></div>
        <div className="z-10 flex flex-col items-center">
          <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center shadow-2xl shadow-amber-500/50 mb-4 animate-bounce">
            <i className="fa-solid fa-motorcycle text-neutral-900 text-2xl"></i>
          </div>
          <div className="bg-neutral-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-amber-500/30">
            <span className="text-amber-500 text-xs font-bold">Partner is picking up your items</span>
          </div>
        </div>
        <button onClick={() => navigate('/')} className="absolute top-6 left-6 w-10 h-10 bg-neutral-900 rounded-full flex items-center justify-center text-white z-20 shadow-lg">
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div className="flex-1 bg-neutral-900 -mt-8 rounded-t-[40px] relative z-20 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-lg font-bold text-neutral-100">Order {id}</h2>
            <p className="text-[10px] text-neutral-500">Expected Delivery: 10:25 AM</p>
          </div>
          <button className="bg-emerald-700/20 text-emerald-500 text-xs font-bold px-4 py-2 rounded-xl border border-emerald-700/30">Help</button>
        </div>

        <div className="space-y-8 relative">
          <div className="absolute left-[13px] top-2 bottom-2 w-0.5 bg-neutral-800"></div>
          {steps.map((step, idx) => (
            <div key={idx} className="flex gap-6 items-start relative z-10">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] border-2 ${idx <= status ? 'bg-amber-500 border-amber-500 text-neutral-900 shadow-lg shadow-amber-500/30' : 'bg-neutral-900 border-neutral-800 text-neutral-600'}`}>
                <i className={`fa-solid ${step.icon}`}></i>
              </div>
              <div className="flex-1">
                <h5 className={`text-sm font-bold ${idx <= status ? 'text-neutral-100' : 'text-neutral-600'}`}>{step.label}</h5>
                <p className="text-[10px] text-neutral-500 mt-0.5">{step.time}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-neutral-800 rounded-3xl p-5 border border-neutral-700 flex items-center gap-4">
          <div className="w-12 h-12 bg-neutral-700 rounded-full overflow-hidden">
            <img src="https://picsum.photos/seed/driver/100/100" alt="Partner" />
          </div>
          <div className="flex-1">
            <h6 className="text-sm font-bold text-neutral-100">Sunil Sharma</h6>
            <p className="text-[10px] text-neutral-500">Your Krishna Delivery Partner</p>
          </div>
          <button className="w-10 h-10 bg-emerald-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-900/20">
            <i className="fa-solid fa-phone"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tracking;
