import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, CheckCircle, PlayCircle, Lock } from 'lucide-react';
import { useProgress } from '../contexts/ProgressContext';
import { useAuth } from '../contexts/AuthContext';

interface Chapter {
  id: number;
  title: string;
  description: string;
  readTime: number;
  quizQuestions: number;
  tools: number;
}

interface ChapterCardProps {
  chapter: Chapter;
}

export function ChapterCard({ chapter }: ChapterCardProps) {
  const { getChapterProgress } = useProgress();
  const { hasAccess } = useAuth();
  const progress = getChapterProgress(chapter.id);
  const isCompleted = progress.completed;
  const isStarted = progress.quizScore > 0 || progress.timeSpent > 0;
  const hasChapterAccess = hasAccess(`chapter_${chapter.id}`);

  return (
    <div
      className={`group block bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-all duration-200 ${
        hasChapterAccess ? 'hover:border-blue-200' : 'opacity-75'
      }`}
    >
      {hasChapterAccess ? (
        <Link to={`/chapter/${chapter.id}`} className="block">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-semibold ${
                isCompleted 
                  ? 'bg-green-100 text-green-700' 
                  : isStarted 
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-slate-100 text-slate-600'
              }`}>
                {chapter.id}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors">
                  {chapter.title}
                </h3>
              </div>
            </div>
            
            {isCompleted ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : isStarted ? (
              <PlayCircle className="w-5 h-5 text-blue-500" />
            ) : null}
          </div>

          <p className="text-slate-600 text-sm mb-4 leading-relaxed">
            {chapter.description}
          </p>

          <div className="flex items-center justify-between text-sm text-slate-500">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{chapter.readTime} min</span>
              </div>
              <span>•</span>
              <span>{chapter.quizQuestions} quiz questions</span>
              <span>•</span>
              <span>{chapter.tools} tools</span>
            </div>
            
            {progress.timeSpent > 0 && (
              <span className="text-blue-600 font-medium">
                {Math.round(progress.timeSpent)} min spent
              </span>
            )}
          </div>

          {/* Progress Bar */}
          <div className="mt-4 bg-slate-100 rounded-full h-2">
            <div 
              className={`h-2 rounded-full transition-all duration-300 ${
                isCompleted ? 'bg-green-500' : 'bg-blue-500'
              }`}
              style={{ width: `${Math.min(100, (progress.quizScore / chapter.quizQuestions) * 100)}%` }}
            />
          </div>
        </Link>
      ) : (
        <div>
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center font-semibold bg-slate-100 text-slate-400 relative">
                {chapter.id}
                <div className="absolute inset-0 bg-slate-200 bg-opacity-50 rounded-lg flex items-center justify-center">
                  <Lock className="w-4 h-4 text-slate-500" />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-500">
                  {chapter.title}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {chapter.id === 1 ? 'Free' : 'Pro subscription required'}
                </p>
              </div>
            </div>
          </div>

          <p className="text-slate-500 text-sm mb-4 leading-relaxed">
            {chapter.description}
          </p>

          <div className="flex items-center justify-between text-sm text-slate-400">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{chapter.readTime} min</span>
              </div>
              <span>•</span>
              <span>{chapter.quizQuestions} quiz questions</span>
              <span>•</span>
              <span>{chapter.tools} tools</span>
            </div>
          </div>

          {/* Locked Progress Bar */}
          <div className="mt-4 bg-slate-100 rounded-full h-2">
            <div className="bg-slate-300 h-2 rounded-full w-0" />
          </div>
        </div>
      )}
    </div>
  );
}