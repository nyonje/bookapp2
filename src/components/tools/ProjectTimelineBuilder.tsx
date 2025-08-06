import React, { useState } from 'react';
import { Calendar, Clock, CheckSquare, Plus, Trash2, Download } from 'lucide-react';

interface Task {
  id: string;
  name: string;
  description: string;
  week: number;
  estimatedHours: number;
  priority: 'high' | 'medium' | 'low';
  category: 'planning' | 'content' | 'development' | 'testing' | 'launch';
  completed: boolean;
}

interface WeekTemplate {
  week: number;
  title: string;
  focus: string;
  tasks: Omit<Task, 'id' | 'completed'>[];
}

const defaultWeeks: WeekTemplate[] = [
  {
    week: 1,
    title: 'Foundation & Planning',
    focus: 'Establish your app\'s core purpose and set up development environment',
    tasks: [
      { name: 'Define App Value Proposition', description: 'Complete the value proposition template', week: 1, estimatedHours: 3, priority: 'high', category: 'planning' },
      { name: 'User Research & Personas', description: 'Survey readers and create user personas', week: 1, estimatedHours: 4, priority: 'high', category: 'planning' },
      { name: 'Choose Development Stack', description: 'Select and set up your development platform', week: 1, estimatedHours: 2, priority: 'high', category: 'development' },
      { name: 'Create Project Timeline', description: 'Customize and finalize your 7-week timeline', week: 1, estimatedHours: 2, priority: 'medium', category: 'planning' },
      { name: 'Set Up Analytics', description: 'Configure tracking for user engagement', week: 1, estimatedHours: 1, priority: 'medium', category: 'development' }
    ]
  },
  {
    week: 2,
    title: 'Content Architecture',
    focus: 'Structure your book content for app integration',
    tasks: [
      { name: 'Content Audit', description: 'Review and categorize your book content', week: 2, estimatedHours: 4, priority: 'high', category: 'content' },
      { name: 'Create Chapter Summaries', description: 'Write concise summaries for each chapter', week: 2, estimatedHours: 6, priority: 'high', category: 'content' },
      { name: 'Design Information Architecture', description: 'Map out app navigation and content flow', week: 2, estimatedHours: 3, priority: 'high', category: 'planning' },
      { name: 'Write Key Takeaways', description: 'Extract key takeaways for each chapter', week: 2, estimatedHours: 2, priority: 'medium', category: 'content' }
    ]
  },
  {
    week: 3,
    title: 'Interactive Elements',
    focus: 'Create quizzes, tools, and engagement features',
    tasks: [
      { name: 'Create Quiz Questions', description: 'Write 10 questions per chapter with explanations', week: 3, estimatedHours: 8, priority: 'high', category: 'content' },
      { name: 'Design Practical Tools', description: 'Create interactive tools and calculators', week: 3, estimatedHours: 6, priority: 'high', category: 'development' },
      { name: 'Plan Gamification', description: 'Design progress tracking and achievement system', week: 3, estimatedHours: 2, priority: 'medium', category: 'planning' },
      { name: 'Content Review', description: 'Review all content for consistency and quality', week: 3, estimatedHours: 2, priority: 'medium', category: 'content' }
    ]
  },
  {
    week: 4,
    title: 'Core Development',
    focus: 'Build the main app structure and features',
    tasks: [
      { name: 'Build App Structure', description: 'Create main navigation and page layouts', week: 4, estimatedHours: 8, priority: 'high', category: 'development' },
      { name: 'Implement Content Display', description: 'Add chapters, summaries, and takeaways', week: 4, estimatedHours: 6, priority: 'high', category: 'development' },
      { name: 'Add Progress Tracking', description: 'Implement user progress and completion tracking', week: 4, estimatedHours: 4, priority: 'high', category: 'development' },
      { name: 'Basic Styling', description: 'Apply consistent styling and branding', week: 4, estimatedHours: 3, priority: 'medium', category: 'development' }
    ]
  },
  {
    week: 5,
    title: 'Feature Implementation',
    focus: 'Add interactive features and polish the experience',
    tasks: [
      { name: 'Implement Quiz System', description: 'Build interactive quiz functionality', week: 5, estimatedHours: 6, priority: 'high', category: 'development' },
      { name: 'Add Practical Tools', description: 'Integrate interactive tools and calculators', week: 5, estimatedHours: 8, priority: 'high', category: 'development' },
      { name: 'User Authentication', description: 'Add login and user account management', week: 5, estimatedHours: 4, priority: 'medium', category: 'development' },
      { name: 'Mobile Optimization', description: 'Ensure app works well on mobile devices', week: 5, estimatedHours: 3, priority: 'medium', category: 'development' }
    ]
  },
  {
    week: 6,
    title: 'Testing & Refinement',
    focus: 'Test thoroughly and refine based on feedback',
    tasks: [
      { name: 'Comprehensive Testing', description: 'Test all features across different devices', week: 6, estimatedHours: 6, priority: 'high', category: 'testing' },
      { name: 'Beta User Testing', description: 'Get feedback from 5-10 beta users', week: 6, estimatedHours: 4, priority: 'high', category: 'testing' },
      { name: 'Performance Optimization', description: 'Optimize loading times and responsiveness', week: 6, estimatedHours: 3, priority: 'medium', category: 'development' },
      { name: 'Content Refinement', description: 'Refine content based on user feedback', week: 6, estimatedHours: 2, priority: 'medium', category: 'content' },
      { name: 'Bug Fixes', description: 'Fix any issues discovered during testing', week: 6, estimatedHours: 4, priority: 'high', category: 'development' }
    ]
  },
  {
    week: 7,
    title: 'Launch Preparation',
    focus: 'Prepare for launch and plan ongoing engagement',
    tasks: [
      { name: 'Final Testing', description: 'Last round of testing before launch', week: 7, estimatedHours: 2, priority: 'high', category: 'testing' },
      { name: 'Launch Marketing', description: 'Prepare launch announcement and materials', week: 7, estimatedHours: 4, priority: 'high', category: 'launch' },
      { name: 'User Onboarding', description: 'Create welcome sequence and tutorials', week: 7, estimatedHours: 3, priority: 'high', category: 'content' },
      { name: 'Analytics Setup', description: 'Configure success metrics and tracking', week: 7, estimatedHours: 2, priority: 'medium', category: 'development' },
      { name: 'Backup & Security', description: 'Ensure data backup and security measures', week: 7, estimatedHours: 2, priority: 'medium', category: 'development' },
      { name: 'Launch!', description: 'Go live and announce to your audience', week: 7, estimatedHours: 1, priority: 'high', category: 'launch' }
    ]
  }
];

export function ProjectTimelineBuilder() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const allTasks: Task[] = [];
    defaultWeeks.forEach(week => {
      week.tasks.forEach(task => {
        allTasks.push({
          ...task,
          id: `task-${allTasks.length}`,
          completed: false
        });
      });
    });
    return allTasks;
  });

  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({
    name: '',
    description: '',
    week: 1,
    estimatedHours: 1,
    priority: 'medium' as const,
    category: 'development' as const
  });

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const addTask = () => {
    if (!newTask.name.trim()) return;
    
    const task: Task = {
      ...newTask,
      id: `task-${Date.now()}`,
      completed: false
    };
    
    setTasks([...tasks, task]);
    setNewTask({
      name: '',
      description: '',
      week: 1,
      estimatedHours: 1,
      priority: 'medium',
      category: 'development'
    });
    setShowAddTask(false);
  };

  const removeTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const getWeekTasks = (week: number) => {
    return tasks.filter(task => task.week === week);
  };

  const getWeekStats = (week: number) => {
    const weekTasks = getWeekTasks(week);
    const completed = weekTasks.filter(task => task.completed).length;
    const totalHours = weekTasks.reduce((sum, task) => sum + task.estimatedHours, 0);
    return { completed, total: weekTasks.length, totalHours };
  };

  const getOverallStats = () => {
    const completed = tasks.filter(task => task.completed).length;
    const totalHours = tasks.reduce((sum, task) => sum + task.estimatedHours, 0);
    const completedHours = tasks.filter(task => task.completed).reduce((sum, task) => sum + task.estimatedHours, 0);
    return { completed, total: tasks.length, totalHours, completedHours };
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'planning': return '📋';
      case 'content': return '📝';
      case 'development': return '💻';
      case 'testing': return '🧪';
      case 'launch': return '🚀';
      default: return '📌';
    }
  };

  const exportTimeline = () => {
    const data = {
      project: 'Companion App Development',
      totalWeeks: 7,
      totalTasks: tasks.length,
      totalHours: getOverallStats().totalHours,
      weeks: defaultWeeks.map(week => ({
        ...week,
        tasks: getWeekTasks(week.week),
        stats: getWeekStats(week.week)
      }))
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'app-development-timeline.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const overallStats = getOverallStats();

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-sm border">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Calendar className="w-8 h-8 text-blue-600" />
            <h2 className="text-2xl font-bold text-slate-900">7-Week Project Timeline</h2>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={() => setShowAddTask(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Add Task</span>
            </button>
            <button
              onClick={exportTimeline}
              className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export</span>
            </button>
          </div>
        </div>
        <p className="text-slate-600">
          Your complete 7-week roadmap from concept to launch. Customize tasks, track progress, and stay on schedule.
        </p>
      </div>

      {/* Overall Progress */}
      <div className="mb-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-slate-900">Overall Progress</h3>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">
              {Math.round((overallStats.completed / overallStats.total) * 100)}%
            </div>
            <div className="text-sm text-slate-600">Complete</div>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-slate-900">{overallStats.completed}/{overallStats.total}</div>
            <div className="text-sm text-slate-600">Tasks Completed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">{overallStats.completedHours}h/{overallStats.totalHours}h</div>
            <div className="text-sm text-slate-600">Hours Completed</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-slate-900">{Math.ceil(overallStats.totalHours / 7)}-{Math.ceil(overallStats.totalHours / 5)}h</div>
            <div className="text-sm text-slate-600">Hours/Week</div>
          </div>
        </div>
        <div className="mt-4 bg-white bg-opacity-50 rounded-full h-3">
          <div 
            className="bg-blue-600 rounded-full h-3 transition-all duration-300"
            style={{ width: `${(overallStats.completed / overallStats.total) * 100}%` }}
          />
        </div>
      </div>

      {/* Add Task Form */}
      {showAddTask && (
        <div className="mb-8 p-6 bg-slate-50 rounded-lg border-2 border-dashed border-slate-300">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Add Custom Task</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Task Name</label>
              <input
                type="text"
                value={newTask.name}
                onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
                className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Create app logo"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Week</label>
              <select
                value={newTask.week}
                onChange={(e) => setNewTask({ ...newTask, week: parseInt(e.target.value) })}
                className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {[1, 2, 3, 4, 5, 6, 7].map(week => (
                  <option key={week} value={week}>Week {week}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
            <input
              type="text"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Brief description of the task"
            />
          </div>
          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Estimated Hours</label>
              <input
                type="number"
                min="1"
                max="20"
                value={newTask.estimatedHours}
                onChange={(e) => setNewTask({ ...newTask, estimatedHours: parseInt(e.target.value) })}
                className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Priority</label>
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
                className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
              <select
                value={newTask.category}
                onChange={(e) => setNewTask({ ...newTask, category: e.target.value as any })}
                className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="planning">Planning</option>
                <option value="content">Content</option>
                <option value="development">Development</option>
                <option value="testing">Testing</option>
                <option value="launch">Launch</option>
              </select>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={addTask}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Add Task
            </button>
            <button
              onClick={() => setShowAddTask(false)}
              className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Weekly Timeline */}
      <div className="space-y-6">
        {defaultWeeks.map((week) => {
          const weekTasks = getWeekTasks(week.week);
          const stats = getWeekStats(week.week);
          const isSelected = selectedWeek === week.week;
          
          return (
            <div key={week.week} className="border border-slate-200 rounded-lg overflow-hidden">
              <div 
                className="bg-slate-50 p-6 cursor-pointer hover:bg-slate-100 transition-colors"
                onClick={() => setSelectedWeek(isSelected ? null : week.week)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-lg flex items-center justify-center font-bold text-lg">
                      {week.week}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900">{week.title}</h3>
                      <p className="text-slate-600">{week.focus}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-4 mb-2">
                      <div className="text-sm text-slate-600">
                        <Clock className="w-4 h-4 inline mr-1" />
                        {stats.totalHours}h
                      </div>
                      <div className="text-sm text-slate-600">
                        {stats.completed}/{stats.total} tasks
                      </div>
                    </div>
                    <div className="w-32 bg-slate-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 rounded-full h-2 transition-all duration-300"
                        style={{ width: `${stats.total > 0 ? (stats.completed / stats.total) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              {isSelected && (
                <div className="p-6 bg-white border-t border-slate-200">
                  <div className="space-y-4">
                    {weekTasks.map((task) => (
                      <div key={task.id} className="flex items-center space-x-4 p-4 bg-slate-50 rounded-lg">
                        <button
                          onClick={() => toggleTask(task.id)}
                          className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
                            task.completed 
                              ? 'bg-green-600 border-green-600 text-white' 
                              : 'border-slate-300 hover:border-green-400'
                          }`}
                        >
                          {task.completed && <CheckSquare className="w-4 h-4" />}
                        </button>
                        
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-1">
                            <span className="text-lg">{getCategoryIcon(task.category)}</span>
                            <h4 className={`font-medium ${task.completed ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                              {task.name}
                            </h4>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </span>
                          </div>
                          <p className={`text-sm ${task.completed ? 'text-slate-400' : 'text-slate-600'}`}>
                            {task.description}
                          </p>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-sm font-medium text-slate-700">{task.estimatedHours}h</div>
                          <button
                            onClick={() => removeTask(task.id)}
                            className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1 rounded transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
        <h3 className="text-lg font-semibold text-green-900 mb-4">🎯 Timeline Summary</h3>
        <div className="space-y-2 text-sm text-green-800">
          <p>• <strong>Total Duration:</strong> 7 weeks ({overallStats.totalHours} hours total)</p>
          <p>• <strong>Weekly Commitment:</strong> {Math.ceil(overallStats.totalHours / 7)}-{Math.ceil(overallStats.totalHours / 5)} hours per week</p>
          <p>• <strong>Key Milestones:</strong> Week 3 (Content Complete), Week 5 (Features Complete), Week 7 (Launch Ready)</p>
          <p>• <strong>Success Tip:</strong> Stay consistent with weekly goals rather than trying to catch up later</p>
        </div>
      </div>
    </div>
  );
}