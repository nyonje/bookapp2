import React, { useState, useEffect } from 'react';
import { Search, MessageSquare, BookOpen, Target, TrendingUp, Users, Zap, ArrowRight, Filter } from 'lucide-react';

interface SearchResult {
  id: string;
  type: 'chapter' | 'tool' | 'quiz' | 'community' | 'resource';
  title: string;
  description: string;
  content: string;
  relevance: number;
  tags: string[];
  icon: React.ElementType;
  url: string;
}

interface SearchQuery {
  query: string;
  filters: {
    type: string[];
    difficulty: string[];
    timeRange: string;
  };
}

export function SmartSearch() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    type: [] as string[],
    difficulty: [] as string[],
    timeRange: 'all'
  });
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const sampleContent: SearchResult[] = [
    {
      id: '1',
      type: 'chapter',
      title: 'Chapter 1: The Reading Crisis',
      description: 'Understanding the challenges modern readers face and why 90% of non-fiction books are never finished.',
      content: 'The reading crisis stems from how we consume information in the digital age. With constant distractions and instant gratification expectations, readers struggle to maintain focus on longer content. The Jenkins Group study found that a staggering 90% of non-fiction books are never finished, highlighting the severity of this issue.',
      relevance: 0.95,
      tags: ['reading-crisis', 'digital-age', 'attention-economy', 'completion-rates'],
      icon: BookOpen,
      url: '/chapter/1'
    },
    {
      id: '2',
      type: 'tool',
      title: 'Business Case Calculator',
      description: 'Calculate ROI and financial projections for your companion app.',
      content: 'The Business Case Calculator helps you understand the financial impact of building a companion app. Input your book sales, audience size, and engagement metrics to see projected ROI and break-even analysis.',
      relevance: 0.88,
      tags: ['roi', 'business-case', 'calculator', 'financial'],
      icon: TrendingUp,
      url: '/tools/business-calculator'
    },
    {
      id: '3',
      type: 'quiz',
      title: 'Chapter 1 Knowledge Check',
      description: 'Test your understanding of the reading crisis and its implications.',
      content: 'This quiz covers key concepts from Chapter 1 including the reading crisis statistics, digital age challenges, and the three critical problems that companion apps address.',
      relevance: 0.82,
      tags: ['quiz', 'knowledge-check', 'chapter-1', 'assessment'],
      icon: Target,
      url: '/quiz/1'
    },
    {
      id: '4',
      type: 'community',
      title: 'Discussion: ROI Calculation Methods',
      description: 'Community discussion about different approaches to calculating companion app ROI.',
      content: 'Join the discussion about various methods for calculating ROI on companion apps. Share your experiences and learn from other authors who have successfully built profitable companion apps.',
      relevance: 0.75,
      tags: ['community', 'discussion', 'roi', 'experience'],
      icon: Users,
      url: '/community/discussion/roi'
    },
    {
      id: '5',
      type: 'resource',
      title: 'App Planning Worksheet',
      description: 'Comprehensive worksheet to plan your companion app strategy.',
      content: 'Use this worksheet to systematically plan your companion app. Includes sections for audience analysis, feature prioritization, technical requirements, and launch timeline.',
      relevance: 0.70,
      tags: ['worksheet', 'planning', 'strategy', 'template'],
      icon: BookOpen,
      url: '/resources/planning-worksheet'
    }
  ];

  const searchSuggestions = [
    'How do I calculate ROI for my companion app?',
    'What is the reading crisis?',
    'How to build a successful companion app',
    'Tools for app planning',
    'Community discussions about companion apps',
    'Quiz on chapter 1 concepts',
    'Business case for companion apps',
    'ROI calculation methods'
  ];

  useEffect(() => {
    if (searchQuery.length > 2) {
      performSearch();
    } else {
      setResults([]);
    }
  }, [searchQuery, filters]);

  const performSearch = () => {
    setIsSearching(true);
    
    // Simulate search delay
    setTimeout(() => {
      const query = searchQuery.toLowerCase();
      const filteredResults = sampleContent.filter(item => {
        // Check if query matches title, description, content, or tags
        const searchableText = `${item.title} ${item.description} ${item.content} ${item.tags.join(' ')}`.toLowerCase();
        const matchesQuery = searchableText.includes(query);
        
        // Apply filters
        const matchesType = filters.type.length === 0 || filters.type.includes(item.type);
        const matchesDifficulty = filters.difficulty.length === 0; // Simplified for demo
        
        return matchesQuery && matchesType && matchesDifficulty;
      });

      // Sort by relevance
      const sortedResults = filteredResults.sort((a, b) => b.relevance - a.relevance);
      setResults(sortedResults);
      setIsSearching(false);
    }, 500);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'chapter': return 'bg-blue-100 text-blue-700';
      case 'tool': return 'bg-green-100 text-green-700';
      case 'quiz': return 'bg-purple-100 text-purple-700';
      case 'community': return 'bg-orange-100 text-orange-700';
      case 'resource': return 'bg-slate-100 text-slate-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getRelevanceColor = (relevance: number) => {
    if (relevance >= 0.9) return 'text-green-600';
    if (relevance >= 0.7) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Search className="w-8 h-8 text-blue-600" />
          <h2 className="text-2xl font-bold text-slate-900">Smart Search</h2>
        </div>
        <p className="text-slate-600">Search through content using natural language queries</p>
      </div>

      {/* Search Input */}
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Ask anything about companion apps, ROI, reading crisis..."
            className="w-full pl-12 pr-20 py-4 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
          />
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
          >
            <Filter className="w-5 h-5" />
          </button>
        </div>

        {/* Search Suggestions */}
        {searchQuery.length === 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium text-slate-700 mb-3">Popular Searches</h4>
            <div className="flex flex-wrap gap-2">
              {searchSuggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-3 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm hover:bg-slate-200 transition-colors duration-200"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
          <h4 className="font-semibold text-slate-900 mb-4">Filters</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Content Type</label>
              <div className="space-y-2">
                {['chapter', 'tool', 'quiz', 'community', 'resource'].map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.type.includes(type)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFilters({ ...filters, type: [...filters.type, type] });
                        } else {
                          setFilters({ ...filters, type: filters.type.filter(t => t !== type) });
                        }
                      }}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-slate-700 capitalize">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Difficulty</label>
              <div className="space-y-2">
                {['beginner', 'intermediate', 'advanced'].map((difficulty) => (
                  <label key={difficulty} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={filters.difficulty.includes(difficulty)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFilters({ ...filters, difficulty: [...filters.difficulty, difficulty] });
                        } else {
                          setFilters({ ...filters, difficulty: filters.difficulty.filter(d => d !== difficulty) });
                        }
                      }}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-slate-700 capitalize">{difficulty}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Time Range</label>
              <select
                value={filters.timeRange}
                onChange={(e) => setFilters({ ...filters, timeRange: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Time</option>
                <option value="week">Past Week</option>
                <option value="month">Past Month</option>
                <option value="year">Past Year</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* Search Results */}
      {isSearching && (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Searching for "{searchQuery}"...</p>
        </div>
      )}

      {!isSearching && results.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">
              {results.length} result{results.length !== 1 ? 's' : ''} found
            </h3>
            <span className="text-sm text-slate-500">Sorted by relevance</span>
          </div>

          {results.map((result) => {
            const Icon = result.icon;
            
            return (
              <div
                key={result.id}
                className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-semibold text-slate-900">{result.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(result.type)}`}>
                        {result.type}
                      </span>
                      <span className={`text-xs font-medium ${getRelevanceColor(result.relevance)}`}>
                        {Math.round(result.relevance * 100)}% match
                      </span>
                    </div>
                    
                    <p className="text-slate-600 mb-3">{result.description}</p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {result.tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-slate-100 text-slate-600 rounded-full text-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      
                      <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors duration-200">
                        <span className="text-sm font-medium">View</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {!isSearching && searchQuery.length > 2 && results.length === 0 && (
        <div className="text-center py-12">
          <Search className="w-12 h-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-slate-900 mb-2">No Results Found</h3>
          <p className="text-slate-600">Try adjusting your search terms or filters</p>
        </div>
      )}

      {/* Search Tips */}
      {searchQuery.length === 0 && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
          <h4 className="font-semibold text-slate-900 mb-3 flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-blue-600" />
            <span>Search Tips</span>
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-700">
            <div>
              <p className="font-medium mb-2">Try natural language queries:</p>
              <ul className="space-y-1 text-slate-600">
                <li>• "How do I calculate ROI?"</li>
                <li>• "What is the reading crisis?"</li>
                <li>• "Tools for planning my app"</li>
              </ul>
            </div>
            <div>
              <p className="font-medium mb-2">Use filters to narrow results:</p>
              <ul className="space-y-1 text-slate-600">
                <li>• Filter by content type</li>
                <li>• Adjust difficulty level</li>
                <li>• Set time range</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 