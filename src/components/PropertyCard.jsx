import React from 'react';
import {Link} from 'react-router-dom';
import {motion} from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const {FiMapPin, FiHome, FiMaximize, FiImage} = FiIcons;

const PropertyCard = ({property}) => {
  // Enhanced image handling with better fallback
  const getImageUrl = () => {
    if (property.images && property.images.length > 0) {
      const primaryImage = property.images[0];
      
      // Log for debugging
      console.log(`Property ${property.id} primary image:`, primaryImage);
      
      // Validate URL
      try {
        new URL(primaryImage);
        return primaryImage;
      } catch (error) {
        console.warn(`Invalid image URL for property ${property.id}:`, primaryImage);
        return 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80';
      }
    }
    
    return 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80';
  };

  const primaryImage = getImageUrl();

  const handleImageError = (e) => {
    console.warn(`Image failed to load for property ${property.id}:`, e.target.src);
    e.target.src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80';
  };

  const handleImageLoad = (e) => {
    console.log(`Image loaded successfully for property ${property.id}:`, e.target.src);
  };

  return (
    <motion.div
      whileHover={{y: -5}}
      transition={{duration: 0.2}}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      <Link to={`/property/${property.id}`}>
        <div className="relative">
          <img
            src={primaryImage}
            alt={property.title}
            className="w-full h-48 object-cover"
            onError={handleImageError}
            onLoad={handleImageLoad}
            loading="lazy"
          />
          
          {/* Image indicator */}
          {property.images && property.images.length > 1 && (
            <div className="absolute bottom-2 right-2">
              <div className="bg-black/70 text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
                <SafeIcon icon={FiImage} className="w-3 h-3" />
                <span>{property.images.length}</span>
              </div>
            </div>
          )}
          
          <div className="absolute top-4 left-4">
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
              {property.type}
            </span>
          </div>
          <div className="absolute top-4 right-4 flex flex-wrap gap-1">
            {property.features && property.features.slice(0, 2).map((feature, index) => (
              <span
                key={index}
                className="bg-white/90 text-gray-800 px-2 py-1 rounded text-xs font-medium"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
            {property.title}
          </h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {property.description}
          </p>

          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1 text-gray-600">
                <SafeIcon icon={FiMapPin} className="w-4 h-4" />
                <span className="text-sm">{property.area}</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-600">
                <SafeIcon icon={FiMaximize} className="w-4 h-4" />
                <span className="text-sm">{property.size}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <span className="text-sm text-gray-600 font-medium">賃料</span>
              <span className="text-xl font-bold text-red-600">
                {property.rentDisplay}
              </span>
              <span className="text-gray-500 text-sm">/月</span>
            </div>
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              詳細を見る
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default PropertyCard;