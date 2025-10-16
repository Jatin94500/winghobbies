import React from 'react';

const Dashboard = () => {
  const stats = [
    { title: 'Total Products', value: '24', color: 'bg-blue-500' },
    { title: 'Total Orders', value: '156', color: 'bg-green-500' },
    { title: 'Total Customers', value: '89', color: 'bg-purple-500' },
    { title: 'Revenue', value: '$12,450', color: 'bg-yellow-500' }
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-6">
            <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center mb-4`}>
              <span className="text-white font-bold">📊</span>
            </div>
            <h3 className="text-gray-500 text-sm">{stat.title}</h3>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center border-b pb-2">
              <span>Order #1001</span>
              <span className="text-green-600 font-semibold">$299.99</span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span>Order #1002</span>
              <span className="text-green-600 font-semibold">$199.99</span>
            </div>
            <div className="flex justify-between items-center border-b pb-2">
              <span>Order #1003</span>
              <span className="text-green-600 font-semibold">$89.99</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold mb-4">Low Stock Alert</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span>RC Fighter Jet F-16</span>
              <span className="text-red-600 font-semibold">2 left</span>
            </div>
            <div className="flex justify-between items-center">
              <span>LiPo Battery 3S</span>
              <span className="text-yellow-600 font-semibold">5 left</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;