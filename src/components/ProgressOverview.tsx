import React from 'react';
import { Trophy, Target, Clock, Users } from 'lucide-react';
import { useProgress } from '../contexts/ProgressContext';

export function ProgressOverview() {
  const { getTotalProgress } = useProgress();
  const progress = getTotalProgress();

  const stats = [
    {
      icon: Trophy,
      label: 'Chapters Completed',
      value: `${progress.completedChapters}/5`,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      icon: Target,
      label: 'Overall Progress',
      value: `${Math.round(progress.overallProgress)}%`,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      icon: Clock,
      label: 'Time Invested',
      value: `${Math.round(progress.totalTimeSpent)} min`,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
    {
      icon: Users,
      label: 'Tools Used',
      value: `${progress.toolsUsed}/12`,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
      <h2 className="text-xl font-bold text-slate-900 mb-6">Your Progress</h2>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center mx-auto mb-3`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
            <div className="text-sm text-slate-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Overall Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-slate-600">Overall Book Progress</span>
          <span className="font-medium text-slate-900">
            {Math.round(progress.overallProgress)}%
          </span>
        </div>
        <div className="bg-slate-100 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress.overallProgress}%` }}
          />
        </div>
      </div>
    </div>
  );
}