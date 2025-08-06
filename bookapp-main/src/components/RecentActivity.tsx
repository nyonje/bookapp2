import React from 'react';
import { CheckCircle, MessageCircle, Wrench, Clock } from 'lucide-react';

export function RecentActivity() {
  const activities = [
    {
      icon: CheckCircle,
      text: 'Completed Chapter 1 quiz',
      time: '2 hours ago',
      color: 'text-green-600',
    },
    {
      icon: Wrench,
      text: 'Used App Planning Worksheet',
      time: '1 day ago', 
      color: 'text-blue-600',
    },
    {
      icon: MessageCircle,
      text: 'Posted in community discussion',
      time: '2 days ago',
      color: 'text-purple-600',
    },
    {
      icon: Clock,
      text: 'Started reading Chapter 2',
      time: '3 days ago',
      color: 'text-orange-600',
    },
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="p-1.5 bg-slate-50 rounded-lg">
              <activity.icon className={`w-4 h-4 ${activity.color}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-slate-900">{activity.text}</p>
              <p className="text-xs text-slate-500 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}