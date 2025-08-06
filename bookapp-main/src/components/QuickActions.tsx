import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, MessageCircle, BookOpen, Calculator } from 'lucide-react';

export function QuickActions() {
  const actions = [
    {
      icon: BookOpen,
      label: 'Continue Reading',
      description: 'Pick up where you left off',
      href: '/chapter/1',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 hover:bg-blue-100',
    },
    {
      icon: Wrench,
      label: 'App Builder Tools',
      description: 'Access planning worksheets',
      href: '/tools',
      color: 'text-green-600',
      bgColor: 'bg-green-50 hover:bg-green-100',
    },
    {
      icon: MessageCircle,
      label: 'Join Discussion',
      description: 'Connect with other builders',
      href: '/community',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 hover:bg-purple-100',
    },
    {
      icon: Calculator,
      label: 'Cost Calculator',
      description: 'Estimate your app budget',
      href: '/tools#cost-calculator',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50 hover:bg-orange-100',
    },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
      <div className="space-y-3">
        {actions.map((action) => (
          <Link
            key={action.label}
            to={action.href}
            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${action.bgColor}`}
          >
            <div className={`p-2 bg-white rounded-lg shadow-sm`}>
              <action.icon className={`w-4 h-4 ${action.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-slate-900 text-sm">{action.label}</div>
              <div className="text-xs text-slate-600 truncate">{action.description}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}