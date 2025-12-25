
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../constants';
import { Product, CartItem } from '../types';
import Footer from '../components/Footer';
import { backend } from '../services/backend';

interface CategoryViewProps {
  onAddToCart: (p: Product) => void;
  cart: CartItem[];
  updateQuantity: (id: string, delta: number) => void;
}

const CategoryView: React.FC<CategoryViewProps> = ({ onAddToCart, cart, updateQuantity }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const category = CATEGORIES.find(c => c.id === id);
  const products = backend.getProducts().filter(p => p.category === category?.name);

  if (!category) return <div className="p-8 text-center text-neutral-500">Category not found</div>;

  return (
    <div className="flex-1 flex flex-col bg-neutral-900 min-h-screen pb-24 overflow-y-auto no-scrollbar">
      <header className={`p-6 ${category.color} flex items-center gap-4 relative overflow-hidden sticky top-0 z-20`}>
        <button onClick={() => navigate(-1)} className="text-white z-10"><i className="fa-solid fa-arrow-left"></i></button>
        <div className="z-10">
          <h2 className="brand-font text-2xl text-white">{category.name}</h2>
          <p className="text-white/70 text-[10px] uppercase font-bold tracking-widest">{products.length} Premium Items</p>
        </div>
        <i className={`fa-solid ${category.icon} absolute -right-4 -bottom-4 text-7xl text-white/10`}></i>
      </header>

      <div className="flex-1 p-4 grid grid-cols-2 gap-4">
        {products.map(product => {
          const cartItem = cart.find(i => i.id === product.id);
          return (
            <div 
              key={product.id} 
              onClick={() => navigate(`/product/${product.id}`)}
              className="bg-neutral-800/50 rounded-3xl p-3 border border-neutral-800 flex flex-col h-full group transition-all hover:border-amber-500/30"
            >
              <div className="relative rounded-2xl overflow-hidden aspect-square mb-3">
                <img src={product.image} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt={product.name} />
              </div>
              <div className="flex-1">
                <h5 className="text-xs font-bold text-neutral-100 line-clamp-1">{product.name}</h5>
                <p className="text-[10px] text-neutral-500 mt-0.5">{product.weight}</p>
              </div>
              <div className="flex justify-between items-center mt-3 h-10">
                <span className="text-amber-500 font-bold text-sm">₹{product.price}</span>
                {!cartItem ? (
                  <button 
                    onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
                    className="bg-emerald-700 hover:bg-emerald-600 text-white w-8 h-8 rounded-xl flex items-center justify-center shadow-lg transform transition-all active:scale-90"
                  >
                    <i className="fa-solid fa-plus text-xs"></i>
                  </button>
                ) : (
                  <div className="flex items-center bg-neutral-900 rounded-xl border border-neutral-700 overflow-hidden" onClick={e => e.stopPropagation()}>
                    <button onClick={() => updateQuantity(product.id, -1)} className="p-2 text-neutral-500"><i className="fa-solid fa-minus text-[8px]"></i></button>
                    <span className="w-6 text-center text-[10px] font-bold text-neutral-200">{cartItem.quantity}</span>
                    <button onClick={() => updateQuantity(product.id, 1)} className="p-2 text-amber-500"><i className="fa-solid fa-plus text-[8px]"></i></button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
};

export default CategoryView;
