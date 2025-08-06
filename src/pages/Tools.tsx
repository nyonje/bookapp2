import React, { useState } from 'react';
import { Calculator, FileText, CheckSquare, Lightbulb, Users, Target, Settings, Calendar, BarChart3, Wrench } from 'lucide-react';
import { CostCalculator } from '../components/CostCalculator';
import { AppPlanningWorksheet } from '../components/AppPlanningWorksheet';

// Import our new interactive tools
import { ReaderEngagementAudit } from '../components/tools/ReaderEngagementAudit';
import { AppConceptValidator } from '../components/tools/AppConceptValidator';
import { BusinessCaseCalculator } from '../components/tools/BusinessCaseCalculator';
import { FeaturePriorityMatrix } from '../components/tools/FeaturePriorityMatrix';
import { DevelopmentStackSelector } from '../components/tools/DevelopmentStackSelector';
import { ProjectTimelineBuilder } from '../components/tools/ProjectTimelineBuilder';

export function Tools() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'planning' | 'analysis' | 'development' | 'business' | 'templates'>('all');
  const [expandedTool, setExpandedTool] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Tools', icon: CheckSquare },
    { id: 'analysis', label: 'Analysis & Audit', icon: BarChart3 },
    { id: 'business', label: 'Business Case', icon: Target },
    { id: 'planning', label: 'Planning', icon: Lightbulb },
    { id: 'development', label: 'Development', icon: Settings },
    { id: 'templates', label: 'Templates', icon: FileText },
  ];

  const tools = [
    {
      id: 'reader-audit',
      name: 'Reader Engagement Audit',
      description: 'Assess your current reader engagement and identify opportunities for improvement.',
      category: 'analysis',
      icon: Users,
      component: ReaderEngagementAudit,
      chapter: 1
    },
    {
      id: 'concept-validator',
      name: 'App Concept Validator',
      description: 'Validate your companion app concept with potential users and assess market fit.',
      category: 'analysis',
      icon: CheckSquare,
      component: AppConceptValidator,
      chapter: 1
    },
    {
      id: 'business-calculator',
      name: 'Business Case Calculator',
      description: 'Model potential revenue streams and calculate the ROI for your companion app.',
      category: 'business',
      icon: Calculator,
      component: BusinessCaseCalculator,
      chapter: 2
    },
    {
      id: 'feature-matrix',
      name: 'Feature Priority Matrix',
      description: 'Prioritize app features based on impact and implementation difficulty.',
      category: 'planning',
      icon: Target,
      component: FeaturePriorityMatrix,
      chapter: 3
    },
    {
      id: 'stack-selector',
      name: 'Development Stack Selector',
      description: 'Find the perfect AI-powered development stack for your app based on your needs.',
      category: 'development',
      icon: Settings,
      component: DevelopmentStackSelector,
      chapter: 4
    },
    {
      id: 'timeline-builder',
      name: '7-Week Project Timeline Builder',
      description: 'Plan your app development journey with a detailed, customizable 7-week timeline.',
      category: 'planning',
      icon: Calendar,
      component: ProjectTimelineBuilder,
      chapter: 5
    },
    {
      id: 'cost-calculator',
      name: 'Cost Calculator',
      description: 'Estimate your app development investment and budget planning.',
      category: 'business',
      icon: Calculator,
      component: CostCalculator,
      chapter: null
    },
    {
      id: 'planning-worksheet',
      name: 'App Planning Worksheet',
      description: 'Define your app\'s core features and strategy with this comprehensive worksheet.',
      category: 'templates',
      icon: FileText,
      component: AppPlanningWorksheet,
      chapter: null
    }
  ];

  const filteredTools = tools.filter(tool => 
    activeCategory === 'all' || tool.category === activeCategory
  );

  const toggleToolExpansion = (toolId: string) => {
    setExpandedTool(expandedTool === toolId ? null : toolId);
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          Interactive App Development Tools
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl mx-auto">
          Comprehensive suite of interactive tools to help you plan, analyze, and build your book companion app. 
          Each tool is designed to provide actionable insights and practical guidance for your development journey.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id as any)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
              activeCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-white text-slate-600 border border-slate-300 hover:bg-slate-50'
            }`}
          >
            <category.icon className="w-4 h-4" />
            <span>{category.label}</span>
          </button>
        ))}
      </div>

      {/* Tools Grid */}
      <div className="space-y-6">
        {filteredTools.map((tool) => {
          const ToolIcon = tool.icon;
          const ToolComponent = tool.component;
          const isExpanded = expandedTool === tool.id;

          return (
            <div key={tool.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div 
                className="flex items-center justify-between p-6 cursor-pointer hover:bg-slate-50 transition-colors duration-200"
                onClick={() => toggleToolExpansion(tool.id)}
              >
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <ToolIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <h3 className="text-xl font-semibold text-slate-900">{tool.name}</h3>
                      {tool.chapter && (
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full">
                          Chapter {tool.chapter}
                        </span>
                      )}
                    </div>
                    <p className="text-slate-600 mt-1">{tool.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200">
                    {isExpanded ? 'Collapse' : 'Expand'}
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="p-6 border-t border-slate-200 bg-slate-50">
                  <ToolComponent 
                    chapterId={tool.chapter || 1} 
                    onComplete={() => console.log(`${tool.name} completed`)}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Additional Resources */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-8 text-white">
        <h2 className="text-2xl font-bold mb-4">Need More Help?</h2>
        <p className="text-purple-100 mb-6">
          Get personalized assistance with your app development journey. Our team can help you 
          choose the right tools, plan your app architecture, and accelerate your development timeline.
        </p>
        <button className="px-6 py-3 bg-white text-purple-700 font-semibold rounded-lg hover:bg-purple-50 transition-colors duration-200">
          Book a Consultation Call
        </button>
      </div>
    </div>
  );
}