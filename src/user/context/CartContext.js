import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

export const CartContext = createContext();

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch cart from backend on mount
  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      // Not logged in, use localStorage
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
      return;
    }

    try {
      const { data } = await axios.get(`${API_URL}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (data.success) {
        setCartItems(data.data.items || []);
      }
    } catch (error) {
      console.error('Failed to fetch cart:', error);
      // Fallback to localStorage
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    }
  };

  // Save to localStorage for non-logged-in users
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addToCart = async (product) => {
    const token = localStorage.getItem('token');
    const productId = product._id || product.id;

    if (!token) {
      // Not logged in, use localStorage
      setCartItems(prev => {
        const existing = prev.find(item => (item._id || item.id) === productId);
        if (existing) {
          return prev.map(item =>
            (item._id || item.id) === productId
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prev, { ...product, quantity: 1 }];
      });
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post(`${API_URL}/api/cart`, {
        productId,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (data.success) {
        setCartItems(data.data.items || []);
      }
    } catch (error) {
      console.error('Failed to add to cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    const token = localStorage.getItem('token');

    if (!token) {
      setCartItems(prev => prev.filter(item => (item._id || item.id || item.productId) !== productId));
      return;
    }

    try {
      setLoading(true);
      console.log('Removing product:', productId);
      const { data } = await axios.delete(`${API_URL}/api/cart/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      console.log('Remove response:', data);
      console.log('Cart items after delete:', data.data?.items);
      if (data.success) {
        // Force update cart items
        const newItems = data.data?.items || [];
        console.log('Setting cart to:', newItems);
        setCartItems(newItems);
      }
    } catch (error) {
      console.error('Failed to remove from cart:', error.response?.data || error);
    } finally {
      setLoading(false);
      // Refetch cart to ensure sync
      setTimeout(() => fetchCart(), 100);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const token = localStorage.getItem('token');

    if (!token) {
      setCartItems(prev =>
        prev.map(item =>
          (item._id || item.id || item.productId) === productId ? { ...item, quantity } : item
        )
      );
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.put(`${API_URL}/api/cart`, {
        productId,
        quantity
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (data.success) {
        setCartItems(data.data.items || []);
      }
    } catch (error) {
      console.error('Failed to update quantity:', error);
    } finally {
      setLoading(false);
    }
  };

  const clearCart = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setCartItems([]);
      return;
    }

    try {
      setLoading(true);
      await axios.delete(`${API_URL}/api/cart`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCartItems([]);
    } catch (error) {
      console.error('Failed to clear cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getCartTotal,
      getCartCount,
      loading,
      fetchCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for easier usage
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
