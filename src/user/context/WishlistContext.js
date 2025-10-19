import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const WishlistContext = createContext();
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) {
        setWishlistItems(JSON.parse(savedWishlist));
      }
      return;
    }

    try {
      const { data } = await axios.get(`${API_URL}/api/wishlist`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (data.success) {
        setWishlistItems(data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch wishlist:', error);
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) {
        setWishlistItems(JSON.parse(savedWishlist));
      }
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    }
  }, [wishlistItems]);

  const addToWishlist = async (product) => {
    const token = localStorage.getItem('token');
    const productId = product._id || product.id;

    if (!token) {
      setWishlistItems(prev => {
        const exists = prev.find(item => (item._id || item.id) === productId);
        if (exists) return prev;
        return [...prev, product];
      });
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.post(`${API_URL}/api/wishlist`, 
        { productId },
        { headers: { Authorization: `Bearer ${token}` }}
      );
      if (data.success) {
        setWishlistItems(data.data || []);
      }
    } catch (error) {
      console.error('Failed to add to wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const removeFromWishlist = async (productId) => {
    const token = localStorage.getItem('token');

    if (!token) {
      setWishlistItems(prev => prev.filter(item => (item._id || item.id) !== productId));
      return;
    }

    try {
      setLoading(true);
      const { data } = await axios.delete(`${API_URL}/api/wishlist/${productId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (data.success) {
        setWishlistItems(data.data || []);
      }
    } catch (error) {
      console.error('Failed to remove from wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => (item._id || item.id) === productId);
  };

  const clearWishlist = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      setWishlistItems([]);
      return;
    }

    try {
      setLoading(true);
      await axios.delete(`${API_URL}/api/wishlist`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setWishlistItems([]);
    } catch (error) {
      console.error('Failed to clear wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <WishlistContext.Provider value={{
      wishlistItems,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      clearWishlist,
      loading,
      fetchWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
};
