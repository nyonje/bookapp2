import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, Clock, Target, BookOpen, Users, Zap, Star, ArrowRight } from 'lucide-react';
import { useProgress } from '../contexts/ProgressContext';

interface Recommendation {
  id: string;
  type: 'chapter' | 'tool' | 'quiz' | 'community' | 'resource';
  title: string;
  description: string;
  reason: string;
  priority: 'high' | 'medium' | 'low';
  estimatedTime: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  icon: React.ElementType;
}

interface UserBehavior {
  readingSpeed: number;
  quizPerformance: number;
  toolUsage: number;
  communityEngagement: number;
  preferredTime: string;
  learningStyle: 'visual' | 'auditory' | 'kinesthetic' | 'reading';
}

export function SmartRecommendations() {
  const { progress } = useProgress();
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [userBehavior, setUserBehavior] = useState<UserBehavior | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [selectedRecommendation, setSelectedRecommendation] = useState<Recommendation | null>(null);

  useEffect(() => {
    // Simulate AI analysis
    setTimeout(() => {
      analyzeUserBehavior();
      generateRecommendations();
      setIsAnalyzing(false);
    }, 2000);
  }, []);

  const analyzeUserBehavior = () => {
    // Analyze user progress and behavior patterns
    const completedChapters = Object.values(progress).filter(p => p.completed).length;
    const totalTimeSpent = Object.values(progress).reduce((total, p) => total + (p.timeSpent || 0), 0);
    const quizScores = Object.values(progress).filter(p => p.quizScore !== undefined).map(p => p.quizScore || 0);
    const averageQuizScore = quizScores.length > 0 ? quizScores.reduce((a, b) => a + b, 0) / quizScores.length : 0;

    // Determine learning style based on behavior
    const toolUsage = Object.values(progress).reduce((total, p) => total + (p.toolsUsed?.length || 0), 0);
    const hasAudioUsage = Object.values(progress).some(p => p.audioPlayed);
    
    let learningStyle: UserBehavior['learningStyle'] = 'reading';
    if (hasAudioUsage && toolUsage > 2) {
      learningStyle = 'kinesthetic';
    } else if (hasAudioUsage) {
      learningStyle = 'auditory';
    } else if (toolUsage > 3) {
      learningStyle = 'visual';
    }

    const behavior: UserBehavior = {
      readingSpeed: completedChapters > 0 ? totalTimeSpent / completedChapters : 0,
      quizPerformance: averageQuizScore,
      toolUsage: toolUsage,
      communityEngagement: 0.3, // Simulated
      preferredTime: 'morning', // Simulated
      learningStyle
    };

    setUserBehavior(behavior);
  };

  const generateRecommendations = () => {
    const allRecommendations: Recommendation[] = [
      // Chapter-based recommendations
      {
        id: 'rec-1',
        type: 'chapter',
        title: 'Continue to Chapter 2',
        description: 'Based on your strong performance in Chapter 1, you\'re ready to dive deeper into the business case for companion apps.',
        reason: 'High quiz performance (85%) and quick completion time',
        priority: 'high',
        estimatedTime: 25,
        difficulty: 'intermediate',
        tags: ['business-case', 'roi', 'next-step'],
        icon: BookOpen
      },
      {
        id: 'rec-2',
        type: 'tool',
        title: 'Business Case Calculator',
        description: 'Perfect timing to calculate the ROI for your specific book and audience.',
        reason: 'You\'re in Chapter 2 and this tool will help you understand the financial impact',
        priority: 'high',
        estimatedTime: 15,
        difficulty: 'beginner',
        tags: ['calculator', 'roi', 'business'],
        icon: TrendingUp
      },
      {
        id: 'rec-3',
        type: 'quiz',
        title: 'Chapter 1 Review Quiz',
        description: 'Reinforce your understanding with our adaptive quiz system.',
        reason: 'You completed Chapter 1 but haven\'t taken the quiz yet',
        priority: 'medium',
        estimatedTime: 10,
        difficulty: 'beginner',
        tags: ['review', 'reinforcement', 'assessment'],
        icon: Target
      },
      {
        id: 'rec-4',
        type: 'community',
        title: 'Join the Discussion',
        description: 'Connect with other authors who are building companion apps.',
        reason: 'You haven\'t engaged with the community yet - great opportunity to learn from peers',
        priority: 'medium',
        estimatedTime: 20,
        difficulty: 'beginner',
        tags: ['community', 'networking', 'peer-learning'],
        icon: Users
      },
      {
        id: 'rec-5',
        type: 'resource',
        title: 'App Planning Worksheet',
        description: 'Start planning your companion app with our comprehensive worksheet.',
        reason: 'You\'re showing strong engagement - time to start planning your own app',
        priority: 'medium',
        estimatedTime: 30,
        difficulty: 'intermediate',
        tags: ['planning', 'worksheet', 'strategy'],
        icon: BookOpen
      },
      {
        id: 'rec-6',
        type: 'tool',
        title: 'Reader Engagement Audit',
        description: 'Assess your current reader engagement and identify improvement opportunities.',
        reason: 'Based on your learning style, you prefer hands-on tools',
        priority: 'low',
        estimatedTime: 20,
        difficulty: 'intermediate',
        tags: ['audit', 'engagement', 'assessment'],
        icon: TrendingUp
      }
    ];

    // Filter and prioritize recommendations based on user behavior
    const filteredRecommendations = allRecommendations.filter(rec => {
      // Don't recommend completed items
      if (rec.type === 'chapter' && progress[2]?.completed) return false;
      if (rec.type === 'quiz' && progress[1]?.quizCompleted) return false;
      return true;
    });

    // Sort by priority and relevance
    const sortedRecommendations = filteredRecommendations.sort((a, b) => {
      const priorityOrder = { high: 3, medium: 2, low: 1 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });

    setRecommendations(sortedRecommendations);
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-slate-600 bg-slate-100';
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'text-green-600 bg-green-100';
      case 'intermediate': return 'text-yellow-600 bg-yellow-100';
      case 'advanced': return 'text-red-600 bg-red-100';
      default: return 'text-slate-600 bg-slate-100';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'chapter': return BookOpen;
      case 'tool': return TrendingUp;
      case 'quiz': return Target;
      case 'community': return Users;
      case 'resource': return BookOpen;
      default: return BookOpen;
    }
  };

  if (isAnalyzing) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Brain className="w-8 h-8 text-purple-600" />
            <h2 className="text-2xl font-bold text-slate-900">AI Analysis</h2>
          </div>
          <p className="text-slate-600">Analyzing your learning patterns and preferences...</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
          <div className="flex items-center justify-center space-x-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
            <div>
              <div className="text-lg font-semibold text-slate-900">Processing Your Data</div>
              <div className="text-sm text-slate-600">Understanding your learning style and preferences</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Brain className="w-8 h-8 text-purple-600" />
          <h2 className="text-2xl font-bold text-slate-900">Smart Recommendations</h2>
        </div>
        <p className="text-slate-600">AI-powered suggestions based on your learning patterns</p>
      </div>

      {/* Learning Profile */}
      {userBehavior && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center space-x-2">
            <Zap className="w-5 h-5 text-blue-600" />
            <span>Your Learning Profile</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600 capitalize">{userBehavior.learningStyle}</div>
              <div className="text-sm text-slate-600">Learning Style</div>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">{Math.round(userBehavior.quizPerformance)}%</div>
              <div className="text-sm text-slate-600">Quiz Performance</div>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">{userBehavior.toolUsage}</div>
              <div className="text-sm text-slate-600">Tools Used</div>
            </div>
            <div className="text-center p-4 bg-slate-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600 capitalize">{userBehavior.preferredTime}</div>
              <div className="text-sm text-slate-600">Preferred Time</div>
            </div>
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-slate-900 flex items-center space-x-2">
          <Star className="w-5 h-5 text-yellow-600" />
          <span>Recommended for You</span>
        </h3>

        {recommendations.map((recommendation) => {
          const Icon = recommendation.icon;
          
          return (
            <div
              key={recommendation.id}
              className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer"
              onClick={() => setSelectedRecommendation(recommendation)}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Icon className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="font-semibold text-slate-900">{recommendation.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(recommendation.priority)}`}>
                      {recommendation.priority} priority
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(recommendation.difficulty)}`}>
                      {recommendation.difficulty}
                    </span>
                  </div>
                  
                  <p className="text-slate-600 mb-3">{recommendation.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-sm text-slate-500">
                      <span className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{recommendation.estimatedTime} min</span>
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="text-purple-600 font-medium">{recommendation.reason}</span>
                    </div>
                    
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Recommendation Details */}
      {selectedRecommendation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Recommendation Details</h3>
                <button
                  onClick={() => setSelectedRecommendation(null)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <selectedRecommendation.icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">{selectedRecommendation.title}</h4>
                    <p className="text-slate-600">{selectedRecommendation.description}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-slate-700">Priority:</span>
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedRecommendation.priority)}`}>
                      {selectedRecommendation.priority}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">Difficulty:</span>
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(selectedRecommendation.difficulty)}`}>
                      {selectedRecommendation.difficulty}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">Estimated Time:</span>
                    <span className="ml-2 text-slate-600">{selectedRecommendation.estimatedTime} minutes</span>
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">Type:</span>
                    <span className="ml-2 text-slate-600 capitalize">{selectedRecommendation.type}</span>
                  </div>
                </div>
                
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h5 className="font-medium text-purple-900 mb-2">Why This Recommendation?</h5>
                  <p className="text-purple-800 text-sm">{selectedRecommendation.reason}</p>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {selectedRecommendation.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={() => setSelectedRecommendation(null)}
                    className="px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors duration-200"
                  >
                    Close
                  </button>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200">
                    Start Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 