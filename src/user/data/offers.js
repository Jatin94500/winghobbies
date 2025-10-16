export const specialOffers = [
  { 
    id: 1,
    title: 'Summer Sale', 
    discount: '50% OFF', 
    image: 'https://picsum.photos/400/250?random=30', 
    desc: 'RC Planes & Drones',
    link: '/products'
  },
  { 
    id: 2,
    title: 'Flash Deal', 
    discount: '70% OFF', 
    image: 'https://picsum.photos/400/250?random=31', 
    desc: 'Controllers & Parts',
    link: '/products'
  },
  { 
    id: 3,
    title: 'Weekend Special', 
    discount: '40% OFF', 
    image: 'https://picsum.photos/400/250?random=32', 
    desc: 'RC Cars & Trucks',
    link: '/products'
  }
];

export const sidebarOffers = {
  flashSale: {
    discount: '70% OFF',
    title: 'FLASH SALE',
    subtitle: 'Limited Time Only!',
    link: '/products'
  },
  freeShipping: {
    title: 'FREE SHIPPING',
    subtitle: 'On orders above ₹999'
  },
  newCustomer: {
    title: 'New Customer?',
    discount: '10% OFF',
    subtitle: 'Get 10% OFF on first order',
    code: 'Wing10'
  }
};

export const megaSale = {
  title: 'MEGA SALE',
  discount: 'Up to 80% OFF',
  description: 'Limited time offer on all RC models, drones, and accessories',
  image: 'https://picsum.photos/500/300?random=50',
  features: [
    'Free shipping on orders above ₹999',
    '1 year warranty on all products',
    'Easy returns within 30 days'
  ],
  link: '/products'
};

export default specialOffers;
