import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">RC Admin</h2>
      </div>
      <nav>
        <ul className="space-y-2">
          <li>
            <Link 
              to="/admin" 
              className="block py-2 px-4 rounded hover:bg-gray-700"
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/products" 
              className="block py-2 px-4 rounded hover:bg-gray-700"
            >
              Manage Products
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/orders" 
              className="block py-2 px-4 rounded hover:bg-gray-700"
            >
              Manage Orders
            </Link>
          </li>
          <li>
            <Link 
              to="/admin/customers" 
              className="block py-2 px-4 rounded hover:bg-gray-700"
            >
              Manage Customers
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;