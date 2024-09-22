import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { makePurchase } from './api/mintlyApi';

const Shop = () => {
  const logos = ['binance', 'disney', 'nfl', 'mattel', 'nba', 'samsung', 'ubisoft'];

  const handlePurchase = async (amount, partner) => {
    try {
      const result = await makePurchase(amount, partner);
      if (result.success) {
        // Handle successful purchase (e.g., show a success message, update UI)
        console.log('Purchase successful:', result.transactionId);
      }
    } catch (error) {
      console.error('Error making purchase:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          className="text-4xl font-extrabold text-center text-gray-900 mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Shop
        </motion.h1>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {logos.map((logo, index) => (
            <motion.div
              key={logo}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center">
                <img
                  src={`/${logo}-logo.png`}
                  alt={`${logo} logo`}
                  className="object-contain h-24 w-24"
                />
              </div>
              <h2 className="mt-4 text-center text-lg font-medium text-gray-900 capitalize">{logo}</h2>
              <div className="mt-4 flex justify-center">
                {logo === 'disney' ? (
                  <Link to="/disney-products">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 ease-in-out">
                      View Products
                    </button>
                  </Link>
                ) : (
                  <button className="px-4 py-2 bg-gray-300 text-gray-700 rounded-full cursor-not-allowed">
                    Coming Soon
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Shop;
