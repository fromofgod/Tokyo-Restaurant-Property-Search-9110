import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiSearch, FiHeart, FiPhone, FiTool } = FiIcons;

const ServiceFeatures = () => {
  const features = [
    {
      icon: FiSearch,
      title: '豊富な物件データ',
      description: '東京都内の1,200件以上の飲食店舗物件を掲載。毎日更新される最新情報をお届けします。'
    },
    {
      icon: FiHeart,
      title: '専門コンサルタント',
      description: '飲食業界に精通した専門スタッフが、あなたの理想の店舗探しを全力でサポートします。'
    },
    {
      icon: FiPhone,
      title: '無料相談サービス',
      description: '物件選びから契約まで、専門スタッフによる無料相談サービスをご利用いただけます。'
    },
    {
      icon: FiTool,
      title: '開業支援',
      description: '物件探しだけでなく、開業に必要な各種手続きや設備導入もトータルサポート。'
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            i-tenpoの特徴
          </h2>
          <p className="text-lg text-gray-600">
            お客様の成功をサポートする充実のサービス
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SafeIcon icon={feature.icon} className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceFeatures;