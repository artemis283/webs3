import React from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { makePurchase } from './api/mintlyApi';

const DisneyProducts = () => {
  const { user } = useDynamicContext();
  const characters = [
    { name: 'disney-character-1', price: 0.1 },
    { name: 'disney-character-2', price: 0.15 },
    { name: 'disney-character-3', price: 0.2 },
    { name: 'disney-character-4', price: 0.25 },
  ];

  const handlePurchase = async (character) => {
    if (!user?.walletAddress) {
      alert('Please connect your wallet first');
      return;
    }
    try {
      const result = await makePurchase(character.price, 'Disney', user.walletAddress);
      alert(`Purchase successful! You earned ${result.pointsEarned} minties.`);
    } catch (error) {
      console.error('Error making purchase:', error);
      alert('Purchase failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-extrabold text-center text-gray-800 mb-16 tracking-tight">
          Disney <span className="text-blue-600">Collectibles</span>
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 sm:gap-12">
          {characters.map((character, index) => (
            <div key={index} className="group">
              <div className="relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 ease-in-out transform group-hover:scale-105 group-hover:shadow-2xl">
                <div className="aspect-w-1 aspect-h-1 bg-gradient-to-br from-blue-200 to-purple-200">
                  <img
                    src={`/${character.name}.png`}
                    alt={`Disney Character ${index + 1}`}
                    className="w-full h-full object-contain p-4"
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity duration-300 ease-in-out" />
                <button 
                  onClick={() => handlePurchase(character)}
                  className="absolute bottom-4 left-4 right-4 bg-blue-600 text-white text-sm font-semibold py-2 px-4 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out transform translate-y-2 group-hover:translate-y-0"
                >
                  Buy for ${character.price}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DisneyProducts;


