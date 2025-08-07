import React from 'react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Users, Trophy, Wrench, Home, Sparkles, Search, Target, User, LogIn } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { AuthModal } from './AuthModal';
import { UserProfile } from './UserProfile';

export function Header() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  const { user, loading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/tools', icon: Wrench, label: 'Tools' },
    { path: '/build-app', icon: Sparkles, label: 'Build App' },
    { path: '/marketing-vault', icon: Target, label: 'Marketing Vault' },
    { path: '/community', icon: Users, label: 'Community' },
    { path: '/progress', icon: Trophy, label: 'Progress' },
    { path: '/search', icon: Search, label: 'Search' },
  ];

  const handleAuthClick = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-slate-900">BookApp Builder</h1>
              <p className="text-xs text-slate-500">Transform Your Book</p>
            </div>
          </Link>

          <nav className="flex items-center space-x-1">
            {isLandingPage ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/dashboard"
                  className="text-slate-600 hover:text-slate-900 font-medium transition-colors duration-200"
                >
                  Get Started
                </Link>
                <Link
                  to="/community"
                  className="text-slate-600 hover:text-slate-900 font-medium transition-colors duration-200"
                >
                  Community
                  {user ? (
                    <Link
                      to="/dashboard"
                      className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                    >
                      Dashboard
                    </Link>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleAuthClick('signin')}
                        className="px-4 py-2 text-slate-600 hover:text-slate-900 font-medium transition-colors duration-200"
                      >
                        Sign In
                      </button>
                      <button
                        onClick={() => handleAuthClick('signup')}
                        className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                      >
                        Get Started
                      </button>
                    </div>
                  )}
                </Link>
              </div>
                <div className="flex items-center space-x-1">
                  {navItems.map(({ path, icon: Icon, label }) => (
                    <Link
                      key={path}
                      to={path}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                        location.pathname === path
                          ? 'bg-blue-100 text-blue-700 font-medium'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="hidden sm:block text-sm">{label}</span>
                    </Link>
                  ))}
                  
                  {/* User Menu */}
                  <div className="ml-4 pl-4 border-l border-slate-200">
                    {loading ? (
                      <div className="w-8 h-8 bg-slate-100 rounded-full animate-pulse"></div>
                    ) : user ? (
                      <button
                        onClick={() => setShowProfile(true)}
                        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors duration-200"
                      >
                        {user.avatar_url ? (
                          <img
                            src={user.avatar_url}
                            alt={user.full_name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-blue-600" />
                          </div>
                        )}
                        <span className="hidden sm:block text-sm font-medium text-slate-700">
                          {user.full_name}
                        </span>
                      </button>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleAuthClick('signin')}
                          className="flex items-center space-x-2 px-3 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors duration-200"
                        >
                          <LogIn className="w-4 h-4" />
                          <span className="hidden sm:block text-sm">Sign In</span>
                        </button>
                        <button
                          onClick={() => handleAuthClick('signup')}
                          className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                        >
                          Sign Up
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </nav>
        </div>
      </div>
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultMode={authMode}
      />

      {/* User Profile Modal */}
      <UserProfile
        isOpen={showProfile}
        onClose={() => setShowProfile(false)}
      />
    </>
  );
}