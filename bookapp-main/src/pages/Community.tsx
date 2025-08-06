import React, { useState } from 'react';
import { MessageCircle, Users, TrendingUp, Plus, Heart, Reply } from 'lucide-react';

export function Community() {
  const [activeTab, setActiveTab] = useState<'discussions' | 'showcase' | 'resources'>('discussions');

  const discussions = [
    {
      id: 1,
      title: "What AI platform worked best for your app?",
      author: "Sarah Chen",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=100&h=100&fit=crop&crop=face&auto=compress",
      time: "2 hours ago",
      replies: 12,
      likes: 8,
      category: "Development",
      preview: "I'm torn between Lovable.dev and Bolt.new for my productivity book app. Has anyone tried both? What are the main differences in terms of..."
    },
    {
      id: 2,
      title: "First 100 users milestone! 🎉",
      author: "Mike Rodriguez",
      avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?w=100&h=100&fit=crop&crop=face&auto=compress",
      time: "5 hours ago",
      replies: 23,
      likes: 45,
      category: "Success Stories",
      preview: "Just hit 100 active users on my financial planning app! Here's what worked and what didn't in my first 3 months..."
    },
    {
      id: 3,
      title: "Struggling with user retention - need advice",
      author: "Jennifer Park",
      avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?w=100&h=100&fit=crop&crop=face&auto=compress",
      time: "1 day ago",
      replies: 18,
      likes: 15,
      category: "Help Needed",
      preview: "My app has great initial engagement but users drop off after week 2. I've tried push notifications and email sequences but..."
    },
    {
      id: 4,
      title: "Best practices for quiz design?",
      author: "David Kim",
      avatar: "https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?w=100&h=100&fit=crop&crop=face&auto=compress",
      time: "2 days ago",
      replies: 9,
      likes: 12,
      category: "Design",
      preview: "I'm working on quiz questions for my leadership book. How many questions per chapter? Multiple choice vs open-ended? Any templates to share?"
    }
  ];

  const showcaseApps = [
    {
      id: 1,
      title: "Mindful Money Manager",
      author: "Lisa Thompson",
      description: "Companion app for my personal finance book with budgeting tools and habit tracking.",
      image: "https://images.pexels.com/photos/4386372/pexels-photo-4386372.jpeg?w=400&h=300&fit=crop&auto=compress",
      users: "250+ users",
      rating: 4.8,
      category: "Finance"
    },
    {
      id: 2,
      title: "Leadership Lab",
      author: "Robert Chang",
      description: "Interactive leadership development with assessments, scenarios, and peer feedback.",
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?w=400&h=300&fit=crop&auto=compress",
      users: "180+ users",
      rating: 4.9,
      category: "Business"
    },
    {
      id: 3,
      title: "Wellness Journey",
      author: "Maria Garcia",
      description: "Holistic health companion with meditation guides, meal planning, and progress tracking.",
      image: "https://images.pexels.com/photos/3823488/pexels-photo-3823488.jpeg?w=400&h=300&fit=crop&auto=compress",
      users: "320+ users",
      rating: 4.7,
      category: "Health"
    }
  ];

  const resources = [
    {
      id: 1,
      title: "Complete Onboarding Flow Template",
      author: "Community Team",
      type: "Template",
      downloads: 156,
      description: "Ready-to-use onboarding sequence that reduces drop-off by 40%"
    },
    {
      id: 2,
      title: "App Store Optimization Checklist",
      author: "Marketing Experts",
      type: "Checklist",
      downloads: 203,
      description: "Step-by-step guide to optimize your app store listing for better discoverability"
    },
    {
      id: 3,
      title: "User Feedback Collection Kit",
      author: "UX Research Team",
      type: "Kit",
      downloads: 127,
      description: "Survey templates, interview guides, and analysis frameworks"
    }
  ];

  const tabs = [
    { id: 'discussions', label: 'Discussions', icon: MessageCircle, count: discussions.length },
    { id: 'showcase', label: 'App Showcase', icon: TrendingUp, count: showcaseApps.length },
    { id: 'resources', label: 'Resources', icon: Users, count: resources.length },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Community Hub</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Connect with fellow authors, share your progress, get feedback, and learn from others building companion apps.
        </p>
      </div>

      {/* Community Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-slate-200">
          <div className="text-3xl font-bold text-blue-600">487</div>
          <div className="text-slate-600">Active Members</div>
        </div>
        <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-slate-200">
          <div className="text-3xl font-bold text-green-600">23</div>
          <div className="text-slate-600">Apps Launched</div>
        </div>
        <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-slate-200">
          <div className="text-3xl font-bold text-purple-600">152</div>
          <div className="text-slate-600">Discussions</div>
        </div>
        <div className="bg-white rounded-xl p-6 text-center shadow-sm border border-slate-200">
          <div className="text-3xl font-bold text-orange-600">89</div>
          <div className="text-slate-600">Resources Shared</div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200">
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
                <span className="bg-slate-100 text-slate-600 px-2 py-1 rounded-full text-xs">
                  {tab.count}
                </span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-8">
          {activeTab === 'discussions' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-slate-900">Recent Discussions</h3>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  <Plus className="w-4 h-4" />
                  <span>New Discussion</span>
                </button>
              </div>

              <div className="space-y-4">
                {discussions.map((discussion) => (
                  <div key={discussion.id} className="border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-start space-x-4">
                      <img
                        src={discussion.avatar}
                        alt={discussion.author}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-slate-900 hover:text-blue-600 cursor-pointer">
                            {discussion.title}
                          </h4>
                          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                            {discussion.category}
                          </span>
                        </div>
                        <p className="text-slate-600 text-sm mb-3 leading-relaxed">
                          {discussion.preview}
                        </p>
                        <div className="flex items-center space-x-6 text-sm text-slate-500">
                          <span>by {discussion.author}</span>
                          <span>{discussion.time}</span>
                          <div className="flex items-center space-x-1">
                            <Reply className="w-4 h-4" />
                            <span>{discussion.replies} replies</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Heart className="w-4 h-4" />
                            <span>{discussion.likes}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'showcase' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-slate-900">Community App Showcase</h3>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  <Plus className="w-4 h-4" />
                  <span>Submit Your App</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {showcaseApps.map((app) => (
                  <div key={app.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-200">
                    <img
                      src={app.image}
                      alt={app.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-slate-900">{app.title}</h4>
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                          {app.category}
                        </span>
                      </div>
                      <p className="text-slate-600 text-sm mb-4">{app.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-500">by {app.author}</span>
                        <div className="flex items-center space-x-4">
                          <span className="text-blue-600 font-medium">{app.users}</span>
                          <div className="flex items-center space-x-1">
                            <span className="text-yellow-500">★</span>
                            <span className="text-slate-600">{app.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'resources' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-slate-900">Community Resources</h3>
                <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                  <Plus className="w-4 h-4" />
                  <span>Share Resource</span>
                </button>
              </div>

              <div className="space-y-4">
                {resources.map((resource) => (
                  <div key={resource.id} className="border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-slate-900">{resource.title}</h4>
                          <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                            {resource.type}
                          </span>
                        </div>
                        <p className="text-slate-600 text-sm mb-3">{resource.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-slate-500">
                          <span>by {resource.author}</span>
                          <span>{resource.downloads} downloads</span>
                        </div>
                      </div>
                      <button className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                        Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}