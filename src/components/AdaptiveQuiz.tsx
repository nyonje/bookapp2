import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, ArrowRight, RefreshCw, Target, TrendingUp, Clock } from 'lucide-react';

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
}

interface QuizResult {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  difficultyLevel: string;
  categories: { [key: string]: number };
  recommendations: string[];
}

interface AdaptiveQuizProps {
  chapterId: number;
  onComplete: (result: QuizResult) => void;
}

export function AdaptiveQuiz({ chapterId, onComplete }: AdaptiveQuizProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [userPerformance, setUserPerformance] = useState<{ correct: number; total: number }>({ correct: 0, total: 0 });
  const [difficultyLevel, setDifficultyLevel] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Sample questions for each chapter with varying difficulty
  const chapterQuestions: { [key: number]: QuizQuestion[] } = {
    1: [
      {
        id: '1-1',
        question: 'What percentage of non-fiction books are never finished by readers?',
        options: ['70%', '80%', '90%', '95%'],
        correctAnswer: '90%',
        explanation: 'The Jenkins Group study found that a staggering 90% of non-fiction books are never finished, highlighting the reading crisis.',
        difficulty: 'easy',
        category: 'Reading Crisis'
      },
      {
        id: '1-2',
        question: 'How much of what they read do readers typically forget within 24 hours?',
        options: ['30%', '40%', '50%', '60%'],
        correctAnswer: '50%',
        explanation: 'Cognitive psychology research shows readers forget approximately 50% of content within 24 hours without active engagement.',
        difficulty: 'easy',
        category: 'Memory Retention'
      },
      {
        id: '1-3',
        question: 'What is the primary cause of the reading crisis in the digital age?',
        options: ['Poor writing quality', 'Reader intelligence', 'Attention economy pressures', 'Book pricing'],
        correctAnswer: 'Attention economy pressures',
        explanation: 'The reading crisis stems from how we consume information in the digital age, with constant distractions and instant gratification expectations.',
        difficulty: 'medium',
        category: 'Digital Age'
      },
      {
        id: '1-4',
        question: 'What do companion apps transform passive reading into?',
        options: ['Faster reading', 'Active learning', 'Social media', 'Entertainment'],
        correctAnswer: 'Active learning',
        explanation: 'Companion apps transform passive reading into active learning through interactivity and engagement mechanisms.',
        difficulty: 'medium',
        category: 'Active Learning'
      },
      {
        id: '1-5',
        question: 'What three things do companion apps transform according to the chapter?',
        options: ['Reading, writing, publishing', 'Isolation into community, inspiration into transformation, passive into active', 'Books into apps', 'Authors into developers'],
        correctAnswer: 'Isolation into community, inspiration into transformation, passive into active',
        explanation: 'Companion apps transform isolated consumption into community engagement, fleeting inspiration into lasting transformation, and passive reading into active learning.',
        difficulty: 'hard',
        category: 'Transformation'
      }
    ],
    2: [
      {
        id: '2-1',
        question: 'What are the three critical challenges that companion apps address?',
        options: ['Cost, time, effort', 'Attention economy, implementation gap, isolation factor', 'Technology, design, marketing', 'Content, audience, platform'],
        correctAnswer: 'Attention economy, implementation gap, isolation factor',
        explanation: 'The three critical challenges are the attention economy (distracted readers), implementation gap (knowledge to action), and isolation factor (solitary reading).',
        difficulty: 'medium',
        category: 'Challenges'
      },
      {
        id: '2-2',
        question: 'How do companion apps work with the attention economy?',
        options: ['By demanding longer reading sessions', 'By breaking content into digestible micro-learning sessions', 'By removing all distractions', 'By using more text'],
        correctAnswer: 'By breaking content into digestible micro-learning sessions',
        explanation: 'Instead of demanding sustained attention, apps break content into digestible micro-learning sessions that fit busy schedules.',
        difficulty: 'medium',
        category: 'Attention Economy'
      },
      {
        id: '2-3',
        question: 'What percentage can companion apps increase book completion rates?',
        options: ['150%', '200%', '250%', '300%'],
        correctAnswer: '300%',
        explanation: 'When implemented correctly, companion apps can increase completion rates by up to 300% through active engagement.',
        difficulty: 'easy',
        category: 'Completion Rates'
      },
      {
        id: '2-4',
        question: 'What do companion apps provide that traditional books cannot?',
        options: ['Lower cost', 'Direct reader relationships and ongoing engagement', 'Better writing', 'Faster reading'],
        correctAnswer: 'Direct reader relationships and ongoing engagement',
        explanation: 'Companion apps provide direct reader relationships and ongoing engagement, which traditional books cannot offer.',
        difficulty: 'hard',
        category: 'Business Value'
      },
      {
        id: '2-5',
        question: 'What is the main business advantage of companion apps?',
        options: ['Lower production costs', 'Higher book sales', 'Direct reader relationships and valuable data insights', 'Faster publishing'],
        correctAnswer: 'Direct reader relationships and valuable data insights',
        explanation: 'The main business advantage is direct reader relationships and valuable data insights about what resonates with readers.',
        difficulty: 'hard',
        category: 'Business Case'
      }
    ]
  };

  useEffect(() => {
    // Initialize questions based on chapter
    const chapterQuestionsList = chapterQuestions[chapterId] || [];
    setQuestions(chapterQuestionsList);
    setIsLoading(false);
  }, [chapterId]);

  useEffect(() => {
    // Adjust difficulty based on performance
    if (userPerformance.total > 0) {
      const accuracy = userPerformance.correct / userPerformance.total;
      if (accuracy > 0.8 && difficultyLevel !== 'hard') {
        setDifficultyLevel('hard');
      } else if (accuracy < 0.6 && difficultyLevel !== 'easy') {
        setDifficultyLevel('easy');
      }
    }
  }, [userPerformance, difficultyLevel]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (answer: string) => {
    if (isAnswered) return;
    setSelectedAnswer(answer);
  };

  const handleSubmitAnswer = () => {
    if (!selectedAnswer || isAnswered) return;

    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
    const newScore = isCorrect ? score + 1 : score;
    const newPerformance = {
      correct: userPerformance.correct + (isCorrect ? 1 : 0),
      total: userPerformance.total + 1
    };

    setScore(newScore);
    setUserPerformance(newPerformance);
    setIsAnswered(true);
    setShowExplanation(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setShowExplanation(false);
    } else {
      // Quiz completed
      const timeSpent = Math.round((Date.now() - startTime) / 1000);
      const result: QuizResult = {
        score: score,
        totalQuestions: questions.length,
        correctAnswers: score,
        timeSpent,
        difficultyLevel,
        categories: getCategoryBreakdown(),
        recommendations: generateRecommendations(score, questions.length, timeSpent)
      };
      onComplete(result);
    }
  };

  const getCategoryBreakdown = () => {
    const categories: { [key: string]: number } = {};
    questions.forEach(q => {
      categories[q.category] = (categories[q.category] || 0) + 1;
    });
    return categories;
  };

  const generateRecommendations = (score: number, total: number, timeSpent: number) => {
    const accuracy = score / total;
    const recommendations: string[] = [];

    if (accuracy < 0.6) {
      recommendations.push('Consider re-reading Chapter 1 to strengthen your understanding of the core concepts.');
      recommendations.push('Focus on the key takeaways and main points before moving to the next chapter.');
    } else if (accuracy < 0.8) {
      recommendations.push('Good progress! Review the areas where you struggled to solidify your knowledge.');
      recommendations.push('Consider using the interactive tools to apply what you\'ve learned.');
    } else {
      recommendations.push('Excellent performance! You have a strong grasp of the material.');
      recommendations.push('Ready to move forward and apply these concepts to your own book.');
    }

    if (timeSpent < 60) {
      recommendations.push('Consider taking more time to reflect on each question for deeper understanding.');
    }

    return recommendations;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-slate-600">Loading quiz...</span>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="text-center p-8">
        <p className="text-slate-600">No questions available for this chapter.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-slate-900">Adaptive Quiz</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              <span className="text-sm text-slate-600">Score: {score}/{currentQuestionIndex + 1}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-orange-600" />
              <span className="text-sm text-slate-600">
                {Math.round((Date.now() - startTime) / 1000)}s
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(difficultyLevel)}`}>
              {difficultyLevel.toUpperCase()}
            </span>
            <span className="text-sm text-slate-600">
              {currentQuestionIndex + 1} of {questions.length}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 rounded-full h-2">
          <div 
            className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-4">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(currentQuestion.difficulty)}`}>
              {currentQuestion.difficulty.toUpperCase()}
            </span>
            <span className="text-sm text-slate-500">{currentQuestion.category}</span>
          </div>
          <h3 className="text-xl font-semibold text-slate-900 mb-4">{currentQuestion.question}</h3>
        </div>

        {/* Answer Options */}
        <div className="space-y-3 mb-6">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option)}
              disabled={isAnswered}
              className={`w-full p-4 text-left rounded-lg border transition-all duration-200 ${
                selectedAnswer === option
                  ? isAnswered
                    ? option === currentQuestion.correctAnswer
                      ? 'bg-green-50 border-green-200 text-green-900'
                      : 'bg-red-50 border-red-200 text-red-900'
                    : 'bg-blue-50 border-blue-200 text-blue-900'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              } ${isAnswered ? 'cursor-default' : 'cursor-pointer'}`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedAnswer === option
                    ? isAnswered
                      ? option === currentQuestion.correctAnswer
                        ? 'border-green-500 bg-green-500 text-white'
                        : 'border-red-500 bg-red-500 text-white'
                      : 'border-blue-500 bg-blue-500 text-white'
                    : 'border-slate-300'
                }`}>
                  {selectedAnswer === option && (
                    option === currentQuestion.correctAnswer ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <XCircle className="w-4 h-4" />
                    )
                  )}
                </div>
                <span className="font-medium">{option}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Submit Button */}
        {!isAnswered && (
          <button
            onClick={handleSubmitAnswer}
            disabled={!selectedAnswer}
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors duration-200"
          >
            Submit Answer
          </button>
        )}

        {/* Explanation */}
        {showExplanation && (
          <div className="mt-6 p-4 bg-slate-50 rounded-lg">
            <h4 className="font-semibold text-slate-900 mb-2">Explanation</h4>
            <p className="text-slate-700">{currentQuestion.explanation}</p>
          </div>
        )}

        {/* Next Button */}
        {isAnswered && (
          <button
            onClick={handleNextQuestion}
            className="w-full mt-4 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors duration-200 flex items-center justify-center space-x-2"
          >
            <span>{currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Complete Quiz'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Performance Insights */}
      {userPerformance.total > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h4 className="font-semibold text-slate-900 mb-4">Performance Insights</h4>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{Math.round((userPerformance.correct / userPerformance.total) * 100)}%</div>
              <div className="text-sm text-slate-600">Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{difficultyLevel}</div>
              <div className="text-sm text-slate-600">Difficulty Level</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 