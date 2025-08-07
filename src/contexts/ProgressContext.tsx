import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

interface ChapterProgress {
  chapterId: number;
  completed: boolean;
  quizScore: number;
  quizCompleted: boolean;
  timeSpent: number; // in minutes
  toolsUsed: string[];
  notes: string;
}

interface ProgressData {
  id?: string;
  user_id: string;
  chapter_id: number;
  completed: boolean;
  quiz_score: number;
  quiz_completed: boolean;
  time_spent: number;
  tools_used: string[];
  notes: string;
  created_at?: string;
  updated_at?: string;
}

interface ProgressContextType {
  getChapterProgress: (chapterId: number) => ChapterProgress;
  updateProgress: (chapterId: number, updates: Partial<ChapterProgress>) => void;
  getTotalProgress: () => {
    completedChapters: number;
    overallProgress: number;
    totalTimeSpent: number;
    toolsUsed: number;
  };
  progress: Record<number, ChapterProgress>;
  loading: boolean;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

const defaultProgress: ChapterProgress = {
  chapterId: 0,
  completed: false,
  quizScore: 0,
  quizCompleted: false,
  timeSpent: 0,
  toolsUsed: [],
  notes: '',
};

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const { user, session } = useAuth();
  const [progress, setProgress] = useState<Record<number, ChapterProgress>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadProgressFromSupabase();
    } else {
      // Load from localStorage for non-authenticated users
      const storedProgress = localStorage.getItem('bookProgress');
      if (storedProgress) {
        setProgress(JSON.parse(storedProgress));
      }
    }
  }, [user]);

  const loadProgressFromSupabase = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('*')
        .eq('user_id', user.id);

      if (error) {
        console.error('Error loading progress:', error);
        return;
      }

      const progressMap: Record<number, ChapterProgress> = {};
      data?.forEach((item: ProgressData) => {
        progressMap[item.chapter_id] = {
          chapterId: item.chapter_id,
          completed: item.completed,
          quizScore: item.quiz_score,
          quizCompleted: item.quiz_completed,
          timeSpent: item.time_spent,
          toolsUsed: item.tools_used || [],
          notes: item.notes || ''
        };
      });

      setProgress(progressMap);
    } catch (error) {
      console.error('Error in loadProgressFromSupabase:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveProgressToSupabase = async (chapterId: number, progressData: ChapterProgress) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          chapter_id: chapterId,
          completed: progressData.completed,
          quiz_score: progressData.quizScore,
          quiz_completed: progressData.quizCompleted,
          time_spent: progressData.timeSpent,
          tools_used: progressData.toolsUsed,
          notes: progressData.notes,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'user_id,chapter_id'
        });

      if (error) {
        console.error('Error saving progress:', error);
      }
    } catch (error) {
      console.error('Error in saveProgressToSupabase:', error);
    }
  };

  const getChapterProgress = (chapterId: number): ChapterProgress => {
    return progress[chapterId] || { ...defaultProgress, chapterId };
  };

  const updateProgress = (chapterId: number, updates: Partial<ChapterProgress>) => {
    const updatedProgress = {
      ...getChapterProgress(chapterId),
      ...updates,
    };

    setProgress(prev => ({
      ...prev,
      [chapterId]: updatedProgress,
    }));

    // Save to Supabase if user is authenticated, otherwise save to localStorage
    if (user) {
      saveProgressToSupabase(chapterId, updatedProgress);
    } else {
      // Fallback to localStorage for non-authenticated users
      const newProgress = {
        ...progress,
        [chapterId]: updatedProgress,
      };
      localStorage.setItem('bookProgress', JSON.stringify(newProgress));
    }
  };

  const getTotalProgress = () => {
    const chapters = Object.values(progress);
    const completedChapters = chapters.filter(ch => ch.completed).length;
    const totalTimeSpent = chapters.reduce((sum, ch) => sum + ch.timeSpent, 0);
    const allToolsUsed = chapters.reduce((acc, ch) => [...acc, ...ch.toolsUsed], [] as string[]);
    const uniqueToolsUsed = new Set(allToolsUsed).size;
    
    // Calculate overall progress based on completion and quiz scores
    const totalPossibleScore = 5 * 5; // 5 chapters, 5 questions each
    const actualScore = chapters.reduce((sum, ch) => sum + ch.quizScore, 0);
    const overallProgress = Math.min(100, (actualScore / totalPossibleScore) * 100);

    return {
      completedChapters,
      overallProgress,
      totalTimeSpent,
      toolsUsed: uniqueToolsUsed,
    };
  };

  return (
    <ProgressContext.Provider value={{ 
      getChapterProgress, 
      updateProgress, 
      getTotalProgress,
      progress,
      loading 
    }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
}