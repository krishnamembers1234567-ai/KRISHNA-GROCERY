
import React from 'react';
import { NavLink } from 'react-router-dom';

interface BottomNavProps {
  cartCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({ cartCount }) => {
  const activeClass = "text-amber-500 transform scale-110";
  const inactiveClass = "text-neutral-500 hover:text-amber-400";

  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-neutral-900/95 backdrop-blur-xl border-t border-neutral-800 px-6 py-3 flex justify-between items-center z-50 rounded-t-3xl">
      <NavLink to="/" className={({ isActive }) => isActive ? activeClass : inactiveClass}>
        <div className="flex flex-col items-center">
          <i className="fa-solid fa-house text-xl"></i>
          <span className="text-[10px] mt-1 font-medium">Home</span>
        </div>
      </NavLink>
      <NavLink to="/search" className={({ isActive }) => isActive ? activeClass : inactiveClass}>
        <div className="flex flex-col items-center">
          <i className="fa-solid fa-magnifying-glass text-xl"></i>
          <span className="text-[10px] mt-1 font-medium">Search</span>
        </div>
      </NavLink>
      <NavLink to="/ai-studio" className={({ isActive }) => isActive ? activeClass : inactiveClass}>
        <div className="flex flex-col items-center">
          <i className="fa-solid fa-wand-magic-sparkles text-xl"></i>
          <span className="text-[10px] mt-1 font-medium">Magic</span>
        </div>
      </NavLink>
      <NavLink to="/cart" className={({ isActive }) => isActive ? `${activeClass} relative` : `${inactiveClass} relative`}>
        <div className="flex flex-col items-center">
          <i className="fa-solid fa-cart-shopping text-xl"></i>
          <span className="text-[10px] mt-1 font-medium">Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-neutral-900 shadow-md">
              {cartCount}
            </span>
          )}
        </div>
      </NavLink>
      <NavLink to="/profile" className={({ isActive }) => isActive ? activeClass : inactiveClass}>
        <div className="flex flex-col items-center">
          <i className="fa-solid fa-user text-xl"></i>
          <span className="text-[10px] mt-1 font-medium">Profile</span>
        </div>
      </NavLink>
    </div>
  );
};
