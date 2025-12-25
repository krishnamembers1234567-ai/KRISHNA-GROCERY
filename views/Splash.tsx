
import React from 'react';
import { LOGO } from '../constants';

const Splash: React.FC = () => {
  return (
    <div className="h-screen w-full bg-neutral-900 flex flex-col items-center justify-center overflow-hidden">
      <div className="animate-bounce">
        {LOGO("w-24 h-24 mb-6")}
      </div>
      <h1 className="brand-font text-amber-500 text-5xl tracking-widest animate-pulse">KRISHNA</h1>
      <p className="text-neutral-500 mt-4 tracking-widest text-sm uppercase">Premium Kirana Delivered</p>
      
      <div className="absolute bottom-12 w-12 h-1 bg-neutral-800 rounded-full overflow-hidden">
        <div className="h-full bg-amber-500 animate-[loading_2s_infinite]"></div>
      </div>

      <style>{`
        @keyframes loading {
          0% { width: 0; left: 0; }
          50% { width: 100%; left: 0; }
          100% { width: 0; left: 100%; }
        }
      `}</style>
    </div>
  );
};

export default Splash;
