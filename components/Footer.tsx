
import React from 'react';
import { LOGO } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-950 pt-12 pb-8 px-6 mt-12 border-t border-neutral-800">
      <div className="flex flex-col items-center mb-10">
        {LOGO("w-16 h-16 mb-4 opacity-80")}
        <h2 className="brand-font text-amber-500 text-2xl tracking-widest">KRISHNA</h2>
        <p className="text-neutral-500 text-[10px] uppercase tracking-[0.2em] mt-1 font-bold">Premium Kirana Delivery</p>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-10">
        <div className="space-y-3">
          <h4 className="text-neutral-400 text-[10px] font-bold uppercase tracking-wider mb-4">Company</h4>
          <a href="#" className="block text-xs text-neutral-500 hover:text-amber-500 transition-colors">About KRISHNA</a>
          <a href="#" className="block text-xs text-neutral-500 hover:text-amber-500 transition-colors">Team & Careers</a>
          <a href="#" className="block text-xs text-neutral-500 hover:text-amber-500 transition-colors">Premium Membership</a>
        </div>
        <div className="space-y-3">
          <h4 className="text-neutral-400 text-[10px] font-bold uppercase tracking-wider mb-4">Support</h4>
          <a href="#" className="block text-xs text-neutral-500 hover:text-amber-500 transition-colors">Help Center</a>
          <a href="#" className="block text-xs text-neutral-500 hover:text-amber-500 transition-colors">Terms of Service</a>
          <a href="#" className="block text-xs text-neutral-500 hover:text-amber-500 transition-colors">Privacy Policy</a>
        </div>
      </div>

      <div className="flex justify-center gap-6 mb-10">
        <a href="#" className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-500 hover:text-amber-500 border border-neutral-800 transition-all"><i className="fa-brands fa-facebook-f"></i></a>
        <a href="#" className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-500 hover:text-amber-500 border border-neutral-800 transition-all"><i className="fa-brands fa-instagram"></i></a>
        <a href="#" className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-500 hover:text-amber-500 border border-neutral-800 transition-all"><i className="fa-brands fa-x-twitter"></i></a>
      </div>

      <div className="space-y-4 mb-10">
        <button className="w-full bg-neutral-900 border border-neutral-800 p-3 rounded-xl flex items-center justify-center gap-3">
          <i className="fa-brands fa-apple text-xl text-neutral-300"></i>
          <div className="text-left">
            <p className="text-[8px] text-neutral-500 leading-none">Download on the</p>
            <p className="text-xs font-bold text-neutral-300">App Store</p>
          </div>
        </button>
        <button className="w-full bg-neutral-900 border border-neutral-800 p-3 rounded-xl flex items-center justify-center gap-3">
          <i className="fa-brands fa-google-play text-xl text-neutral-300"></i>
          <div className="text-left">
            <p className="text-[8px] text-neutral-500 leading-none">Get it on</p>
            <p className="text-xs font-bold text-neutral-300">Google Play</p>
          </div>
        </button>
      </div>

      <div className="text-center pt-8 border-t border-neutral-900">
        <p className="text-neutral-600 text-[9px] uppercase tracking-widest flex items-center justify-center gap-2">
          Made with <i className="fa-solid fa-heart text-red-900"></i> in India
        </p>
        <p className="text-neutral-700 text-[8px] mt-2">© 2024 KRISHNA PREMIUM PVT LTD</p>
      </div>
    </footer>
  );
};

export default Footer;
