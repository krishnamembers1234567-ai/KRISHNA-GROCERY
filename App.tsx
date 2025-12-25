
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { User, UserRole, CartItem, Product } from './types';
import Splash from './views/Splash';
import Login from './views/Login';
import Home from './views/Home';
import ProductDetails from './views/ProductDetails';
import Cart from './views/Cart';
import Tracking from './views/Tracking';
import Admin from './views/Admin';
import Delivery from './views/Delivery';
import AICreation from './views/AICreation';
import Profile from './views/Profile';
import CategoryView from './views/CategoryView';
import Orders from './views/Orders';
import Help from './views/Help';
import Search from './views/Search';
import Checkout from './views/Checkout';
import Wallet from './views/Wallet';
import AddressManager from './views/AddressManager';
import { backend } from './services/backend';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isSplash, setIsSplash] = useState(true);
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const [notification, setNotification] = useState<{ title: string; body: string } | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsSplash(false), 2500);
    
    // Subscribe to simulated push notifications
    const unsubscribe = backend.subscribeToNotifications((title, body) => {
      setNotification({ title, body });
      setTimeout(() => setNotification(null), 5000);
    });

    return () => {
      clearTimeout(timer);
      unsubscribe();
    };
  }, []);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const toggleLang = () => setLang(prev => prev === 'en' ? 'hi' : 'en');

  if (isSplash) return <Splash />;

  const cartCount = cart.reduce((a, b) => a + b.quantity, 0);

  return (
    <HashRouter>
      <div className="max-w-md mx-auto bg-neutral-900 min-h-screen shadow-2xl overflow-hidden flex flex-col relative text-neutral-100 selection:bg-amber-500/30">
        
        {/* Swiggy-style In-App Push Notification Overlay */}
        {notification && (
          <div className="fixed top-4 left-4 right-4 z-[100] max-w-sm mx-auto animate-[slideDown_0.4s_ease-out]">
            <div className="bg-neutral-800/95 backdrop-blur-xl border border-amber-500/30 p-4 rounded-3xl shadow-2xl flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-500 rounded-2xl flex items-center justify-center text-neutral-900 shadow-lg shadow-amber-500/20">
                <i className="fa-solid fa-bell text-xl"></i>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-amber-500">{notification.title}</h4>
                <p className="text-[11px] text-neutral-300 mt-0.5 leading-snug">{notification.body}</p>
              </div>
              <button onClick={() => setNotification(null)} className="text-neutral-500 p-2">
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
          </div>
        )}

        <Routes>
          <Route path="/login" element={<Login onLogin={setUser} />} />
          
          <Route path="/" element={
            user ? <Home user={user} cartCount={cartCount} lang={lang} toggleLang={toggleLang} cart={cart} updateQuantity={updateQuantity} /> : <Navigate to="/login" />
          } />

          <Route path="/search" element={<Search onAddToCart={addToCart} />} />

          <Route path="/category/:id" element={<CategoryView onAddToCart={addToCart} cart={cart} updateQuantity={updateQuantity} />} />

          <Route path="/product/:id" element={<ProductDetails onAddToCart={addToCart} />} />

          <Route path="/cart" element={<Cart cart={cart} updateQuantity={updateQuantity} user={user} onClear={() => setCart([])} />} />

          <Route path="/checkout" element={<Checkout cart={cart} user={user} onClear={() => setCart([])} />} />

          <Route path="/wallet" element={<Wallet user={user} />} />
          
          <Route path="/addresses" element={<AddressManager />} />

          <Route path="/tracking/:id" element={<Tracking />} />
          
          <Route path="/profile" element={user ? <Profile user={user} onLogout={() => setUser(null)} /> : <Navigate to="/login" />} />
          
          <Route path="/orders" element={<Orders />} />
          <Route path="/help" element={<Help />} />

          <Route path="/ai-studio" element={<AICreation />} />

          <Route path="/admin" element={user?.role === UserRole.ADMIN ? <Admin /> : <Navigate to="/" />} />
          <Route path="/delivery" element={user?.role === UserRole.PARTNER ? <Delivery /> : <Navigate to="/" />} />
        </Routes>

        <style>{`
          @keyframes slideDown {
            from { transform: translateY(-100%); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
          }
        `}</style>
      </div>
    </HashRouter>
  );
};

export default App;
