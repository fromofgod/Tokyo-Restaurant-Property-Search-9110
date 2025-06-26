import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon.jsx';
import { useAuth } from '../hooks/useAuth.jsx';

const { FiX, FiMail, FiLock, FiUser, FiEye, FiEyeOff } = FiIcons;

const AuthModal = ({ isOpen, onClose, defaultMode = 'signin' }) => {
  const [mode, setMode] = useState(defaultMode); // 'signin' or 'signup'
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  const { signInWithGoogle, signInWithEmail, signUpWithEmail } = useAuth();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
  };

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError('');
      
      const { error } = await signInWithGoogle();
      
      if (error) {
        if (error.message.includes('Mock mode') || error.message.includes('unavailable')) {
          setError('認証機能は現在開発中です。メール認証をお試しください。');
        } else {
          setError('Googleログインに失敗しました。もう一度お試しください。');
        }
      } else {
        onClose();
      }
    } catch (err) {
      setError('認証機能は現在開発中です。メール認証をお試しください。');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (mode === 'signin') {
        const { error } = await signInWithEmail(formData.email, formData.password);
        if (error) {
          if (error.message.includes('Mock mode') || error.message.includes('unavailable')) {
            setError('認証機能は現在開発中です。');
          } else {
            setError('メールアドレスまたはパスワードが正しくありません。');
          }
        } else {
          onClose();
        }
      } else {
        const { error } = await signUpWithEmail(
          formData.email, 
          formData.password,
          { name: formData.name }
        );
        if (error) {
          if (error.message.includes('Mock mode') || error.message.includes('unavailable')) {
            setError('認証機能は現在開発中です。');
          } else {
            setError('アカウント作成に失敗しました。もう一度お試しください。');
          }
        } else {
          setError('');
          alert('確認メールを送信しました。メールを確認してアカウントを有効化してください。');
          onClose();
        }
      }
    } catch (err) {
      setError('認証機能は現在開発中です。');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <SafeIcon icon={FiX} className="w-5 h-5 text-gray-500" />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">i</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {mode === 'signin' ? 'ログイン' : 'アカウント作成'}
            </h2>
            <p className="text-gray-600">
              {mode === 'signin' 
                ? 'アカウントにログインして物件をお気に入り登録' 
                : '新しいアカウントを作成して始めましょう'
              }
            </p>
          </div>

          {/* Development Notice */}
          <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded-lg text-sm mb-4">
            <p className="font-medium">開発版のお知らせ</p>
            <p>現在、認証機能は開発中です。実際のログイン機能はSupabaseプロジェクト接続後に利用可能になります。</p>
          </div>

          {/* Google Sign In Button */}
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 py-3 px-4 rounded-lg font-semibold transition-colors duration-200 flex items-center justify-center space-x-3 mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            <span>Googleでログイン</span>
          </button>

          {/* Divider */}
          <div className="relative flex items-center justify-center mb-4">
            <div className="border-t border-gray-300 w-full"></div>
            <span className="bg-white px-3 text-gray-500 text-sm">または</span>
          </div>

          {/* Email Form */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  お名前
                </label>
                <div className="relative">
                  <SafeIcon 
                    icon={FiUser} 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" 
                  />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    placeholder="山田太郎"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                メールアドレス
              </label>
              <div className="relative">
                <SafeIcon 
                  icon={FiMail} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" 
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="example@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                パスワード
              </label>
              <div className="relative">
                <SafeIcon 
                  icon={FiLock} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" 
                />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  minLength={6}
                  className="w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="6文字以上で入力"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <SafeIcon icon={showPassword ? FiEyeOff : FiEye} className="w-5 h-5" />
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '処理中...' : (mode === 'signin' ? 'ログイン' : 'アカウント作成')}
            </button>
          </form>

          {/* Toggle Mode */}
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              {mode === 'signin' ? 'アカウントをお持ちでない方は' : 'すでにアカウントをお持ちの方は'}
              <button
                onClick={() => {
                  setMode(mode === 'signin' ? 'signup' : 'signin');
                  setError('');
                  setFormData({ email: '', password: '', name: '' });
                }}
                className="ml-1 text-red-600 hover:text-red-700 font-semibold"
              >
                {mode === 'signin' ? '新規登録' : 'ログイン'}
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;