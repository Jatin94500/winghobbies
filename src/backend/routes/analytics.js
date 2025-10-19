const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const { protect, authorize } = require('../auth');
const mongoose = require('mongoose');

// Get dashboard analytics
router.get('/dashboard', protect, authorize('admin'), async (req, res) => {
  try {
    const [totalRevenue, totalOrders, totalUsers, totalProducts] = await Promise.all([
      Order.aggregate([{ $group: { _id: null, total: { $sum: '$summary.total' } } }]),
      Order.countDocuments(),
      User.countDocuments(),
      Product.countDocuments()
    ]);

    const revenueByMonth = await Order.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
          revenue: { $sum: '$summary.total' },
          orders: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } },
      { $limit: 12 }
    ]);

    const topProducts = await Order.aggregate([
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.name',
          sales: { $sum: '$items.quantity' },
          revenue: { $sum: { $multiply: ['$items.price', '$items.quantity'] } }
        }
      },
      { $sort: { revenue: -1 } },
      { $limit: 10 }
    ]);

    const ordersByStatus = await Order.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    res.json({
      success: true,
      data: {
        summary: {
          totalRevenue: totalRevenue[0]?.total || 0,
          totalOrders,
          totalUsers,
          totalProducts,
          avgOrderValue: totalOrders > 0 ? (totalRevenue[0]?.total || 0) / totalOrders : 0
        },
        revenueByMonth,
        topProducts,
        ordersByStatus
      }
    });
  } catch (error) {
    res.status(400).json({ success: false, error: { message: error.message } });
  }
});

// Get MongoDB stats
router.get('/database', protect, authorize('admin'), async (req, res) => {
  try {
    const [productCount, orderCount, userCount] = await Promise.all([
      Product.countDocuments(),
      Order.countDocuments(),
      User.countDocuments()
    ]);

    const collectionStats = [
      { name: 'products', count: productCount, size: 'N/A', avgObjSize: 'N/A' },
      { name: 'orders', count: orderCount, size: 'N/A', avgObjSize: 'N/A' },
      { name: 'users', count: userCount, size: 'N/A', avgObjSize: 'N/A' }
    ];

    res.json({
      success: true,
      data: {
        database: mongoose.connection.name || 'wing-hobbies',
        collections: 3,
        dataSize: 'N/A',
        storageSize: 'N/A',
        indexes: 'N/A',
        indexSize: 'N/A',
        collectionStats
      }
    });
  } catch (error) {
    console.error('Database analytics error:', error);
    res.status(500).json({ success: false, error: { message: error.message } });
  }
});

// Get storage analytics
router.get('/storage', protect, authorize('admin'), async (req, res) => {
  try {
    const products = await Product.find().select('images');
    const totalImages = products.reduce((acc, p) => acc + (p.images?.length || 0), 0);
    const avgImageSize = 0.3; // MB per image (estimate)
    const totalSizeMB = totalImages * avgImageSize;
    const totalSizeGB = totalSizeMB / 1024;
    const costPerGB = 0.020; // $0.020 per GB/month for Google Cloud Storage
    const monthlyCost = totalSizeGB * costPerGB;
    
    // Get GCS bucket info if available
    let bucketInfo = null;
    try {
      const { Storage } = require('@google-cloud/storage');
      const storage = new Storage();
      const bucketName = process.env.GCP_BUCKET_NAME;
      if (bucketName) {
        const [metadata] = await storage.bucket(bucketName).getMetadata();
        bucketInfo = {
          name: metadata.name,
          location: metadata.location,
          storageClass: metadata.storageClass,
          created: metadata.timeCreated
        };
      }
    } catch (err) {
      console.log('GCS info not available:', err.message);
    }
    
    res.json({
      success: true,
      data: {
        totalImages,
        totalSizeMB: totalSizeMB.toFixed(2),
        totalSizeGB: totalSizeGB.toFixed(3),
        estimatedMonthlyCost: monthlyCost.toFixed(4),
        estimatedYearlyCost: (monthlyCost * 12).toFixed(2),
        productsWithImages: products.filter(p => p.images?.length > 0).length,
        avgImagesPerProduct: products.length > 0 ? (totalImages / products.length).toFixed(1) : '0',
        bucketInfo,
        pricing: {
          perGB: '$' + costPerGB + '/month',
          storageClass: 'Standard Storage',
          region: 'Multi-region'
        }
      }
    });
  } catch (error) {
    res.status(400).json({ success: false, error: { message: error.message } });
  }
});

// Get user analytics
router.get('/users', protect, authorize('admin'), async (req, res) => {
  try {
    const usersByMonth = await User.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m', date: '$createdAt' } },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } },
      { $limit: 12 }
    ]);

    const activeUsers = await Order.aggregate([
      { $group: { _id: '$user' } },
      { $count: 'total' }
    ]);

    res.json({
      success: true,
      data: {
        usersByMonth,
        activeUsers: activeUsers[0]?.total || 0
      }
    });
  } catch (error) {
    res.status(400).json({ success: false, error: { message: error.message } });
  }
});

module.exports = router;
