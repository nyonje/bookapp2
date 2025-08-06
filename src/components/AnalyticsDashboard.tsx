import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Clock, Target, Users, Activity, Calendar, Zap, Award, Brain } from 'lucide-react';
import { useProgress } from '../contexts/ProgressContext';

interface AnalyticsData {
  learningMetrics: {
    totalTimeSpent: number;
    averageSessionLength: number;
    completionRate: number;
    retentionRate: number;
  };
  performanceMetrics: {
    averageQuizScore: number;
    toolEngagement: number;
    communityParticipation: number;
    goalAchievement: number;
  };
  behavioralPatterns: {
    preferredTime: string;
    learningStyle: string;
    engagementTrend: 'increasing' | 'stable' | 'decreasing';
    consistencyScore: number;
  };
  predictions: {
    estimatedCompletionDate: string;
    successProbability: number;
    recommendedActions: string[];
  };
}

export function AnalyticsDashboard() {
  const { progress } = useProgress();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'performance' | 'behavior' | 'predictions'>('overview');

  useEffect(() => {
    // Simulate data processing
    setTimeout(() => {
      generateAnalyticsData();
      setIsLoading(false);
    }, 1500);
  }, []);

  const generateAnalyticsData = () => {
    const completedChapters = Object.values(progress).filter(p => p.completed).length;
    const totalTimeSpent = Object.values(progress).reduce((total, p) => total + (p.timeSpent || 0), 0);
    const quizScores = Object.values(progress).filter(p => p.quizScore !== undefined).map(p => p.quizScore || 0);
    const averageQuizScore = quizScores.length > 0 ? quizScores.reduce((a, b) => a + b, 0) / quizScores.length : 0;
    const toolUsage = Object.values(progress).reduce((total, p) => total + (p.toolsUsed?.length || 0), 0);

    const data: AnalyticsData = {
      learningMetrics: {
        totalTimeSpent: totalTimeSpent,
        averageSessionLength: totalTimeSpent / Math.max(completedChapters, 1),
        completionRate: (completedChapters / 5) * 100,
        retentionRate: averageQuizScore > 80 ? 95 : averageQuizScore > 60 ? 75 : 50
      },
      performanceMetrics: {
        averageQuizScore: averageQuizScore,
        toolEngagement: toolUsage,
        communityParticipation: 0.3, // Simulated
        goalAchievement: completedChapters > 0 ? 80 : 0
      },
      behavioralPatterns: {
        preferredTime: 'morning',
        learningStyle: toolUsage > 2 ? 'hands-on' : 'reading',
        engagementTrend: completedChapters > 2 ? 'increasing' : 'stable',
        consistencyScore: completedChapters > 0 ? 85 : 0
      },
      predictions: {
        estimatedCompletionDate: new Date(Date.now() + (5 - completedChapters) * 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
        successProbability: averageQuizScore > 80 ? 95 : averageQuizScore > 60 ? 75 : 50,
        recommendedActions: [
          'Complete Chapter 2 to maintain momentum',
          'Take the adaptive quiz to reinforce learning',
          'Use the Business Case Calculator tool',
          'Engage with the community forum'
        ]
      }
    };

    setAnalyticsData(data);
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'increasing': return 'text-green-600';
      case 'decreasing': return 'text-red-600';
      default: return 'text-yellow-600';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <BarChart3 className="w-8 h-8 text-blue-600" />
            <h2 className="text-2xl font-bold text-slate-900">Analytics Dashboard</h2>
          </div>
          <p className="text-slate-600">Processing your learning data...</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-center justify-center space-x-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <div>
              <div className="text-lg font-semibold text-slate-900">Analyzing Your Data</div>
              <div className="text-sm text-slate-600">Generating insights and predictions</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="text-center py-12">
        <BarChart3 className="w-12 h-12 text-slate-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-slate-900 mb-2">No Data Available</h3>
        <p className="text-slate-600">Start learning to see your analytics</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <BarChart3 className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-slate-900">Analytics Dashboard</h2>
        </div>
        <p className="text-slate-600">Comprehensive insights into your learning journey</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-slate-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
            activeTab === 'overview'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveTab('performance')}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
            activeTab === 'performance'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Performance
        </button>
        <button
          onClick={() => setActiveTab('behavior')}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
            activeTab === 'behavior'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Behavior
        </button>
        <button
          onClick={() => setActiveTab('predictions')}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
            activeTab === 'predictions'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Predictions
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="w-6 h-6 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold text-slate-900">{analyticsData.learningMetrics.totalTimeSpent}m</div>
                  <div className="text-sm text-slate-600">Total Time Spent</div>
                </div>
              </div>
              <div className="text-xs text-slate-500">Avg: {Math.round(analyticsData.learningMetrics.averageSessionLength)}m per session</div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Target className="w-6 h-6 text-green-600" />
                <div>
                  <div className="text-2xl font-bold text-slate-900">{Math.round(analyticsData.learningMetrics.completionRate)}%</div>
                  <div className="text-sm text-slate-600">Completion Rate</div>
                </div>
              </div>
              <div className="text-xs text-slate-500">On track for full completion</div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Award className="w-6 h-6 text-purple-600" />
                <div>
                  <div className={`text-2xl font-bold ${getScoreColor(analyticsData.performanceMetrics.averageQuizScore)}`}>
                    {Math.round(analyticsData.performanceMetrics.averageQuizScore)}%
                  </div>
                  <div className="text-sm text-slate-600">Quiz Performance</div>
                </div>
              </div>
              <div className="text-xs text-slate-500">Above average performance</div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Activity className="w-6 h-6 text-orange-600" />
                <div>
                  <div className="text-2xl font-bold text-slate-900">{analyticsData.performanceMetrics.toolEngagement}</div>
                  <div className="text-sm text-slate-600">Tools Used</div>
                </div>
              </div>
              <div className="text-xs text-slate-500">High engagement with tools</div>
            </div>
          </div>

          {/* Progress Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Learning Progress</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-700">Overall Progress</span>
                <span className="text-sm text-slate-600">{Math.round(analyticsData.learningMetrics.completionRate)}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${analyticsData.learningMetrics.completionRate}%` }}
                />
              </div>
              <div className="grid grid-cols-3 gap-4 text-center text-sm">
                <div>
                  <div className="font-semibold text-slate-900">{Math.round(analyticsData.learningMetrics.retentionRate)}%</div>
                  <div className="text-slate-600">Retention</div>
                </div>
                <div>
                  <div className="font-semibold text-slate-900">{Math.round(analyticsData.behavioralPatterns.consistencyScore)}%</div>
                  <div className="text-slate-600">Consistency</div>
                </div>
                <div>
                  <div className="font-semibold text-slate-900">{Math.round(analyticsData.predictions.successProbability)}%</div>
                  <div className="text-slate-600">Success Probability</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Performance Tab */}
      {activeTab === 'performance' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Quiz Performance */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center space-x-2">
                <Target className="w-5 h-5 text-blue-600" />
                <span>Quiz Performance</span>
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Average Score</span>
                  <span className={`font-semibold ${getScoreColor(analyticsData.performanceMetrics.averageQuizScore)}`}>
                    {Math.round(analyticsData.performanceMetrics.averageQuizScore)}%
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Performance Level</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    analyticsData.performanceMetrics.averageQuizScore >= 80 ? 'bg-green-100 text-green-700' :
                    analyticsData.performanceMetrics.averageQuizScore >= 60 ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {analyticsData.performanceMetrics.averageQuizScore >= 80 ? 'Excellent' :
                     analyticsData.performanceMetrics.averageQuizScore >= 60 ? 'Good' : 'Needs Improvement'}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Goal Achievement</span>
                  <span className="font-semibold text-slate-900">{analyticsData.performanceMetrics.goalAchievement}%</span>
                </div>
              </div>
            </div>

            {/* Engagement Metrics */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center space-x-2">
                <Activity className="w-5 h-5 text-green-600" />
                <span>Engagement Metrics</span>
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Tool Usage</span>
                  <span className="font-semibold text-slate-900">{analyticsData.performanceMetrics.toolEngagement} tools</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Community Participation</span>
                  <span className="font-semibold text-slate-900">{Math.round(analyticsData.performanceMetrics.communityParticipation * 100)}%</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Learning Consistency</span>
                  <span className="font-semibold text-slate-900">{Math.round(analyticsData.behavioralPatterns.consistencyScore)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Behavior Tab */}
      {activeTab === 'behavior' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Learning Patterns */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center space-x-2">
                <Brain className="w-5 h-5 text-purple-600" />
                <span>Learning Patterns</span>
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Learning Style</span>
                  <span className="font-semibold text-slate-900 capitalize">{analyticsData.behavioralPatterns.learningStyle}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Preferred Time</span>
                  <span className="font-semibold text-slate-900 capitalize">{analyticsData.behavioralPatterns.preferredTime}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Engagement Trend</span>
                  <span className={`font-semibold ${getTrendColor(analyticsData.behavioralPatterns.engagementTrend)}`}>
                    {analyticsData.behavioralPatterns.engagementTrend}
                  </span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Consistency Score</span>
                  <span className="font-semibold text-slate-900">{Math.round(analyticsData.behavioralPatterns.consistencyScore)}%</span>
                </div>
              </div>
            </div>

            {/* Session Analysis */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center space-x-2">
                <Clock className="w-5 h-5 text-orange-600" />
                <span>Session Analysis</span>
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Average Session</span>
                  <span className="font-semibold text-slate-900">{Math.round(analyticsData.learningMetrics.averageSessionLength)}m</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Total Sessions</span>
                  <span className="font-semibold text-slate-900">{Math.ceil(analyticsData.learningMetrics.totalTimeSpent / analyticsData.learningMetrics.averageSessionLength)}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Retention Rate</span>
                  <span className="font-semibold text-slate-900">{Math.round(analyticsData.learningMetrics.retentionRate)}%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Predictions Tab */}
      {activeTab === 'predictions' && (
        <div className="space-y-6">
          {/* Success Prediction */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center space-x-2">
              <Zap className="w-5 h-5 text-yellow-600" />
              <span>Success Prediction</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{Math.round(analyticsData.predictions.successProbability)}%</div>
                <div className="text-sm text-slate-600">Success Probability</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">{analyticsData.predictions.estimatedCompletionDate}</div>
                <div className="text-sm text-slate-600">Estimated Completion</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">4</div>
                <div className="text-sm text-slate-600">Recommended Actions</div>
              </div>
            </div>
          </div>

          {/* Recommended Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Recommended Actions</h3>
            
            <div className="space-y-3">
              {analyticsData.predictions.recommendedActions.map((action, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-600 text-sm font-medium">{index + 1}</span>
                  </div>
                  <p className="text-slate-700">{action}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Insights */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
            <h3 className="text-lg font-semibold mb-4">Performance Insights</h3>
            <div className="space-y-3">
              <p className="text-blue-100">
                • Your quiz performance is {analyticsData.performanceMetrics.averageQuizScore >= 80 ? 'excellent' : 'good'}, indicating strong comprehension
              </p>
              <p className="text-blue-100">
                • Tool engagement is high, showing you prefer hands-on learning
              </p>
              <p className="text-blue-100">
                • Estimated completion date: {analyticsData.predictions.estimatedCompletionDate}
              </p>
              <p className="text-blue-100">
                • Success probability: {Math.round(analyticsData.predictions.successProbability)}% based on current performance
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 