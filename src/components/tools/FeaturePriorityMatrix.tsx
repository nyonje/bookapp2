import React, { useState } from 'react';
import { Grid, Plus, Trash2, ArrowUp, ArrowDown, Target } from 'lucide-react';

interface Feature {
  id: string;
  name: string;
  description: string;
  impact: number; // 1-5 scale
  difficulty: number; // 1-5 scale
  priority: 'high' | 'medium' | 'low' | 'avoid';
}

const defaultFeatures: Omit<Feature, 'id' | 'priority'>[] = [
  { name: 'User Registration & Profiles', description: 'Allow users to create accounts and track progress', impact: 4, difficulty: 2 },
  { name: 'Interactive Quizzes', description: 'Chapter-based quizzes with immediate feedback', impact: 5, difficulty: 2 },
  { name: 'Progress Tracking', description: 'Visual progress indicators and completion stats', impact: 5, difficulty: 3 },
  { name: 'Community Forum', description: 'Discussion boards for user interaction', impact: 4, difficulty: 4 },
  { name: 'Push Notifications', description: 'Reminders and engagement notifications', impact: 3, difficulty: 3 },
  { name: 'Offline Mode', description: 'Access content without internet connection', impact: 3, difficulty: 4 },
  { name: 'Video Content', description: 'Embedded video lessons and tutorials', impact: 4, difficulty: 3 },
  { name: 'Achievement Badges', description: 'Gamification through earned badges', impact: 2, difficulty: 2 },
  { name: 'Social Sharing', description: 'Share progress on social media', impact: 2, difficulty: 2 },
  { name: 'AI Recommendations', description: 'Personalized content suggestions', impact: 3, difficulty: 5 }
];

export function FeaturePriorityMatrix() {
  const [features, setFeatures] = useState<Feature[]>(() =>
    defaultFeatures.map((feature, index) => ({
      ...feature,
      id: `feature-${index}`,
      priority: calculatePriority(feature.impact, feature.difficulty)
    }))
  );
  const [newFeature, setNewFeature] = useState({
    name: '',
    description: '',
    impact: 3,
    difficulty: 3
  });
  const [showAddForm, setShowAddForm] = useState(false);

  function calculatePriority(impact: number, difficulty: number): 'high' | 'medium' | 'low' | 'avoid' {
    const score = impact - difficulty;
    if (impact >= 4 && difficulty <= 2) return 'high';
    if (score >= 1) return 'medium';
    if (score >= -1) return 'low';
    return 'avoid';
  }

  const updateFeature = (id: string, field: keyof Feature, value: any) => {
    setFeatures(features.map(feature => {
      if (feature.id === id) {
        const updated = { ...feature, [field]: value };
        if (field === 'impact' || field === 'difficulty') {
          updated.priority = calculatePriority(updated.impact, updated.difficulty);
        }
        return updated;
      }
      return feature;
    }));
  };

  const addFeature = () => {
    if (!newFeature.name.trim()) return;
    
    const feature: Feature = {
      id: `feature-${Date.now()}`,
      ...newFeature,
      priority: calculatePriority(newFeature.impact, newFeature.difficulty)
    };
    
    setFeatures([...features, feature]);
    setNewFeature({ name: '', description: '', impact: 3, difficulty: 3 });
    setShowAddForm(false);
  };

  const removeFeature = (id: string) => {
    setFeatures(features.filter(feature => feature.id !== id));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-green-100 text-green-800 border-green-300';
      case 'medium': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'low': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'avoid': return 'bg-red-100 text-red-800 border-red-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const sortedFeatures = [...features].sort((a, b) => {
    const priorityOrder = { high: 4, medium: 3, low: 2, avoid: 1 };
    return priorityOrder[b.priority] - priorityOrder[a.priority];
  });

  const getRecommendations = () => {
    const highPriority = features.filter(f => f.priority === 'high');
    const mediumPriority = features.filter(f => f.priority === 'medium');
    
    return {
      phase1: highPriority.slice(0, 3),
      phase2: [...highPriority.slice(3), ...mediumPriority].slice(0, 4),
      avoid: features.filter(f => f.priority === 'avoid')
    };
  };

  const recommendations = getRecommendations();

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-sm border">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Grid className="w-8 h-8 text-purple-600" />
            <h2 className="text-2xl font-bold text-slate-900">Feature Priority Matrix</h2>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Feature</span>
          </button>
        </div>
        <p className="text-slate-600">
          Prioritize your app features by ranking their impact on user outcomes versus implementation difficulty.
        </p>
      </div>

      {/* Add Feature Form */}
      {showAddForm && (
        <div className="mb-8 p-6 bg-slate-50 rounded-lg border-2 border-dashed border-slate-300">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Add New Feature</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Feature Name</label>
              <input
                type="text"
                value={newFeature.name}
                onChange={(e) => setNewFeature({ ...newFeature, name: e.target.value })}
                className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="e.g., Dark Mode Toggle"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Description</label>
              <input
                type="text"
                value={newFeature.description}
                onChange={(e) => setNewFeature({ ...newFeature, description: e.target.value })}
                className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Brief description of the feature"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Impact on Users (1-5)
              </label>
              <select
                value={newFeature.impact}
                onChange={(e) => setNewFeature({ ...newFeature, impact: parseInt(e.target.value) })}
                className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value={1}>1 - Minimal impact</option>
                <option value={2}>2 - Small impact</option>
                <option value={3}>3 - Moderate impact</option>
                <option value={4}>4 - High impact</option>
                <option value={5}>5 - Critical impact</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Implementation Difficulty (1-5)
              </label>
              <select
                value={newFeature.difficulty}
                onChange={(e) => setNewFeature({ ...newFeature, difficulty: parseInt(e.target.value) })}
                className="w-full p-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value={1}>1 - Very easy</option>
                <option value={2}>2 - Easy</option>
                <option value={3}>3 - Moderate</option>
                <option value={4}>4 - Hard</option>
                <option value={5}>5 - Very hard</option>
              </select>
            </div>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={addFeature}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Add Feature
            </button>
            <button
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Features Matrix */}
      <div className="mb-8 overflow-x-auto">
        <table className="w-full border-collapse border border-slate-200 rounded-lg">
          <thead>
            <tr className="bg-slate-50">
              <th className="border border-slate-200 p-4 text-left text-slate-900 font-semibold">Feature</th>
              <th className="border border-slate-200 p-4 text-center text-slate-900 font-semibold">Impact</th>
              <th className="border border-slate-200 p-4 text-center text-slate-900 font-semibold">Difficulty</th>
              <th className="border border-slate-200 p-4 text-center text-slate-900 font-semibold">Priority</th>
              <th className="border border-slate-200 p-4 text-center text-slate-900 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedFeatures.map((feature) => (
              <tr key={feature.id} className="hover:bg-slate-50">
                <td className="border border-slate-200 p-4">
                  <div>
                    <div className="font-medium text-slate-900">{feature.name}</div>
                    <div className="text-sm text-slate-600">{feature.description}</div>
                  </div>
                </td>
                <td className="border border-slate-200 p-4 text-center">
                  <select
                    value={feature.impact}
                    onChange={(e) => updateFeature(feature.id, 'impact', parseInt(e.target.value))}
                    className="w-16 p-1 border border-slate-200 rounded text-center focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </td>
                <td className="border border-slate-200 p-4 text-center">
                  <select
                    value={feature.difficulty}
                    onChange={(e) => updateFeature(feature.id, 'difficulty', parseInt(e.target.value))}
                    className="w-16 p-1 border border-slate-200 rounded text-center focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </td>
                <td className="border border-slate-200 p-4 text-center">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(feature.priority)}`}>
                    {feature.priority.toUpperCase()}
                  </span>
                </td>
                <td className="border border-slate-200 p-4 text-center">
                  <button
                    onClick={() => removeFeature(feature.id)}
                    className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Development Roadmap */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-slate-900 flex items-center">
          <Target className="w-5 h-5 mr-2 text-purple-600" />
          Recommended Development Roadmap
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Phase 1 */}
          <div className="bg-green-50 border border-green-200 p-6 rounded-lg">
            <h4 className="text-lg font-semibold text-green-900 mb-4 flex items-center">
              <ArrowUp className="w-5 h-5 mr-2" />
              Phase 1: MVP Features
            </h4>
            <p className="text-green-700 text-sm mb-4">High impact, low difficulty - build these first</p>
            <div className="space-y-2">
              {recommendations.phase1.map((feature) => (
                <div key={feature.id} className="text-sm">
                  <div className="font-medium text-green-900">{feature.name}</div>
                  <div className="text-green-700">{feature.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Phase 2 */}
          <div className="bg-blue-50 border border-blue-200 p-6 rounded-lg">
            <h4 className="text-lg font-semibold text-blue-900 mb-4 flex items-center">
              <ArrowUp className="w-5 h-5 mr-2" />
              Phase 2: Growth Features
            </h4>
            <p className="text-blue-700 text-sm mb-4">Medium priority - add after MVP validation</p>
            <div className="space-y-2">
              {recommendations.phase2.map((feature) => (
                <div key={feature.id} className="text-sm">
                  <div className="font-medium text-blue-900">{feature.name}</div>
                  <div className="text-blue-700">{feature.description}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Avoid */}
          <div className="bg-red-50 border border-red-200 p-6 rounded-lg">
            <h4 className="text-lg font-semibold text-red-900 mb-4 flex items-center">
              <ArrowDown className="w-5 h-5 mr-2" />
              Avoid for Now
            </h4>
            <p className="text-red-700 text-sm mb-4">High difficulty, low impact - deprioritize these</p>
            <div className="space-y-2">
              {recommendations.avoid.length > 0 ? recommendations.avoid.map((feature) => (
                <div key={feature.id} className="text-sm">
                  <div className="font-medium text-red-900">{feature.name}</div>
                  <div className="text-red-700">{feature.description}</div>
                </div>
              )) : (
                <div className="text-sm text-red-700">No features to avoid - great prioritization!</div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-purple-50 border border-purple-200 p-6 rounded-lg">
          <h4 className="text-lg font-semibold text-purple-900 mb-4">💡 Key Insights</h4>
          <div className="space-y-2 text-sm text-purple-700">
            <p>• Start with your {recommendations.phase1.length} highest-priority features to build a solid MVP</p>
            <p>• Focus on features that directly solve user problems rather than nice-to-have additions</p>
            <p>• Validate each phase with real users before moving to the next</p>
            <p>• Consider technical dependencies when planning your development timeline</p>
          </div>
        </div>
      </div>
    </div>
  );
}