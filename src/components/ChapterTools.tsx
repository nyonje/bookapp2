import React, { useState } from 'react';
import { Tool, CheckCircle, Wrench, ChevronDown, ChevronUp } from 'lucide-react';
import { useProgress } from '../contexts/ProgressContext';

// Import our interactive tools
import { ReaderEngagementAudit } from './tools/ReaderEngagementAudit';
import { AppConceptValidator } from './tools/AppConceptValidator';
import { BusinessCaseCalculator } from './tools/BusinessCaseCalculator';
import { FeaturePriorityMatrix } from './tools/FeaturePriorityMatrix';
import { DevelopmentStackSelector } from './tools/DevelopmentStackSelector';
import { ProjectTimelineBuilder } from './tools/ProjectTimelineBuilder';

interface ChapterToolsProps {
  chapterId: number;
}

interface InteractiveTool {
  id: string;
  name: string;
  description: string;
  component: React.ComponentType;
  icon: string;
  category: string;
}

const toolsData: Record<number, InteractiveTool[]> = {
  1: [
    {
      id: 'reader-engagement-audit',
      name: 'Reader Engagement Audit',
      description: 'Interactive assessment to evaluate your current reader engagement and identify improvement opportunities.',
      component: ReaderEngagementAudit,
      icon: '📊',
      category: 'Assessment'
    },
    {
      id: 'app-concept-validator',
      name: 'App Concept Validator',
      description: 'Validate your companion app idea with an interactive questionnaire that scores your concept\'s potential.',
      component: AppConceptValidator,
      icon: '💡',
      category: 'Validation'
    }
  ],
  2: [
    {
      id: 'business-case-calculator',
      name: 'Business Case Calculator',
      description: 'Calculate the financial impact and ROI of creating a companion app with detailed projections.',
      component: BusinessCaseCalculator,
      icon: '💰',
      category: 'Financial'
    }
  ],
  3: [
    {
      id: 'feature-priority-matrix',
      name: 'Feature Priority Matrix',
      description: 'Interactive tool to prioritize app features by ranking impact versus implementation difficulty.',
      component: FeaturePriorityMatrix,
      icon: '🎯',
      category: 'Planning'
    }
  ],
  4: [
    {
      id: 'development-stack-selector',
      name: 'Development Stack Selector',
      description: 'Find the perfect AI-powered development stack based on your experience, timeline, and requirements.',
      component: DevelopmentStackSelector,
      icon: '⚡',
      category: 'Technical'
    }
  ],
  5: [
    {
      id: 'project-timeline-builder',
      name: '7-Week Project Timeline Builder',
      description: 'Build and customize your complete development timeline with tasks, milestones, and progress tracking.',
      component: ProjectTimelineBuilder,
      icon: '📅',
      category: 'Project Management'
    }
  ]
};

export function ChapterTools({ chapterId }: ChapterToolsProps) {
  const { updateProgress } = useProgress();
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [completedTools, setCompletedTools] = useState<Set<string>>(new Set());

  const tools = toolsData[chapterId] || [];

  const handleToolComplete = (toolId: string) => {
    const newCompleted = new Set(completedTools);
    if (completedTools.has(toolId)) {
      newCompleted.delete(toolId);
    } else {
      newCompleted.add(toolId);
    }
    setCompletedTools(newCompleted);
    
    // Update progress context
    updateProgress(chapterId, {
      toolsUsed: Array.from(newCompleted)
    });
  };

  const toggleTool = (toolId: string) => {
    setActiveTool(activeTool === toolId ? null : toolId);
  };

  if (tools.length === 0) {
    return (
      <div className="text-center py-12">
        <Wrench className="w-12 h-12 text-slate-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-slate-900 mb-2">Tools Coming Soon</h3>
        <p className="text-slate-600">
          Interactive tools for this chapter are being prepared.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-slate-900 mb-2">Interactive Tools</h3>
        <p className="text-slate-600">
          Use these interactive tools to apply the concepts from this chapter directly within the app.
        </p>
      </div>

      {tools.map((tool) => {
        const isActive = activeTool === tool.id;
        const isCompleted = completedTools.has(tool.id);
        const ToolComponent = tool.component;

        return (
          <div key={tool.id} className="border border-slate-200 rounded-lg overflow-hidden bg-white shadow-sm">
            <div 
              className="p-6 cursor-pointer hover:bg-slate-50 transition-colors"
              onClick={() => toggleTool(tool.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="text-3xl">{tool.icon}</div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-1">
                      <h4 className="text-lg font-semibold text-slate-900">{tool.name}</h4>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        {tool.category}
                      </span>
                      {isCompleted && (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                    <p className="text-slate-600">{tool.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToolComplete(tool.id);
                    }}
                    className={`px-3 py-1 text-xs font-medium rounded-full transition-colors ${
                      isCompleted 
                        ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {isCompleted ? 'Completed' : 'Mark Complete'}
                  </button>
                  <div className="text-slate-400">
                    {isActive ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            {isActive && (
              <div className="border-t border-slate-200 bg-slate-50">
                <div className="p-6">
                  <ToolComponent />
                </div>
              </div>
            )}
          </div>
        );
      })}

      {/* Progress Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-lg border border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-lg font-semibold text-slate-900 mb-1">Tools Progress</h4>
            <p className="text-slate-600">
              Complete all tools to maximize your learning from this chapter
            </p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-blue-600">
              {completedTools.size}/{tools.length}
            </div>
            <div className="text-sm text-slate-600">Tools Completed</div>
          </div>
        </div>
        <div className="mt-4 bg-white bg-opacity-50 rounded-full h-2">
          <div 
            className="bg-blue-600 rounded-full h-2 transition-all duration-300"
            style={{ width: `${(completedTools.size / tools.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}