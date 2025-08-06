import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Users, Trophy, Wrench, Home, Sparkles, Search, Target } from 'lucide-react';

export function Header() {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Dashboard' },
    { path: '/tools', icon: Wrench, label: 'Tools' },
    { path: '/build-app', icon: Sparkles, label: 'Build App' },
    { path: '/marketing-vault', icon: Target, label: 'Marketing Vault' },
    { path: '/community', icon: Users, label: 'Community' },
    { path: '/progress', icon: Trophy, label: 'Progress' },
    { path: '/search', icon: Search, label: 'Search' },
  ];

  return (
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
                </Link>
                <Link
                  to="/dashboard"
                  className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Start Learning
                </Link>
              </div>
            ) : (
              navItems.map(({ path, icon: Icon, label }) => (
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
              ))
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}