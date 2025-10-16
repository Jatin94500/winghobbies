import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Mock login - replace with actual API call
    const mockUser = {
      id: 1,
      name: 'John Doe',
      email: email,
      phone: '+91 9876543210',
      avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=ffc107&color=000'
    };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    return { success: true };
  };

  const register = (name, email, password, phone) => {
    // Mock register - replace with actual API call
    const newUser = {
      id: Date.now(),
      name,
      email,
      phone,
      avatar: `https://ui-avatars.com/api/?name=${name.replace(' ', '+')}&background=ffc107&color=000`
    };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateProfile = (updatedData) => {
    const updatedUser = { ...user, ...updatedData };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
