import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  description: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  date: string;
  status: 'confirmed' | 'processing' | 'shipped' | 'delivered';
}

interface StoreContextType {
  cart: CartItem[];
  orders: Order[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  createOrder: () => void;
  getCartTotal: () => number;
  getCartItemsCount: () => number;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  // Load cart and orders from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('trendyethnic-cart');
    const savedOrders = localStorage.getItem('trendyethnic-orders');
    
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('trendyethnic-cart', JSON.stringify(cart));
  }, [cart]);

  // Save orders to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('trendyethnic-orders', JSON.stringify(orders));
  }, [orders]);

  const addToCart = (product: Product) => {
    setCart(currentCart => {
      const existingItem = currentCart.find(item => item.id === product.id);
      if (existingItem) {
        return currentCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...currentCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(currentCart => currentCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(currentCart =>
      currentCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const createOrder = () => {
    if (cart.length === 0) return;
    
    const newOrder: Order = {
      id: `order-${Date.now()}`,
      items: [...cart],
      total: getCartTotal(),
      date: new Date().toISOString(),
      status: 'confirmed'
    };
    
    setOrders(currentOrders => [newOrder, ...currentOrders]);
    clearCart();
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemsCount = () => {
    return cart.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <StoreContext.Provider value={{
      cart,
      orders,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      createOrder,
      getCartTotal,
      getCartItemsCount
    }}>
      {children}
    </StoreContext.Provider>
  );
};