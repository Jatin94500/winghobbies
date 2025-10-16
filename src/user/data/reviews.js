export const reviews = {
  1: [
    { id: 1, user: 'John Smith', avatar: 'https://i.pravatar.cc/150?img=12', rating: 5, date: '2025-01-15', comment: 'Excellent drone! Very stable flight and great camera quality. Perfect for beginners.', verified: true },
    { id: 2, user: 'Sarah Johnson', avatar: 'https://i.pravatar.cc/150?img=45', rating: 4, date: '2025-01-10', comment: 'Good product but battery life could be better. Overall satisfied with the purchase.', verified: true },
    { id: 3, user: 'Mike Wilson', avatar: 'https://i.pravatar.cc/150?img=33', rating: 5, date: '2025-01-05', comment: 'Amazing build quality! Flies smoothly and the controls are very responsive.', verified: false }
  ],
  2: [
    { id: 4, user: 'Emily Davis', avatar: 'https://i.pravatar.cc/150?img=23', rating: 5, date: '2025-01-20', comment: 'Best RC car I have ever owned! Super fast and durable.', verified: true },
    { id: 5, user: 'David Brown', avatar: 'https://i.pravatar.cc/150?img=51', rating: 4, date: '2025-01-18', comment: 'Great performance on rough terrain. Kids love it!', verified: true }
  ],
  3: [
    { id: 6, user: 'Lisa Anderson', avatar: 'https://i.pravatar.cc/150?img=38', rating: 5, date: '2025-01-22', comment: 'Beautiful boat! Runs perfectly on the lake. Highly recommend.', verified: true },
    { id: 7, user: 'Tom Martinez', avatar: 'https://i.pravatar.cc/150?img=15', rating: 5, date: '2025-01-19', comment: 'Impressive speed and stability. Worth every penny!', verified: false }
  ],
  4: [
    { id: 8, user: 'Jennifer Lee', avatar: 'https://i.pravatar.cc/150?img=47', rating: 4, date: '2025-01-25', comment: 'Good helicopter for the price. Takes some practice to master.', verified: true }
  ],
  5: [
    { id: 9, user: 'Robert Taylor', avatar: 'https://i.pravatar.cc/150?img=60', rating: 5, date: '2025-01-23', comment: 'Professional grade plane! Excellent for aerial photography.', verified: true }
  ],
  6: [
    { id: 10, user: 'Amanda White', avatar: 'https://i.pravatar.cc/150?img=29', rating: 5, date: '2025-01-21', comment: 'My son loves this truck! Very durable and powerful.', verified: true }
  ]
};

export const getProductReviews = (productId) => {
  return reviews[productId] || [];
};

export const getAverageRating = (productId) => {
  const productReviews = reviews[productId] || [];
  if (productReviews.length === 0) return 0;
  const sum = productReviews.reduce((acc, review) => acc + review.rating, 0);
  return (sum / productReviews.length).toFixed(1);
};

export const getRatingDistribution = (productId) => {
  const productReviews = reviews[productId] || [];
  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
  productReviews.forEach(review => {
    distribution[review.rating]++;
  });
  return distribution;
};
