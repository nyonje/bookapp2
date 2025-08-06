import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Clock, Users, CheckCircle, PlayCircle, ArrowRight, Headphones } from 'lucide-react';
import { chapters } from '../data/chapters';
import { Quiz } from '../components/Quiz';
import { ChapterTools } from '../components/ChapterTools';
import { AudioSummary } from '../components/AudioSummary';
import { useProgress } from '../contexts/ProgressContext';

export function ChapterDetail() {
  const { chapterId } = useParams<{ chapterId: string }>();
  const [activeTab, setActiveTab] = useState<'content' | 'audio' | 'quiz' | 'tools'>('content');
  const { updateProgress, getChapterProgress } = useProgress();
  
  const chapter = chapters.find(ch => ch.id === parseInt(chapterId || '1'));
  const progress = getChapterProgress(parseInt(chapterId || '1'));

  if (!chapter) {
    return <div>Chapter not found</div>;
  }

  const tabs = [
    { id: 'content', label: 'Chapter Content', icon: PlayCircle },
    { id: 'audio', label: 'Audio Summary', icon: Headphones },
    { id: 'quiz', label: 'Knowledge Check', icon: CheckCircle },
    { id: 'tools', label: 'Practical Tools', icon: Users },
  ];

  const handleMarkComplete = () => {
    updateProgress(chapter.id, { completed: true, timeSpent: chapter.readTime });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
      {/* Chapter Header */}
      <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 mb-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-lg">
                {chapter.id}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">{chapter.title}</h1>
                <div className="flex items-center space-x-4 text-sm text-slate-600 mt-2">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{chapter.readTime} min read</span>
                  </div>
                  <span>•</span>
                  <span>{chapter.quizQuestions} quiz questions</span>
                  <span>•</span>
                  <span>{chapter.tools} practical tools</span>
                </div>
              </div>
            </div>
            <p className="text-lg text-slate-700 leading-relaxed">{chapter.description}</p>
          </div>
          
          {!progress.completed && (
            <button
              onClick={handleMarkComplete}
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Mark Complete
            </button>
          )}
        </div>

        {/* Progress Bar */}
        <div className="bg-slate-100 rounded-full h-2 mb-4">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${Math.min(100, (progress.quizScore / chapter.quizQuestions) * 100)}%` }}
          />
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 mb-8">
        <div className="border-b border-slate-200">
          <nav className="flex space-x-8 px-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors duration-200 ${
                  activeTab === tab.id
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-8">
          {activeTab === 'content' && (
            <div className="prose prose-slate max-w-none">
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-3">Key Takeaways</h3>
                  <ul className="space-y-2 text-blue-800">
                    {chapter.keyTakeaways?.map((takeaway, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-slate-900">Chapter Summary</h3>
                  <div className="text-slate-700 leading-relaxed space-y-4">
                    {chapter.summary?.split('\n\n').map((paragraph, index) => (
                      <p key={index}>{paragraph}</p>
                    ))}
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-900 mb-3">Action Item</h3>
                  <p className="text-green-800">{chapter.actionItem}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'audio' && (chapter as any).audioSummary && (
            <AudioSummary
              chapterId={chapter.id}
              title={chapter.title}
              duration={(chapter as any).audioSummary.duration}
              audioUrl={(chapter as any).audioSummary.audioUrl}
              transcript={(chapter as any).audioSummary.transcript}
            />
          )}

          {activeTab === 'audio' && !(chapter as any).audioSummary && (
            <div className="text-center py-12">
              <Headphones className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-900 mb-2">Audio Summary Coming Soon</h3>
              <p className="text-slate-600">
                Audio content for this chapter is being prepared and will be available soon.
              </p>
            </div>
          )}

          {activeTab === 'quiz' && <Quiz chapterId={chapter.id} />}
          {activeTab === 'tools' && <ChapterTools chapterId={chapter.id} />}
        </div>
      </div>
      </div>
    </div>
  );
}