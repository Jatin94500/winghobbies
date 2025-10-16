import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const ProductDetail = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({ ...product, quantity });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div>
        <img src={product.image} alt={product.name} className="w-full rounded-lg" />
      </div>
      <div>
        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
        <p className="text-gray-600 mb-6">{product.description}</p>
        <div className="text-2xl font-bold text-blue-600 mb-6">${product.price}</div>
        <div className="flex items-center gap-4 mb-6">
          <label className="font-semibold">Quantity:</label>
          <input 
            type="number" 
            min="1" 
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="border rounded px-3 py-2 w-20"
          />
        </div>
        <button 
          onClick={handleAddToCart}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;