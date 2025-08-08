import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Target, TrendingUp, Users, BookOpen, PenTool, Share2, 
  Calendar, DollarSign, BarChart3, MessageCircle, Star, 
  ChevronRight, Eye, Heart, Download, ChevronDown, ChevronUp
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { SubscriptionGate } from '../components/SubscriptionGate';

// Import interactive marketing tools
import { TargetAudienceAnalyzer } from '../components/tools/TargetAudienceAnalyzer';
import { SocialMediaContentPlanner } from '../components/tools/SocialMediaContentPlanner';
import { BookPricingStrategyCalculator } from '../components/tools/BookPricingStrategyCalculator';
import { BookLaunchCampaignBuilder } from '../components/tools/BookLaunchCampaignBuilder';
import { BookReviewRequestGenerator } from '../components/tools/BookReviewRequestGenerator';
import { MarketingAnalyticsDashboard } from '../components/tools/MarketingAnalyticsDashboard';

interface MarketingTool {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  premium?: boolean;
  component?: React.ComponentType<any>;
}

const marketingTools: MarketingTool[] = [
  {
    id: 'audience-finder',
    title: 'Target Audience Analyzer',
    description: 'Identify and analyze your ideal book readers using demographic and psychographic data.',
    icon: Target,
    category: 'Audience Research',
    difficulty: 'Beginner',
    component: TargetAudienceAnalyzer
  },
  {
    id: 'social-media-planner',
    title: 'Social Media Content Planner',
    description: 'Plan and schedule engaging content across all social platforms with book marketing templates.',
    icon: Calendar,
    category: 'Social Media',
    difficulty: 'Intermediate',
    component: SocialMediaContentPlanner
  },
  {
    id: 'pricing-strategy',
    title: 'Book Pricing Strategy Calculator',
    description: 'Optimize your book pricing based on market research, genre analysis, and competition.',
    icon: DollarSign,
    category: 'Pricing',
    difficulty: 'Advanced',
    component: BookPricingStrategyCalculator
  },
  {
    id: 'launch-campaign',
    title: 'Book Launch Campaign Builder',
    description: 'Create comprehensive launch campaigns with timelines, tactics, and promotional materials.',
    icon: TrendingUp,
    category: 'Launch Strategy',
    difficulty: 'Intermediate',
    component: BookLaunchCampaignBuilder
  },
  {
    id: 'review-generator',
    title: 'Book Review Request Generator',
    description: 'Generate personalized review requests and follow-up sequences for your book.',
    icon: Star,
    category: 'Reviews',
    difficulty: 'Beginner',
    component: BookReviewRequestGenerator
  },
  {
    id: 'analytics-dashboard',
    title: 'Marketing Analytics Dashboard',
    description: 'Track your marketing performance across platforms with detailed insights and recommendations.',
    icon: BarChart3,
    category: 'Analytics',
    difficulty: 'Advanced',
    premium: true,
    component: MarketingAnalyticsDashboard
  }
];

const marketingResources = [
  {
    title: 'Book Marketing Checklist',
    description: '50-point checklist for successful book promotion',
    downloads: 1243,
    rating: 4.8
  },
  {
    title: 'Social Media Templates Pack',
    description: 'Ready-to-use templates for Instagram, Facebook, and Twitter',
    downloads: 892,
    rating: 4.9
  },
  {
    title: 'Email Marketing Sequences',
    description: 'Pre-written email sequences for book launches',
    downloads: 675,
    rating: 4.7
  }
];

export function MarketingVault() {
  const { hasAccess } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [expandedTools, setExpandedTools] = useState<Set<string>>(new Set());

  if (!hasAccess('marketing_vault')) {
    return (
      <div className="container mx-auto px-4 py-8">
        <SubscriptionGate feature="marketing_vault">
          {/* This will show the upgrade prompt */}
        </SubscriptionGate>
      </div>
    );
  }

  const categories = ['All', ...new Set(marketingTools.map(tool => tool.category))];
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced'];

  const filteredTools = marketingTools.filter(tool => {
    const categoryMatch = selectedCategory === 'All' || tool.category === selectedCategory;
    const difficultyMatch = selectedDifficulty === 'All' || tool.difficulty === selectedDifficulty;
    return categoryMatch && difficultyMatch;
  });

  const toggleToolExpansion = (toolId: string) => {
    const newExpanded = new Set(expandedTools);
    if (expandedTools.has(toolId)) {
      newExpanded.delete(toolId);
    } else {
      newExpanded.add(toolId);
    }
    setExpandedTools(newExpanded);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
        <div className="flex items-center space-x-4 mb-4">
          <div className="p-3 bg-white/20 rounded-lg">
            <Target className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Marketing Vault</h1>
            <p className="text-purple-100">Powerful tools to market your book and grow your author business</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <Users className="w-6 h-6" />
              <div>
                <p className="text-2xl font-bold">10K+</p>
                <p className="text-purple-200 text-sm">Authors Helped</p>
              </div>
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <BookOpen className="w-6 h-6" />
              <div>
                <p className="text-2xl font-bold">50K+</p>
                <p className="text-purple-200 text-sm">Books Promoted</p>
              </div>
            </div>
          </div>
          <div className="bg-white/10 rounded-lg p-4 backdrop-blur-sm">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-6 h-6" />
              <div>
                <p className="text-2xl font-bold">3.5x</p>
                <p className="text-purple-200 text-sm">Avg. Sales Increase</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Filter Tools</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Difficulty</label>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            >
              {difficulties.map(difficulty => (
                <option key={difficulty} value={difficulty}>{difficulty}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Marketing Tools Grid */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-slate-900">Interactive Marketing Tools</h2>
        <div className="space-y-4">
          {filteredTools.map((tool) => {
            const IconComponent = tool.icon;
            const isExpanded = expandedTools.has(tool.id);
            const ToolComponent = tool.component;

            return (
              <div key={tool.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div 
                  className="p-6 cursor-pointer hover:bg-slate-50 transition-colors duration-200"
                  onClick={() => toggleToolExpansion(tool.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-purple-100 rounded-lg">
                        <IconComponent className="w-6 h-6 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-lg font-semibold text-slate-900">{tool.title}</h3>
                          {tool.premium && (
                            <span className="px-2 py-1 bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 text-xs font-semibold rounded-full">
                              Premium
                            </span>
                          )}
                        </div>
                        <p className="text-slate-600 text-sm mb-4">{tool.description}</p>
                        <div className="flex items-center space-x-4">
                          <span className="px-2 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full">
                            {tool.category}
                          </span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                            tool.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                            tool.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {tool.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      {ToolComponent && (
                        <span className="text-sm text-slate-600 font-medium">
                          {isExpanded ? 'Collapse' : 'Launch Tool'}
                        </span>
                      )}
                      {ToolComponent ? (
                        isExpanded ? (
                          <ChevronUp className="w-5 h-5 text-slate-400" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-slate-400" />
                        )
                      ) : (
                        <ChevronRight className="w-5 h-5 text-slate-400" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Interactive Tool Content */}
                {isExpanded && ToolComponent && (
                  <div className="p-6 border-t border-slate-200 bg-slate-50">
                    <ToolComponent />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Marketing Resources */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-900">Free Marketing Resources</h2>
          <Link 
            to="#"
            className="text-purple-600 hover:text-purple-700 font-medium text-sm flex items-center space-x-1"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {marketingResources.map((resource, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Download className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex items-center space-x-1 text-yellow-500">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-medium text-slate-700">{resource.rating}</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">{resource.title}</h3>
              <p className="text-slate-600 text-sm mb-4">{resource.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-slate-500">
                  <Eye className="w-4 h-4" />
                  <span>{resource.downloads.toLocaleString()} downloads</span>
                </div>
                <button className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors duration-200">
                  Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 border border-blue-200">
        <div className="flex items-center space-x-3 mb-6">
          <div className="p-2 bg-blue-600 rounded-lg">
            <PenTool className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Quick Marketing Tips</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
              <div>
                <h4 className="font-semibold text-slate-900">Start Before You Launch</h4>
                <p className="text-slate-600 text-sm">Begin building your audience 3-6 months before your book release date.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
              <div>
                <h4 className="font-semibold text-slate-900">Focus on Your Genre</h4>
                <p className="text-slate-600 text-sm">Target readers who already love books in your specific genre or category.</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
              <div>
                <h4 className="font-semibold text-slate-900">Leverage Social Proof</h4>
                <p className="text-slate-600 text-sm">Collect and showcase reviews, testimonials, and endorsements prominently.</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
              <div>
                <h4 className="font-semibold text-slate-900">Build Email List</h4>
                <p className="text-slate-600 text-sm">Email marketing has the highest ROI - start collecting emails early.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}