import React, { useState } from 'react';
import { CheckCircle, Circle, Star, Trophy, Award, Target, Clock, Zap, BookOpen, Wrench, Calculator, Settings, Calendar } from 'lucide-react';
import { useProgress } from '../contexts/ProgressContext';

interface Milestone {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  type: 'chapter' | 'quiz' | 'tool' | 'achievement';
  required: boolean;
  points: number;
}

interface ProgressMapProps {
  chapterId?: number;
}

export function ProgressMap({ chapterId }: ProgressMapProps) {
  const { progress } = useProgress();
  const [selectedMilestone, setSelectedMilestone] = useState<string | null>(null);

  const milestones: Milestone[] = [
    {
      id: 'chapter-1',
      title: 'Chapter 1: The Reading Crisis',
      description: 'Understanding the challenges modern readers face',
      icon: BookOpen,
      type: 'chapter',
      required: true,
      points: 100
    },
    {
      id: 'quiz-1',
      title: 'Chapter 1 Quiz',
      description: 'Test your understanding of the reading crisis',
      icon: Target,
      type: 'quiz',
      required: true,
      points: 50
    },
    {
      id: 'tool-1',
      title: 'Reader Engagement Audit',
      description: 'Assess your current reader engagement',
      icon: Wrench,
      type: 'tool',
      required: false,
      points: 75
    },
    {
      id: 'chapter-2',
      title: 'Chapter 2: Why Your Book Needs a Companion App',
      description: 'The business case for companion apps',
      icon: BookOpen,
      type: 'chapter',
      required: true,
      points: 100
    },
    {
      id: 'quiz-2',
      title: 'Chapter 2 Quiz',
      description: 'Test your understanding of companion app benefits',
      icon: Target,
      type: 'quiz',
      required: true,
      points: 50
    },
    {
      id: 'tool-2',
      title: 'Business Case Calculator',
      description: 'Calculate ROI for your companion app',
      icon: Calculator,
      type: 'tool',
      required: false,
      points: 75
    },
    {
      id: 'chapter-3',
      title: 'Chapter 3: What Makes a Great Book Companion App',
      description: 'The five pillars of successful apps',
      icon: BookOpen,
      type: 'chapter',
      required: true,
      points: 100
    },
    {
      id: 'quiz-3',
      title: 'Chapter 3 Quiz',
      description: 'Test your understanding of app pillars',
      icon: Target,
      type: 'quiz',
      required: true,
      points: 50
    },
    {
      id: 'tool-3',
      title: 'Feature Priority Matrix',
      description: 'Prioritize your app features',
      icon: Target,
      type: 'tool',
      required: false,
      points: 75
    },
    {
      id: 'chapter-4',
      title: 'Chapter 4: Essential Tools for Non-Technical Authors',
      description: 'AI-powered development tools',
      icon: BookOpen,
      type: 'chapter',
      required: true,
      points: 100
    },
    {
      id: 'quiz-4',
      title: 'Chapter 4 Quiz',
      description: 'Test your understanding of development tools',
      icon: Target,
      type: 'quiz',
      required: true,
      points: 50
    },
    {
      id: 'tool-4',
      title: 'Development Stack Selector',
      description: 'Choose your development stack',
      icon: Settings,
      type: 'tool',
      required: false,
      points: 75
    },
    {
      id: 'chapter-5',
      title: 'Chapter 5: Your 7-Week Launch Plan',
      description: 'Step-by-step launch strategy',
      icon: BookOpen,
      type: 'chapter',
      required: true,
      points: 100
    },
    {
      id: 'quiz-5',
      title: 'Chapter 5 Quiz',
      description: 'Test your understanding of launch planning',
      icon: Target,
      type: 'quiz',
      required: true,
      points: 50
    },
    {
      id: 'tool-5',
      title: 'Project Timeline Builder',
      description: 'Build your 7-week timeline',
      icon: Calendar,
      type: 'tool',
      required: false,
      points: 75
    },
    {
      id: 'achievement-1',
      title: 'First Steps',
      description: 'Complete your first chapter',
      icon: Star,
      type: 'achievement',
      required: false,
      points: 25
    },
    {
      id: 'achievement-2',
      title: 'Knowledge Seeker',
      description: 'Complete 3 quizzes with 80%+ score',
      icon: Award,
      type: 'achievement',
      required: false,
      points: 50
    },
    {
      id: 'achievement-3',
      title: 'Tool Master',
      description: 'Complete 3 interactive tools',
      icon: Trophy,
      type: 'achievement',
      required: false,
      points: 100
    },
    {
      id: 'achievement-4',
      title: 'App Architect',
      description: 'Generate your first app plan',
      icon: Zap,
      type: 'achievement',
      required: false,
      points: 200
    }
  ];

  const getMilestoneStatus = (milestone: Milestone) => {
    const chapterProgress = progress[parseInt(milestone.id.split('-')[1])] || {};
    
    switch (milestone.type) {
      case 'chapter':
        return chapterProgress.completed ? 'completed' : 'available';
      case 'quiz':
        return chapterProgress.quizCompleted ? 'completed' : 'available';
      case 'tool':
        return chapterProgress.toolsUsed?.length > 0 ? 'completed' : 'available';
      case 'achievement':
        // Check achievement conditions
        if (milestone.id === 'achievement-1') {
          return progress[1]?.completed ? 'completed' : 'locked';
        }
        if (milestone.id === 'achievement-2') {
          const completedQuizzes = Object.values(progress).filter(p => p.quizCompleted).length;
          return completedQuizzes >= 3 ? 'completed' : 'locked';
        }
        if (milestone.id === 'achievement-3') {
          const completedTools = Object.values(progress).reduce((total, p) => 
            total + (p.toolsUsed?.length || 0), 0);
          return completedTools >= 3 ? 'completed' : 'locked';
        }
        if (milestone.id === 'achievement-4') {
          return localStorage.getItem('appPlanGenerated') ? 'completed' : 'locked';
        }
        return 'locked';
      default:
        return 'locked';
    }
  };

  const getTotalPoints = () => {
    return milestones.reduce((total, milestone) => {
      const status = getMilestoneStatus(milestone);
      return status === 'completed' ? total + milestone.points : total;
    }, 0);
  };

  const getCompletionPercentage = () => {
    const completedMilestones = milestones.filter(m => getMilestoneStatus(m) === 'completed').length;
    return Math.round((completedMilestones / milestones.length) * 100);
  };

  const getMilestoneIcon = (milestone: Milestone, status: string) => {
    const Icon = milestone.icon;
    const baseClasses = "w-6 h-6";
    
    switch (status) {
      case 'completed':
        return <CheckCircle className={`${baseClasses} text-green-600`} />;
      case 'available':
        return <Circle className={`${baseClasses} text-blue-600`} />;
      case 'locked':
        return <Circle className={`${baseClasses} text-slate-300`} />;
      default:
        return <Icon className={`${baseClasses} text-slate-400`} />;
    }
  };

  const getMilestoneClasses = (status: string) => {
    const baseClasses = "flex items-center space-x-3 p-4 rounded-lg border transition-all duration-200 cursor-pointer";
    
    switch (status) {
      case 'completed':
        return `${baseClasses} bg-green-50 border-green-200 hover:bg-green-100`;
      case 'available':
        return `${baseClasses} bg-blue-50 border-blue-200 hover:bg-blue-100`;
      case 'locked':
        return `${baseClasses} bg-slate-50 border-slate-200 opacity-60`;
      default:
        return `${baseClasses} bg-slate-50 border-slate-200`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-slate-900">Your Learning Journey</h3>
          <div className="flex items-center space-x-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{getTotalPoints()}</div>
              <div className="text-sm text-slate-600">Total Points</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{getCompletionPercentage()}%</div>
              <div className="text-sm text-slate-600">Complete</div>
            </div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="w-full bg-slate-200 rounded-full h-3 mb-4">
          <div 
            className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${getCompletionPercentage()}%` }}
          ></div>
        </div>
        
        <div className="flex items-center justify-between text-sm text-slate-600">
          <span>Start your journey</span>
          <span>Complete all milestones</span>
        </div>
      </div>

      {/* Milestones Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {milestones.map((milestone) => {
          const status = getMilestoneStatus(milestone);
          const isSelected = selectedMilestone === milestone.id;
          
          return (
            <div
              key={milestone.id}
              className={getMilestoneClasses(status)}
              onClick={() => setSelectedMilestone(isSelected ? null : milestone.id)}
            >
              <div className="flex-shrink-0">
                {getMilestoneIcon(milestone, status)}
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-slate-900 truncate">{milestone.title}</h4>
                <p className="text-sm text-slate-600 truncate">{milestone.description}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs font-medium text-slate-500">
                    {milestone.points} pts
                  </span>
                  {milestone.required && (
                    <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">
                      Required
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Milestone Details */}
      {selectedMilestone && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Milestone Details</h3>
            <button
              onClick={() => setSelectedMilestone(null)}
              className="text-slate-400 hover:text-slate-600"
            >
              ×
            </button>
          </div>
          
          {(() => {
            const milestone = milestones.find(m => m.id === selectedMilestone);
            if (!milestone) return null;
            
            const status = getMilestoneStatus(milestone);
            
            return (
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  {getMilestoneIcon(milestone, status)}
                  <div>
                    <h4 className="font-semibold text-slate-900">{milestone.title}</h4>
                    <p className="text-slate-600">{milestone.description}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium text-slate-700">Status:</span>
                    <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
                      status === 'completed' ? 'bg-green-100 text-green-700' :
                      status === 'available' ? 'bg-blue-100 text-blue-700' :
                      'bg-slate-100 text-slate-700'
                    }`}>
                      {status === 'completed' ? 'Completed' :
                       status === 'available' ? 'Available' : 'Locked'}
                    </span>
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">Points:</span>
                    <span className="ml-2 text-slate-600">{milestone.points}</span>
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">Type:</span>
                    <span className="ml-2 text-slate-600 capitalize">{milestone.type}</span>
                  </div>
                  <div>
                    <span className="font-medium text-slate-700">Required:</span>
                    <span className="ml-2 text-slate-600">{milestone.required ? 'Yes' : 'No'}</span>
                  </div>
                </div>
                
                {status === 'available' && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-blue-800 text-sm">
                      This milestone is ready to complete! Navigate to the corresponding chapter or tool to get started.
                    </p>
                  </div>
                )}
                
                {status === 'completed' && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-green-800 text-sm">
                      Congratulations! You've completed this milestone and earned {milestone.points} points.
                    </p>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
} 