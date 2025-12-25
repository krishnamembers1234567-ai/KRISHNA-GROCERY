
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { backend } from '../services/backend';
import { Product } from '../types';
import { CATEGORIES } from '../constants';

const Admin: React.FC = () => {
  const navigate = useNavigate();
  const [analytics, setAnalytics] = useState(backend.getAnalytics());
  const [products, setProducts] = useState(backend.getProducts());
  const [activeTab, setActiveTab] = useState<'stats' | 'inventory' | 'orders' | 'payments'>('inventory');
  const [paymentConfig, setPaymentConfig] = useState(backend.getPaymentConfig());
  
  // Inventory Modal/Form States
  const [showEditor, setShowEditor] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formValues, setFormValues] = useState<Partial<Product>>({
    name: '',
    category: CATEGORIES[0].name,
    price: 0,
    originalPrice: 0,
    weight: '',
    stock: 0,
    description: '',
    image: 'https://picsum.photos/seed/newproduct/400/400'
  });

  useEffect(() => {
    refreshData();
  }, [activeTab]);

  const refreshData = () => {
    setAnalytics(backend.getAnalytics());
    setProducts([...backend.getProducts()]);
    setPaymentConfig(backend.getPaymentConfig());
  };

  const handleTogglePayment = (method: any) => {
    const newConfig = backend.togglePaymentMethod(method);
    setPaymentConfig({ ...newConfig });
  };

  const handleDeleteProduct = (id: string) => {
    if (window.confirm("Are you sure you want to delete this premium product?")) {
      backend.deleteProduct(id);
      refreshData();
    }
  };

  const handleSaveProduct = () => {
    if (!formValues.name || !formValues.price) return alert("Product name and price are essential.");
    
    if (editingProduct) {
      backend.updateProduct(editingProduct.id, formValues);
    } else {
      backend.addProduct(formValues as Omit<Product, 'id'>);
    }
    
    closeEditor();
    refreshData();
  };

  const openEditor = (product: Product | null = null) => {
    if (product) {
      setEditingProduct(product);
      setFormValues({ ...product });
    } else {
      setEditingProduct(null);
      setFormValues({
        name: '',
        category: CATEGORIES[0].name,
        price: 0,
        originalPrice: 0,
        weight: '',
        stock: 0,
        description: '',
        image: `https://picsum.photos/seed/${Math.random()}/400/400`
      });
    }
    setShowEditor(true);
  };

  const closeEditor = () => {
    setShowEditor(false);
    setEditingProduct(null);
  };

  return (
    <div className="flex-1 flex flex-col bg-neutral-900 min-h-screen pb-10">
      <header className="p-6 bg-neutral-800 border-b border-neutral-700 sticky top-0 z-30 flex justify-between items-center shadow-lg">
        <div>
          <h2 className="brand-font text-amber-500 text-2xl">KRISHNA Admin</h2>
          <p className="text-neutral-500 text-[10px] uppercase font-bold tracking-[0.2em]">Management Suite</p>
        </div>
        <button onClick={() => navigate('/')} className="bg-neutral-900 w-10 h-10 rounded-xl flex items-center justify-center text-neutral-400 border border-neutral-800 hover:text-amber-500 transition-colors">
          <i className="fa-solid fa-house"></i>
        </button>
      </header>

      {/* Navigation Tabs */}
      <div className="flex bg-neutral-800/50 p-1 mx-6 mt-6 rounded-2xl border border-neutral-800 overflow-x-auto no-scrollbar shadow-inner">
        {(['stats', 'inventory', 'orders', 'payments'] as const).map(tab => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 min-w-[80px] py-2.5 text-[10px] font-black uppercase rounded-xl transition-all duration-300 ${activeTab === tab ? 'bg-amber-500 text-neutral-900 shadow-lg shadow-amber-500/20' : 'text-neutral-500 hover:text-neutral-300'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-6">
        {activeTab === 'stats' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-neutral-800 p-6 rounded-[32px] border border-neutral-700 shadow-xl relative overflow-hidden group">
                <div className="absolute -right-4 -bottom-4 text-emerald-500/10 text-6xl group-hover:scale-110 transition-transform"><i className="fa-solid fa-indian-rupee-sign"></i></div>
                <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Revenue</span>
                <p className="text-2xl font-black text-emerald-500 mt-2">₹{analytics.revenue.toLocaleString()}</p>
              </div>
              <div className="bg-neutral-800 p-6 rounded-[32px] border border-neutral-700 shadow-xl relative overflow-hidden group">
                <div className="absolute -right-4 -bottom-4 text-amber-500/10 text-6xl group-hover:scale-110 transition-transform"><i className="fa-solid fa-cart-shopping"></i></div>
                <span className="text-[10px] text-neutral-500 font-bold uppercase tracking-widest">Total Orders</span>
                <p className="text-2xl font-black text-amber-500 mt-2">{analytics.orderCount}</p>
              </div>
            </div>

            <div className="bg-amber-500/5 border border-amber-500/20 p-6 rounded-[32px] flex items-center gap-5">
              <div className="w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center text-neutral-900 text-2xl shadow-xl shadow-amber-500/20 shrink-0">
                <i className="fa-solid fa-warehouse"></i>
              </div>
              <div>
                <h4 className="text-sm font-bold text-amber-500">Inventory Status</h4>
                <p className="text-xs text-neutral-400 mt-1">{analytics.lowStockCount} items require immediate restock attention.</p>
              </div>
            </div>

            <h3 className="font-black text-neutral-200 mt-8 text-sm uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></span>
              Live Feed
            </h3>
            <div className="space-y-3">
              {backend.getOrders().slice(-4).reverse().map(order => (
                <div key={order.id} className="bg-neutral-800/40 p-4 rounded-2xl border border-neutral-800 flex justify-between items-center hover:bg-neutral-800/60 transition-colors">
                  <div>
                    <p className="text-xs font-bold text-neutral-100 uppercase tracking-tighter">{order.id}</p>
                    <p className="text-[10px] text-neutral-500 mt-0.5">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-amber-500 font-black text-sm">₹{order.total}</p>
                    <p className={`text-[9px] uppercase font-black tracking-widest mt-0.5 ${order.status === 'Delivered' ? 'text-emerald-500' : 'text-amber-500/70'}`}>{order.status}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'inventory' && (
          <div className="space-y-4 animate-in fade-in duration-500">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-black text-neutral-100 text-lg">Catalog</h3>
                <p className="text-[10px] text-neutral-500 uppercase tracking-widest">{products.length} Products listed</p>
              </div>
              <button 
                onClick={() => openEditor()}
                className="bg-emerald-700 hover:bg-emerald-600 text-white text-[10px] px-5 py-2.5 rounded-xl font-black uppercase tracking-widest transition-all shadow-lg shadow-emerald-900/20 flex items-center gap-2"
              >
                <i className="fa-solid fa-plus"></i> New Item
              </button>
            </div>

            <div className="grid gap-4">
              {products.map(p => (
                <div key={p.id} className="bg-neutral-800/50 p-4 rounded-[32px] border border-neutral-800 flex gap-5 group transition-all hover:border-amber-500/40 hover:bg-neutral-800/80">
                  <div className="w-24 h-24 rounded-3xl overflow-hidden border border-neutral-700 shadow-2xl shrink-0">
                    <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <div>
                          <h5 className="text-sm font-black text-neutral-100 group-hover:text-amber-500 transition-colors">{p.name}</h5>
                          <span className="text-[9px] text-neutral-500 uppercase font-black tracking-[0.2em]">{p.category}</span>
                        </div>
                        <div className="flex gap-2">
                          <button 
                            onClick={() => openEditor(p)}
                            className="w-9 h-9 bg-neutral-900/50 rounded-xl flex items-center justify-center text-amber-500 border border-neutral-700 hover:bg-amber-500 hover:text-neutral-900 transition-all"
                          >
                            <i className="fa-solid fa-pen-nib"></i>
                          </button>
                          <button 
                            onClick={() => handleDeleteProduct(p.id)}
                            className="w-9 h-9 bg-neutral-900/50 rounded-xl flex items-center justify-center text-red-400 border border-neutral-700 hover:bg-red-500 hover:text-white transition-all"
                          >
                            <i className="fa-solid fa-trash-can"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-2 flex justify-between items-center">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${p.stock < 10 ? 'bg-red-500 animate-pulse' : 'bg-emerald-500'}`}></span>
                          <span className="text-[10px] text-neutral-400 font-bold">{p.stock} in stock • {p.weight}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        {p.originalPrice && p.originalPrice > p.price && (
                          <p className="text-[10px] text-neutral-600 line-through">₹{p.originalPrice}</p>
                        )}
                        <p className="text-amber-500 font-black text-xl leading-none">₹{p.price}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Similar updates for Orders and Payments if needed, but focus is Inventory */}
        {activeTab === 'orders' && (
          <div className="space-y-4 animate-in slide-in-from-bottom duration-500">
            <h3 className="font-black text-neutral-100 text-lg">Order Management</h3>
            {backend.getOrders().length === 0 ? (
              <div className="py-20 flex flex-col items-center opacity-30">
                <i className="fa-solid fa-receipt text-6xl mb-4"></i>
                <p className="text-sm uppercase tracking-widest font-black">No active orders</p>
              </div>
            ) : (
              backend.getOrders().map(order => (
                <div key={order.id} className="bg-neutral-800 border border-neutral-700 p-6 rounded-[32px] space-y-4 shadow-xl">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] bg-neutral-950 px-3 py-1.5 rounded-xl text-amber-500 font-mono font-bold border border-neutral-700">{order.id}</span>
                    <select 
                      value={order.status}
                      onChange={(e) => {
                        backend.updateOrderStatus(order.id, e.target.value as any);
                        refreshData();
                      }}
                      className="bg-neutral-900 border border-neutral-700 rounded-xl text-[10px] px-3 py-1.5 text-white outline-none font-bold uppercase tracking-wider focus:border-amber-500"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Out for Delivery">Dispatch</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-xs text-neutral-300 font-black">{order.items.length} Premium Items</p>
                      <p className="text-[10px] text-neutral-500 mt-1 uppercase tracking-widest">{order.date}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-[10px] text-neutral-500 uppercase font-black">Grand Total</p>
                       <p className="text-lg text-amber-500 font-black">₹{order.total}</p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'payments' && (
          <div className="space-y-6 animate-in slide-in-from-bottom duration-500">
            <div className="bg-neutral-800 border border-neutral-700 rounded-[40px] p-8 space-y-6 shadow-2xl">
              <h4 className="text-[10px] text-neutral-500 uppercase font-black tracking-[0.3em] text-center border-b border-neutral-700 pb-4">Merchant Payment Switch</h4>
              <div className="space-y-2">
                {Object.entries(paymentConfig).map(([method, isEnabled]) => (
                  <div key={method} className="flex justify-between items-center p-4 bg-neutral-900/30 rounded-2xl border border-transparent hover:border-neutral-700 transition-all">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-neutral-900 rounded-xl flex items-center justify-center text-amber-500 border border-neutral-800 shadow-inner">
                        <i className={`fa-solid ${method === 'upi' ? 'fa-qrcode' : method === 'card' ? 'fa-credit-card' : method === 'cod' ? 'fa-hand-holding-dollar' : method === 'wallet' ? 'fa-wallet' : 'fa-building-columns'}`}></i>
                      </div>
                      <span className="text-xs font-black text-neutral-200 uppercase tracking-widest">{method}</span>
                    </div>
                    <button 
                      onClick={() => handleTogglePayment(method)}
                      className={`w-14 h-7 rounded-full relative transition-all duration-300 shadow-inner ${isEnabled ? 'bg-emerald-600' : 'bg-neutral-700'}`}
                    >
                      <div className={`absolute top-1 w-5 h-5 rounded-full bg-white transition-all shadow-md ${isEnabled ? 'left-8' : 'left-1'}`}></div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* PRODUCT EDITOR OVERLAY */}
      {showEditor && (
        <div className="fixed inset-0 z-[100] bg-neutral-950/90 backdrop-blur-md flex items-end animate-in fade-in duration-300">
          <div className="w-full max-w-md mx-auto bg-neutral-900 rounded-t-[48px] border-t border-neutral-800 shadow-2xl flex flex-col max-h-[92vh] animate-in slide-in-from-bottom duration-500">
            <div className="p-4 flex justify-center">
              <div className="w-12 h-1.5 bg-neutral-800 rounded-full"></div>
            </div>
            
            <div className="px-8 pb-8 flex-1 overflow-y-auto no-scrollbar">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="brand-font text-amber-500 text-3xl">{editingProduct ? 'Edit Item' : 'New Creation'}</h2>
                  <p className="text-[10px] text-neutral-500 uppercase font-black tracking-widest mt-1">Catalog Entry</p>
                </div>
                <button onClick={closeEditor} className="w-12 h-12 bg-neutral-800 rounded-2xl flex items-center justify-center text-neutral-400 hover:text-white transition-colors">
                  <i className="fa-solid fa-xmark text-xl"></i>
                </button>
              </div>

              <div className="space-y-6">
                {/* Image Preview Area */}
                <div className="relative group">
                  <div className="w-full h-48 rounded-[32px] overflow-hidden border-2 border-dashed border-neutral-700 flex items-center justify-center bg-neutral-950 shadow-inner">
                    {formValues.image ? (
                      <img src={formValues.image} className="w-full h-full object-cover" alt="Preview" onError={(e) => (e.currentTarget.src = 'https://placehold.co/400x400/171717/amber?text=Invalid+URL')} />
                    ) : (
                      <div className="text-neutral-700 flex flex-col items-center gap-2">
                        <i className="fa-solid fa-image text-4xl"></i>
                        <span className="text-[10px] uppercase font-black tracking-widest">Image Preview</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 space-y-2">
                    <label className="text-[10px] text-neutral-500 uppercase font-black tracking-widest ml-1">Product Title</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Saffron Infused Honey"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-amber-500/50 shadow-inner transition-colors"
                      value={formValues.name}
                      onChange={e => setFormValues({...formValues, name: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] text-neutral-500 uppercase font-black tracking-widest ml-1">Category</label>
                    <div className="relative">
                      <select 
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-amber-500/50 shadow-inner appearance-none cursor-pointer"
                        value={formValues.category}
                        onChange={e => setFormValues({...formValues, category: e.target.value})}
                      >
                        {CATEGORIES.map(c => <option key={c.id} value={c.name} className="bg-neutral-900">{c.name}</option>)}
                      </select>
                      <i className="fa-solid fa-chevron-down absolute right-4 top-1/2 -translate-y-1/2 text-neutral-600 pointer-events-none"></i>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] text-neutral-500 uppercase font-black tracking-widest ml-1">Weight/Pack</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 250g"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-amber-500/50 shadow-inner transition-colors"
                      value={formValues.weight}
                      onChange={e => setFormValues({...formValues, weight: e.target.value})}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] text-neutral-500 uppercase font-black tracking-widest ml-1">Selling Price (₹)</label>
                    <input 
                      type="number" 
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-2xl p-4 text-sm text-amber-500 font-bold focus:outline-none focus:border-amber-500 shadow-inner transition-colors"
                      value={formValues.price || ''}
                      onChange={e => setFormValues({...formValues, price: Number(e.target.value)})}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] text-neutral-500 uppercase font-black tracking-widest ml-1">Original Price (₹)</label>
                    <input 
                      type="number" 
                      placeholder="Optional"
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-2xl p-4 text-sm text-neutral-400 focus:outline-none focus:border-neutral-700 shadow-inner transition-colors"
                      value={formValues.originalPrice || ''}
                      onChange={e => setFormValues({...formValues, originalPrice: Number(e.target.value)})}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] text-neutral-500 uppercase font-black tracking-widest ml-1">Inventory Level</label>
                    <input 
                      type="number" 
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-emerald-500/50 shadow-inner transition-colors"
                      value={formValues.stock || ''}
                      onChange={e => setFormValues({...formValues, stock: Number(e.target.value)})}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[10px] text-neutral-500 uppercase font-black tracking-widest ml-1">Status Color</label>
                    <div className="flex h-[54px] bg-neutral-950 border border-neutral-800 rounded-2xl items-center justify-center">
                       <div className={`w-4 h-4 rounded-full ${(formValues.stock || 0) < 10 ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]'}`}></div>
                    </div>
                  </div>

                  <div className="col-span-2 space-y-2">
                    <label className="text-[10px] text-neutral-500 uppercase font-black tracking-widest ml-1">Image URL</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        placeholder="Link to high-quality image"
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-2xl p-4 text-[11px] text-neutral-400 focus:outline-none focus:border-amber-500/30 pr-12 shadow-inner"
                        value={formValues.image}
                        onChange={e => setFormValues({...formValues, image: e.target.value})}
                      />
                      <button 
                        onClick={() => setFormValues({...formValues, image: `https://picsum.photos/seed/${Math.random()}/400/400`})}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-600 hover:text-amber-500"
                        title="Randomize Image"
                      >
                        <i className="fa-solid fa-wand-magic-sparkles"></i>
                      </button>
                    </div>
                  </div>

                  <div className="col-span-2 space-y-2">
                    <label className="text-[10px] text-neutral-500 uppercase font-black tracking-widest ml-1">Product Story (Description)</label>
                    <textarea 
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-2xl p-4 text-sm text-white focus:outline-none focus:border-amber-500/50 shadow-inner min-h-[100px] transition-colors"
                      placeholder="Describe the premium qualities of this product..."
                      value={formValues.description}
                      onChange={e => setFormValues({...formValues, description: e.target.value})}
                    />
                  </div>
                </div>

                <div className="flex gap-4 pt-4 sticky bottom-0 bg-neutral-900 pb-2">
                  <button 
                    onClick={closeEditor}
                    className="flex-1 bg-neutral-800 text-neutral-400 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest border border-neutral-700 hover:bg-neutral-700 hover:text-white transition-all"
                  >
                    Discard
                  </button>
                  <button 
                    onClick={handleSaveProduct}
                    className="flex-[2] bg-gradient-to-r from-amber-500 to-amber-600 text-neutral-900 py-4 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] shadow-xl shadow-amber-500/10 active:scale-95 transition-all"
                  >
                    Commit Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
