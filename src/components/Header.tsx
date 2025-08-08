import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Menu, X, User, LogOut, Crown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { AuthModal } from './AuthModal';
import { UserProfile } from './UserProfile';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showUserProfile, setShowUserProfile] = useState(false);
  const location = useLocation();
  const { user, signOut, subscription, isAdmin } = useAuth();

  const navigation = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Progress', href: '/progress' },
    { name: 'Tools', href: '/tools' },
    { name: 'Community', href: '/community' },
    { name: 'Build App', href: '/build-app' },
    { name: 'Marketing Vault', href: '/marketing-vault' },
  ];

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const getCurrentTierName = () => {
    if (isAdmin) return 'Admin';
    if (!subscription) return 'Free';
    return subscription.tier?.name || 'Free';
  };

  const getTierColor = () => {
    if (isAdmin) return 'text-red-600';
    const tierName = getCurrentTierName().toLowerCase();
    if (tierName === 'premium') return 'text-purple-600';
    if (tierName === 'pro') return 'text-blue-600';
    return 'text-slate-600';
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <span className="text-xl font-bold text-gray-900">BookApp Builder</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.href
                      ? 'text-indigo-600 bg-indigo-50'
                      : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-3">
                  {/* Subscription Badge */}
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                    isAdmin ? 'bg-red-100 text-red-700' :
                    getCurrentTierName() === 'Premium' ? 'bg-purple-100 text-purple-700' :
                    getCurrentTierName() === 'Pro' ? 'bg-blue-100 text-blue-700' :
                    'bg-slate-100 text-slate-700'
                  }`}>
                    {isAdmin && <Crown className="w-3 h-3" />}
                    <span>{getCurrentTierName()}</span>
                  </div>
                  
                  <button
                    onClick={() => setShowUserProfile(true)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 transition-colors"
                  >
                    <User className="h-5 w-5" />
                    <span className="hidden sm:block text-sm font-medium">
                      {user.user_metadata?.full_name || user.email}
                    </span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700 transition-colors"
                >
                  Sign In
                </button>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-200">
              <nav className="flex flex-col space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      location.pathname === item.href
                        ? 'text-indigo-600 bg-indigo-50'
                        : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
                {user && (
                  <div className="px-3 py-2">
                    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${
                      isAdmin ? 'bg-red-100 text-red-700' :
                      getCurrentTierName() === 'Premium' ? 'bg-purple-100 text-purple-700' :
                      getCurrentTierName() === 'Pro' ? 'bg-blue-100 text-blue-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {isAdmin && <Crown className="w-3 h-3" />}
                      <span>{getCurrentTierName()}</span>
                    </div>
                  </div>
                )}
                {user && (
                  <button
                    onClick={handleSignOut}
                    className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Sign Out</span>
                  </button>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal onClose={() => setShowAuthModal(false)} />
      )}

      {/* User Profile Modal */}
      {showUserProfile && (
        <UserProfile onClose={() => setShowUserProfile(false)} />
      )}
    </>
  );
};

export default Header;