const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const path = require('path');

const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Prefer serving the production React `build` folder if it exists, otherwise
// fall back to the top-level `public` folder. This makes running the
// production server straightforward after `npm run build`.
const projectRoot = path.join(__dirname, '..', '..');
const buildPath = path.join(projectRoot, 'build');
const publicPath = path.join(projectRoot, 'public');

if (require('fs').existsSync(buildPath)) {
  console.log('Serving static files from build/');
  app.use(express.static(buildPath));
} else {
  console.log('Serving static files from public/');
  app.use(express.static(publicPath));
}

// Database connection (disabled for testing)
console.log('Running without MongoDB for testing');

// Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes);

// Root API health-check (kept explicit)
app.get('/api', (req, res) => {
  res.json({ message: 'RC Ecommerce API Server' });
});

// If we reach here and the request is not an API request, serve the SPA
// `index.html` so client-side routing (React Router BrowserRouter) works.
app.get('*', (req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ message: 'API route not found' });
  }
  res.sendFile(path.join(publicPath, 'index.html'), (err) => {
    if (err) {
      console.error('Error sending index.html:', err);
      res.status(500).send('Server error');
    }
  });
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

server.on('error', (err) => {
  console.error('Server error:', err);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});