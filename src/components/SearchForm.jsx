import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiSearch, FiMapPin, FiHome, FiDollarSign, FiMap } = FiIcons;

const SearchForm = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useState({
    area: '',
    propertyType: '',
    priceRange: '',
    keyword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams(searchParams).toString();
    navigate(`/search?${queryParams}`);
  };

  const handleMapSearch = () => {
    navigate('/map');
  };

  const areas = [
    '渋谷区', '新宿区', '港区', '千代田区', '中央区', '品川区', 
    '目黒区', '世田谷区', '杉並区', '中野区'
  ];

  const propertyTypes = [
    '居抜き物件', 'スケルトン', '路面店', '地下店舗', 'ビル内店舗'
  ];

  const priceRanges = [
    '10万円以下', '10-20万円', '20-30万円', '30-50万円', '50万円以上'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl shadow-2xl p-6 md:p-8"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        物件検索
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Area Selection */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <SafeIcon icon={FiMapPin} className="w-4 h-4 text-red-500" />
              <span>エリア</span>
            </label>
            <select
              value={searchParams.area}
              onChange={(e) => setSearchParams({ ...searchParams, area: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="">エリアを選択</option>
              {areas.map(area => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
          </div>

          {/* Property Type */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <SafeIcon icon={FiHome} className="w-4 h-4 text-red-500" />
              <span>物件タイプ</span>
            </label>
            <select
              value={searchParams.propertyType}
              onChange={(e) => setSearchParams({ ...searchParams, propertyType: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="">タイプを選択</option>
              {propertyTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <SafeIcon icon={FiDollarSign} className="w-4 h-4 text-red-500" />
              <span>賃料</span>
            </label>
            <select
              value={searchParams.priceRange}
              onChange={(e) => setSearchParams({ ...searchParams, priceRange: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            >
              <option value="">賃料を選択</option>
              {priceRanges.map(range => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
          </div>

          {/* Keyword */}
          <div className="space-y-2">
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-700">
              <SafeIcon icon={FiSearch} className="w-4 h-4 text-red-500" />
              <span>キーワード</span>
            </label>
            <input
              type="text"
              value={searchParams.keyword}
              onChange={(e) => setSearchParams({ ...searchParams, keyword: e.target.value })}
              placeholder="駅名、地名など"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Search Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            type="submit"
            className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center space-x-2"
          >
            <SafeIcon icon={FiSearch} className="w-5 h-5" />
            <span>検索する</span>
          </button>
          
          <button
            type="button"
            onClick={handleMapSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 flex items-center space-x-2"
          >
            <SafeIcon icon={FiMap} className="w-5 h-5" />
            <span>マップで検索</span>
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default SearchForm;