import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useAuth } from '../hooks/useAuth.jsx';

const { FiUser, FiHeart, FiSettings, FiLogOut, FiChevronDown } = FiIcons;

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsOpen(false);
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  if (!user) return null;

  const displayName = user.user_metadata?.name || user.email?.split('@')[0] || 'ユーザー';
  const avatar = user.user_metadata?.avatar_url;

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        {avatar ? (
          <img
            src={avatar}
            alt={displayName}
            className="w-8 h-8 rounded-full"
          />
        ) : (
          <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
            <SafeIcon icon={FiUser} className="w-4 h-4 text-white" />
          </div>
        )}
        <span className="text-sm font-medium text-gray-700 hidden sm:block">
          {displayName}
        </span>
        <SafeIcon 
          icon={FiChevronDown} 
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown Menu */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50"
            >
              {/* User Info */}
              <div className="px-4 py-3 border-b border-gray-100">
                <div className="flex items-center space-x-3">
                  {avatar ? (
                    <img
                      src={avatar}
                      alt={displayName}
                      className="w-10 h-10 rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                      <SafeIcon icon={FiUser} className="w-5 h-5 text-white" />
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-gray-900">{displayName}</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                <button className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors flex items-center space-x-3">
                  <SafeIcon icon={FiHeart} className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">お気に入り物件</span>
                </button>
                
                <button className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors flex items-center space-x-3">
                  <SafeIcon icon={FiUser} className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">プロフィール</span>
                </button>
                
                <button className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors flex items-center space-x-3">
                  <SafeIcon icon={FiSettings} className="w-4 h-4 text-gray-500" />
                  <span className="text-gray-700">設定</span>
                </button>
              </div>

              {/* Sign Out */}
              <div className="border-t border-gray-100 pt-2">
                <button
                  onClick={handleSignOut}
                  className="w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors flex items-center space-x-3 text-red-600"
                >
                  <SafeIcon icon={FiLogOut} className="w-4 h-4" />
                  <span>ログアウト</span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserMenu;