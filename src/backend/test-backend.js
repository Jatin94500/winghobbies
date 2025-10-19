const axios = require('axios');

const API_URL = 'http://localhost:5000/api';
let authToken = '';
let testProductId = '';
let testOrderId = '';

const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  reset: '\x1b[0m'
};

const log = {
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  info: (msg) => console.log(`${colors.yellow}ℹ${colors.reset} ${msg}`)
};

// Test Auth
async function testAuth() {
  console.log('\n=== Testing Authentication ===');
  
  try {
    // Register
    const registerRes = await axios.post(`${API_URL}/auth/register`, {
      name: 'Test User',
      email: `test${Date.now()}@test.com`,
      password: 'test123',
      phone: '9876543210'
    });
    authToken = registerRes.data.data.token;
    log.success('Register: OK');
  } catch (err) {
    log.error(`Register: ${err.response?.data?.error?.message || err.message}`);
  }

  try {
    // Get Profile
    const profileRes = await axios.get(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    log.success('Get Profile: OK');
  } catch (err) {
    log.error(`Get Profile: ${err.response?.data?.error?.message || err.message}`);
  }
}

// Test Products
async function testProducts() {
  console.log('\n=== Testing Products ===');
  
  try {
    // Get all products
    const productsRes = await axios.get(`${API_URL}/products`);
    if (productsRes.data.data.products.length > 0) {
      testProductId = productsRes.data.data.products[0]._id;
      log.success(`Get Products: OK (${productsRes.data.data.products.length} products)`);
    }
  } catch (err) {
    log.error(`Get Products: ${err.message}`);
  }

  if (testProductId) {
    try {
      // Get single product
      const productRes = await axios.get(`${API_URL}/products/${testProductId}`);
      log.success('Get Single Product: OK');
    } catch (err) {
      log.error(`Get Single Product: ${err.message}`);
    }
  }

  try {
    // Search products
    const searchRes = await axios.get(`${API_URL}/products?search=rc`);
    log.success('Search Products: OK');
  } catch (err) {
    log.error(`Search Products: ${err.message}`);
  }
}

// Test Cart
async function testCart() {
  console.log('\n=== Testing Cart ===');
  
  if (!testProductId) {
    log.error('Cart: No product ID available');
    return;
  }

  try {
    // Add to cart
    const addRes = await axios.post(`${API_URL}/cart`, {
      productId: testProductId,
      name: 'Test Product',
      price: 1000,
      image: 'test.jpg',
      quantity: 2
    }, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    log.success('Add to Cart: OK');
  } catch (err) {
    log.error(`Add to Cart: ${err.response?.data?.error?.message || err.message}`);
  }

  try {
    // Get cart
    const cartRes = await axios.get(`${API_URL}/cart`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    log.success(`Get Cart: OK (${cartRes.data.data.items.length} items)`);
  } catch (err) {
    log.error(`Get Cart: ${err.message}`);
  }

  try {
    // Update quantity
    const updateRes = await axios.put(`${API_URL}/cart`, {
      productId: testProductId,
      quantity: 3
    }, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    log.success('Update Cart Quantity: OK');
  } catch (err) {
    log.error(`Update Cart: ${err.response?.data?.error?.message || err.message}`);
  }

  try {
    // Remove from cart
    const removeRes = await axios.delete(`${API_URL}/cart/${testProductId}`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    log.success('Remove from Cart: OK');
  } catch (err) {
    log.error(`Remove from Cart: ${err.message}`);
  }
}

// Test Wishlist
async function testWishlist() {
  console.log('\n=== Testing Wishlist ===');
  
  if (!testProductId) {
    log.error('Wishlist: No product ID available');
    return;
  }

  try {
    // Add to wishlist
    await axios.post(`${API_URL}/wishlist`, {
      productId: testProductId
    }, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    log.success('Add to Wishlist: OK');
  } catch (err) {
    log.error(`Add to Wishlist: ${err.message}`);
  }

  try {
    // Get wishlist
    const wishlistRes = await axios.get(`${API_URL}/wishlist`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    log.success('Get Wishlist: OK');
  } catch (err) {
    log.error(`Get Wishlist: ${err.message}`);
  }

  try {
    // Remove from wishlist
    await axios.delete(`${API_URL}/wishlist/${testProductId}`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    log.success('Remove from Wishlist: OK');
  } catch (err) {
    log.error(`Remove from Wishlist: ${err.message}`);
  }
}

// Test Orders
async function testOrders() {
  console.log('\n=== Testing Orders ===');
  
  if (!testProductId) {
    log.error('Orders: No product ID available');
    return;
  }

  try {
    // Create order
    const orderRes = await axios.post(`${API_URL}/orders`, {
      items: [{
        product: testProductId,
        name: 'Test Product',
        price: 1000,
        quantity: 1,
        image: 'test.jpg'
      }],
      shipping: {
        name: 'Test User',
        address: '123 Test St',
        city: 'Test City',
        state: 'Test State',
        pincode: '123456',
        phone: '9876543210'
      },
      payment: {
        method: 'cod',
        status: 'pending'
      },
      summary: {
        subtotal: 1000,
        shipping: 0,
        discount: 0,
        total: 1000
      }
    }, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    testOrderId = orderRes.data.data.orderId;
    log.success(`Create Order: OK (${testOrderId})`);
  } catch (err) {
    log.error(`Create Order: ${err.response?.data?.error?.message || err.message}`);
  }

  try {
    // Get orders
    const ordersRes = await axios.get(`${API_URL}/orders`, {
      headers: { Authorization: `Bearer ${authToken}` }
    });
    log.success(`Get Orders: OK (${ordersRes.data.data.length} orders)`);
  } catch (err) {
    log.error(`Get Orders: ${err.message}`);
  }

  if (testOrderId) {
    try {
      // Get single order
      const orderRes = await axios.get(`${API_URL}/orders/${testOrderId}`, {
        headers: { Authorization: `Bearer ${authToken}` }
      });
      log.success('Get Single Order: OK');
    } catch (err) {
      log.error(`Get Single Order: ${err.message}`);
    }
  }
}

// Test Health
async function testHealth() {
  console.log('\n=== Testing Health Check ===');
  
  try {
    const healthRes = await axios.get(`${API_URL}/health`);
    log.success(`Health: ${healthRes.data.status} - MongoDB: ${healthRes.data.mongodb}`);
  } catch (err) {
    log.error(`Health: ${err.message}`);
  }
}

// Run all tests
async function runTests() {
  console.log('\n🧪 Starting Backend API Tests...\n');
  
  await testHealth();
  await testAuth();
  await testProducts();
  await testCart();
  await testWishlist();
  await testOrders();
  
  console.log('\n✅ All tests completed!\n');
}

runTests().catch(err => {
  console.error('Test suite failed:', err.message);
  process.exit(1);
});
