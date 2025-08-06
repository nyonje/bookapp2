import React, { useState } from 'react';
import { CheckCircle, XCircle, ArrowRight } from 'lucide-react';
import { quizzes } from '../data/quizzes';
import { useProgress } from '../contexts/ProgressContext';

interface QuizProps {
  chapterId: number;
}

export function Quiz({ chapterId }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { updateProgress } = useProgress();

  const chapterQuiz = quizzes.find(q => q.chapterId === chapterId);
  
  if (!chapterQuiz) {
    return <div>Quiz not available for this chapter.</div>;
  }

  const questions = chapterQuiz.questions;

  const handleAnswerSelect = (answer: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answer;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
      setQuizCompleted(true);
      
      // Calculate score
      const correctAnswers = selectedAnswers.filter((answer, index) => 
        answer === questions[index].correctAnswer
      ).length;
      
      updateProgress(chapterId, { 
        quizScore: correctAnswers,
        quizCompleted: true 
      });
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setQuizCompleted(false);
  };

  if (showResults) {
    const correctAnswers = selectedAnswers.filter((answer, index) => 
      answer === questions[index].correctAnswer
    ).length;
    const percentage = Math.round((correctAnswers / questions.length) * 100);

    return (
      <div className="space-y-6">
        <div className="text-center">
          <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${
            percentage >= 70 ? 'bg-green-100' : 'bg-orange-100'
          }`}>
            <span className={`text-3xl font-bold ${
              percentage >= 70 ? 'text-green-600' : 'text-orange-600'
            }`}>
              {percentage}%
            </span>
          </div>
          <h3 className="text-2xl font-bold text-slate-900 mb-2">Quiz Complete!</h3>
          <p className="text-slate-600">
            You got {correctAnswers} out of {questions.length} questions correct.
          </p>
        </div>

        <div className="space-y-4">
          {questions.map((question, index) => {
            const userAnswer = selectedAnswers[index];
            const isCorrect = userAnswer === question.correctAnswer;
            
            return (
              <div key={index} className="border rounded-lg p-6">
                <div className="flex items-start space-x-3 mb-4">
                  {isCorrect ? (
                    <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-900 mb-2">
                      {index + 1}. {question.question}
                    </h4>
                    <p className={`text-sm mb-2 ${
                      isCorrect ? 'text-green-700' : 'text-red-700'
                    }`}>
                      Your answer: {userAnswer}
                    </p>
                    {!isCorrect && (
                      <p className="text-sm text-green-700 mb-2">
                        Correct answer: {question.correctAnswer}
                      </p>
                    )}
                    <p className="text-sm text-slate-600">{question.explanation}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center">
          <button
            onClick={resetQuiz}
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-600">
          Question {currentQuestion + 1} of {questions.length}
        </div>
        <div className="bg-slate-100 rounded-full h-2 w-32">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <div className="bg-slate-50 rounded-lg p-6">
        <h3 className="text-xl font-semibold text-slate-900 mb-6">
          {question.question}
        </h3>

        <div className="space-y-3">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(option)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                selectedAnswers[currentQuestion] === option
                  ? 'border-blue-600 bg-blue-50 text-blue-900'
                  : 'border-slate-200 bg-white hover:border-slate-300 text-slate-700'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 rounded-full border-2 ${
                  selectedAnswers[currentQuestion] === option
                    ? 'border-blue-600 bg-blue-600'
                    : 'border-slate-300'
                }`}>
                  {selectedAnswers[currentQuestion] === option && (
                    <div className="w-2 h-2 bg-white rounded-full mx-auto mt-0.5" />
                  )}
                </div>
                <span>{option}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={handlePrevious}
          disabled={currentQuestion === 0}
          className="px-6 py-3 text-slate-600 font-medium rounded-lg hover:bg-slate-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>

        <button
          onClick={handleNext}
          disabled={!selectedAnswers[currentQuestion]}
          className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span>{currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next'}</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}