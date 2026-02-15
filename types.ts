
export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  description: string;
  coverImage: string;
  category: string;
  stock: number;
  rating: number;
}

export interface CartItem extends Book {
  quantity: number;
}

export interface ChatMessage {
  role: 'user' | 'model';
  content: string;
}

export enum View {
  SHOP = 'shop',
  ADMIN = 'admin',
  DETAILS = 'details'
}
