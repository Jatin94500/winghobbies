export const mockOrders = [
  {
    id: 'WH2025001',
    date: '2025-01-15',
    status: 'delivered',
    total: 24998,
    items: [
      { id: 1, name: 'Professional RC Plane SkyMaster Pro X1', price: 12499, quantity: 2, image: 'https://picsum.photos/400/300?random=1' }
    ],
    shipping: 0,
    payment: 'COD',
    address: '123 Main St, Mumbai, Maharashtra - 400001'
  },
  {
    id: 'WH2025002',
    date: '2025-01-20',
    status: 'shipped',
    total: 10098,
    items: [
      { id: 2, name: '4K Camera Drone TurboDrone X1 Pro', price: 9999, quantity: 1, image: 'https://picsum.photos/400/300?random=2' }
    ],
    shipping: 99,
    payment: 'Online',
    address: '456 Park Ave, Delhi, Delhi - 110001',
    tracking: 'TRK123456789'
  },
  {
    id: 'WH2025003',
    date: '2025-01-25',
    status: 'processing',
    total: 5499,
    items: [
      { id: 3, name: 'High Speed RC Car GT Racing Edition', price: 5499, quantity: 1, image: 'https://picsum.photos/400/300?random=3' }
    ],
    shipping: 0,
    payment: 'COD',
    address: '789 Lake View, Bangalore, Karnataka - 560001'
  },
  {
    id: 'WH2025004',
    date: '2025-01-28',
    status: 'cancelled',
    total: 3499,
    items: [
      { id: 4, name: 'Pro Remote Controller 2.4GHz Digital', price: 3499, quantity: 1, image: 'https://picsum.photos/400/300?random=4' }
    ],
    shipping: 0,
    payment: 'Online',
    address: '321 Beach Rd, Goa, Goa - 403001'
  }
];

export const orderStatuses = {
  processing: { label: 'Processing', color: 'warning', icon: 'fa-clock' },
  shipped: { label: 'Shipped', color: 'info', icon: 'fa-shipping-fast' },
  delivered: { label: 'Delivered', color: 'success', icon: 'fa-check-circle' },
  cancelled: { label: 'Cancelled', color: 'danger', icon: 'fa-times-circle' }
};

export default mockOrders;
