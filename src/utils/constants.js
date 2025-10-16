// Global constants for the application

export const API_ENDPOINTS = {
  PRODUCTS: '/products',
  ORDERS: '/orders',
  USERS: '/users',
  AUTH: {
    LOGIN: '/users/login',
    REGISTER: '/users/register'
  }
};

export const ORDER_STATUS = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled'
};

export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  FAILED: 'failed'
};

export const PRODUCT_CATEGORIES = {
  PLANES: 'planes',
  CONTROLLERS: 'controllers',
  BATTERIES: 'batteries',
  PARTS: 'parts'
};

export const USER_ROLES = {
  CUSTOMER: 'customer',
  ADMIN: 'admin'
};

export const CURRENCY = {
  SYMBOL: '$',
  CODE: 'USD'
};

export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 12,
  MAX_PAGE_SIZE: 50
};