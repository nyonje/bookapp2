import React, { createContext, useContext, useState, useEffect } from 'react';

interface ChapterProgress {
  chapterId: number;
  completed: boolean;
  quizScore: number;
  quizCompleted: boolean;
  timeSpent: number; // in minutes
  toolsUsed: string[];
  notes: string;
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
  const [progress, setProgress] = useState<Record<number, ChapterProgress>>({});

  useEffect(() => {
    const storedProgress = localStorage.getItem('bookProgress');
    if (storedProgress) {
      setProgress(JSON.parse(storedProgress));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bookProgress', JSON.stringify(progress));
  }, [progress]);

  const getChapterProgress = (chapterId: number): ChapterProgress => {
    return progress[chapterId] || { ...defaultProgress, chapterId };
  };

  const updateProgress = (chapterId: number, updates: Partial<ChapterProgress>) => {
    setProgress(prev => ({
      ...prev,
      [chapterId]: {
        ...getChapterProgress(chapterId),
        ...updates,
      },
    }));
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
    <ProgressContext.Provider value={{ getChapterProgress, updateProgress, getTotalProgress }}>
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