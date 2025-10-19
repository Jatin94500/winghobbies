# Wings Hobbies Backend API

Backend server for Wings Hobbies RC E-commerce platform.

## Setup

```bash
cd src/backend
npm install
```

## Environment Variables

Create `.env` file:
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/wings-hobbies
JWT_SECRET=wings_hobbies_secret_key_2025
JWT_EXPIRE=7d
NODE_ENV=development
```

## Run Server

```bash
# Development
npm run dev

# Production
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/:id` - Update product (Admin)
- `DELETE /api/products/:id` - Delete product (Admin)

### Orders
- `POST /api/orders` - Create order
- `GET /api/orders` - Get user orders
- `GET /api/orders/:orderId` - Get order details

### Reviews
- `GET /api/products/:id/reviews` - Get product reviews
- `POST /api/products/:id/reviews` - Create review
- `POST /api/reviews/:id/helpful` - Mark review helpful

### Contact
- `POST /api/contact` - Submit contact form

## MongoDB Setup

Install MongoDB:
```bash
# Windows
# Download from https://www.mongodb.com/try/download/community

# Start MongoDB
mongod
```

## Test API

```bash
# Health check
curl http://localhost:5000/api/health
```
