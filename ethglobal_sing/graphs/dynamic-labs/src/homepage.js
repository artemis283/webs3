import React, { useState, useEffect } from 'react';
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import { motion } from "framer-motion";
import { getBalance, redeemPoints } from './api/mintlyApi';

const HomePage = () => {
    const [balance, setBalance] = useState(0);
    const [address, setAddress] = useState(''); // You'll need to get this from your authentication system

    useEffect(() => {
        if (address) {
            fetchBalance();
        }
    }, [address]);

    const fetchBalance = async () => {
        try {
            const result = await getBalance(address);
            if (result.success) {
                setBalance(result.balance);
            }
        } catch (error) {
            console.error('Error fetching balance:', error);
        }
    };

    const handleRedeemPoints = async (amount) => {
        try {
            const result = await redeemPoints(amount);
            if (result.success) {
                // Update balance or show success message
                fetchBalance();
            }
        } catch (error) {
            console.error('Error redeeming points:', error);
        }
    };

    return (
      <div className="min-h-screen flex flex-col text-gray-800 relative overflow-hidden font-sans">
        <motion.div 
          className="absolute inset-0 z-0"
          animate={{
            background: [
              "linear-gradient(60deg, #e0f2fe 0%, #e0e7ff 50%, #f3e8ff 100%)",
              "linear-gradient(120deg, #f3e8ff 0%, #e0f2fe 50%, #e0e7ff 100%)",
              "linear-gradient(180deg, #e0e7ff 0%, #f3e8ff 50%, #e0f2fe 100%)",
            ],
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        />
        
        <nav className="relative z-10 w-full py-6 px-8 flex justify-between items-center bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg">
          <a href="#" className="text-blue-600 hover:text-blue-800 font-semibold transition duration-300 ease-in-out transform hover:scale-105">
            Manage Your Account
          </a>
          <div className="flex items-center space-x-6">
            <a href="#" className="text-gray-700 hover:text-blue-600 transition duration-300 ease-in-out">Dashboard</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition duration-300 ease-in-out">Transactions</a>
            <a href="#" className="text-gray-700 hover:text-blue-600 transition duration-300 ease-in-out">Support</a>
            <a href="/shop" className="bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105">
              Shop Now
            </a>
            <DynamicWidget />
          </div>
        </nav>

        <main className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-extrabold text-gray-900 sm:text-6xl md:text-7xl mb-6">
              Welcome to Your <span className="text-blue-600">Dashboard</span>
            </h1>
            <p className="mt-3 max-w-md mx-auto text-xl text-gray-700 sm:text-2xl md:mt-5 md:max-w-3xl">
              Manage your account, track rewards, and explore new opportunities.
            </p>
          </motion.div>

          <motion.div 
            className="mt-16 max-w-7xl mx-auto grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <InfoCard title="Points Earned" value="1,234 minties" icon="🏆" />
            <InfoCard title="Current Balance" value={`${balance} minties`} icon="💰" />
            <InfoCard title="Recent Transactions" value="View All" icon="📊" isLink />
          </motion.div>

          {/* New Shop Now button */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a 
              href="/shop" 
              className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full text-xl font-semibold hover:bg-blue-700 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
            >
              Shop Now
            </a>
          </motion.div>

          <motion.div 
            className="mt-16 w-full max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div className="bg-white rounded-xl p-6 shadow-lg overflow-hidden">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Our Partners</h2>
              <motion.div 
                className="flex space-x-8"
                animate={{ x: [0, -1024] }}
                transition={{ 
                  x: {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 20,
                    ease: "linear",
                  },
                }}
              >
                {['binance', 'disney', 'nfl', 'mattel', 'nba', 'samsung', 'ubisoft'].map((logo, index) => (
                  <img 
                    key={index}
                    src={`/${logo}-logo.png`} 
                    alt={`${logo} logo`} 
                    className="h-12 object-contain"
                  />
                ))}
                {/* Duplicate logos to create seamless loop */}
                {['binance', 'disney', 'nfl',  'mattel', 'nba', 'samsung', 'ubisoft'].map((logo, index) => (
                  <img 
                    key={index + 6}
                    src={`/${logo}-logo.png`} 
                    alt={`${logo} logo`} 
                    className="h-12 object-contain"
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>

          <motion.div 
            className="mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Exclusive Offers</h2>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
              <OfferCard title="Summer Special" description="Get 2x points on all purchases" />
              <OfferCard title="Refer a Friend" description="Earn $20 for each referral" />
              <OfferCard title="Upgrade Your Card" description="Unlock premium benefits" />
            </div>
          </motion.div>
        </main>

        <footer className="relative z-10 w-full py-4 px-8 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg mt-16">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">&copy; 2024 Mintly. All rights reserved.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-blue-600 transition duration-300 ease-in-out">Privacy Policy</a>
              <a href="#" className="text-gray-600 hover:text-blue-600 transition duration-300 ease-in-out">Terms of Service</a>
            </div>
          </div>
        </footer>
      </div>
    );
};

const InfoCard = ({ title, value, icon, isLink = false }) => (
  <motion.div 
    className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <div className="flex items-center justify-between">
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <span className="text-3xl">{icon}</span>
    </div>
    <p className={`mt-4 text-3xl font-bold ${isLink ? 'text-blue-600 cursor-pointer' : 'text-gray-900'}`}>{value}</p>
  </motion.div>
);

const OfferCard = ({ title, description }) => (
  <motion.div 
    className="bg-white bg-opacity-50 backdrop-filter backdrop-blur-lg rounded-xl p-6 shadow-lg hover:shadow-xl transition duration-300 ease-in-out"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
  >
    <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-700">{description}</p>
    <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out">
      Learn More
    </button>
  </motion.div>
);

export default HomePage;
