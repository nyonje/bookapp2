import React, { useState } from 'react';
import { Lightbulb, CheckCircle, XCircle, Target, Users, Zap } from 'lucide-react';

interface ValidationQuestion {
  id: string;
  question: string;
  type: 'multiple' | 'text' | 'rating';
  options?: { value: string; label: string; weight: number }[];
  placeholder?: string;
}

const validationQuestions: ValidationQuestion[] = [
  {
    id: 'target_audience',
    question: 'Who is your primary target audience?',
    type: 'multiple',
    options: [
      { value: 'entrepreneurs', label: 'Entrepreneurs & Business Owners', weight: 3 },
      { value: 'professionals', label: 'Working Professionals', weight: 3 },
      { value: 'students', label: 'Students & Learners', weight: 2 },
      { value: 'coaches', label: 'Coaches & Consultants', weight: 3 },
      { value: 'general', label: 'General Public', weight: 1 }
    ]
  },
  {
    id: 'problem_urgency',
    question: 'How urgent is the problem your book solves?',
    type: 'multiple',
    options: [
      { value: 'critical', label: 'Critical - People actively seek solutions daily', weight: 4 },
      { value: 'important', label: 'Important - People think about it regularly', weight: 3 },
      { value: 'moderate', label: 'Moderate - People are aware but not urgent', weight: 2 },
      { value: 'low', label: 'Low - Nice to have improvement', weight: 1 }
    ]
  },
  {
    id: 'current_solutions',
    question: 'What solutions do people currently use for this problem?',
    type: 'multiple',
    options: [
      { value: 'none', label: 'No good solutions exist', weight: 4 },
      { value: 'inadequate', label: 'Existing solutions are inadequate', weight: 3 },
      { value: 'expensive', label: 'Solutions exist but are too expensive', weight: 3 },
      { value: 'complex', label: 'Solutions exist but are too complex', weight: 2 },
      { value: 'satisfied', label: 'People are generally satisfied with current options', weight: 1 }
    ]
  },
  {
    id: 'book_uniqueness',
    question: 'What makes your book uniquely valuable?',
    type: 'text',
    placeholder: 'Describe your unique approach, methodology, or insights...'
  },
  {
    id: 'implementation_challenges',
    question: 'What\'s the biggest challenge readers face implementing your advice?',
    type: 'multiple',
    options: [
      { value: 'complexity', label: 'The advice is too complex to remember', weight: 3 },
      { value: 'time', label: 'They don\'t have enough time', weight: 2 },
      { value: 'motivation', label: 'They lose motivation over time', weight: 3 },
      { value: 'support', label: 'They need ongoing support and guidance', weight: 4 },
      { value: 'accountability', label: 'They lack accountability', weight: 3 }
    ]
  },
  {
    id: 'engagement_preference',
    question: 'How do your readers prefer to engage with content?',
    type: 'multiple',
    options: [
      { value: 'interactive', label: 'Interactive exercises and tools', weight: 4 },
      { value: 'community', label: 'Community discussions and sharing', weight: 3 },
      { value: 'structured', label: 'Structured, step-by-step guidance', weight: 3 },
      { value: 'bite_sized', label: 'Bite-sized, digestible content', weight: 2 },
      { value: 'traditional', label: 'Traditional reading experience', weight: 1 }
    ]
  },
  {
    id: 'success_metrics',
    question: 'How would you measure success for your readers?',
    type: 'text',
    placeholder: 'Describe specific, measurable outcomes your readers should achieve...'
  }
];

export function AppConceptValidator() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const calculateValidationScore = () => {
    let totalWeight = 0;
    let maxWeight = 0;

    validationQuestions.forEach(question => {
      if (question.type === 'multiple' && question.options) {
        maxWeight += Math.max(...question.options.map(opt => opt.weight));
        const selectedOption = question.options.find(opt => opt.value === answers[question.id]);
        if (selectedOption) {
          totalWeight += selectedOption.weight;
        }
      }
    });

    const score = Math.round((totalWeight / maxWeight) * 100);
    return {
      score,
      level: getValidationLevel(score),
      insights: generateInsights(answers, score)
    };
  };

  const getValidationLevel = (score: number) => {
    if (score >= 80) return { level: 'Excellent Potential', color: 'green', icon: '🚀' };
    if (score >= 60) return { level: 'Good Potential', color: 'blue', icon: '✅' };
    if (score >= 40) return { level: 'Moderate Potential', color: 'yellow', icon: '⚠️' };
    return { level: 'Needs Refinement', color: 'red', icon: '🔄' };
  };

  const generateInsights = (answers: Record<string, string>, score: number) => {
    const insights = [];

    // Audience insight
    if (answers.target_audience === 'general') {
      insights.push({
        type: 'warning',
        title: 'Narrow Your Audience',
        message: 'Consider focusing on a more specific audience for better app-market fit.'
      });
    } else {
      insights.push({
        type: 'success',
        title: 'Clear Target Audience',
        message: 'You have a well-defined audience, which is crucial for app success.'
      });
    }

    // Problem urgency insight
    if (answers.problem_urgency === 'critical' || answers.problem_urgency === 'important') {
      insights.push({
        type: 'success',
        title: 'High-Value Problem',
        message: 'You\'re addressing a problem people actively want to solve.'
      });
    } else {
      insights.push({
        type: 'warning',
        title: 'Problem Urgency',
        message: 'Consider emphasizing the urgency and importance of the problem you solve.'
      });
    }

    // Implementation challenges
    if (answers.implementation_challenges === 'support' || answers.implementation_challenges === 'accountability') {
      insights.push({
        type: 'success',
        title: 'Perfect App Opportunity',
        message: 'These challenges are exactly what companion apps excel at solving.'
      });
    }

    // Engagement preference
    if (answers.engagement_preference === 'interactive' || answers.engagement_preference === 'community') {
      insights.push({
        type: 'success',
        title: 'App-Friendly Audience',
        message: 'Your audience prefers the type of engagement that apps provide best.'
      });
    }

    return insights;
  };

  const allAnswered = validationQuestions.every(q => answers[q.id]);
  const results = showResults ? calculateValidationScore() : null;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm border">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Lightbulb className="w-8 h-8 text-yellow-600" />
          <h2 className="text-2xl font-bold text-slate-900">App Concept Validator</h2>
        </div>
        <p className="text-slate-600">
          Validate your companion app concept by assessing market fit, audience needs, and implementation potential.
        </p>
      </div>

      {!showResults ? (
        <div className="space-y-8">
          {validationQuestions.map((question, index) => (
            <div key={question.id} className="bg-slate-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                {index + 1}. {question.question}
              </h3>
              
              {question.type === 'multiple' && question.options && (
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
              )}

              {question.type === 'text' && (
                <textarea
                  value={answers[question.id] || ''}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  placeholder={question.placeholder}
                  className="w-full p-4 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={4}
                />
              )}
            </div>
          ))}

          <div className="flex justify-center pt-6">
            <button
              onClick={() => setShowResults(true)}
              disabled={!allAnswered}
              className="px-8 py-3 bg-yellow-600 text-white rounded-lg font-semibold hover:bg-yellow-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {allAnswered ? 'Validate My Concept' : `Complete ${validationQuestions.length - Object.keys(answers).length} more questions`}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Results Header */}
          <div className="text-center bg-gradient-to-r from-yellow-50 to-orange-50 p-8 rounded-xl">
            <div className="text-6xl mb-4">{results!.level.icon}</div>
            <h3 className="text-3xl font-bold text-slate-900 mb-2">
              {results!.level.level}
            </h3>
            <div className="text-5xl font-bold text-yellow-600 mb-2">
              {results!.score}%
            </div>
            <p className="text-slate-600">
              Concept Validation Score
            </p>
          </div>

          {/* Insights */}
          <div className="space-y-4">
            <h4 className="text-xl font-semibold text-slate-900 flex items-center">
              <Target className="w-5 h-5 mr-2 text-yellow-600" />
              Key Insights
            </h4>
            {results!.insights.map((insight, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-l-4 ${
                  insight.type === 'success' 
                    ? 'bg-green-50 border-green-500' 
                    : 'bg-yellow-50 border-yellow-500'
                }`}
              >
                <div className="flex items-start space-x-3">
                  {insight.type === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                  )}
                  <div>
                    <h5 className="font-semibold text-slate-900">{insight.title}</h5>
                    <p className="text-slate-700 text-sm mt-1">{insight.message}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recommendations */}
          <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
            <h4 className="text-xl font-semibold text-slate-900 mb-4 flex items-center">
              <Zap className="w-5 h-5 mr-2 text-blue-600" />
              Next Steps
            </h4>
            <div className="space-y-2 text-slate-700">
              {results!.score >= 60 ? (
                <>
                  <p>• Your concept shows strong potential - proceed with confidence!</p>
                  <p>• Start with a minimum viable app focusing on your highest-scoring areas</p>
                  <p>• Survey 10-20 readers to validate these assumptions</p>
                  <p>• Begin outlining your core app features based on implementation challenges</p>
                </>
              ) : (
                <>
                  <p>• Refine your concept before proceeding with development</p>
                  <p>• Focus on clarifying your target audience and their urgent problems</p>
                  <p>• Conduct deeper research into your readers' needs and preferences</p>
                  <p>• Consider pivoting to address more critical pain points</p>
                </>
              )}
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
              className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
            >
              Save Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}