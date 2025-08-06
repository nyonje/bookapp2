import React, { useState } from 'react';
import { Trophy, Target, Clock, Users, BookOpen, Award, TrendingUp, Calendar } from 'lucide-react';
import { useProgress } from '../contexts/ProgressContext';
import { ProgressMap } from '../components/ProgressMap';
import { GoalTracker } from '../components/GoalTracker';
import { SmartRecommendations } from '../components/SmartRecommendations';
import { AnalyticsDashboard } from '../components/AnalyticsDashboard';

export function Progress() {
  const { getTotalProgress } = useProgress();
  const progress = getTotalProgress();
  const [activeTab, setActiveTab] = useState<'overview' | 'journey' | 'goals' | 'recommendations' | 'analytics'>('overview');

  const achievements = [
    {
      id: 1,
      title: "First Steps",
      description: "Started your app building journey",
      icon: BookOpen,
      completed: true,
      date: "2 days ago"
    },
    {
      id: 2,
      title: "Quiz Master", 
      description: "Completed your first chapter quiz",
      icon: Award,
      completed: true,
      date: "1 day ago"
    },
    {
      id: 3,
      title: "Tool User",
      description: "Used your first practical tool",
      icon: Users,
      completed: progress.toolsUsed > 0,
      date: progress.toolsUsed > 0 ? "Today" : "Not yet"
    },
    {
      id: 4,
      title: "Halfway Hero",
      description: "Completed 50% of the book",
      icon: Target,
      completed: progress.overallProgress >= 50,
      date: progress.overallProgress >= 50 ? "Today" : "Not yet"
    },
    {
      id: 5,
      title: "Speed Reader",
      description: "Spent 2+ hours learning",
      icon: Clock,
      completed: progress.totalTimeSpent >= 120,
      date: progress.totalTimeSpent >= 120 ? "Today" : "Not yet"
    },
    {
      id: 6,
      title: "Completion Champion",
      description: "Finished the entire book",
      icon: Trophy,
      completed: progress.completedChapters === 5,
      date: progress.completedChapters === 5 ? "Today" : "Not yet"
    }
  ];

  const weeklyGoals = [
    {
      goal: "Complete 2 chapters",
      progress: Math.min(100, (progress.completedChapters / 2) * 100),
      current: progress.completedChapters,
      target: 2
    },
    {
      goal: "Use 3 practical tools", 
      progress: Math.min(100, (progress.toolsUsed / 3) * 100),
      current: progress.toolsUsed,
      target: 3
    },
    {
      goal: "Study for 3 hours",
      progress: Math.min(100, (progress.totalTimeSpent / 180) * 100),
      current: Math.round(progress.totalTimeSpent),
      target: 180
    }
  ];

  const completedAchievements = achievements.filter(a => a.completed).length;

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Your Learning Progress</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Track your journey through the book, celebrate achievements, and stay motivated with your learning goals.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="flex bg-slate-100 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-6 py-2 rounded-md font-medium transition-colors duration-200 ${
              activeTab === 'overview'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Progress Overview
          </button>
          <button
            onClick={() => setActiveTab('journey')}
            className={`px-6 py-2 rounded-md font-medium transition-colors duration-200 ${
              activeTab === 'journey'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Learning Journey
          </button>
          <button
            onClick={() => setActiveTab('goals')}
            className={`px-6 py-2 rounded-md font-medium transition-colors duration-200 ${
              activeTab === 'goals'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Goals & Habits
          </button>
          <button
            onClick={() => setActiveTab('recommendations')}
            className={`px-6 py-2 rounded-md font-medium transition-colors duration-200 ${
              activeTab === 'recommendations'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            AI Recommendations
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-6 py-2 rounded-md font-medium transition-colors duration-200 ${
              activeTab === 'analytics'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Analytics
          </button>
        </div>
      </div>

      {activeTab === 'overview' ? (
        <>
          {/* Overall Progress */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">{Math.round(progress.overallProgress)}%</div>
            <div className="text-blue-100">Book Completion</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">{progress.completedChapters}/5</div>
            <div className="text-blue-100">Chapters Done</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">{Math.round(progress.totalTimeSpent)}m</div>
            <div className="text-blue-100">Time Invested</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">{completedAchievements}/6</div>
            <div className="text-blue-100">Achievements</div>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-blue-100">Overall Progress</span>
            <span className="text-white font-medium">{Math.round(progress.overallProgress)}%</span>
          </div>
          <div className="bg-blue-500 rounded-full h-3">
            <div 
              className="bg-white h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress.overallProgress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly Goals */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-green-100 rounded-lg">
              <Target className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900">Weekly Goals</h3>
              <p className="text-slate-600 text-sm">Stay on track with your learning objectives</p>
            </div>
          </div>

          <div className="space-y-4">
            {weeklyGoals.map((goal, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-700 font-medium">{goal.goal}</span>
                  <span className="text-slate-500">
                    {goal.goal.includes('hours') ? `${goal.current}m` : goal.current} / {goal.goal.includes('hours') ? `${goal.target}m` : goal.target}
                  </span>
                </div>
                <div className="bg-slate-100 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${goal.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Trophy className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900">Achievements</h3>
              <p className="text-slate-600 text-sm">Celebrate your learning milestones</p>
            </div>
          </div>

          <div className="space-y-3">
            {achievements.map((achievement) => (
              <div key={achievement.id} className={`flex items-center space-x-4 p-3 rounded-lg ${
                achievement.completed ? 'bg-green-50 border border-green-200' : 'bg-slate-50 border border-slate-200'
              }`}>
                <div className={`p-2 rounded-lg ${
                  achievement.completed ? 'bg-green-100' : 'bg-slate-100'
                }`}>
                  <achievement.icon className={`w-5 h-5 ${
                    achievement.completed ? 'text-green-600' : 'text-slate-400'
                  }`} />
                </div>
                <div className="flex-1">
                  <div className={`font-medium ${
                    achievement.completed ? 'text-green-900' : 'text-slate-500'
                  }`}>
                    {achievement.title}
                  </div>
                  <div className={`text-sm ${
                    achievement.completed ? 'text-green-700' : 'text-slate-400'
                  }`}>
                    {achievement.description}
                  </div>
                </div>
                <div className={`text-xs ${
                  achievement.completed ? 'text-green-600' : 'text-slate-400'
                }`}>
                  {achievement.date}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Learning Streak */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-slate-900">Learning Streak</h3>
              <p className="text-slate-600 text-sm">Keep your momentum going</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-orange-600">3</div>
            <div className="text-sm text-slate-600">days in a row</div>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: 7 }, (_, i) => (
            <div key={i} className="text-center">
              <div className="text-xs text-slate-500 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][i]}
              </div>
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-medium ${
                i < 3 ? 'bg-orange-100 text-orange-600' : 
                i === 3 ? 'bg-orange-600 text-white' : 'bg-slate-100 text-slate-400'
              }`}>
                {i < 4 ? '✓' : '·'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-8 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <TrendingUp className="w-8 h-8" />
          <h3 className="text-2xl font-bold">What's Next?</h3>
        </div>
        <p className="text-purple-100 mb-6">
          You're making great progress! Here are some recommendations to keep your momentum going.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-purple-500 rounded-lg p-4">
            <h4 className="font-semibold mb-2">Continue Learning</h4>
            <p className="text-sm text-purple-100">
              {progress.completedChapters < 5 
                ? `Complete Chapter ${progress.completedChapters + 1} to keep building your knowledge.`
                : "Explore the community resources and start planning your app!"
              }
            </p>
          </div>
          <div className="bg-purple-500 rounded-lg p-4">
            <h4 className="font-semibold mb-2">Join the Community</h4>
            <p className="text-sm text-purple-100">
              Share your progress and get feedback from other app builders in our community.
            </p>
          </div>
        </div>
      </div>
        </>
      ) : activeTab === 'journey' ? (
        <ProgressMap />
      ) : activeTab === 'goals' ? (
        <GoalTracker />
      ) : activeTab === 'recommendations' ? (
        <SmartRecommendations />
      ) : (
        <AnalyticsDashboard />
      )}
    </div>
  );
}