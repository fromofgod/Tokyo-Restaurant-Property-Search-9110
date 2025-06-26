import React from 'react';
import { Link } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiPhone, FiMail, FiMapPin, FiClock } = FiIcons;

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">i</span>
              </div>
              <h3 className="text-xl font-bold">i-tenpo</h3>
            </div>
            <p className="text-gray-300 mb-4">
              東京都内の飲食店舗物件検索サイト。理想の店舗物件を見つけるお手伝いをいたします。
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiMapPin} className="w-4 h-4 text-red-400" />
                <span className="text-sm text-gray-300">東京都渋谷区1-1-1</span>
              </div>
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiPhone} className="w-4 h-4 text-red-400" />
                <span className="text-sm text-gray-300">03-1234-5678</span>
              </div>
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiMail} className="w-4 h-4 text-red-400" />
                <span className="text-sm text-gray-300">info@i-tenpo.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">クイックリンク</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  ホーム
                </Link>
              </li>
              <li>
                <Link to="/search" className="text-gray-300 hover:text-white transition-colors">
                  物件検索
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white transition-colors">
                  会社概要
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white transition-colors">
                  お問い合わせ
                </Link>
              </li>
            </ul>
          </div>

          {/* Business Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4">営業時間</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <SafeIcon icon={FiClock} className="w-4 h-4 text-red-400" />
                <span className="text-sm text-gray-300">平日: 9:00-18:00</span>
              </div>
              <div className="text-sm text-gray-300 ml-6">
                土日祝: 定休日
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © 2024 i-tenpo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;