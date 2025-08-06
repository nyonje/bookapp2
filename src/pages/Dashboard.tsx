import React from 'react';
import { Link } from 'react-router-dom';
import { ChapterCard } from '../components/ChapterCard';
import { ProgressOverview } from '../components/ProgressOverview';
import { RecentActivity } from '../components/RecentActivity';
import { QuickActions } from '../components/QuickActions';
import { chapters } from '../data/chapters';

export function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
        <h1 className="text-3xl font-bold mb-4">
          Welcome to Your Book Companion App Journey
        </h1>
        <p className="text-blue-100 text-lg leading-relaxed max-w-3xl">
          Transform passive reading into active learning. Follow along with interactive lessons, 
          practical tools, and a supportive community as you build your own book companion app.
        </p>
        <div className="mt-6">
          <Link
            to="/chapter/1"
            className="inline-flex items-center px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-200"
          >
            Start Your Journey
            <svg className="ml-2 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          <ProgressOverview />
          
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Chapters</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {chapters.map((chapter) => (
                <ChapterCard key={chapter.id} chapter={chapter} />
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <QuickActions />
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}