import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const PopularAreas = () => {
  const areas = [
    {
      name: '渋谷区',
      count: '156',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=2094&q=80',
      description: '若者の街として人気の渋谷エリア'
    },
    {
      name: '新宿区',
      count: '203',
      image: 'https://images.unsplash.com/photo-1542051841857-5f90071e7989?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      description: '日本最大級のターミナル駅周辺'
    },
    {
      name: '港区',
      count: '134',
      image: 'https://images.unsplash.com/photo-1513407030348-c983a97b98d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80',
      description: '高級エリアとして知られる港区'
    },
    {
      name: '千代田区',
      count: '89',
      image: 'https://images.unsplash.com/photo-1590859808308-3d2d9c515b1a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80',
      description: 'ビジネス街の中心地'
    },
    {
      name: '中央区',
      count: '112',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
      description: '銀座・築地など商業の中心'
    },
    {
      name: '品川区',
      count: '98',
      image: 'https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80',
      description: '交通アクセス抜群のエリア'
    }
  ];

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
            人気エリア
          </h2>
          <p className="text-lg text-gray-600">
            多くの方に選ばれている注目のエリア
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {areas.map((area, index) => (
            <motion.div
              key={area.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link
                to={`/search?area=${area.name}`}
                className="block bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group"
              >
                <div className="relative">
                  <img
                    src={area.image}
                    alt={area.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors duration-300"></div>
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-2xl font-bold mb-1">{area.name}</h3>
                    <p className="text-sm opacity-90">{area.description}</p>
                  </div>
                  <div className="absolute top-4 right-4">
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {area.count}件
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularAreas;