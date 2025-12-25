
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { backend } from '../services/backend';

interface SearchProps {
  onAddToCart: (p: Product) => void;
}

const Search: React.FC<SearchProps> = ({ onAddToCart }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const allProducts = backend.getProducts();
  const filtered = allProducts.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) || 
    p.category.toLowerCase().includes(query.toLowerCase())
  );

  const recent = ['Saffron', 'Pure Ghee', 'Basmati'];

  return (
    <div className="flex-1 flex flex-col bg-neutral-900">
      <div className="p-4 bg-neutral-900 border-b border-neutral-800 sticky top-0 z-10 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-neutral-400"><i className="fa-solid fa-arrow-left"></i></button>
        <div className="flex-1 relative">
          <input 
            autoFocus
            type="text"
            placeholder="Search for kirana, staples..."
            className="w-full bg-neutral-800 border border-neutral-700 rounded-2xl py-3 px-10 text-sm focus:outline-none focus:border-amber-500"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 text-xs"></i>
          {query && (
            <button onClick={() => setQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500"><i className="fa-solid fa-circle-xmark"></i></button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {!query ? (
          <div>
            <h4 className="text-[10px] text-neutral-500 font-bold uppercase mb-4 tracking-widest">Recent Searches</h4>
            <div className="flex flex-wrap gap-2">
              {recent.map(r => (
                <button key={r} onClick={() => setQuery(r)} className="bg-neutral-800 border border-neutral-700 px-4 py-2 rounded-full text-xs text-neutral-300">
                  {r}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.length > 0 ? filtered.map(product => (
              <div 
                key={product.id} 
                onClick={() => navigate(`/product/${product.id}`)}
                className="flex gap-4 bg-neutral-800/50 p-3 rounded-2xl border border-neutral-800 items-center"
              >
                <img src={product.image} className="w-16 h-16 rounded-xl object-cover" alt="" />
                <div className="flex-1">
                  <h5 className="text-sm font-bold text-neutral-100">{product.name}</h5>
                  <p className="text-[10px] text-neutral-500">{product.weight}</p>
                  <p className="text-amber-500 font-bold text-xs mt-1">₹{product.price}</p>
                </div>
                <button 
                  onClick={(e) => { e.stopPropagation(); onAddToCart(product); }}
                  className="bg-emerald-700 text-white w-8 h-8 rounded-xl flex items-center justify-center"
                >
                  <i className="fa-solid fa-plus text-xs"></i>
                </button>
              </div>
            )) : (
              <div className="text-center py-20">
                <i className="fa-solid fa-magnifying-glass text-neutral-800 text-5xl mb-4"></i>
                <p className="text-neutral-500 text-sm">No products found for "{query}"</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
