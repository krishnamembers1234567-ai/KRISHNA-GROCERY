
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Help: React.FC = () => {
  const navigate = useNavigate();
  const faqs = [
    { q: "How can I track my premium order?", a: "Go to 'My Orders' and select the live order to see real-time movement." },
    { q: "Do you provide scheduled delivery?", a: "Yes, you can choose a specific time slot during the checkout process." },
    { q: "Is there a minimum order value?", a: "No minimum, but orders above ₹500 enjoy free delivery." },
    { q: "What is Krishna Gold membership?", a: "Gold members get exclusive access to premium harvests and zero platform fees." }
  ];

  return (
    <div className="flex-1 flex flex-col bg-neutral-900 h-full">
      <header className="p-6 border-b border-neutral-800 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="text-neutral-400"><i className="fa-solid fa-arrow-left"></i></button>
        <h2 className="brand-font text-2xl text-amber-500">Help & Support</h2>
      </header>

      <div className="flex-1 p-6 overflow-y-auto">
        <div className="bg-amber-500/10 border border-amber-500/30 p-6 rounded-[40px] text-center mb-8">
          <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="fa-solid fa-headset text-neutral-900 text-2xl"></i>
          </div>
          <h3 className="font-bold text-neutral-100">Live Concierge</h3>
          <p className="text-xs text-neutral-400 mt-2">Our premium support agents are available 24/7 for our elite customers.</p>
          <button className="mt-6 w-full bg-amber-500 text-neutral-900 font-bold py-3 rounded-2xl uppercase text-xs">Start Live Chat</button>
        </div>

        <h4 className="font-bold text-neutral-300 mb-4">Common Questions</h4>
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <div key={i} className="bg-neutral-800/50 p-4 rounded-2xl border border-neutral-800">
              <h5 className="text-sm font-bold text-amber-500">{f.q}</h5>
              <p className="text-xs text-neutral-500 mt-2 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Help;
