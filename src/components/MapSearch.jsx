import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import PropertyCard from './PropertyCard';
import { useProperties } from '../hooks/useProperties';

const { FiMapPin, FiList, FiFilter, FiZoomIn, FiZoomOut, FiRefreshCw } = FiIcons;

// Google Maps API Key from environment variables
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// 東京の中心座標
const TOKYO_CENTER = { lat: 35.6762, lng: 139.6503 };

// 物件の座標データ（実際のプロジェクトではAPIから取得）
const getPropertyCoordinates = (property) => {
  // エリア別の大まかな座標（実際のプロジェクトではより精密な住所ベースの座標を使用）
  const areaCoordinates = {
    '渋谷区': { lat: 35.6580, lng: 139.7016 },
    '新宿区': { lat: 35.6938, lng: 139.7034 },
    '港区': { lat: 35.6586, lng: 139.7454 },
    '千代田区': { lat: 35.6938, lng: 139.7534 },
    '中央区': { lat: 35.6762, lng: 139.7703 },
    '品川区': { lat: 35.6092, lng: 139.7301 },
    '目黒区': { lat: 35.6333, lng: 139.7156 },
    '世田谷区': { lat: 35.6464, lng: 139.6533 }
  };

  const baseCoord = areaCoordinates[property.area] || TOKYO_CENTER;
  
  // 同じエリア内で少しランダムに散らばらせる
  const randomOffset = () => (Math.random() - 0.5) * 0.01;
  
  return {
    lat: baseCoord.lat + randomOffset(),
    lng: baseCoord.lng + randomOffset()
  };
};

// カスタムマーカーコンポーネント
const PropertyMarker = ({ property, map, onHover, onLeave, onClick, isHovered }) => {
  const markerRef = useRef();

  useEffect(() => {
    if (!map || !property || !window.google) return;

    const position = getPropertyCoordinates(property);
    
    // カスタムマーカーの作成
    const marker = new window.google.maps.Marker({
      position,
      map,
      title: property.title,
      icon: {
        url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
          <svg width="32" height="40" viewBox="0 0 32 40" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 0C7.163 0 0 7.163 0 16c0 8.836 16 24 16 24s16-15.164 16-24C32 7.163 24.837 0 16 0z" 
                  fill="${isHovered ? '#dc2626' : '#ef4444'}" stroke="#fff" stroke-width="2"/>
            <circle cx="16" cy="16" r="6" fill="#fff"/>
            <text x="16" y="20" text-anchor="middle" fill="${isHovered ? '#dc2626' : '#ef4444'}" 
                  font-size="8" font-weight="bold">¥</text>
          </svg>
        `)}`,
        scaledSize: new window.google.maps.Size(32, 40),
        anchor: new window.google.maps.Point(16, 40)
      },
      animation: window.google.maps.Animation.DROP
    });

    markerRef.current = marker;

    // ホバーイベント
    marker.addListener('mouseover', () => {
      onHover(property);
    });

    marker.addListener('mouseout', () => {
      onLeave();
    });

    // クリックイベント
    marker.addListener('click', () => {
      onClick(property);
    });

    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [map, property, isHovered, onHover, onLeave, onClick]);

  return null;
};

// メインマップコンポーネント
const MapComponent = ({ properties, hoveredProperty, onPropertyHover, onPropertyLeave, onPropertyClick }) => {
  const mapRef = useRef();
  const [map, setMap] = useState(null);

  const initializeMap = useCallback((mapElement) => {
    if (!mapElement || !window.google) return;

    const mapInstance = new window.google.maps.Map(mapElement, {
      center: TOKYO_CENTER,
      zoom: 12,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ],
      mapTypeControl: true,
      streetViewControl: true,
      fullscreenControl: true,
      zoomControl: true
    });

    setMap(mapInstance);
    mapRef.current = mapInstance;
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      initializeMap(mapRef.current);
    }
  }, [initializeMap]);

  // 物件に応じてマップの境界を調整
  useEffect(() => {
    if (!map || !properties.length || !window.google) return;

    const bounds = new window.google.maps.LatLngBounds();
    properties.forEach(property => {
      const coords = getPropertyCoordinates(property);
      bounds.extend(coords);
    });

    map.fitBounds(bounds);
  }, [map, properties]);

  return (
    <div className="w-full h-full relative">
      <div
        ref={mapRef}
        className="w-full h-full"
        onLoad={() => initializeMap(mapRef.current)}
      />
      
      {/* マーカーをレンダリング */}
      {map && properties.map(property => (
        <PropertyMarker
          key={property.id}
          property={property}
          map={map}
          onHover={onPropertyHover}
          onLeave={onPropertyLeave}
          onClick={onPropertyClick}
          isHovered={hoveredProperty?.id === property.id}
        />
      ))}
    </div>
  );
};

// Google Maps ラッパーコンポーネント
const MapWrapper = ({ children, ...props }) => {
  const render = (status) => {
    if (status === Status.LOADING) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <div className="text-center">
            <SafeIcon icon={FiRefreshCw} className="w-8 h-8 animate-spin text-red-600 mx-auto mb-2" />
            <p className="text-gray-600">マップを読み込み中...</p>
          </div>
        </div>
      );
    }

    if (status === Status.FAILURE) {
      return (
        <div className="w-full h-full flex items-center justify-center bg-gray-100">
          <div className="text-center p-8">
            <SafeIcon icon={FiMapPin} className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              マップの読み込みに失敗しました
            </h3>
            <p className="text-gray-500 text-sm mb-4">
              Google Maps APIキーが設定されていないか、無効です。
            </p>
            <p className="text-xs text-gray-400">
              現在のAPIキー: {GOOGLE_MAPS_API_KEY ? '設定済み' : '未設定'}
            </p>
          </div>
        </div>
      );
    }

    return children;
  };

  return (
    <Wrapper
      apiKey={GOOGLE_MAPS_API_KEY}
      render={render}
      libraries={['places']}
      {...props}
    />
  );
};

// ホバー時の物件情報表示コンポーネント
const PropertyHoverCard = ({ property, position }) => {
  if (!property || !position) return null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.2 }}
      className="absolute z-50 bg-white rounded-lg shadow-xl border p-4 w-64 pointer-events-none"
      style={{
        left: position.x + 10,
        top: position.y - 10,
        transform: 'translateY(-100%)'
      }}
    >
      <div className="flex items-start space-x-3">
        <img
          src={property.images?.[0] || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'}
          alt={property.title}
          className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
        />
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 text-sm line-clamp-2 mb-1">
            {property.title}
          </h4>
          <p className="text-xs text-gray-600 mb-1">{property.area}</p>
          <div className="flex items-center justify-between">
            <span className="text-red-600 font-bold text-sm">
              {property.rentDisplay}
            </span>
            <span className="text-xs text-gray-500">{property.size}</span>
          </div>
        </div>
      </div>
      
      {/* 吹き出しの矢印 */}
      <div className="absolute bottom-0 left-6 transform translate-y-full">
        <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
      </div>
    </motion.div>
  );
};

// メインのマップ検索コンポーネント
const MapSearch = () => {
  const [viewMode, setViewMode] = useState('map'); // 'map' or 'list'
  const [hoveredProperty, setHoveredProperty] = useState(null);
  const [mousePosition, setMousePosition] = useState(null);
  const [filters, setFilters] = useState({});

  const { properties, loading, error } = useProperties(filters);

  const handlePropertyHover = useCallback((property) => {
    setHoveredProperty(property);
  }, []);

  const handlePropertyLeave = useCallback(() => {
    setHoveredProperty(null);
    setMousePosition(null);
  }, []);

  const handlePropertyClick = useCallback((property) => {
    // 物件詳細ページに遷移
    window.open(`/#/property/${property.id}`, '_blank');
  }, []);

  const handleMouseMove = useCallback((e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    if (hoveredProperty) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [hoveredProperty, handleMouseMove]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <SafeIcon icon={FiRefreshCw} className="w-8 h-8 animate-spin text-red-600 mx-auto mb-2" />
              <p className="text-gray-600">物件データを読み込み中...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 pt-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              エラーが発生しました
            </h1>
            <p className="text-red-600 mb-4">データの読み込みに失敗しました</p>
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
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                マップ検索
              </h1>
              <p className="text-gray-600">
                地図上で{properties.length}件の物件を確認できます
              </p>
            </div>

            {/* View Toggle */}
            <div className="flex bg-white rounded-lg shadow p-1">
              <button
                onClick={() => setViewMode('map')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  viewMode === 'map'
                    ? 'bg-red-600 text-white'
                    : 'text-gray-600 hover:text-red-600'
                }`}
              >
                <SafeIcon icon={FiMapPin} className="w-4 h-4" />
                <span>マップ</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  viewMode === 'list'
                    ? 'bg-red-600 text-white'
                    : 'text-gray-600 hover:text-red-600'
                }`}
              >
                <SafeIcon icon={FiList} className="w-4 h-4" />
                <span>リスト</span>
              </button>
            </div>
          </div>

          {/* API Status Notice */}
          {GOOGLE_MAPS_API_KEY ? (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
              <p className="font-medium">Google Maps API 接続済み</p>
              <p className="text-sm">
                インタラクティブマップ機能が利用可能です。マーカーをクリックして物件詳細を確認できます。
              </p>
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg mb-6">
              <p className="font-medium">Google Maps API未設定</p>
              <p className="text-sm">
                フルマップ機能を利用するには、Google Maps APIキーが必要です。
                環境変数 VITE_GOOGLE_MAPS_API_KEY を設定してください。
              </p>
            </div>
          )}
        </motion.div>

        {/* Map View */}
        {viewMode === 'map' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden mb-8"
          >
            <div className="h-[600px] relative">
              <MapWrapper>
                <MapComponent
                  properties={properties}
                  hoveredProperty={hoveredProperty}
                  onPropertyHover={handlePropertyHover}
                  onPropertyLeave={handlePropertyLeave}
                  onPropertyClick={handlePropertyClick}
                />
              </MapWrapper>

              {/* Hover Card */}
              <PropertyHoverCard
                property={hoveredProperty}
                position={mousePosition}
              />
            </div>
          </motion.div>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
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
          </motion.div>
        )}

        {/* Empty State */}
        {properties.length === 0 && (
          <div className="text-center py-12">
            <SafeIcon icon={FiMapPin} className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              表示する物件がありません
            </h3>
            <p className="text-gray-500">
              検索条件を変更してお試しください。
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapSearch;