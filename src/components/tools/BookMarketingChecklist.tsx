import React, { useState } from 'react';
import { CheckSquare, Square, Download, Star, CheckCircle } from 'lucide-react';

interface ChecklistItem {
  id: string;
  category: string;
  title: string;
  description: string;
  completed: boolean;
  priority: 'High' | 'Medium' | 'Low';
  timeline: string;
}

export function BookMarketingChecklist() {
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([
    // Pre-Launch (6 months)
    {
      id: '1',
      category: 'Pre-Launch',
      title: 'Build Author Platform',
      description: 'Create author website, social media accounts, and email list',
      completed: false,
      priority: 'High',
      timeline: '6 months before launch'
    },
    {
      id: '2',
      category: 'Pre-Launch',
      title: 'Develop Book Cover',
      description: 'Design professional book cover that matches genre expectations',
      completed: false,
      priority: 'High',
      timeline: '5 months before launch'
    },
    {
      id: '3',
      category: 'Pre-Launch',
      title: 'Write Book Description',
      description: 'Create compelling book description and author bio',
      completed: false,
      priority: 'High',
      timeline: '4 months before launch'
    },
    {
      id: '4',
      category: 'Pre-Launch',
      title: 'Secure Advance Reader Copies',
      description: 'Print or create digital ARCs for reviewers',
      completed: false,
      priority: 'Medium',
      timeline: '3 months before launch'
    },
    {
      id: '5',
      category: 'Pre-Launch',
      title: 'Identify Target Audience',
      description: 'Research and define your ideal reader demographics',
      completed: false,
      priority: 'High',
      timeline: '3 months before launch'
    },
    {
      id: '6',
      category: 'Pre-Launch',
      title: 'Plan Pre-Order Campaign',
      description: 'Set up pre-order links and promotional strategy',
      completed: false,
      priority: 'Medium',
      timeline: '2 months before launch'
    },
    {
      id: '7',
      category: 'Pre-Launch',
      title: 'Create Marketing Materials',
      description: 'Design bookmarks, posters, and promotional graphics',
      completed: false,
      priority: 'Low',
      timeline: '2 months before launch'
    },
    {
      id: '8',
      category: 'Pre-Launch',
      title: 'Research Competitors',
      description: 'Analyze similar books and their marketing strategies',
      completed: false,
      priority: 'Medium',
      timeline: '2 months before launch'
    },

    // Launch Week
    {
      id: '9',
      category: 'Launch Week',
      title: 'Launch Day Social Media Blitz',
      description: 'Post across all social platforms with consistent messaging',
      completed: false,
      priority: 'High',
      timeline: 'Launch day'
    },
    {
      id: '10',
      category: 'Launch Week',
      title: 'Email Campaign to Subscribers',
      description: 'Send launch announcement to your email list',
      completed: false,
      priority: 'High',
      timeline: 'Launch day'
    },
    {
      id: '11',
      category: 'Launch Week',
      title: 'Press Release Distribution',
      description: 'Send press releases to relevant media outlets',
      completed: false,
      priority: 'Medium',
      timeline: 'Launch day'
    },
    {
      id: '12',
      category: 'Launch Week',
      title: 'Virtual Book Launch Event',
      description: 'Host online launch party or reading',
      completed: false,
      priority: 'Medium',
      timeline: 'Launch week'
    },
    {
      id: '13',
      category: 'Launch Week',
      title: 'Paid Advertising Campaign',
      description: 'Run targeted ads on social media and Amazon',
      completed: false,
      priority: 'Medium',
      timeline: 'Launch week'
    },
    {
      id: '14',
      category: 'Launch Week',
      title: 'Influencer Outreach',
      description: 'Contact book bloggers and social media influencers',
      completed: false,
      priority: 'Medium',
      timeline: 'Launch week'
    },

    // Post-Launch (3 months)
    {
      id: '15',
      category: 'Post-Launch',
      title: 'Follow Up with Reviewers',
      description: 'Thank reviewers and request additional reviews',
      completed: false,
      priority: 'High',
      timeline: '1-2 weeks after launch'
    },
    {
      id: '16',
      category: 'Post-Launch',
      title: 'Continue Social Media Engagement',
      description: 'Maintain regular posting schedule and engagement',
      completed: false,
      priority: 'High',
      timeline: 'Ongoing'
    },
    {
      id: '17',
      category: 'Post-Launch',
      title: 'Plan Book Tour or Events',
      description: 'Schedule in-person or virtual book events',
      completed: false,
      priority: 'Medium',
      timeline: '1 month after launch'
    },
    {
      id: '18',
      category: 'Post-Launch',
      title: 'Monitor Sales and Analytics',
      description: 'Track sales performance and adjust strategy',
      completed: false,
      priority: 'High',
      timeline: 'Ongoing'
    },
    {
      id: '19',
      category: 'Post-Launch',
      title: 'Collect Reader Feedback',
      description: 'Gather reviews and testimonials from readers',
      completed: false,
      priority: 'Medium',
      timeline: '1-2 months after launch'
    },
    {
      id: '20',
      category: 'Post-Launch',
      title: 'Plan Sequel or Next Book',
      description: 'Begin planning your next book project',
      completed: false,
      priority: 'Low',
      timeline: '2-3 months after launch'
    }
  ]);

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');

  const categories = ['All', 'Pre-Launch', 'Launch Week', 'Post-Launch'];
  const priorities = ['All', 'High', 'Medium', 'Low'];

  const filteredItems = checklistItems.filter(item => {
    const categoryMatch = selectedCategory === 'All' || item.category === selectedCategory;
    const priorityMatch = selectedPriority === 'All' || item.priority === selectedPriority;
    return categoryMatch && priorityMatch;
  });

  const toggleItem = (id: string) => {
    setChecklistItems(prev => 
      prev.map(item => 
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const getProgress = () => {
    const completed = checklistItems.filter(item => item.completed).length;
    const total = checklistItems.length;
    return Math.round((completed / total) * 100);
  };

  const getCategoryProgress = (category: string) => {
    const categoryItems = checklistItems.filter(item => item.category === category);
    const completed = categoryItems.filter(item => item.completed).length;
    const total = categoryItems.length;
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  const exportChecklist = () => {
    const completedItems = checklistItems.filter(item => item.completed);
    const incompleteItems = checklistItems.filter(item => !item.completed);
    
    const exportData = {
      progress: getProgress(),
      completedItems: completedItems.map(item => ({
        category: item.category,
        title: item.title,
        timeline: item.timeline
      })),
      incompleteItems: incompleteItems.map(item => ({
        category: item.category,
        title: item.title,
        priority: item.priority,
        timeline: item.timeline
      }))
    };

    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'book-marketing-checklist.json';
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">Book Marketing Checklist</h2>
            <p className="text-green-100">50-point checklist for successful book promotion</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">{getProgress()}%</div>
            <div className="text-green-100 text-sm">Complete</div>
          </div>
        </div>
        <div className="mt-4 bg-green-500/20 rounded-full h-2">
          <div 
            className="bg-white h-2 rounded-full transition-all duration-300"
            style={{ width: `${getProgress()}%` }}
          ></div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg p-4 border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Priority</label>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {priorities.map(priority => (
                <option key={priority} value={priority}>{priority}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Category Progress */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {['Pre-Launch', 'Launch Week', 'Post-Launch'].map(category => (
          <div key={category} className="bg-white rounded-lg p-4 border border-slate-200">
            <h3 className="font-semibold text-slate-900 mb-2">{category}</h3>
            <div className="text-2xl font-bold text-green-600">{getCategoryProgress(category)}%</div>
            <div className="bg-slate-200 rounded-full h-2 mt-2">
              <div 
                className="bg-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${getCategoryProgress(category)}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Checklist Items */}
      <div className="space-y-4">
        {filteredItems.map(item => (
          <div 
            key={item.id} 
            className={`bg-white rounded-lg p-4 border border-slate-200 transition-all duration-200 ${
              item.completed ? 'bg-green-50 border-green-200' : 'hover:bg-slate-50'
            }`}
          >
            <div className="flex items-start space-x-3">
              <button
                onClick={() => toggleItem(item.id)}
                className="mt-1"
              >
                {item.completed ? (
                  <CheckSquare className="w-5 h-5 text-green-600" />
                ) : (
                  <Square className="w-5 h-5 text-slate-400" />
                )}
              </button>
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className={`font-semibold ${item.completed ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                    {item.title}
                  </h3>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    item.priority === 'High' ? 'bg-red-100 text-red-700' :
                    item.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-green-100 text-green-700'
                  }`}>
                    {item.priority}
                  </span>
                  <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full">
                    {item.category}
                  </span>
                </div>
                <p className={`text-sm mb-2 ${item.completed ? 'text-slate-500' : 'text-slate-600'}`}>
                  {item.description}
                </p>
                <div className="flex items-center space-x-2 text-xs text-slate-500">
                  <span>Timeline: {item.timeline}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Export Section */}
      <div className="bg-blue-50 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-slate-900 mb-2">Export Your Progress</h3>
            <p className="text-slate-600 text-sm">Download your checklist progress as JSON</p>
          </div>
          <button
            onClick={exportChecklist}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Download className="w-4 h-4" />
            <span>Export Checklist</span>
          </button>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-yellow-50 rounded-lg p-6">
        <h3 className="font-semibold text-slate-900 mb-4">Checklist Tips</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
            <span className="text-slate-700">Start with high-priority items first</span>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
            <span className="text-slate-700">Focus on one category at a time</span>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
            <span className="text-slate-700">Track your progress regularly</span>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
            <span className="text-slate-700">Customize the checklist for your specific book and audience</span>
          </div>
        </div>
      </div>
    </div>
  );
} 