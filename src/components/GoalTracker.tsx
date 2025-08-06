import React, { useState, useEffect } from 'react';
import { Target, Calendar, TrendingUp, CheckCircle, Clock, Award, Plus, Edit3, Trash2 } from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  description: string;
  target: number;
  current: number;
  unit: string;
  deadline: string;
  category: 'reading' | 'quizzes' | 'tools' | 'community' | 'custom';
  status: 'active' | 'completed' | 'overdue';
  createdAt: string;
}

interface Habit {
  id: string;
  title: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  streak: number;
  lastCompleted: string | null;
  category: 'reading' | 'quizzes' | 'tools' | 'community' | 'custom';
  status: 'active' | 'paused';
}

export function GoalTracker() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [showAddHabit, setShowAddHabit] = useState(false);
  const [activeTab, setActiveTab] = useState<'goals' | 'habits'>('goals');

  // Load data from localStorage
  useEffect(() => {
    const savedGoals = localStorage.getItem('userGoals');
    const savedHabits = localStorage.getItem('userHabits');
    
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
    if (savedHabits) {
      setHabits(JSON.parse(savedHabits));
    }
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('userGoals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem('userHabits', JSON.stringify(habits));
  }, [habits]);

  const addGoal = (goal: Omit<Goal, 'id' | 'createdAt'>) => {
    const newGoal: Goal = {
      ...goal,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    setGoals([...goals, newGoal]);
    setShowAddGoal(false);
  };

  const addHabit = (habit: Omit<Habit, 'id'>) => {
    const newHabit: Habit = {
      ...habit,
      id: Date.now().toString()
    };
    setHabits([...habits, newHabit]);
    setShowAddHabit(false);
  };

  const updateGoalProgress = (goalId: string, newCurrent: number) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const status = newCurrent >= goal.target ? 'completed' : 
                     new Date() > new Date(goal.deadline) ? 'overdue' : 'active';
        return { ...goal, current: newCurrent, status };
      }
      return goal;
    }));
  };

  const completeHabit = (habitId: string) => {
    setHabits(habits.map(habit => {
      if (habit.id === habitId) {
        return {
          ...habit,
          streak: habit.streak + 1,
          lastCompleted: new Date().toISOString()
        };
      }
      return habit;
    }));
  };

  const deleteGoal = (goalId: string) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
  };

  const deleteHabit = (habitId: string) => {
    setHabits(habits.filter(habit => habit.id !== habitId));
  };

  const getGoalProgress = (goal: Goal) => {
    return Math.min(100, (goal.current / goal.target) * 100);
  };

  const getGoalStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'overdue': return 'text-red-600 bg-red-100';
      default: return 'text-blue-600 bg-blue-100';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'reading': return '📚';
      case 'quizzes': return '🎯';
      case 'tools': return '🛠️';
      case 'community': return '👥';
      default: return '🎯';
    }
  };

  const getFrequencyText = (frequency: string) => {
    switch (frequency) {
      case 'daily': return 'Daily';
      case 'weekly': return 'Weekly';
      case 'monthly': return 'Monthly';
      default: return frequency;
    }
  };

  const activeGoals = goals.filter(goal => goal.status === 'active');
  const completedGoals = goals.filter(goal => goal.status === 'completed');
  const activeHabits = habits.filter(habit => habit.status === 'active');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Goal Tracker</h2>
          <p className="text-slate-600">Set learning goals and build positive habits</p>
        </div>
        <div className="flex space-x-3">
          <button
            onClick={() => setShowAddGoal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Goal</span>
          </button>
          <button
            onClick={() => setShowAddHabit(true)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Habit</span>
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 text-center">
          <div className="text-2xl font-bold text-blue-600">{activeGoals.length}</div>
          <div className="text-sm text-slate-600">Active Goals</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 text-center">
          <div className="text-2xl font-bold text-green-600">{completedGoals.length}</div>
          <div className="text-sm text-slate-600">Completed Goals</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 text-center">
          <div className="text-2xl font-bold text-purple-600">{activeHabits.length}</div>
          <div className="text-sm text-slate-600">Active Habits</div>
        </div>
        <div className="bg-white rounded-xl p-4 shadow-sm border border-slate-200 text-center">
          <div className="text-2xl font-bold text-orange-600">
            {habits.reduce((total, habit) => total + habit.streak, 0)}
          </div>
          <div className="text-sm text-slate-600">Total Streak</div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-slate-100 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('goals')}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
            activeTab === 'goals'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Goals
        </button>
        <button
          onClick={() => setActiveTab('habits')}
          className={`flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
            activeTab === 'habits'
              ? 'bg-white text-slate-900 shadow-sm'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Habits
        </button>
      </div>

      {/* Goals Tab */}
      {activeTab === 'goals' && (
        <div className="space-y-4">
          {goals.length === 0 ? (
            <div className="text-center py-12">
              <Target className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No Goals Set</h3>
              <p className="text-slate-600 mb-4">Start by setting your first learning goal</p>
              <button
                onClick={() => setShowAddGoal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Add Your First Goal
              </button>
            </div>
          ) : (
            goals.map(goal => (
              <div key={goal.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getCategoryIcon(goal.category)}</span>
                    <div>
                      <h3 className="font-semibold text-slate-900">{goal.title}</h3>
                      <p className="text-sm text-slate-600">{goal.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getGoalStatusColor(goal.status)}`}>
                      {goal.status}
                    </span>
                    <button
                      onClick={() => deleteGoal(goal.id)}
                      className="text-slate-400 hover:text-red-600 transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Progress</span>
                    <span className="font-medium">{goal.current} / {goal.target} {goal.unit}</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${getGoalProgress(goal)}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-slate-500">
                    <span>Deadline: {new Date(goal.deadline).toLocaleDateString()}</span>
                    <span>{Math.round(getGoalProgress(goal))}% complete</span>
                  </div>
                </div>

                {goal.status === 'active' && (
                  <div className="mt-4">
                    <button
                      onClick={() => updateGoalProgress(goal.id, goal.current + 1)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                    >
                      Mark Progress
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Habits Tab */}
      {activeTab === 'habits' && (
        <div className="space-y-4">
          {habits.length === 0 ? (
            <div className="text-center py-12">
              <TrendingUp className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No Habits Set</h3>
              <p className="text-slate-600 mb-4">Build positive learning habits to stay consistent</p>
              <button
                onClick={() => setShowAddHabit(true)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                Add Your First Habit
              </button>
            </div>
          ) : (
            habits.map(habit => (
              <div key={habit.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{getCategoryIcon(habit.category)}</span>
                    <div>
                      <h3 className="font-semibold text-slate-900">{habit.title}</h3>
                      <p className="text-sm text-slate-600">{getFrequencyText(habit.frequency)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                      {habit.streak} day streak
                    </span>
                    <button
                      onClick={() => deleteHabit(habit.id)}
                      className="text-slate-400 hover:text-red-600 transition-colors duration-200"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-600">
                    Last completed: {habit.lastCompleted ? new Date(habit.lastCompleted).toLocaleDateString() : 'Never'}
                  </div>
                  <button
                    onClick={() => completeHabit(habit.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Complete Today</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Add Goal Modal */}
      {showAddGoal && (
        <AddGoalModal
          onAdd={addGoal}
          onClose={() => setShowAddGoal(false)}
        />
      )}

      {/* Add Habit Modal */}
      {showAddHabit && (
        <AddHabitModal
          onAdd={addHabit}
          onClose={() => setShowAddHabit(false)}
        />
      )}
    </div>
  );
}

// Add Goal Modal Component
function AddGoalModal({ onAdd, onClose }: { onAdd: (goal: Omit<Goal, 'id' | 'createdAt'>) => void; onClose: () => void }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    target: 1,
    unit: 'chapters',
    deadline: '',
    category: 'reading' as Goal['category']
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      ...formData,
      current: 0,
      status: 'active'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Add New Goal</h3>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600">×</button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Goal Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Complete 3 chapters"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Describe your goal..."
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Target</label>
                <input
                  type="number"
                  value={formData.target}
                  onChange={(e) => setFormData({ ...formData, target: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Unit</label>
                <select
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="chapters">Chapters</option>
                  <option value="quizzes">Quizzes</option>
                  <option value="tools">Tools</option>
                  <option value="days">Days</option>
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Deadline</label>
              <input
                type="date"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as Goal['category'] })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="reading">Reading</option>
                <option value="quizzes">Quizzes</option>
                <option value="tools">Tools</option>
                <option value="community">Community</option>
                <option value="custom">Custom</option>
              </select>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Add Goal
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

// Add Habit Modal Component
function AddHabitModal({ onAdd, onClose }: { onAdd: (habit: Omit<Habit, 'id'>) => void; onClose: () => void }) {
  const [formData, setFormData] = useState({
    title: '',
    frequency: 'daily' as Habit['frequency'],
    category: 'reading' as Habit['category']
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      ...formData,
      streak: 0,
      lastCompleted: null,
      status: 'active'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-slate-900">Add New Habit</h3>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600">×</button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Habit Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Read for 30 minutes"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Frequency</label>
              <select
                value={formData.frequency}
                onChange={(e) => setFormData({ ...formData, frequency: e.target.value as Habit['frequency'] })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as Habit['category'] })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="reading">Reading</option>
                <option value="quizzes">Quizzes</option>
                <option value="tools">Tools</option>
                <option value="community">Community</option>
                <option value="custom">Custom</option>
              </select>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-slate-600 hover:text-slate-800 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                Add Habit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 