
import { Product, CartItem, Order, User, UserRole } from '../types';
import { MOCK_PRODUCTS } from '../constants';

type NotificationCallback = (title: string, body: string) => void;

/**
 * KRISHNA BACKEND SERVICE (Simulated)
 */
class KrishnaBackend {
  private products: Product[] = [];
  private orders: Order[] = [];
  private users: User[] = [];
  private transactions: any[] = [];
  private notificationListeners: NotificationCallback[] = [];
  private enabledPayments = {
    upi: true,
    card: true,
    cod: true,
    netbanking: true,
    wallet: true
  };

  constructor() {
    this.loadInitialData();
  }

  private loadInitialData() {
    const savedOrders = localStorage.getItem('krishna_orders');
    if (savedOrders) this.orders = JSON.parse(savedOrders);
    
    const savedPayments = localStorage.getItem('krishna_payments_config');
    if (savedPayments) this.enabledPayments = JSON.parse(savedPayments);

    const savedProducts = localStorage.getItem('krishna_products');
    if (savedProducts) {
      this.products = JSON.parse(savedProducts);
    } else {
      this.products = [...MOCK_PRODUCTS];
    }
  }

  private persist() {
    localStorage.setItem('krishna_orders', JSON.stringify(this.orders));
    localStorage.setItem('krishna_payments_config', JSON.stringify(this.enabledPayments));
    localStorage.setItem('krishna_products', JSON.stringify(this.products));
  }

  // --- NOTIFICATION APIs ---
  subscribeToNotifications(cb: NotificationCallback) {
    this.notificationListeners.push(cb);
    return () => {
      this.notificationListeners = this.notificationListeners.filter(l => l !== cb);
    };
  }

  private notify(title: string, body: string) {
    this.notificationListeners.forEach(l => l(title, body));
  }

  // --- PRODUCT APIs ---
  getProducts() { return this.products; }
  
  addProduct(product: Omit<Product, 'id'>) {
    const newProduct: Product = {
      ...product,
      id: `p_${Math.random().toString(36).substr(2, 9)}`
    };
    this.products.unshift(newProduct);
    this.persist();
    return newProduct;
  }

  deleteProduct(id: string) {
    this.products = this.products.filter(p => p.id !== id);
    this.persist();
  }

  updateProduct(id: string, updates: Partial<Product>) {
    this.products = this.products.map(p => p.id === id ? { ...p, ...updates } : p);
    this.persist();
  }

  // --- ORDER APIs ---
  placeOrder(user: User, items: CartItem[], total: number, paymentMethod: string): Order {
    items.forEach(item => {
      const prod = this.products.find(p => p.id === item.id);
      if (prod && prod.stock < item.quantity) {
        throw new Error(`Insufficient stock for ${prod.name}`);
      }
    });

    items.forEach(item => {
      this.updateProduct(item.id, { 
        stock: (this.products.find(p => p.id === item.id)?.stock || 0) - item.quantity 
      });
    });

    const newOrder: Order = {
      id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Pending',
      items: [...items],
      total,
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      address: 'Current selected address',
      // @ts-ignore
      paymentMethod,
      // @ts-ignore
      paymentStatus: paymentMethod === 'cod' ? 'Pending' : 'Success'
    };

    this.orders.push(newOrder);
    this.persist();
    
    this.notify("Order Confirmed!", `Your order ${newOrder.id} has been placed successfully.`);
    
    return newOrder;
  }

  getOrders() { return this.orders; }

  updateOrderStatus(orderId: string, status: Order['status']) {
    this.orders = this.orders.map(o => o.id === orderId ? { ...o, status } : o);
    this.persist();

    // Trigger Notifications for key status updates
    const messages: Record<string, string> = {
      'Accepted': 'Our merchant has accepted your order and is preparing it.',
      'Out for Delivery': 'Our delivery captain is on the way with your package!',
      'Delivered': 'Your order has been delivered. Enjoy your premium kirana!',
      'Cancelled': 'Your order has been cancelled.'
    };

    if (messages[status]) {
      this.notify(`Order Update: ${status}`, `Order ${orderId}: ${messages[status]}`);
    }
  }

  // --- WALLET & TRANSACTION APIs ---
  processTransaction(user: User, amount: number, type: 'credit' | 'debit', description: string) {
    if (type === 'debit') {
      user.walletBalance -= amount;
    } else {
      user.walletBalance += amount;
    }
    
    this.transactions.push({
      id: `TXN-${Math.floor(10000 + Math.random() * 90000)}`,
      userId: user.id,
      amount,
      type,
      description,
      date: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })
    });
    
    this.persist();
  }

  // --- PAYMENT CONFIG APIs ---
  getPaymentConfig() {
    return this.enabledPayments;
  }

  togglePaymentMethod(method: keyof typeof this.enabledPayments) {
    this.enabledPayments[method] = !this.enabledPayments[method];
    this.persist();
    return this.enabledPayments;
  }

  // --- ADMIN APIs ---
  getAnalytics() {
    const totalRevenue = this.orders
      .filter(o => o.status !== 'Cancelled')
      .reduce((sum, o) => sum + o.total, 0);
    
    return {
      revenue: totalRevenue,
      orderCount: this.orders.length,
      activePartners: 12,
      lowStockCount: this.products.filter(p => p.stock < 10).length,
      paymentConfig: this.enabledPayments
    };
  }
}

export const backend = new KrishnaBackend();
