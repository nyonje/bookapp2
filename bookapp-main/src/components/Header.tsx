import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BookOpen, Users, Trophy, Wrench, Home } from 'lucide-react';

export function Header() {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/tools', icon: Wrench, label: 'Tools' },
    { path: '/community', icon: Users, label: 'Community' },
    { path: '/progress', icon: Trophy, label: 'Progress' },
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
          </nav>
        </div>
      </div>
    </header>
  );
}