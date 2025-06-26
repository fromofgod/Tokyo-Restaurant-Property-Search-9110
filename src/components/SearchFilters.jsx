import React, { useState } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiMapPin, FiHome, FiDollarSign, FiMaximize, FiTrain } = FiIcons;

const SearchFilters = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    area: [],
    propertyType: [],
    priceRange: '',
    sizeRange: '',
    line: '',
    station: '',
    walkingDistance: '',
    features: []
  });

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

  const sizeRanges = [
    '10坪以下', '10-20坪', '20-30坪', '30-50坪', '50坪以上'
  ];

  const lines = [
    'JR山手線', 'JR中央線', 'JR総武線', '東京メトロ銀座線', '東京メトロ丸ノ内線',
    '東京メトロ日比谷線', '東京メトロ東西線', '東京メトロ千代田線', '東京メトロ有楽町線',
    '東京メトロ半蔵門線', '東京メトロ南北線', '都営浅草線', '都営三田線', '都営新宿線', '都営大江戸線'
  ];

  const walkingDistances = [
    '徒歩1分', '徒歩3分', '徒歩5分', '徒歩10分'
  ];

  const features = [
    '駅近', '角地', '1階', '居抜き設備', '駐車場', '24時間営業可',
    '深夜営業可', 'テラス席可', '禁煙・分煙', '個室あり'
  ];

  const handleAreaChange = (area) => {
    const newAreas = filters.area.includes(area)
      ? filters.area.filter(a => a !== area)
      : [...filters.area, area];
    
    const newFilters = { ...filters, area: newAreas };
    setFilters(newFilters);
    
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const handlePropertyTypeChange = (type) => {
    const newTypes = filters.propertyType.includes(type)
      ? filters.propertyType.filter(t => t !== type)
      : [...filters.propertyType, type];
    
    const newFilters = { ...filters, propertyType: newTypes };
    setFilters(newFilters);
    
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const handleFeatureChange = (feature) => {
    const newFeatures = filters.features.includes(feature)
      ? filters.features.filter(f => f !== feature)
      : [...filters.features, feature];
    
    const newFilters = { ...filters, features: newFeatures };
    setFilters(newFilters);
    
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const handleSelectChange = (field, value) => {
    const newFilters = { ...filters, [field]: value };
    setFilters(newFilters);
    
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const resetFilters = () => {
    const newFilters = {
      area: [],
      propertyType: [],
      priceRange: '',
      sizeRange: '',
      line: '',
      station: '',
      walkingDistance: '',
      features: []
    };
    setFilters(newFilters);
    
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-lg shadow p-6"
    >
      <h3 className="text-lg font-bold text-gray-900 mb-6">
        検索条件を絞り込む
      </h3>

      {/* Area Filter */}
      <div className="mb-6">
        <h4 className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
          <SafeIcon icon={FiMapPin} className="w-4 h-4 text-red-500" />
          <span>エリア</span>
        </h4>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {areas.map(area => (
            <label key={area} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.area.includes(area)}
                onChange={() => handleAreaChange(area)}
                className="rounded border-gray-300 text-red-600 focus:ring-red-500"
              />
              <span className="text-sm text-gray-700">{area}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Line Filter */}
      <div className="mb-6">
        <h4 className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
          <SafeIcon icon={FiTrain} className="w-4 h-4 text-red-500" />
          <span>路線</span>
        </h4>
        <select
          value={filters.line}
          onChange={(e) => handleSelectChange('line', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
        >
          <option value="">選択してください</option>
          {lines.map(line => (
            <option key={line} value={line}>{line}</option>
          ))}
        </select>
      </div>

      {/* Walking Distance Filter */}
      <div className="mb-6">
        <h4 className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
          <SafeIcon icon={FiTrain} className="w-4 h-4 text-red-500" />
          <span>駅からの距離</span>
        </h4>
        <select
          value={filters.walkingDistance}
          onChange={(e) => handleSelectChange('walkingDistance', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
        >
          <option value="">選択してください</option>
          {walkingDistances.map(distance => (
            <option key={distance} value={distance}>{distance}</option>
          ))}
        </select>
      </div>

      {/* Property Type Filter */}
      <div className="mb-6">
        <h4 className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
          <SafeIcon icon={FiHome} className="w-4 h-4 text-red-500" />
          <span>物件タイプ</span>
        </h4>
        <div className="space-y-2">
          {propertyTypes.map(type => (
            <label key={type} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.propertyType.includes(type)}
                onChange={() => handlePropertyTypeChange(type)}
                className="rounded border-gray-300 text-red-600 focus:ring-red-500"
              />
              <span className="text-sm text-gray-700">{type}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Filter */}
      <div className="mb-6">
        <h4 className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
          <SafeIcon icon={FiDollarSign} className="w-4 h-4 text-red-500" />
          <span>賃料</span>
        </h4>
        <select
          value={filters.priceRange}
          onChange={(e) => handleSelectChange('priceRange', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
        >
          <option value="">選択してください</option>
          {priceRanges.map(range => (
            <option key={range} value={range}>{range}</option>
          ))}
        </select>
      </div>

      {/* Size Range Filter */}
      <div className="mb-6">
        <h4 className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-3">
          <SafeIcon icon={FiMaximize} className="w-4 h-4 text-red-500" />
          <span>面積</span>
        </h4>
        <select
          value={filters.sizeRange}
          onChange={(e) => handleSelectChange('sizeRange', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
        >
          <option value="">選択してください</option>
          {sizeRanges.map(range => (
            <option key={range} value={range}>{range}</option>
          ))}
        </select>
      </div>

      {/* Features Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-3">
          設備・特徴
        </h4>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {features.map(feature => (
            <label key={feature} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={filters.features.includes(feature)}
                onChange={() => handleFeatureChange(feature)}
                className="rounded border-gray-300 text-red-600 focus:ring-red-500"
              />
              <span className="text-sm text-gray-700">{feature}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={resetFilters}
        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors"
      >
        条件をリセット
      </button>
    </motion.div>
  );
};

export default SearchFilters;