import React from 'react';
import { Trophy, Target, Clock, TrendingUp, Lightbulb, Award, CheckCircle, XCircle, RefreshCw } from 'lucide-react';

interface QuizResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  difficultyLevel: string;
  categories: { [key: string]: number };
  recommendations: string[];
}

interface QuizResultsProps {
  result: QuizResult;
  onRetry: () => void;
  onContinue: () => void;
}

export function QuizResults({ result, onRetry, onContinue }: QuizResultsProps) {
  const accuracy = (result.correctAnswers / result.totalQuestions) * 100;
  const timePerQuestion = Math.round(result.timeSpent / result.totalQuestions);

  const getPerformanceLevel = () => {
    if (accuracy >= 90) return { level: 'Excellent', color: 'text-green-600', bgColor: 'bg-green-100' };
    if (accuracy >= 80) return { level: 'Good', color: 'text-blue-600', bgColor: 'bg-blue-100' };
    if (accuracy >= 70) return { level: 'Fair', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    return { level: 'Needs Improvement', color: 'text-red-600', bgColor: 'bg-red-100' };
  };

  const getTimeAssessment = () => {
    if (timePerQuestion < 30) return { assessment: 'Very Fast', color: 'text-green-600' };
    if (timePerQuestion < 60) return { assessment: 'Good Pace', color: 'text-blue-600' };
    if (timePerQuestion < 90) return { assessment: 'Thoughtful', color: 'text-yellow-600' };
    return { assessment: 'Very Thorough', color: 'text-purple-600' };
  };

  const performanceLevel = getPerformanceLevel();
  const timeAssessment = getTimeAssessment();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Trophy className="w-8 h-8 text-yellow-600" />
          <h2 className="text-3xl font-bold text-slate-900">Quiz Complete!</h2>
          <Trophy className="w-8 h-8 text-yellow-600" />
        </div>
        <p className="text-lg text-slate-600">Here's how you performed and what to do next</p>
      </div>

      {/* Score Overview */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">{result.correctAnswers}/{result.totalQuestions}</div>
            <div className="text-blue-100">Correct Answers</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">{Math.round(accuracy)}%</div>
            <div className="text-blue-100">Accuracy</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">{result.timeSpent}s</div>
            <div className="text-blue-100">Total Time</div>
          </div>
        </div>

        {/* Performance Level */}
        <div className="mt-6 text-center">
          <span className={`inline-block px-4 py-2 rounded-full font-medium ${performanceLevel.bgColor} ${performanceLevel.color}`}>
            {performanceLevel.level} Performance
          </span>
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Metrics */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center space-x-2">
            <Target className="w-5 h-5 text-blue-600" />
            <span>Performance Analysis</span>
          </h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="font-medium text-slate-700">Performance Level</span>
              </div>
              <span className={`font-semibold ${performanceLevel.color}`}>{performanceLevel.level}</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-orange-600" />
                <span className="font-medium text-slate-700">Average Time per Question</span>
              </div>
              <span className={`font-semibold ${timeAssessment.color}`}>{timePerQuestion}s</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Award className="w-5 h-5 text-purple-600" />
                <span className="font-medium text-slate-700">Difficulty Level</span>
              </div>
              <span className="font-semibold text-slate-700 capitalize">{result.difficultyLevel}</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-medium text-slate-700">Time Assessment</span>
              </div>
              <span className={`font-semibold ${timeAssessment.color}`}>{timeAssessment.assessment}</span>
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center space-x-2">
            <Target className="w-5 h-5 text-green-600" />
            <span>Category Coverage</span>
          </h3>
          
          <div className="space-y-3">
            {Object.entries(result.categories).map(([category, count]) => (
              <div key={category} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <span className="font-medium text-slate-700">{category}</span>
                <span className="text-sm text-slate-500">{count} questions</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h3 className="text-xl font-semibold text-slate-900 mb-4 flex items-center space-x-2">
          <Lightbulb className="w-5 h-5 text-yellow-600" />
          <span>Personalized Recommendations</span>
        </h3>
        
        <div className="space-y-3">
          {result.recommendations.map((recommendation, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
              <Lightbulb className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <p className="text-slate-700">{recommendation}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={onRetry}
          className="flex-1 px-6 py-3 bg-slate-600 text-white rounded-lg font-medium hover:bg-slate-700 transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Retry Quiz</span>
        </button>
        
        <button
          onClick={onContinue}
          className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2"
        >
          <CheckCircle className="w-4 h-4" />
          <span>Continue Learning</span>
        </button>
      </div>

      {/* Achievement Badge */}
      {accuracy >= 80 && (
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-xl p-6 text-white text-center">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <Trophy className="w-8 h-8" />
            <h4 className="text-xl font-bold">Quiz Master!</h4>
            <Trophy className="w-8 h-8" />
          </div>
          <p className="text-yellow-100">
            Congratulations! You've demonstrated excellent understanding of the material. 
            Keep up the great work!
          </p>
        </div>
      )}

      {/* Improvement Tips */}
      {accuracy < 80 && (
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
          <h4 className="text-xl font-bold mb-3 flex items-center space-x-2">
            <Target className="w-5 h-5" />
            <span>Improvement Tips</span>
          </h4>
          <div className="space-y-2 text-blue-100">
            <p>• Review the chapter content before retaking the quiz</p>
            <p>• Take notes while reading to improve retention</p>
            <p>• Use the interactive tools to reinforce key concepts</p>
            <p>• Consider discussing difficult topics in the community forum</p>
          </div>
        </div>
      )}
    </div>
  );
} 