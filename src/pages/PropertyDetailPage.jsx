import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useProperty } from '../hooks/useProperties.jsx';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiMapPin, FiMaximize, FiTrain, FiPhone, FiMail, FiArrowLeft, FiHeart, FiShare2, FiCalendar, FiChevronLeft, FiChevronRight } = FiIcons;

const PropertyDetailPage = () => {
  const { id } = useParams();
  const { property, loading, error } = useProperty(id);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-gray-300 h-96 rounded-xl mb-8"></div>
                <div className="bg-white rounded-xl p-6">
                  <div className="h-8 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                </div>
              </div>
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl p-6">
                  <div className="h-6 bg-gray-300 rounded mb-4"></div>
                  <div className="h-12 bg-gray-300 rounded mb-3"></div>
                  <div className="h-12 bg-gray-300 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gray-50 pt-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            物件が見つかりません
          </h1>
          <p className="text-red-600 mb-4">
            {error || '指定された物件は存在しないか、削除された可能性があります。'}
          </p>
          <Link
            to="/search"
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg inline-block"
          >
            検索に戻る
          </Link>
        </div>
      </div>
    );
  }

  const propertyDetails = {
    賃料: property.rentDisplay,
    管理費: property.managementFee,
    敷金: property.deposit,
    礼金: property.keyMoney,
    面積: property.size,
    階数: property.floor,
    築年数: property.buildingAge,
    最寄駅: `${property.nearestStation} ${property.walkingDistance}`,
    営業時間: property.businessHours,
    駐車場: property.parking,
    設備: property.equipment
  };

  // Enhanced image handling with validation
  const getValidImages = () => {
    if (property.images && property.images.length > 0) {
      const validImages = property.images.filter(img => {
        try {
          new URL(img);
          return true;
        } catch {
          console.warn('Invalid image URL:', img);
          return false;
        }
      });

      if (validImages.length > 0) {
        console.log(`Property ${property.id} has ${validImages.length} valid images:`, validImages);
        return validImages;
      }
    }

    console.log(`Property ${property.id} using fallback image`);
    return ['https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'];
  };

  const validImages = getValidImages();

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % validImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + validImages.length) % validImages.length);
  };

  const handleImageError = (e) => {
    console.warn(`Image failed to load: ${e.target.src}`);
    e.target.src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80';
  };

  const handleImageLoad = (e) => {
    console.log(`Image loaded successfully: ${e.target.src}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <Link
            to="/search"
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-red-600 transition-colors"
          >
            <SafeIcon icon={FiArrowLeft} className="w-4 h-4" />
            <span>検索結果に戻る</span>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg overflow-hidden mb-8"
            >
              <div className="relative h-96">
                <img
                  src={validImages[currentImageIndex]}
                  alt={`${property.title} - 画像 ${currentImageIndex + 1}`}
                  className="w-full h-full object-cover"
                  onError={handleImageError}
                  onLoad={handleImageLoad}
                />

                {/* Image Navigation */}
                {validImages.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                    >
                      <SafeIcon icon={FiChevronLeft} className="w-5 h-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                    >
                      <SafeIcon icon={FiChevronRight} className="w-5 h-5" />
                    </button>

                    {/* Image Counter */}
                    <div className="absolute bottom-4 left-4">
                      <span className="bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                        {currentImageIndex + 1} / {validImages.length}
                      </span>
                    </div>
                  </>
                )}

                <div className="absolute top-4 left-4">
                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {property.type}
                  </span>
                </div>

                <div className="absolute top-4 right-4 flex space-x-2">
                  <button className="bg-white/90 hover:bg-white p-2 rounded-full transition-colors">
                    <SafeIcon icon={FiHeart} className="w-5 h-5 text-gray-600" />
                  </button>
                  <button className="bg-white/90 hover:bg-white p-2 rounded-full transition-colors">
                    <SafeIcon icon={FiShare2} className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>

              {/* Thumbnail Gallery */}
              {validImages.length > 1 && (
                <div className="p-4">
                  <div className="flex space-x-2 overflow-x-auto">
                    {validImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                          currentImageIndex === index
                            ? 'border-red-500'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${property.title} サムネイル ${index + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80';
                          }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>

            {/* Property Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6 mb-8"
            >
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {property.title}
              </h1>

              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-1 text-gray-600">
                  <SafeIcon icon={FiMapPin} className="w-5 h-5" />
                  <span>{property.address || property.area}</span>
                </div>
                <div className="flex items-center space-x-1 text-red-600">
                  <span className="text-sm font-medium">賃料</span>
                  <span className="text-2xl font-bold">{property.rentDisplay}</span>
                  <span className="text-gray-500">/月</span>
                </div>
              </div>

              {property.features && property.features.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-6">
                  {property.features.map((feature, index) => (
                    <span
                      key={index}
                      className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              )}

              <p className="text-gray-600 leading-relaxed mb-6">
                {property.description}
              </p>

              {/* Property Details */}
              <div className="border-t pt-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  物件詳細
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(propertyDetails).map(([key, value]) => (
                    value && (
                      <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                        <span className="text-gray-600 font-medium">{key}</span>
                        <span className="text-gray-900">{value}</span>
                      </div>
                    )
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Contact Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg p-6 mb-8 sticky top-8"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                お問い合わせ
              </h3>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-gray-600 text-sm">担当会社</p>
                  <p className="font-semibold">{property.contactCompany || '株式会社i-tenpo'}</p>
                </div>

                {property.contactPhone && (
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiPhone} className="w-4 h-4 text-red-500" />
                    <span className="font-semibold">{property.contactPhone}</span>
                  </div>
                )}

                {property.contactEmail && (
                  <div className="flex items-center space-x-2">
                    <SafeIcon icon={FiMail} className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-gray-600">{property.contactEmail}</span>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <button className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors">
                  <div className="flex items-center justify-center space-x-2">
                    <SafeIcon icon={FiPhone} className="w-4 h-4" />
                    <span>電話で問い合わせ</span>
                  </div>
                </button>

                <button className="w-full bg-white hover:bg-gray-50 text-red-600 py-3 px-4 rounded-lg font-semibold border-2 border-red-600 transition-colors">
                  <div className="flex items-center justify-center space-x-2">
                    <SafeIcon icon={FiMail} className="w-4 h-4" />
                    <span>メールで問い合わせ</span>
                  </div>
                </button>

                <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-semibold transition-colors">
                  <div className="flex items-center justify-center space-x-2">
                    <SafeIcon icon={FiCalendar} className="w-4 h-4" />
                    <span>内見予約</span>
                  </div>
                </button>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-xs text-gray-600 text-center">
                  営業時間: 平日 9:00-18:00<br />
                  お気軽にお問い合わせください
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;