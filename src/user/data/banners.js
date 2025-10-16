// src/user/data/banners.js
const banners = [
  {
    id: 1,
    title: "Summer Sale 2025",
    subtitle: "Up to 70% OFF on RC Models",
    description: "Limited time offer on premium RC planes, drones, and accessories",
    buttonText: "Shop Now",
    buttonLink: "/products",
    backgroundImage: "/assets/banner-bg-1.jpg",
    backgroundColor: "linear-gradient(135deg, #ff6b35 0%, #f7931e 100%)",
    textColor: "white",
    isActive: true,
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    position: "center"
  },
  {
    id: 2,
    title: "New Arrivals",
    subtitle: "Latest RC Technology",
    description: "Discover cutting-edge RC models with advanced features",
    buttonText: "Explore",
    buttonLink: "/products?filter=new",
    backgroundImage: "/assets/banner-bg-2.jpg",
    backgroundColor: "linear-gradient(135deg, #2874f0 0%, #1e5bb8 100%)",
    textColor: "white",
    isActive: true,
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    position: "left"
  },
  {
    id: 3,
    title: "Free Shipping",
    subtitle: "On Orders Above ₹2,999",
    description: "Get your RC models delivered to your doorstep at no extra cost",
    buttonText: "Learn More",
    buttonLink: "/shipping-info",
    backgroundImage: "/assets/banner-bg-3.jpg",
    backgroundColor: "linear-gradient(135deg, #388e3c 0%, #2e7d32 100%)",
    textColor: "white",
    isActive: true,
    startDate: "2025-01-01",
    endDate: "2025-12-31",
    position: "right"
  }
];

export default banners;
