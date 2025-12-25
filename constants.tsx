
import React from 'react';
import { Product, Category } from './types';

export const COLORS = {
  GOLD: '#D4AF37',
  GOLD_LIGHT: '#F9E076',
  GREEN: '#006B3E',
  GREEN_LIGHT: '#2E8B57',
  DARK: '#171717',
  DARK_LIGHT: '#262626'
};

export const LOGO = (className: string = "w-12 h-12") => (
  <div className={`relative flex items-center justify-center ${className}`}>
    <div className="absolute inset-0 bg-emerald-700 rounded-full border-2 border-amber-400 shadow-lg shadow-amber-400/20"></div>
    <span className="relative z-10 brand-font text-amber-400 text-xl font-bold italic">K</span>
  </div>
);

export const CATEGORIES: Category[] = [
  { id: 'cat_atta', name: 'Atta & Flour', icon: 'fa-wheat-awn', color: 'bg-stone-800' },
  { id: 'cat_rice', name: 'Rice & Grains', icon: 'fa-bowl-rice', color: 'bg-neutral-800' },
  { id: 'cat_dal', name: 'Dal & Pulses', icon: 'fa-seedling', color: 'bg-emerald-900' },
  { id: 'cat_spices', name: 'Spices & Masale', icon: 'fa-pepper-hot', color: 'bg-amber-900' },
  { id: 'cat_oil', name: 'Oil & Ghee', icon: 'fa-droplet', color: 'bg-yellow-700' },
  { id: 'cat_snacks', name: 'Snacks & Namkeen', icon: 'fa-cookie', color: 'bg-orange-900' },
  { id: 'cat_beverages', name: 'Beverages', icon: 'fa-mug-hot', color: 'bg-blue-900' },
  { id: 'cat_sweets', name: 'Sweets & Sugar', icon: 'fa-candy-cane', color: 'bg-pink-900' },
  { id: 'cat_personal', name: 'Personal Care', icon: 'fa-pump-soap', color: 'bg-teal-900' },
  { id: 'cat_cleaning', name: 'Cleaning & Home', icon: 'fa-spray-can-sparkles', color: 'bg-indigo-900' },
  { id: 'cat_instant', name: 'Instant Food', icon: 'fa-bowl-food', color: 'bg-red-900' },
  { id: 'cat_fruits', name: 'Fruits & Veg', icon: 'fa-carrot', color: 'bg-green-900' },
];

export const MOCK_PRODUCTS: Product[] = [
  // 🌾 A. ATTA / FLOUR
  { id: 'a1', name: 'Premium Wheat Atta', category: 'Atta & Flour', price: 215, originalPrice: 240, image: 'https://picsum.photos/seed/atta_wheat/400/400', weight: '5kg', stock: 100, description: 'Freshly ground premium wheat flour for the softest rotis.' },
  { id: 'a2', name: 'Multigrain Atta', category: 'Atta & Flour', price: 295, originalPrice: 320, image: 'https://picsum.photos/seed/atta_multi/400/400', weight: '5kg', stock: 50, description: 'Power-packed 7-grain atta for enhanced nutrition.' },
  { id: 'a3', name: 'Refined Maida', category: 'Atta & Flour', price: 45, originalPrice: 55, image: 'https://picsum.photos/seed/maida_p/400/400', weight: '1kg', stock: 200, description: 'Ultra-fine refined flour for perfect baking results.' },
  { id: 'a4', name: 'Suji (Rava)', category: 'Atta & Flour', price: 55, originalPrice: 65, image: 'https://picsum.photos/seed/suji_p/400/400', weight: '1kg', stock: 150, description: 'Premium quality semolina for light and fluffy Upma.' },
  { id: 'a5', name: 'Fine Besan', category: 'Atta & Flour', price: 95, originalPrice: 110, image: 'https://picsum.photos/seed/besan_p/400/400', weight: '1kg', stock: 120, description: 'Pure chana dal flour for crispy snacks and sweets.' },
  { id: 'a6', name: 'Rice Flour', category: 'Atta & Flour', price: 65, originalPrice: 75, image: 'https://picsum.photos/seed/riceflour_p/400/400', weight: '1kg', stock: 80, description: 'Finely ground rice for perfect Appams and Dosas.' },
  { id: 'a7', name: 'Corn Flour', category: 'Atta & Flour', price: 45, originalPrice: 55, image: 'https://picsum.photos/seed/cornflour_p/400/400', weight: '500g', stock: 110, description: 'Pure white corn flour for thickening and frying.' },
  { id: 'a8', name: 'Bajra Atta', category: 'Atta & Flour', price: 85, originalPrice: 95, image: 'https://picsum.photos/seed/bajra_p/400/400', weight: '1kg', stock: 60, description: 'Rich in fiber pearl millet flour for winter specialties.' },
  { id: 'a9', name: 'Jowar Atta', category: 'Atta & Flour', price: 105, originalPrice: 120, image: 'https://picsum.photos/seed/jowar_p/400/400', weight: '1kg', stock: 55, description: 'Gluten-free sorghum flour for healthy and tasty rotis.' },

  // 🍚 B. RICE
  { id: 'b1', name: 'XL Basmati Rice', category: 'Rice & Grains', price: 185, originalPrice: 220, image: 'https://picsum.photos/seed/rice_basmati/400/400', weight: '1kg', stock: 200, description: 'Extra-long grain aromatic basmati rice.' },
  { id: 'b2', name: 'Sona Masoori Rice', category: 'Rice & Grains', price: 320, originalPrice: 360, image: 'https://picsum.photos/seed/rice_sona/400/400', weight: '5kg', stock: 150, description: 'Premium medium grain rice for daily meals.' },
  { id: 'b3', name: 'Kolam Rice', category: 'Rice & Grains', price: 85, originalPrice: 95, image: 'https://picsum.photos/seed/rice_kolam/400/400', weight: '1kg', stock: 180, description: 'Short grain daily-use rice, easy to digest.' },
  { id: 'b4', name: 'Health Brown Rice', category: 'Rice & Grains', price: 145, originalPrice: 170, image: 'https://picsum.photos/seed/rice_brown/400/400', weight: '1kg', stock: 90, description: 'Fiber-rich unpolished rice for health-conscious meals.' },
  { id: 'b5', name: 'Thin Poha', category: 'Rice & Grains', price: 58, originalPrice: 65, image: 'https://picsum.photos/seed/rice_poha/400/400', weight: '1kg', stock: 130, description: 'Finest quality beaten rice for a perfect breakfast.' },
  { id: 'b6', name: 'Idli Rice', category: 'Rice & Grains', price: 72, originalPrice: 85, image: 'https://picsum.photos/seed/rice_idli/400/400', weight: '1kg', stock: 140, description: 'Special short grain rice for softest idlis.' },
  { id: 'b7', name: 'Sticky Rice', category: 'Rice & Grains', price: 110, originalPrice: 130, image: 'https://picsum.photos/seed/rice_sticky/400/400', weight: '1kg', stock: 40, description: 'Glutinous rice for exotic Thai and Oriental dishes.' },

  // 🫘 C. DAL & PULSES
  { id: 'c1', name: 'Unpolished Toor Dal', category: 'Dal & Pulses', price: 165, originalPrice: 185, image: 'https://picsum.photos/seed/dal_toor/400/400', weight: '1kg', stock: 120, description: 'Superior quality pigeon peas with high protein.' },
  { id: 'c2', name: 'Moong Dal (Yellow)', category: 'Dal & Pulses', price: 142, originalPrice: 160, image: 'https://picsum.photos/seed/dal_moong/400/400', weight: '1kg', stock: 150, description: 'Split yellow moong dal for light and healthy meals.' },
  { id: 'c3', name: 'Masoor Dal (Red)', category: 'Dal & Pulses', price: 105, originalPrice: 125, image: 'https://picsum.photos/seed/dal_masoor/400/400', weight: '1kg', stock: 160, description: 'Rich in iron red lentils, cooks quickly.' },
  { id: 'c4', name: 'Chana Dal', category: 'Dal & Pulses', price: 95, originalPrice: 110, image: 'https://picsum.photos/seed/dal_chana/400/400', weight: '1kg', stock: 180, description: 'Nutritious split chickpeas for dal and snacks.' },
  { id: 'c5', name: 'Urad Dal (Split)', category: 'Dal & Pulses', price: 148, originalPrice: 165, image: 'https://picsum.photos/seed/dal_urad/400/400', weight: '1kg', stock: 110, description: 'Essential for making perfectly fluffy Vadas and Dosas.' },
  { id: 'c6', name: 'Kashmiri Rajma', category: 'Dal & Pulses', price: 162, originalPrice: 190, image: 'https://picsum.photos/seed/dal_rajma/400/400', weight: '1kg', stock: 85, description: 'Small sized red kidney beans from the hills of Kashmir.' },
  { id: 'c7', name: 'Kabuli Chana', category: 'Dal & Pulses', price: 142, originalPrice: 170, image: 'https://picsum.photos/seed/dal_kabuli/400/400', weight: '1kg', stock: 95, description: 'Large chickpeas perfect for Chole Bhature.' },
  { id: 'c8', name: 'Kala Chana', category: 'Dal & Pulses', price: 92, originalPrice: 105, image: 'https://picsum.photos/seed/dal_kalachana/400/400', weight: '1kg', stock: 200, description: 'High-protein black chickpeas for healthy salads.' },
  { id: 'c9', name: 'Dried Green Peas', category: 'Dal & Pulses', price: 110, originalPrice: 130, image: 'https://picsum.photos/seed/dal_greenpeas/400/400', weight: '1kg', stock: 75, description: 'Premium dried peas for Matar Paneer and Ragda.' },

  // 🧂 D. SPICES (MASALE)
  { id: 'd1', name: 'Turmeric Powder', category: 'Spices & Masale', price: 68, originalPrice: 80, image: 'https://picsum.photos/seed/spice_haldi/400/400', weight: '200g', stock: 300, description: 'High curcumin content turmeric for health and color.' },
  { id: 'd2', name: 'Red Chilli Powder', category: 'Spices & Masale', price: 92, originalPrice: 115, image: 'https://picsum.photos/seed/spice_mirch/400/400', weight: '200g', stock: 250, description: 'Authentic spicy red chilli powder for bold flavors.' },
  { id: 'd3', name: 'Coriander Powder', category: 'Spices & Masale', price: 62, originalPrice: 75, image: 'https://picsum.photos/seed/spice_dhaniya/400/400', weight: '200g', stock: 280, description: 'Aromatic coriander powder made from selected seeds.' },
  { id: 'd4', name: 'Garam Masala', category: 'Spices & Masale', price: 85, originalPrice: 100, image: 'https://picsum.photos/seed/spice_garam/400/400', weight: '100g', stock: 150, description: 'Hand-crafted blend of premium whole spices.' },
  { id: 'd5', name: 'Cumin Seeds (Jeera)', category: 'Spices & Masale', price: 142, originalPrice: 170, image: 'https://picsum.photos/seed/spice_jeera/400/400', weight: '200g', stock: 190, description: 'Strong aroma cumin seeds for perfect tempering.' },
  { id: 'd6', name: 'Mustard Seeds', category: 'Spices & Masale', price: 42, originalPrice: 55, image: 'https://picsum.photos/seed/spice_rai/400/400', weight: '200g', stock: 220, description: 'Premium black mustard seeds for South Indian tadka.' },
  { id: 'd7', name: 'Black Pepper', category: 'Spices & Masale', price: 115, originalPrice: 140, image: 'https://picsum.photos/seed/spice_pepper/400/400', weight: '100g', stock: 110, description: 'Pungent whole black peppercorns for bold spice.' },
  { id: 'd8', name: 'Green Cardamom', category: 'Spices & Masale', price: 245, originalPrice: 280, image: 'https://picsum.photos/seed/spice_cardamom/400/400', weight: '50g', stock: 60, description: 'Fragrant green elaichi for tea and desserts.' },
  { id: 'd9', name: 'Whole Cloves', category: 'Spices & Masale', price: 82, originalPrice: 105, image: 'https://picsum.photos/seed/spice_cloves/400/400', weight: '50g', stock: 80, description: 'Powerful aromatic cloves for biryani and curries.' },
  { id: 'd10', name: 'Cinnamon Bark', category: 'Spices & Masale', price: 68, originalPrice: 85, image: 'https://picsum.photos/seed/spice_cinnamon/400/400', weight: '50g', stock: 95, description: 'Sweet and woody dalchini sticks.' },
  { id: 'd11', name: 'Strong Hing', category: 'Spices & Masale', price: 110, originalPrice: 130, image: 'https://picsum.photos/seed/spice_hing/400/400', weight: '50g', stock: 140, description: 'Potent asafoetida for authentic Indian digestion aid.' },
  { id: 'd12', name: 'Tangy Chaat Masala', category: 'Spices & Masale', price: 58, originalPrice: 70, image: 'https://picsum.photos/seed/spice_chaat/400/400', weight: '100g', stock: 160, description: 'Zesty spice mix for fruits and snacks.' },

  // 🛢️ E. OIL & GHEE
  { id: 'e1', name: 'Kachi Ghani Mustard Oil', category: 'Oil & Ghee', price: 185, originalPrice: 210, image: 'https://picsum.photos/seed/oil_mustard/400/400', weight: '1L', stock: 100, description: 'Pure cold-pressed mustard oil with sharp aroma.' },
  { id: 'e2', name: 'Refined Sunflower Oil', category: 'Oil & Ghee', price: 162, originalPrice: 185, image: 'https://picsum.photos/seed/oil_sun/400/400', weight: '1L', stock: 200, description: 'Light and healthy sunflower oil for daily frying.' },
  { id: 'e3', name: 'Soybean Cooking Oil', category: 'Oil & Ghee', price: 148, originalPrice: 170, image: 'https://picsum.photos/seed/oil_soy/400/400', weight: '1L', stock: 180, description: 'Rich in omega-3 refined soybean oil.' },
  { id: 'e4', name: 'Pure Groundnut Oil', category: 'Oil & Ghee', price: 205, originalPrice: 235, image: 'https://picsum.photos/seed/oil_nut/400/400', weight: '1L', stock: 90, description: 'Nutty flavored peanut oil for traditional recipes.' },
  { id: 'e5', name: 'Pure Coconut Oil', category: 'Oil & Ghee', price: 235, originalPrice: 270, image: 'https://picsum.photos/seed/oil_coconut/400/400', weight: '500ml', stock: 120, description: '100% pure edible coconut oil.' },
  { id: 'e6', name: 'Extra Virgin Olive Oil', category: 'Oil & Ghee', price: 950, originalPrice: 1200, image: 'https://picsum.photos/seed/oil_olive/400/400', weight: '1L', stock: 45, description: 'Premium first-press olive oil for healthy dressing.' },
  { id: 'e7', name: 'Pure Desi Ghee', category: 'Oil & Ghee', price: 685, originalPrice: 740, image: 'https://picsum.photos/seed/ghee_desi/400/400', weight: '1L', stock: 70, description: 'Granular and aromatic pure cow ghee.' },
  { id: 'e8', name: 'Vanaspati Ghee', category: 'Oil & Ghee', price: 135, originalPrice: 155, image: 'https://picsum.photos/seed/vanaspati_p/400/400', weight: '1L', stock: 110, description: 'High quality vegetable shortening.' },

  // 🍪 F. SNACKS & NAMKEEN
  { id: 'f1', name: 'Marie Biscuits', category: 'Snacks & Namkeen', price: 35, originalPrice: 40, image: 'https://picsum.photos/seed/snack_marie/400/400', weight: '250g', stock: 300, description: 'Classic tea-time biscuits.' },
  { id: 'f2', name: 'Choco Cookies', category: 'Snacks & Namkeen', price: 125, originalPrice: 150, image: 'https://picsum.photos/seed/snack_cookies/400/400', weight: '300g', stock: 120, description: 'Rich chocolate chip buttery cookies.' },
  { id: 'f3', name: 'Aloo Bhujia', category: 'Snacks & Namkeen', price: 48, originalPrice: 60, image: 'https://picsum.photos/seed/snack_bhujia/400/400', weight: '200g', stock: 400, description: 'Crunchy potato noodles snack.' },
  { id: 'f4', name: 'Classic Salted Chips', category: 'Snacks & Namkeen', price: 20, originalPrice: 25, image: 'https://picsum.photos/seed/snack_chips/400/400', weight: '50g', stock: 500, description: 'Crispy golden potato chips.' },
  { id: 'f5', name: 'Masala Kurkure', category: 'Snacks & Namkeen', price: 20, originalPrice: 25, image: 'https://picsum.photos/seed/snack_kurkure/400/400', weight: '75g', stock: 450, description: 'Twisted crunchy masala snack.' },
  { id: 'f6', name: 'Navratan Mixture', category: 'Snacks & Namkeen', price: 105, originalPrice: 120, image: 'https://picsum.photos/seed/snack_mixture/400/400', weight: '400g', stock: 200, description: 'Premium Indian savory mix.' },
  { id: 'f7', name: 'Salted Moong Dal', category: 'Snacks & Namkeen', price: 42, originalPrice: 50, image: 'https://picsum.photos/seed/snack_moong/400/400', weight: '150g', stock: 300, description: 'Crunchy salted fried moong lentils.' },
  { id: 'f8', name: 'Caramel Popcorn', category: 'Snacks & Namkeen', price: 145, originalPrice: 180, image: 'https://picsum.photos/seed/snack_popcorn/400/400', weight: '150g', stock: 80, description: 'Sweet and crunchy movie-style popcorn.' },
  { id: 'f9', name: 'Urad Dal Papad', category: 'Snacks & Namkeen', price: 78, originalPrice: 95, image: 'https://picsum.photos/seed/snack_papad/400/400', weight: '200g', stock: 250, description: 'Crispy sun-dried spiced papads.' },

  // 🧃 G. BEVERAGES
  { id: 'g1', name: 'Strong Assam Tea', category: 'Beverages', price: 285, originalPrice: 320, image: 'https://picsum.photos/seed/bev_tea/400/400', weight: '500g', stock: 150, description: 'Robust CTC tea for a perfect milk tea.' },
  { id: 'g2', name: 'Classic Instant Coffee', category: 'Beverages', price: 345, originalPrice: 390, image: 'https://picsum.photos/seed/bev_coffee/400/400', weight: '100g', stock: 120, description: 'Pure coffee powder for a morning kick.' },
  { id: 'g3', name: 'Organic Green Tea', category: 'Beverages', price: 165, originalPrice: 195, image: 'https://picsum.photos/seed/bev_greentea/400/400', weight: '25 bags', stock: 90, description: 'High-antioxidant green tea bags.' },
  { id: 'g4', name: 'Litre Cola', category: 'Beverages', price: 95, originalPrice: 110, image: 'https://picsum.photos/seed/bev_soft/400/400', weight: '2L', stock: 300, description: 'Chilled refreshing cola drink.' },
  { id: 'g5', name: 'Real Orange Juice', category: 'Beverages', price: 115, originalPrice: 135, image: 'https://picsum.photos/seed/bev_juice/400/400', weight: '1L', stock: 200, description: '100% fruit juice, no added sugar.' },
  { id: 'g6', name: 'Energy Rush Drink', category: 'Beverages', price: 110, originalPrice: 125, image: 'https://picsum.photos/seed/bev_energy/400/400', weight: '250ml', stock: 180, description: 'Revitalize your body and mind.' },
  { id: 'g7', name: 'Chocolate Milk Powder', category: 'Beverages', price: 235, originalPrice: 270, image: 'https://picsum.photos/seed/bev_shake/400/400', weight: '500g', stock: 100, description: 'Rich chocolate flavor for kids milk.' },

  // 🍫 H. SWEETS & CHOCOLATES
  { id: 'h1', name: 'Milk Chocolate Bar', category: 'Sweets & Sugar', price: 75, originalPrice: 85, image: 'https://picsum.photos/seed/sweet_choco/400/400', weight: '60g', stock: 200, description: 'Smooth and creamy premium chocolate.' },
  { id: 'h2', name: 'Assorted Fruit Toffees', category: 'Sweets & Sugar', price: 95, originalPrice: 120, image: 'https://picsum.photos/seed/sweet_toffee/400/400', weight: '250g', stock: 150, description: 'Mixed flavor chewy fruit candies.' },
  { id: 'h3', name: 'Sweet Gummy Candy', category: 'Sweets & Sugar', price: 145, originalPrice: 180, image: 'https://picsum.photos/seed/sweet_candy/400/400', weight: '500g', stock: 100, description: 'Fun and colorful gummy treats.' },
  { id: 'h4', name: 'Packed Gulab Jamun', category: 'Sweets & Sugar', price: 165, originalPrice: 195, image: 'https://picsum.photos/seed/sweet_indi/400/400', weight: '500g', stock: 80, description: 'Soft and spongy sweet balls in syrup.' },
  { id: 'h5', name: 'Organic Jaggery', category: 'Sweets & Sugar', price: 82, originalPrice: 105, image: 'https://picsum.photos/seed/sweet_jaggery/400/400', weight: '1kg', stock: 120, description: 'Pure sugarcane jaggery without chemicals.' },
  { id: 'h6', name: 'White Sugar', category: 'Sweets & Sugar', price: 48, originalPrice: 55, image: 'https://picsum.photos/seed/sweet_sugar/400/400', weight: '1kg', stock: 1000, description: 'Crystal white high-grade sugar.' },
  { id: 'h7', name: 'Sugar Mishri', category: 'Sweets & Sugar', price: 38, originalPrice: 50, image: 'https://picsum.photos/seed/sweet_mishri/400/400', weight: '200g', stock: 160, description: 'Traditional candy sugar crystals.' },

  // 🧴 I. PERSONAL CARE
  { id: 'i1', name: 'Moisturizing Soap', category: 'Personal Care', price: 135, originalPrice: 160, image: 'https://picsum.photos/seed/pc_soap/400/400', weight: '3x100g', stock: 200, description: 'Gentle on skin beauty bars.' },
  { id: 'i2', name: 'Anti-Dandruff Shampoo', category: 'Personal Care', price: 315, originalPrice: 380, image: 'https://picsum.photos/seed/pc_shampoo/400/400', weight: '340ml', stock: 140, description: 'Scalp care for healthy hair.' },
  { id: 'i3', name: 'Pure Coconut Hair Oil', category: 'Personal Care', price: 165, originalPrice: 190, image: 'https://picsum.photos/seed/pc_hairoil/400/400', weight: '200ml', stock: 180, description: 'Deep nourishment for your hair.' },
  { id: 'i4', name: 'Whitening Toothpaste', category: 'Personal Care', price: 105, originalPrice: 130, image: 'https://picsum.photos/seed/pc_paste/400/400', weight: '200g', stock: 220, description: 'Strong teeth and fresh breath.' },
  { id: 'i5', name: 'Soft Toothbrush', category: 'Personal Care', price: 45, originalPrice: 60, image: 'https://picsum.photos/seed/pc_brush/400/400', weight: '1pc', stock: 300, description: 'Ergonomic handle and soft bristles.' },
  { id: 'i6', name: 'Charcoal Face Wash', category: 'Personal Care', price: 175, originalPrice: 210, image: 'https://picsum.photos/seed/pc_facewash/400/400', weight: '100ml', stock: 110, description: 'Deep pore cleansing for men and women.' },
  { id: 'i7', name: 'Fairness Cream', category: 'Personal Care', price: 120, originalPrice: 150, image: 'https://picsum.photos/seed/pc_cream/400/400', weight: '50g', stock: 130, description: 'Daily glow moisturizing cream.' },
  { id: 'i8', name: 'Safety Razor Kit', category: 'Personal Care', price: 245, originalPrice: 290, image: 'https://picsum.photos/seed/pc_razor/400/400', weight: '1 set', stock: 80, description: 'Precision shaving for smooth skin.' },
  { id: 'i9', name: 'Cotton Sanitary Pads', category: 'Personal Care', price: 185, originalPrice: 220, image: 'https://picsum.photos/seed/pc_pads/400/400', weight: '15 pcs', stock: 150, description: 'Ultra-absorbent soft cotton pads.' },

  // 🧽 J. HOUSEHOLD & CLEANING
  { id: 'j1', name: 'Power Detergent Powder', category: 'Cleaning & Home', price: 165, originalPrice: 190, image: 'https://picsum.photos/seed/clean_det_p/400/400', weight: '1kg', stock: 250, description: 'Removes tough stains in one wash.' },
  { id: 'j2', name: 'Liquid Detergent', category: 'Cleaning & Home', price: 210, originalPrice: 250, image: 'https://picsum.photos/seed/clean_det_l/400/400', weight: '1L', stock: 180, description: 'Gentle on clothes liquid wash.' },
  { id: 'j3', name: 'Lemon Dishwash Bar', category: 'Cleaning & Home', price: 10, originalPrice: 12, image: 'https://picsum.photos/seed/clean_dish_b/400/400', weight: '150g', stock: 1000, description: 'Grease-cutting lemon bar.' },
  { id: 'j4', name: 'Dishwash Gel', category: 'Cleaning & Home', price: 105, originalPrice: 125, image: 'https://picsum.photos/seed/clean_dish_l/400/400', weight: '500ml', stock: 200, description: 'Concentrated gel for sparkling dishes.' },
  { id: 'j5', name: 'Pine Floor Cleaner', category: 'Cleaning & Home', price: 175, originalPrice: 200, image: 'https://picsum.photos/seed/clean_floor/400/400', weight: '1L', stock: 160, description: 'Disinfectant for all floor types.' },
  { id: 'j6', name: 'Toilet Cleaner Plus', category: 'Cleaning & Home', price: 165, originalPrice: 195, image: 'https://picsum.photos/seed/clean_toilet/400/400', weight: '1L', stock: 140, description: '99.9% germ-killing thick liquid.' },
  { id: 'j7', name: 'Disinfectant Phenyl', category: 'Cleaning & Home', price: 55, originalPrice: 75, image: 'https://picsum.photos/seed/clean_phenyl/400/400', weight: '1L', stock: 120, description: 'Powerful home floor sanitizer.' },
  { id: 'j8', name: 'Utensil Scrubber', category: 'Cleaning & Home', price: 25, originalPrice: 35, image: 'https://picsum.photos/seed/clean_scrub/400/400', weight: '1pc', stock: 500, description: 'Long-lasting abrasive scrubber.' },
  { id: 'j9', name: 'Eco Garbage Bags', category: 'Cleaning & Home', price: 115, originalPrice: 145, image: 'https://picsum.photos/seed/clean_bags/400/400', weight: '30 pcs', stock: 190, description: 'Strong and leak-proof bin liners.' },

  // 🥫 K. PACKAGED & INSTANT FOOD
  { id: 'k1', name: 'Spicy Instant Noodles', category: 'Instant Food', price: 135, originalPrice: 160, image: 'https://picsum.photos/seed/ins_noodles/400/400', weight: '560g Pack', stock: 350, description: 'Favorite 2-minute masala snack.' },
  { id: 'k2', name: 'Penne Pasta', category: 'Instant Food', price: 110, originalPrice: 140, image: 'https://picsum.photos/seed/ins_pasta/400/400', weight: '500g', stock: 140, description: 'Italian durum wheat pasta.' },
  { id: 'k3', name: 'Cheese Macaroni', category: 'Instant Food', price: 95, originalPrice: 120, image: 'https://picsum.photos/seed/ins_macaroni/400/400', weight: '500g', stock: 130, description: 'Creamy elbow macaroni snack.' },
  { id: 'k4', name: 'Dal Tadka Ready Meal', category: 'Instant Food', price: 125, originalPrice: 150, image: 'https://picsum.photos/seed/ins_ready/400/400', weight: '250g', stock: 90, description: 'Heat and eat homestyle dal.' },
  { id: 'k5', name: 'Mixed Vegetable Soup', category: 'Instant Food', price: 65, originalPrice: 80, image: 'https://picsum.photos/seed/ins_soup/400/400', weight: '100g', stock: 180, description: 'Warm and healthy instant soup.' },
  { id: 'k6', name: 'Rolled Oats', category: 'Instant Food', price: 195, originalPrice: 230, image: 'https://picsum.photos/seed/ins_oats/400/400', weight: '1kg', stock: 110, description: 'Whole grain breakfast oats.' },
  { id: 'k7', name: 'Crunchy Cornflakes', category: 'Instant Food', price: 175, originalPrice: 210, image: 'https://picsum.photos/seed/ins_flakes/400/400', weight: '500g', stock: 150, description: 'Golden iron-rich cereal flakes.' },

  // 🥕 L. FRUITS & VEGETABLES
  { id: 'l1', name: 'Organic Potatoes', category: 'Fruits & Veg', price: 35, originalPrice: 45, image: 'https://picsum.photos/seed/veg_potato/400/400', weight: '1kg', stock: 1000, description: 'Freshly harvested large potatoes.' },
  { id: 'l2', name: 'Red Onions', category: 'Fruits & Veg', price: 42, originalPrice: 55, image: 'https://picsum.photos/seed/veg_onion/400/400', weight: '1kg', stock: 1000, description: 'Pungent and crispy fresh onions.' },
  { id: 'l3', name: 'Vine Tomatoes', category: 'Fruits & Veg', price: 48, originalPrice: 65, image: 'https://picsum.photos/seed/veg_tomato/400/400', weight: '1kg', stock: 800, description: 'Juicy and firm red tomatoes.' },
  { id: 'l4', name: 'Orange Carrots', category: 'Fruits & Veg', price: 32, originalPrice: 40, image: 'https://picsum.photos/seed/veg_carrot/400/400', weight: '500g', stock: 400, description: 'Sweet and crunchy fresh gajar.' },
  { id: 'l5', name: 'Green Cabbage', category: 'Fruits & Veg', price: 28, originalPrice: 35, image: 'https://picsum.photos/seed/veg_cabbage/400/400', weight: '1pc', stock: 350, description: 'Fresh compact cabbage heads.' },
  { id: 'l6', name: 'White Cauliflower', category: 'Fruits & Veg', price: 45, originalPrice: 60, image: 'https://picsum.photos/seed/veg_cauli/400/400', weight: '1pc', stock: 300, description: 'Pure white fresh cauliflower heads.' },
  { id: 'l7', name: 'Shimla Apples', category: 'Fruits & Veg', price: 185, originalPrice: 230, image: 'https://picsum.photos/seed/veg_apple/400/400', weight: '1kg', stock: 200, description: 'Crisp and sweet Royal Gala apples.' },
  { id: 'l8', name: 'Banana Dozens', category: 'Fruits & Veg', price: 65, originalPrice: 80, image: 'https://picsum.photos/seed/veg_banana/400/400', weight: '12 pcs', stock: 500, description: 'Perfectly ripe yellow bananas.' },
  { id: 'l9', name: 'Nagpur Oranges', category: 'Fruits & Veg', price: 125, originalPrice: 155, image: 'https://picsum.photos/seed/veg_orange/400/400', weight: '1kg', stock: 300, description: 'Tangy and sweet Nagpur citrus.' },
  { id: 'l10', name: 'Seasonal Mangoes', category: 'Fruits & Veg', price: 245, originalPrice: 320, image: 'https://picsum.photos/seed/veg_mango/400/400', weight: '1kg', stock: 150, description: 'Aromatic Safeda mangoes (Seasonal).' },
];
