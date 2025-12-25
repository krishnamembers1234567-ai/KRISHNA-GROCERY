
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  weight: string;
  stock: number;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  status: 'Pending' | 'Accepted' | 'Out for Delivery' | 'Delivered' | 'Cancelled';
  items: CartItem[];
  total: number;
  date: string;
  address: string;
}

export enum UserRole {
  CUSTOMER = 'customer',
  PARTNER = 'partner',
  ADMIN = 'admin'
}

export interface User {
  id: string;
  name: string;
  role: UserRole;
  phone: string;
  walletBalance: number;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}
