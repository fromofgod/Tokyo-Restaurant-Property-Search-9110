import React from 'react';
import { motion } from 'framer-motion';
import PropertyCard from './PropertyCard';
import { useFeaturedProperties } from '../hooks/useProperties.jsx';

const FeaturedProperties = () => {
  const { properties, loading, error } = useFeaturedProperties();

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              おすすめ物件
            </h2>
            <p className="text-lg text-gray-600">
              厳選された優良物件をご紹介
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
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
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            おすすめ物件
          </h2>
          <p className="text-orange-600 mb-4">現在モックデータを表示しています</p>
          <p className="text-gray-500 text-sm">Airtable接続後に実際のデータが表示されます</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            おすすめ物件
          </h2>
          <p className="text-lg text-gray-600">
            厳選された優良物件をご紹介
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <PropertyCard property={property} />
            </motion.div>
          ))}
        </div>

        {properties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">
              現在、おすすめ物件はありません
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProperties;