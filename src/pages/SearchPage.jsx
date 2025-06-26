import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import PropertyCard from '../components/PropertyCard';
import SearchFilters from '../components/SearchFilters';
import StationLineSearch from '../components/StationLineSearch';
import { useProperties } from '../hooks/useProperties.jsx';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiFilter, FiGrid, FiList, FiTrain } = FiIcons;

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [showStationSearch, setShowStationSearch] = useState(false);
  const [sortBy, setSortBy] = useState('CreatedTime');
  const [sortDirection, setSortDirection] = useState('desc');

  // Build filters from URL params
  const filters = {
    area: searchParams.get('area') || '',
    propertyType: searchParams.get('propertyType') || '',
    keyword: searchParams.get('keyword') || '',
    line: searchParams.get('line') || '',
    station: searchParams.get('station') || '',
    walkingDistance: searchParams.get('walkingDistance') || '',
    sortBy: sortBy,
    sortDirection: sortDirection
  };

  // Add price range filters
  const priceRange = searchParams.get('priceRange');
  if (priceRange) {
    switch (priceRange) {
      case '10万円以下':
        filters.maxRent = 10;
        break;
      case '10-20万円':
        filters.minRent = 10;
        filters.maxRent = 20;
        break;
      case '20-30万円':
        filters.minRent = 20;
        filters.maxRent = 30;
        break;
      case '30-50万円':
        filters.minRent = 30;
        filters.maxRent = 50;
        break;
      case '50万円以上':
        filters.minRent = 50;
        break;
    }
  }

  const { properties, loading, error } = useProperties(filters);

  const handleSortChange = (value) => {
    setSortBy(value);
    if (value === 'Rent') {
      setSortDirection('asc');
    } else {
      setSortDirection('desc');
    }
  };

  const handleStationLineSearch = (searchFilters) => {
    const currentParams = new URLSearchParams(searchParams);
    
    // Update URL with new station/line filters
    Object.entries(searchFilters).forEach(([key, value]) => {
      if (value) {
        currentParams.set(key, value);
      } else {
        currentParams.delete(key);
      }
    });

    setSearchParams(currentParams);
  };

  const handleFilterChange = (newFilters) => {
    const currentParams = new URLSearchParams(searchParams);
    
    // Update URL with new filters
    Object.entries(newFilters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        currentParams.set(key, value.join(','));
      } else if (value && !Array.isArray(value)) {
        currentParams.set(key, value);
      } else {
        currentParams.delete(key);
      }
    });

    setSearchParams(currentParams);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              物件検索結果
            </h1>
            <p className="text-gray-600">検索中...</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                <div className="w-full h-48 bg-gray-300"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded mb-4 w-3/4"></div>
                  <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            エラーが発生しました
          </h1>
          <p className="text-red-600 mb-4">データの読み込みに失敗しました</p>
          <p className="text-gray-500 text-sm">{error}</p>
          <div className="mt-8">
            <button 
              onClick={() => window.location.reload()}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
            >
              再読み込み
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            物件検索結果
          </h1>
          <p className="text-gray-600">
            {properties.length}件の物件が見つかりました
          </p>
        </motion.div>

        {/* Station Line Search */}
        <div className="mb-8">
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setShowStationSearch(!showStationSearch)}
              className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow border"
            >
              <SafeIcon icon={FiTrain} className="w-4 h-4" />
              <span>沿線・駅検索</span>
            </button>
          </div>
          <div className={`${showStationSearch ? 'block' : 'hidden'} lg:block`}>
            <StationLineSearch 
              onSearch={handleStationLineSearch}
              initialFilters={{
                line: filters.line,
                station: filters.station,
                walkingDistance: filters.walkingDistance
              }}
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80">
            <div className="lg:hidden mb-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg shadow border"
              >
                <SafeIcon icon={FiFilter} className="w-4 h-4" />
                <span>フィルター</span>
              </button>
            </div>
            <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
              <SearchFilters onFilterChange={handleFilterChange} />
            </div>
          </div>

          {/* Results */}
          <div className="flex-1">
            {/* Controls */}
            <div className="bg-white rounded-lg shadow p-4 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700">表示:</span>
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow' : ''}`}
                    >
                      <SafeIcon icon={FiGrid} className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow' : ''}`}
                    >
                      <SafeIcon icon={FiList} className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => handleSortChange(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="CreatedTime">新着順</option>
                  <option value="Rent">賃料安い順</option>
                  <option value="WalkingMinutes">駅近順</option>
                </select>
              </div>
            </div>

            {/* Property Grid/List */}
            <div className={`grid gap-6 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' 
                : 'grid-cols-1'
            }`}>
              {properties.map((property, index) => (
                <motion.div
                  key={property.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <PropertyCard property={property} />
                </motion.div>
              ))}
            </div>

            {properties.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  検索条件に一致する物件が見つかりませんでした。
                </p>
                <p className="text-gray-400 mt-2">
                  検索条件を変更してお試しください。
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;