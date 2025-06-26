import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <div className="relative bg-gradient-to-r from-red-600 to-red-700 text-white overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80')`
        }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 to-red-700/90"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            東京都内の<br />
            <span className="text-yellow-300">飲食店舗物件</span>を探す
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-100">
            理想の店舗物件を見つけて、あなたの夢を実現しませんか
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
              <span className="text-yellow-300 font-semibold text-lg">1,200+</span>
              <span className="ml-2">物件数</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
              <span className="text-yellow-300 font-semibold text-lg">23区</span>
              <span className="ml-2">対応エリア</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3">
              <span className="text-yellow-300 font-semibold text-lg">無料</span>
              <span className="ml-2">相談サービス</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;