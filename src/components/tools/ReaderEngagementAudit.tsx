import React, { useState } from 'react';
import { CheckCircle, Users, BookOpen, TrendingUp, AlertCircle } from 'lucide-react';

interface AuditQuestion {
  id: string;
  question: string;
  options: { value: number; label: string }[];
}

const auditQuestions: AuditQuestion[] = [
  {
    id: 'completion_rate',
    question: 'What percentage of your readers typically finish your books?',
    options: [
      { value: 1, label: 'Less than 25%' },
      { value: 2, label: '25-50%' },
      { value: 3, label: '50-75%' },
      { value: 4, label: 'More than 75%' }
    ]
  },
  {
    id: 'engagement_frequency',
    question: 'How often do readers contact you with questions or feedback?',
    options: [
      { value: 1, label: 'Rarely or never' },
      { value: 2, label: 'A few times per month' },
      { value: 3, label: 'Weekly' },
      { value: 4, label: 'Daily' }
    ]
  },
  {
    id: 'implementation_success',
    question: 'How many readers successfully implement advice from your books?',
    options: [
      { value: 1, label: 'Very few (less than 10%)' },
      { value: 2, label: 'Some (10-30%)' },
      { value: 3, label: 'Many (30-60%)' },
      { value: 4, label: 'Most (more than 60%)' }
    ]
  },
  {
    id: 'community_interaction',
    question: 'Do your readers interact with each other about your content?',
    options: [
      { value: 1, label: 'Not at all' },
      { value: 2, label: 'Occasionally on social media' },
      { value: 3, label: 'Regular discussions in groups' },
      { value: 4, label: 'Active, engaged community' }
    ]
  },
  {
    id: 'long_term_retention',
    question: 'How well do readers retain your content after 6 months?',
    options: [
      { value: 1, label: 'They forget most of it' },
      { value: 2, label: 'They remember key concepts' },
      { value: 3, label: 'They actively use the principles' },
      { value: 4, label: 'They become advocates and teach others' }
    ]
  },
  {
    id: 'feedback_quality',
    question: 'What type of feedback do you typically receive?',
    options: [
      { value: 1, label: 'Generic praise or complaints' },
      { value: 2, label: 'Questions about basic concepts' },
      { value: 3, label: 'Specific implementation questions' },
      { value: 4, label: 'Success stories and advanced applications' }
    ]
  }
];

export function ReaderEngagementAudit() {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswerChange = (questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const calculateResults = () => {
    const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
    const maxScore = auditQuestions.length * 4;
    const percentage = Math.round((totalScore / maxScore) * 100);
    
    return {
      score: totalScore,
      percentage,
      level: getEngagementLevel(percentage),
      recommendations: getRecommendations(percentage)
    };
  };

  const getEngagementLevel = (percentage: number) => {
    if (percentage >= 80) return { level: 'Excellent', color: 'green', icon: '🏆' };
    if (percentage >= 60) return { level: 'Good', color: 'blue', icon: '👍' };
    if (percentage >= 40) return { level: 'Fair', color: 'yellow', icon: '⚠️' };
    return { level: 'Needs Improvement', color: 'red', icon: '🚨' };
  };

  const getRecommendations = (percentage: number) => {
    if (percentage >= 80) {
      return [
        'Your engagement is excellent! A companion app could help you scale this success.',
        'Consider advanced features like community forums and peer-to-peer learning.',
        'Focus on premium features and advanced content for your engaged audience.'
      ];
    }
    if (percentage >= 60) {
      return [
        'Good engagement foundation. A companion app could significantly improve outcomes.',
        'Focus on progress tracking and accountability features.',
        'Add interactive elements to boost completion rates.'
      ];
    }
    if (percentage >= 40) {
      return [
        'Moderate engagement with room for improvement.',
        'Start with basic app features: quizzes, progress tracking, and reminders.',
        'Create more digestible content formats and micro-learning sessions.'
      ];
    }
    return [
      'Low engagement indicates a critical need for a companion app.',
      'Focus on fundamental engagement features: notifications, gamification, community.',
      'Break content into smaller, more manageable pieces.',
      'Implement strong onboarding and retention strategies.'
    ];
  };

  const allAnswered = auditQuestions.every(q => answers[q.id]);
  const results = showResults ? calculateResults() : null;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm border">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Users className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-slate-900">Reader Engagement Audit</h2>
        </div>
        <p className="text-slate-600">
          Assess your current reader engagement levels to identify opportunities for improvement through a companion app.
        </p>
      </div>

      {!showResults ? (
        <div className="space-y-8">
          {auditQuestions.map((question, index) => (
            <div key={question.id} className="bg-slate-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                {index + 1}. {question.question}
              </h3>
              <div className="space-y-3">
                {question.options.map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center space-x-3 cursor-pointer hover:bg-white p-3 rounded-lg transition-colors"
                  >
                    <input
                      type="radio"
                      name={question.id}
                      value={option.value}
                      checked={answers[question.id] === option.value}
                      onChange={() => handleAnswerChange(question.id, option.value)}
                      className="w-4 h-4 text-blue-600"
                    />
                    <span className="text-slate-700">{option.label}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <div className="flex justify-center pt-6">
            <button
              onClick={() => setShowResults(true)}
              disabled={!allAnswered}
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {allAnswered ? 'Get Your Audit Results' : `Answer ${auditQuestions.length - Object.keys(answers).length} more questions`}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Results Header */}
          <div className="text-center bg-gradient-to-r from-blue-50 to-indigo-50 p-8 rounded-xl">
            <div className="text-6xl mb-4">{results!.level.icon}</div>
            <h3 className="text-3xl font-bold text-slate-900 mb-2">
              {results!.level.level} Engagement
            </h3>
            <div className="text-5xl font-bold text-blue-600 mb-2">
              {results!.percentage}%
            </div>
            <p className="text-slate-600">
              Overall Reader Engagement Score
            </p>
          </div>

          {/* Detailed Breakdown */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-6 rounded-lg">
              <h4 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                Your Responses
              </h4>
              <div className="space-y-3">
                {auditQuestions.map((question, index) => (
                  <div key={question.id} className="text-sm">
                    <div className="font-medium text-slate-700 mb-1">
                      {index + 1}. {question.question}
                    </div>
                    <div className="text-slate-600 ml-4">
                      {question.options.find(opt => opt.value === answers[question.id])?.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-lg">
              <h4 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-blue-600" />
                Recommendations
              </h4>
              <div className="space-y-3">
                {results!.recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                    <p className="text-slate-700 text-sm">{rec}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Items */}
          <div className="bg-amber-50 border border-amber-200 p-6 rounded-lg">
            <h4 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
              <AlertCircle className="w-5 h-5 mr-2 text-amber-600" />
              Next Steps
            </h4>
            <div className="space-y-2 text-slate-700">
              <p>• Save these results and use them to prioritize companion app features</p>
              <p>• Survey your actual readers to validate these findings</p>
              <p>• Focus on the lowest-scoring areas when designing your app</p>
              <p>• Set measurable goals for improvement in each category</p>
            </div>
          </div>

          <div className="flex justify-center space-x-4 pt-6">
            <button
              onClick={() => {
                setShowResults(false);
                setAnswers({});
              }}
              className="px-6 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
            >
              Start Over
            </button>
            <button
              onClick={() => window.print()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Save Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}