
import React, { useState, useEffect } from 'react';
import { User, CartItem, Product } from '../types';
import { CATEGORIES, LOGO } from '../constants';
import { BottomNav } from '../components/Layout';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { backend } from '../services/backend';

interface HomeProps {
  user: User;
  cartCount: number;
  lang: 'en' | 'hi';
  toggleLang: () => void;
  cart: CartItem[];
  updateQuantity: (id: string, delta: number) => void;
}

const Home: React.FC<HomeProps> = ({ user, cartCount, lang, toggleLang, cart, updateQuantity }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const storeAddress = "653, Vidisha Rd, Kalyan Nagar, Bhanpur, Bhopal, Madhya Pradesh 462001";
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(storeAddress)}`;

  useEffect(() => {
    setProducts(backend.getProducts());
  }, []);

  const t = {
    en: {
      searchPlaceholder: "Search saffron, honey, or premium tea...",
      utsav: "Utsav Collection",
      utsavSub: "Exclusive 25% OFF on premium staples.",
      orderNow: "Order Now",
      categories: "Shop by Category",
      viewAll: "View All",
      featured: "Featured Kirana",
      ourStore: "Our Flagship Store",
      visitUs: "Visit our Bhopal location",
      getDirections: "Get Directions"
    },
    hi: {
      searchPlaceholder: "केसर, शहद या प्रीमियम चाय खोजें...",
      utsav: "उत्सव संग्रह",
      utsavSub: "प्रीमियम मसालों और मिठाइयों पर विशेष 25% छूट।",
      orderNow: "अभी ऑर्डर करें",
      categories: "श्रेणी के अनुसार खरीदारी करें",
      viewAll: "सभी देखें",
      featured: "विशेष किराना",
      ourStore: "हमारा फ्लैगशिप स्टोर",
      visitUs: "हमारे भोपाल स्टोर पर आएं",
      getDirections: "दिशा-निर्देश प्राप्त करें"
    }
  }[lang];

  return (
    <div className="flex-1 pb-24 overflow-y-auto no-scrollbar">
      <header className="sticky top-0 bg-neutral-900/95 backdrop-blur-md p-4 z-40 border-b border-neutral-800 flex justify-between items-center">
        <div className="flex items-center gap-3">
          {LOGO("w-10 h-10")}
          <div>
            <h2 className="brand-font text-amber-500 font-bold leading-tight">KRISHNA</h2>
            <div className="flex items-center text-[10px] text-neutral-400 gap-1">
              <i className="fa-solid fa-location-dot text-emerald-500"></i>
              <span className="truncate max-w-[150px]">Bhopal, Madhya Pradesh</span>
            </div>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <button 
            onClick={toggleLang}
            className="bg-neutral-800 text-amber-500 text-[10px] font-bold px-2 py-1 rounded-md border border-neutral-700"
          >
            {lang === 'en' ? 'हिंदी' : 'EN'}
          </button>
          <button className="text-neutral-400 hover:text-amber-400 relative">
            <i className="fa-solid fa-bell text-lg"></i>
            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-neutral-900"></span>
          </button>
        </div>
      </header>

      <div className="p-4" onClick={() => navigate('/search')}>
        <div className="relative pointer-events-none">
          <input 
            type="text"
            readOnly
            placeholder={t.searchPlaceholder}
            className="w-full bg-neutral-800 border border-neutral-700 rounded-2xl py-4 px-12 text-sm focus:outline-none"
          />
          <i className="fa-solid fa-magnifying-glass absolute left-5 top-1/2 -translate-y-1/2 text-neutral-500"></i>
          <i className="fa-solid fa-microphone absolute right-5 top-1/2 -translate-y-1/2 text-amber-500"></i>
        </div>
      </div>

      <div className="px-4 mb-6">
        <div className="bg-gradient-to-r from-emerald-900 to-emerald-700 rounded-3xl p-6 relative overflow-hidden h-40 flex items-center shadow-xl">
          <div className="z-10">
            <h3 className="text-amber-400 brand-font text-2xl font-bold">{t.utsav}</h3>
            <p className="text-white text-sm mt-1 max-w-[60%]">{t.utsavSub}</p>
            <button className="mt-4 bg-amber-500 text-neutral-900 text-xs font-bold py-2 px-4 rounded-full uppercase transition-transform active:scale-95">{t.orderNow}</button>
          </div>
          <img src="https://picsum.photos/seed/festival/200/200" className="absolute -right-5 -bottom-5 w-40 h-40 object-cover rotate-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500" alt="" />
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center px-4 mb-4">
          <h4 className="font-bold text-neutral-200">{t.categories}</h4>
          <button className="text-amber-500 text-xs font-bold">{t.viewAll}</button>
        </div>
        <div className="flex overflow-x-auto px-4 gap-4 no-scrollbar">
          {CATEGORIES.map(cat => (
            <div 
              key={cat.id} 
              onClick={() => navigate(`/category/${cat.id}`)}
              className="flex flex-col items-center gap-2 min-w-[70px] cursor-pointer"
            >
              <div className={`${cat.color} w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg shadow-black/20 transform transition-transform active:scale-90`}>
                <i className={`fa-solid ${cat.icon}`}></i>
              </div>
              <span className="text-[10px] text-neutral-400 font-medium whitespace-nowrap">{cat.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center px-4 mb-4">
          <h4 className="font-bold text-neutral-200">{t.featured}</h4>
          <button className="text-amber-500 text-xs font-bold">{t.viewAll}</button>
        </div>
        <div className="grid grid-cols-2 gap-4 px-4">
          {products.slice(0, 4).map(product => {
            const cartItem = cart.find(i => i.id === product.id);
            return (
              <div 
                key={product.id} 
                onClick={() => navigate(`/product/${product.id}`)}
                className="bg-neutral-800/50 rounded-3xl p-3 border border-neutral-800 transition-all hover:border-amber-500/30 group"
              >
                <div className="relative rounded-2xl overflow-hidden aspect-square mb-3">
                  <img src={product.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform" alt={product.name} />
                  <div className="absolute top-2 right-2 bg-neutral-900/80 p-1.5 rounded-full text-xs text-amber-500">
                    <i className="fa-regular fa-heart"></i>
                  </div>
                </div>
                <h5 className="text-xs font-bold text-neutral-100 truncate">{product.name}</h5>
                <p className="text-[10px] text-neutral-500 mt-0.5">{product.weight}</p>
                <div className="flex justify-between items-center mt-3 h-10">
                  <span className="text-amber-500 font-bold text-sm">₹{product.price}</span>
                  {!cartItem ? (
                    <button 
                      onClick={(e) => { e.stopPropagation(); navigate(`/product/${product.id}`); }}
                      className="bg-emerald-700 hover:bg-emerald-600 text-white w-8 h-8 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-900/20 transform active:scale-90"
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
      </div>

      <div className="px-4 mb-8">
        <div className="bg-neutral-800 border border-neutral-700 rounded-3xl p-6 shadow-inner relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          
          <div className="flex items-center gap-3 mb-5">
            <div className="bg-amber-500/20 p-3 rounded-2xl">
              <i className="fa-solid fa-store text-amber-500 text-lg"></i>
            </div>
            <div>
              <h4 className="font-bold text-neutral-100">{t.ourStore}</h4>
              <p className="text-[10px] text-emerald-500 uppercase font-bold tracking-widest">{t.visitUs}</p>
            </div>
          </div>

          <div className="bg-neutral-900/50 rounded-2xl p-4 border border-neutral-700 mb-5">
            <p className="text-xs text-neutral-300 leading-relaxed">
              {storeAddress}
            </p>
            <div className="flex items-center gap-2 mt-3 text-[10px] text-neutral-500">
              <i className="fa-solid fa-clock text-amber-500/50"></i>
              <span>Open 9:00 AM - 10:00 PM</span>
            </div>
          </div>

          <a 
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-emerald-700 hover:bg-emerald-600 text-white py-3 rounded-xl text-xs font-bold uppercase flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-emerald-900/20"
          >
            <i className="fa-solid fa-diamond-turn-right"></i>
            {t.getDirections}
          </a>
        </div>
      </div>

      <Footer />
      <BottomNav cartCount={cartCount} />
    </div>
  );
};

export default Home;
