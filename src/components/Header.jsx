import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon.jsx';
import AuthModal from './AuthModal.jsx';
import UserMenu from './UserMenu.jsx';
import { useAuth } from '../hooks/useAuth.jsx';

const { FiMenu, FiX, FiSearch, FiPhone, FiMail, FiUser, FiMapPin } = FiIcons;

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signin');
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigate('/search');
  };

  const handleAuthClick = (mode) => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  return (
    <header className="bg-white shadow-lg">
      {/* Top Bar */}
      <div className="bg-red-600 text-white py-2">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <SafeIcon icon={FiPhone} className="w-4 h-4" />
              <span>03-1234-5678</span>
            </div>
            <div className="flex items-center space-x-1">
              <SafeIcon icon={FiMail} className="w-4 h-4" />
              <span>info@i-tenpo.com</span>
            </div>
          </div>
          <div className="text-sm">
            営業時間: 平日 9:00-18:00
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">i</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">店舗物件東京</h1>
              <p className="text-xs text-gray-600">飲食店舗物件検索</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-red-600 transition-colors"
            >
              ホーム
            </Link>
            <Link
              to="/search"
              className="text-gray-700 hover:text-red-600 transition-colors"
            >
              物件検索
            </Link>
            <Link
              to="/map"
              className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors"
            >
              <SafeIcon icon={FiMapPin} className="w-4 h-4" />
              <span>マップ検索</span>
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-red-600 transition-colors"
            >
              会社概要
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-red-600 transition-colors"
            >
              お問い合わせ
            </Link>
            
            {/* Auth Section */}
            {loading ? (
              <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
            ) : user ? (
              <UserMenu />
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleAuthClick('signin')}
                  className="text-gray-700 hover:text-red-600 transition-colors font-medium"
                >
                  ログイン
                </button>
                <button
                  onClick={() => handleAuthClick('signup')}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  新規登録
                </button>
              </div>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <SafeIcon icon={isMenuOpen ? FiX : FiMenu} className="w-6 h-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-red-600 transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                ホーム
              </Link>
              <Link
                to="/search"
                className="text-gray-700 hover:text-red-600 transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                物件検索
              </Link>
              <Link
                to="/map"
                className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                <SafeIcon icon={FiMapPin} className="w-4 h-4" />
                <span>マップ検索</span>
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-red-600 transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                会社概要
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-red-600 transition-colors px-2 py-1"
                onClick={() => setIsMenuOpen(false)}
              >
                お問い合わせ
              </Link>
              
              {/* Mobile Auth Section */}
              {loading ? (
                <div className="px-2 py-1">
                  <div className="w-full h-8 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ) : user ? (
                <div className="px-2 py-1 border-t pt-4">
                  <UserMenu />
                </div>
              ) : (
                <div className="flex flex-col space-y-2 px-2 pt-4 border-t">
                  <button
                    onClick={() => {
                      handleAuthClick('signin');
                      setIsMenuOpen(false);
                    }}
                    className="text-left text-gray-700 hover:text-red-600 transition-colors py-1"
                  >
                    ログイン
                  </button>
                  <button
                    onClick={() => {
                      handleAuthClick('signup');
                      setIsMenuOpen(false);
                    }}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-center"
                  >
                    新規登録
                  </button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultMode={authMode}
      />
    </header>
  );
};

export default Header;