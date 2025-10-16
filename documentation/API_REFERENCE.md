# API Reference

## Overview

This document outlines the API structure for Wing Hobbies. Currently, the application uses mock data, but this reference provides the expected API endpoints for future backend integration.

## Base URL

```
Development: http://localhost:5000/api
Production: https://api.Winghobbies.com/api
```

## Authentication

### Headers

```javascript
{
  'Content-Type': 'application/json',
  'Authorization': 'Bearer <token>'
}
```

### Token Storage

Store JWT token in httpOnly cookie or localStorage:

```javascript
localStorage.setItem('token', token);
```

## Endpoints

### Authentication

#### Register User

```http
POST /auth/register
```

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "phone": "9876543210"
}
```

**Response** (201):
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "9876543210"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

#### Login User

```http
POST /auth/login
```

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response** (200):
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

---

#### Get Current User

```http
GET /auth/me
```

**Headers**: Authorization required

**Response** (200):
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "9876543210",
    "avatar": "https://..."
  }
}
```

---

#### Update Profile

```http
PUT /auth/profile
```

**Headers**: Authorization required

**Request Body**:
```json
{
  "name": "Jane Doe",
  "phone": "9876543210",
  "avatar": "https://..."
}
```

**Response** (200):
```json
{
  "success": true,
  "message": "Profile updated successfully",
  "data": {
    "id": 1,
    "name": "Jane Doe",
    "email": "john@example.com",
    "phone": "9876543210"
  }
}
```

---

### Products

#### Get All Products

```http
GET /products
```

**Query Parameters**:
- `search` (string) - Search query
- `category` (string) - Category slug
- `minPrice` (number) - Minimum price
- `maxPrice` (number) - Maximum price
- `sort` (string) - Sort by (price-low, price-high, rating, discount)
- `page` (number) - Page number (default: 1)
- `limit` (number) - Items per page (default: 12)

**Example**:
```
GET /products?category=beginner-planes&sort=price-low&page=1&limit=12
```

**Response** (200):
```json
{
  "success": true,
  "data": {
    "products": [
      {
        "id": 1,
        "name": "WLtoys XK A280 P-51 Mustang",
        "price": 2999,
        "originalPrice": 3999,
        "discount": 25,
        "image": "https://...",
        "category": "beginner-planes",
        "rating": 4.5,
        "reviews": 128,
        "inStock": true,
        "badge": "Best Seller"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 12,
      "total": 50,
      "pages": 5
    }
  }
}
```

---

#### Get Single Product

```http
GET /products/:id
```

**Response** (200):
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "WLtoys XK A280 P-51 Mustang",
    "price": 2999,
    "originalPrice": 3999,
    "discount": 25,
    "image": "https://...",
    "category": "beginner-planes",
    "rating": 4.5,
    "reviews": 128,
    "inStock": true,
    "badge": "Best Seller",
    "description": "Ready-to-fly RC airplane...",
    "features": [
      "2.4GHz remote control",
      "3-channel control"
    ],
    "specifications": {
      "Wingpan": "280mm",
      "Length": "245mm",
      "Weight": "25g"
    },
    "productUrl": "https://..."
  }
}
```

---

#### Get Related Products

```http
GET /products/:id/related
```

**Response** (200):
```json
{
  "success": true,
  "data": [
    {
      "id": 2,
      "name": "Related Product",
      "price": 1999,
      "image": "https://..."
    }
  ]
}
```

---

### Categories

#### Get All Categories

```http
GET /categories
```

**Response** (200):
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Beginner Planes",
      "slug": "beginner-planes",
      "icon": "fa-plane",
      "description": "Easy-to-fly RC planes",
      "productCount": 15
    }
  ]
}
```

---

### Reviews

#### Get Product Reviews

```http
GET /products/:id/reviews
```

**Query Parameters**:
- `page` (number) - Page number
- `limit` (number) - Items per page
- `sort` (string) - Sort by (recent, helpful, rating)

**Response** (200):
```json
{
  "success": true,
  "data": {
    "reviews": [
      {
        "id": 1,
        "userId": 101,
        "userName": "Rajesh Kumar",
        "userAvatar": "https://...",
        "rating": 5,
        "title": "Perfect for beginners!",
        "comment": "This is my first RC plane...",
        "date": "2024-01-15T10:30:00.000Z",
        "verified": true,
        "helpful": 24
      }
    ],
    "summary": {
      "average": 4.5,
      "total": 128,
      "distribution": {
        "5": 45,
        "4": 30,
        "3": 15,
        "2": 7,
        "1": 3
      }
    }
  }
}
```

---

#### Create Review

```http
POST /products/:id/reviews
```

**Headers**: Authorization required

**Request Body**:
```json
{
  "rating": 5,
  "title": "Great product!",
  "comment": "I love this RC plane..."
}
```

**Response** (201):
```json
{
  "success": true,
  "message": "Review submitted successfully",
  "data": {
    "id": 1,
    "rating": 5,
    "title": "Great product!",
    "comment": "I love this RC plane...",
    "date": "2024-01-15T10:30:00.000Z"
  }
}
```

---

#### Mark Review Helpful

```http
POST /reviews/:id/helpful
```

**Headers**: Authorization required

**Response** (200):
```json
{
  "success": true,
  "message": "Marked as helpful",
  "data": {
    "helpful": 25
  }
}
```

---

### Cart

#### Get Cart

```http
GET /cart
```

**Headers**: Authorization required

**Response** (200):
```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": 1,
        "productId": 1,
        "name": "WLtoys XK A280",
        "price": 2999,
        "quantity": 2,
        "image": "https://...",
        "inStock": true
      }
    ],
    "summary": {
      "subtotal": 5998,
      "shipping": 0,
      "discount": 0,
      "total": 5998
    }
  }
}
```

---

#### Add to Cart

```http
POST /cart
```

**Headers**: Authorization required

**Request Body**:
```json
{
  "productId": 1,
  "quantity": 2
}
```

**Response** (200):
```json
{
  "success": true,
  "message": "Product added to cart",
  "data": {
    "cartItemId": 1,
    "quantity": 2
  }
}
```

---

#### Update Cart Item

```http
PUT /cart/:itemId
```

**Headers**: Authorization required

**Request Body**:
```json
{
  "quantity": 3
}
```

**Response** (200):
```json
{
  "success": true,
  "message": "Cart updated",
  "data": {
    "quantity": 3
  }
}
```

---

#### Remove from Cart

```http
DELETE /cart/:itemId
```

**Headers**: Authorization required

**Response** (200):
```json
{
  "success": true,
  "message": "Item removed from cart"
}
```

---

### Wishlist

#### Get Wishlist

```http
GET /wishlist
```

**Headers**: Authorization required

**Response** (200):
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "productId": 1,
      "name": "WLtoys XK A280",
      "price": 2999,
      "image": "https://...",
      "inStock": true
    }
  ]
}
```

---

#### Add to Wishlist

```http
POST /wishlist
```

**Headers**: Authorization required

**Request Body**:
```json
{
  "productId": 1
}
```

**Response** (200):
```json
{
  "success": true,
  "message": "Added to wishlist"
}
```

---

#### Remove from Wishlist

```http
DELETE /wishlist/:productId
```

**Headers**: Authorization required

**Response** (200):
```json
{
  "success": true,
  "message": "Removed from wishlist"
}
```

---

### Orders

#### Create Order

```http
POST /orders
```

**Headers**: Authorization required

**Request Body**:
```json
{
  "items": [
    {
      "productId": 1,
      "quantity": 2,
      "price": 2999
    }
  ],
  "shipping": {
    "name": "John Doe",
    "address": "123 Main Street",
    "city": "Lucknow",
    "state": "Uttar Pradesh",
    "pincode": "226001",
    "phone": "9876543210"
  },
  "payment": {
    "method": "cod"
  },
  "voucherCode": "WELCOME10"
}
```

**Response** (201):
```json
{
  "success": true,
  "message": "Order placed successfully",
  "data": {
    "orderId": "ORD-001",
    "total": 5398,
    "status": "pending"
  }
}
```

---

#### Get User Orders

```http
GET /orders
```

**Headers**: Authorization required

**Query Parameters**:
- `page` (number) - Page number
- `limit` (number) - Items per page
- `status` (string) - Filter by status

**Response** (200):
```json
{
  "success": true,
  "data": {
    "orders": [
      {
        "id": "ORD-001",
        "date": "2024-01-15T10:30:00.000Z",
        "status": "delivered",
        "total": 5398,
        "itemCount": 2
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 25,
      "pages": 3
    }
  }
}
```

---

#### Get Order Details

```http
GET /orders/:orderId
```

**Headers**: Authorization required

**Response** (200):
```json
{
  "success": true,
  "data": {
    "id": "ORD-001",
    "date": "2024-01-15T10:30:00.000Z",
    "status": "delivered",
    "items": [
      {
        "productId": 1,
        "name": "WLtoys XK A280",
        "price": 2999,
        "quantity": 2,
        "image": "https://..."
      }
    ],
    "shipping": {
      "name": "John Doe",
      "address": "123 Main Street",
      "city": "Lucknow",
      "state": "Uttar Pradesh",
      "pincode": "226001",
      "phone": "9876543210"
    },
    "payment": {
      "method": "cod",
      "status": "paid"
    },
    "summary": {
      "subtotal": 5998,
      "shipping": 0,
      "discount": 600,
      "total": 5398
    },
    "timeline": [
      {
        "status": "placed",
        "date": "2024-01-15T10:30:00.000Z"
      },
      {
        "status": "shipped",
        "date": "2024-01-16T14:20:00.000Z"
      },
      {
        "status": "delivered",
        "date": "2024-01-18T11:45:00.000Z"
      }
    ]
  }
}
```

---

### Vouchers

#### Validate Voucher

```http
POST /vouchers/validate
```

**Request Body**:
```json
{
  "code": "WELCOME10",
  "orderTotal": 5000
}
```

**Response** (200):
```json
{
  "success": true,
  "data": {
    "valid": true,
    "code": "WELCOME10",
    "type": "percentage",
    "value": 10,
    "discount": 500,
    "message": "10% discount applied"
  }
}
```

---

### Contact

#### Submit Contact Form

```http
POST /contact
```

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "subject": "Product Inquiry",
  "message": "I would like to know more about..."
}
```

**Response** (200):
```json
{
  "success": true,
  "message": "Message sent successfully"
}
```

---

## Error Responses

### Error Format

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable error message"
  }
}
```

### Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `500` - Internal Server Error

### Common Errors

**Validation Error** (422):
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": {
      "email": "Invalid email format",
      "password": "Password must be at least 8 characters"
    }
  }
}
```

**Authentication Error** (401):
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid credentials"
  }
}
```

**Not Found** (404):
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Product not found"
  }
}
```

---

## Rate Limiting

- **Limit**: 100 requests per 15 minutes
- **Header**: `X-RateLimit-Remaining`

**Response** (429):
```json
{
  "success": false,
  "error": {
    "code": "RATE_LIMIT_EXCEEDED",
    "message": "Too many requests. Please try again later."
  }
}
```

---

## Pagination

All list endpoints support pagination:

**Query Parameters**:
- `page` (number) - Page number (default: 1)
- `limit` (number) - Items per page (default: 10, max: 100)

**Response Headers**:
```
X-Total-Count: 250
X-Page: 1
X-Per-Page: 10
X-Total-Pages: 25
```

---

## Implementation Example

### Fetch Products

```javascript
const fetchProducts = async (filters = {}) => {
  const params = new URLSearchParams(filters);
  const response = await fetch(`/api/products?${params}`, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  
  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }
  
  return response.json();
};

// Usage
const data = await fetchProducts({
  category: 'beginner-planes',
  sort: 'price-low',
  page: 1
});
```

### Create Order

```javascript
const createOrder = async (orderData) => {
  const token = localStorage.getItem('token');
  
  const response = await fetch('/api/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(orderData)
  });
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error.message);
  }
  
  return response.json();
};
```

---

## WebSocket Events (Future)

### Real-time Order Updates

```javascript
const socket = io('wss://api.Winghobbies.com');

socket.on('order-update', (data) => {
  console.log('Order status:', data.status);
});
```

### Live Chat

```javascript
socket.emit('chat-message', {
  message: 'Hello, I need help'
});

socket.on('chat-response', (data) => {
  console.log('Response:', data.message);
});
```
