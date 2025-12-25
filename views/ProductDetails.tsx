
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Product } from '../types';
import { backend } from '../services/backend';

interface ProductDetailsProps {
  onAddToCart: (p: Product) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ onAddToCart }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = backend.getProducts().find(p => p.id === id);

  if (!product) return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-neutral-900">
      <h2 className="text-xl font-bold text-neutral-200 brand-font">Product not found</h2>
      <button onClick={() => navigate('/')} className="mt-6 bg-amber-500 text-neutral-900 font-bold py-3 px-8 rounded-xl">Back to Home</button>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col relative pb-24">
      <div className="relative h-[400px] w-full">
        <img src={product.image} className="w-full h-full object-cover" alt={product.name} />
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center bg-gradient-to-b from-neutral-900 to-transparent">
          <button onClick={() => navigate(-1)} className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
            <i className="fa-solid fa-arrow-left"></i>
          </button>
          <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
            <i className="fa-regular fa-heart"></i>
          </button>
        </div>
      </div>

      <div className="bg-neutral-900 rounded-t-[40px] -mt-10 relative z-10 p-8 flex-1">
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-emerald-500 text-[10px] font-bold uppercase tracking-widest">{product.category}</span>
            <h1 className="brand-font text-3xl text-neutral-100 mt-1">{product.name}</h1>
            <p className="text-neutral-500 text-sm mt-1">{product.weight}</p>
          </div>
          <div className="bg-neutral-800 px-4 py-2 rounded-2xl border border-neutral-700 text-center">
            <span className="text-[10px] text-neutral-500 block">Rating</span>
            <span className="text-amber-500 font-bold">4.9 <i className="fa-solid fa-star text-[10px]"></i></span>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <span className="text-amber-500 text-3xl font-bold">₹{product.price}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="text-neutral-600 line-through text-lg">₹{product.originalPrice}</span>
          )}
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="bg-emerald-900/30 text-emerald-500 text-[10px] px-2 py-1 rounded-md font-bold">SAVE {Math.round((1 - product.price / product.originalPrice) * 100)}%</span>
          )}
        </div>

        <h4 className="font-bold text-neutral-300 mb-2">Description</h4>
        <p className="text-neutral-500 text-sm leading-relaxed mb-8">
          {product.description} Experience the finest quality from Krishna's curated premium collection. Every item is ethically sourced and quality tested.
        </p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-neutral-800 p-4 rounded-2xl border border-neutral-700 flex items-center gap-3">
            <i className="fa-solid fa-truck-fast text-emerald-500"></i>
            <div>
              <p className="text-[10px] text-neutral-500">Delivery in</p>
              <p className="text-xs font-bold text-neutral-200">20-30 Mins</p>
            </div>
          </div>
          <div className="bg-neutral-800 p-4 rounded-2xl border border-neutral-700 flex items-center gap-3">
            <i className="fa-solid fa-shield-check text-emerald-500"></i>
            <div>
              <p className="text-[10px] text-neutral-500">Pure Grade</p>
              <p className="text-xs font-bold text-neutral-200">100% Quality</p>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-neutral-900/80 backdrop-blur-xl border-t border-neutral-800">
          <button 
            onClick={() => {
              onAddToCart(product);
              navigate('/cart');
            }}
            className="w-full bg-amber-500 hover:bg-amber-600 text-neutral-900 py-4 rounded-2xl font-bold uppercase tracking-widest transition-all active:scale-95"
          >
            Add to Basket
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
