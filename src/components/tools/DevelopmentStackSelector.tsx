import React, { useState } from 'react';
import { Code, Zap, Settings, CheckCircle, Star } from 'lucide-react';

interface StackQuestion {
  id: string;
  question: string;
  options: { value: string; label: string; weight: Record<string, number> }[];
}

interface Stack {
  id: string;
  name: string;
  description: string;
  pros: string[];
  cons: string[];
  bestFor: string[];
  timeline: string;
  cost: string;
  complexity: number; // 1-5
  color: string;
}

const stacks: Stack[] = [
  {
    id: 'rapid',
    name: 'Rapid Deployment Stack',
    description: 'Lovable.dev + Airtable - Get to market in 1-3 days',
    pros: [
      'Fastest time to market',
      'No coding required',
      'Built-in hosting and deployment',
      'Great for validation'
    ],
    cons: [
      'Limited customization',
      'Platform dependency',
      'Less control over features'
    ],
    bestFor: [
      'First-time app creators',
      'Quick market validation',
      'Simple companion apps',
      'Limited budget'
    ],
    timeline: '1-3 days',
    cost: '$500-1,200/year',
    complexity: 1,
    color: 'green'
  },
  {
    id: 'professional',
    name: 'Professional Polish Stack',
    description: 'Bolt.new + Custom integrations - Professional grade apps',
    pros: [
      'Professional appearance',
      'Good customization',
      'Scalable architecture',
      'Reasonable learning curve'
    ],
    cons: [
      'Higher cost',
      'More time investment',
      'Some technical knowledge helpful'
    ],
    bestFor: [
      'Established authors',
      'Professional brand',
      'Growing audience',
      'Long-term vision'
    ],
    timeline: '2-4 weeks',
    cost: '$2,500-4,000/year',
    complexity: 3,
    color: 'blue'
  },
  {
    id: 'maximum',
    name: 'Maximum Control Stack',
    description: 'Cursor + Custom development - Complete control and flexibility',
    pros: [
      'Complete customization',
      'No platform limitations',
      'Advanced features possible',
      'Own your code'
    ],
    cons: [
      'Steep learning curve',
      'Longer development time',
      'Higher complexity',
      'Ongoing maintenance'
    ],
    bestFor: [
      'Technical authors',
      'Complex requirements',
      'Long-term projects',
      'Unique features needed'
    ],
    timeline: '6-12 weeks',
    cost: '$5,000-15,000/year',
    complexity: 5,
    color: 'purple'
  }
];

const questions: StackQuestion[] = [
  {
    id: 'experience',
    question: 'What\'s your technical experience level?',
    options: [
      { value: 'beginner', label: 'Beginner - I avoid technical tasks', weight: { rapid: 3, professional: 1, maximum: 0 } },
      { value: 'some', label: 'Some experience - I can follow tutorials', weight: { rapid: 2, professional: 3, maximum: 1 } },
      { value: 'comfortable', label: 'Comfortable - I enjoy learning new tools', weight: { rapid: 1, professional: 2, maximum: 2 } },
      { value: 'advanced', label: 'Advanced - I have coding experience', weight: { rapid: 0, professional: 1, maximum: 3 } }
    ]
  },
  {
    id: 'timeline',
    question: 'How quickly do you need your app launched?',
    options: [
      { value: 'asap', label: 'ASAP - Within days', weight: { rapid: 3, professional: 0, maximum: 0 } },
      { value: 'weeks', label: 'A few weeks', weight: { rapid: 2, professional: 3, maximum: 0 } },
      { value: 'months', label: 'A few months', weight: { rapid: 1, professional: 2, maximum: 2 } },
      { value: 'flexible', label: 'No rush - quality over speed', weight: { rapid: 0, professional: 1, maximum: 3 } }
    ]
  },
  {
    id: 'budget',
    question: 'What\'s your annual app budget?',
    options: [
      { value: 'low', label: 'Under $1,500', weight: { rapid: 3, professional: 0, maximum: 0 } },
      { value: 'medium', label: '$1,500 - $4,000', weight: { rapid: 2, professional: 3, maximum: 1 } },
      { value: 'high', label: '$4,000 - $10,000', weight: { rapid: 1, professional: 2, maximum: 2 } },
      { value: 'premium', label: 'Over $10,000', weight: { rapid: 0, professional: 1, maximum: 3 } }
    ]
  },
  {
    id: 'customization',
    question: 'How important is custom design and features?',
    options: [
      { value: 'minimal', label: 'Minimal - Templates are fine', weight: { rapid: 3, professional: 1, maximum: 0 } },
      { value: 'some', label: 'Some customization needed', weight: { rapid: 2, professional: 3, maximum: 1 } },
      { value: 'important', label: 'Important - Need brand alignment', weight: { rapid: 1, professional: 2, maximum: 2 } },
      { value: 'critical', label: 'Critical - Need unique features', weight: { rapid: 0, professional: 1, maximum: 3 } }
    ]
  },
  {
    id: 'audience_size',
    question: 'What\'s your current audience size?',
    options: [
      { value: 'small', label: 'Small - Under 1,000', weight: { rapid: 3, professional: 1, maximum: 0 } },
      { value: 'growing', label: 'Growing - 1,000-10,000', weight: { rapid: 2, professional: 3, maximum: 1 } },
      { value: 'established', label: 'Established - 10,000-100,000', weight: { rapid: 1, professional: 2, maximum: 2 } },
      { value: 'large', label: 'Large - Over 100,000', weight: { rapid: 0, professional: 1, maximum: 3 } }
    ]
  },
  {
    id: 'maintenance',
    question: 'How do you prefer to handle ongoing maintenance?',
    options: [
      { value: 'hands_off', label: 'Hands-off - Platform handles everything', weight: { rapid: 3, professional: 1, maximum: 0 } },
      { value: 'minimal', label: 'Minimal involvement', weight: { rapid: 2, professional: 3, maximum: 1 } },
      { value: 'involved', label: 'Involved but with support', weight: { rapid: 1, professional: 2, maximum: 2 } },
      { value: 'full_control', label: 'Full control and responsibility', weight: { rapid: 0, professional: 1, maximum: 3 } }
    ]
  }
];

export function DevelopmentStackSelector() {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswerChange = (questionId: string, value: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const calculateRecommendation = () => {
    const scores = { rapid: 0, professional: 0, maximum: 0 };

    questions.forEach(question => {
      const answer = answers[question.id];
      if (answer) {
        const option = question.options.find(opt => opt.value === answer);
        if (option) {
          Object.entries(option.weight).forEach(([stack, weight]) => {
            scores[stack as keyof typeof scores] += weight;
          });
        }
      }
    });

    const sortedStacks = stacks.sort((a, b) => scores[b.id as keyof typeof scores] - scores[a.id as keyof typeof scores]);
    
    return {
      recommended: sortedStacks[0],
      alternative: sortedStacks[1],
      scores,
      maxScore: questions.length * 3
    };
  };

  const getStackColor = (color: string) => {
    const colors = {
      green: 'bg-green-50 border-green-200 text-green-900',
      blue: 'bg-blue-50 border-blue-200 text-blue-900',
      purple: 'bg-purple-50 border-purple-200 text-purple-900'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getComplexityStars = (complexity: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < complexity ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const allAnswered = questions.every(q => answers[q.id]);
  const results = showResults ? calculateRecommendation() : null;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm border">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <Code className="w-8 h-8 text-indigo-600" />
          <h2 className="text-2xl font-bold text-slate-900">Development Stack Selector</h2>
        </div>
        <p className="text-slate-600">
          Find the perfect AI-powered development stack for your companion app based on your needs, experience, and goals.
        </p>
      </div>

      {!showResults ? (
        <div className="space-y-8">
          {questions.map((question, index) => (
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
                      className="w-4 h-4 text-indigo-600"
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
              className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {allAnswered ? 'Get My Stack Recommendation' : `Answer ${questions.length - Object.keys(answers).length} more questions`}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {/* Recommended Stack */}
          <div className={`p-6 rounded-xl border-2 ${getStackColor(results!.recommended.color)}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Zap className="w-6 h-6" />
                <h3 className="text-2xl font-bold">Recommended: {results!.recommended.name}</h3>
              </div>
              <div className="bg-white px-3 py-1 rounded-full text-sm font-semibold">
                Best Match
              </div>
            </div>
            
            <p className="text-lg mb-6">{results!.recommended.description}</p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold mb-3">✅ Advantages</h4>
                <ul className="space-y-1">
                  {results!.recommended.pros.map((pro, index) => (
                    <li key={index} className="text-sm flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold mb-3">⚠️ Considerations</h4>
                <ul className="space-y-1">
                  {results!.recommended.cons.map((con, index) => (
                    <li key={index} className="text-sm">• {con}</li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 p-4 bg-white bg-opacity-50 rounded-lg">
              <div>
                <div className="text-sm font-medium">Timeline</div>
                <div className="text-lg font-semibold">{results!.recommended.timeline}</div>
              </div>
              <div>
                <div className="text-sm font-medium">Annual Cost</div>
                <div className="text-lg font-semibold">{results!.recommended.cost}</div>
              </div>
              <div>
                <div className="text-sm font-medium">Complexity</div>
                <div className="flex items-center space-x-1">
                  {getComplexityStars(results!.recommended.complexity)}
                </div>
              </div>
            </div>
          </div>

          {/* Alternative Stack */}
          <div className="bg-slate-50 border border-slate-200 p-6 rounded-lg">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">
              Alternative: {results!.alternative.name}
            </h3>
            <p className="text-slate-600 mb-4">{results!.alternative.description}</p>
            
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div>
                <span className="font-medium">Timeline:</span> {results!.alternative.timeline}
              </div>
              <div>
                <span className="font-medium">Cost:</span> {results!.alternative.cost}
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-medium">Complexity:</span>
                <div className="flex space-x-1">
                  {getComplexityStars(results!.alternative.complexity)}
                </div>
              </div>
            </div>
          </div>

          {/* All Stacks Comparison */}
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
            <div className="bg-slate-50 p-4 border-b">
              <h3 className="text-xl font-semibold text-slate-900">Complete Stack Comparison</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b">
                    <th className="text-left p-4 font-semibold">Stack</th>
                    <th className="text-center p-4 font-semibold">Match Score</th>
                    <th className="text-center p-4 font-semibold">Timeline</th>
                    <th className="text-center p-4 font-semibold">Cost</th>
                    <th className="text-center p-4 font-semibold">Complexity</th>
                  </tr>
                </thead>
                <tbody>
                  {stacks.map((stack) => (
                    <tr key={stack.id} className="border-b hover:bg-slate-50">
                      <td className="p-4">
                        <div className="font-medium">{stack.name}</div>
                        <div className="text-sm text-slate-600">{stack.description}</div>
                      </td>
                      <td className="text-center p-4">
                        <div className="text-lg font-semibold">
                          {Math.round((results!.scores[stack.id as keyof typeof results.scores] / results!.maxScore) * 100)}%
                        </div>
                      </td>
                      <td className="text-center p-4 text-sm">{stack.timeline}</td>
                      <td className="text-center p-4 text-sm">{stack.cost}</td>
                      <td className="text-center p-4">
                        <div className="flex justify-center space-x-1">
                          {getComplexityStars(stack.complexity)}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Best For */}
          <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-lg">
            <h4 className="text-lg font-semibold text-indigo-900 mb-4 flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              Your Recommended Stack is Best For:
            </h4>
            <ul className="grid md:grid-cols-2 gap-2">
              {results!.recommended.bestFor.map((item, index) => (
                <li key={index} className="flex items-center space-x-2 text-indigo-800">
                  <CheckCircle className="w-4 h-4 text-indigo-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
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
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Save Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}