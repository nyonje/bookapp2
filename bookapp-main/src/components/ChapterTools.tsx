import React, { useState } from 'react';
import { Download, ExternalLink, CheckCircle, Wrench } from 'lucide-react';
import { useProgress } from '../contexts/ProgressContext';

interface ChapterToolsProps {
  chapterId: number;
}

const toolsData = {
  1: [
    {
      name: "Reader Engagement Audit Template",
      description: "Survey template to assess your current reader engagement and identify improvement opportunities.",
      type: "worksheet",
      downloadUrl: "#",
      completed: false
    },
    {
      name: "App Concept Validator",
      description: "Interactive questionnaire to validate your companion app concept with potential users.",
      type: "tool",
      downloadUrl: "#",
      completed: false
    }
  ],
  2: [
    {
      name: "User Persona Development Kit",
      description: "Complete template for creating detailed user personas for your app development.",
      type: "worksheet",
      downloadUrl: "#",
      completed: false
    },
    {
      name: "Implementation Gap Analysis",
      description: "Framework to identify and address the top implementation challenges your readers face.",
      type: "framework",
      downloadUrl: "#",
      completed: false
    },
    {
      name: "Revenue Stream Planner",
      description: "Calculator to model potential revenue streams from your companion app.",
      type: "calculator",
      downloadUrl: "#",
      completed: false
    }
  ],
  3: [
    {
      name: "App Feature Priority Matrix",
      description: "Interactive tool to rank app features by impact and implementation difficulty.",
      type: "tool",
      downloadUrl: "#",
      completed: false
    },
    {
      name: "UX Design Checklist",
      description: "Comprehensive checklist ensuring your app follows best UX practices.",
      type: "checklist",
      downloadUrl: "#",
      completed: false
    },
    {
      name: "Content Structure Template",
      description: "Organized template for structuring your book content for app integration.",
      type: "template",
      downloadUrl: "#",
      completed: false
    },
    {
      name: "Gamification Strategy Guide",
      description: "Framework for implementing effective gamification without overwhelming users.",
      type: "guide",
      downloadUrl: "#",
      completed: false
    }
  ],
  4: [
    {
      name: "Development Stack Selector",
      description: "Interactive quiz to help you choose the perfect AI-powered development stack for your needs.",
      type: "tool",
      downloadUrl: "#",
      completed: false
    },
    {
      name: "Content Database Template",
      description: "Pre-built Airtable template for organizing chapters, quizzes, and tools.",
      type: "template",
      downloadUrl: "#",
      completed: false
    },
    {
      name: "Cost Calculator",
      description: "Calculate the total investment required for your chosen development approach.",
      type: "calculator",
      downloadUrl: "#",
      completed: false
    },
    {
      name: "AI Prompt Library",
      description: "Collection of proven prompts for AI-powered app builders.",
      type: "resource",
      downloadUrl: "#",
      completed: false
    },
    {
      name: "Technical Requirements Checklist",
      description: "Ensure you have everything needed before starting development.",
      type: "checklist",
      downloadUrl: "#",
      completed: false
    }
  ],
  5: [
    {
      name: "7-Week Project Timeline",
      description: "Detailed timeline template with milestones and deadlines for each development phase.",
      type: "template",
      downloadUrl: "#",
      completed: false
    },
    {
      name: "Quiz Question Generator",
      description: "Framework for creating effective comprehension, application, and reflection questions.",
      type: "generator",
      downloadUrl: "#",
      completed: false
    },
    {
      name: "Beta Testing Guide",
      description: "Complete guide for recruiting beta testers and gathering meaningful feedback.",
      type: "guide",
      downloadUrl: "#",
      completed: false
    },
    {
      name: "Launch Sequence Planner",
      description: "Step-by-step planner for executing a successful app launch.",
      type: "planner",
      downloadUrl: "#",
      completed: false
    },
    {
      name: "ROI Tracking Dashboard",
      description: "Spreadsheet template for tracking your app's return on investment.",
      type: "dashboard",
      downloadUrl: "#",
      completed: false
    },
    {
      name: "Marketing Materials Kit",
      description: "Templates for creating compelling marketing materials for your app launch.",
      type: "kit",
      downloadUrl: "#",
      completed: false
    }
  ]
};

export function ChapterTools({ chapterId }: ChapterToolsProps) {
  const { updateProgress } = useProgress();
  const [completedTools, setCompletedTools] = useState<Set<string>>(new Set());

  const tools = toolsData[chapterId as keyof typeof toolsData] || [];

  const handleToolComplete = (toolName: string) => {
    const newCompleted = new Set(completedTools);
    if (completedTools.has(toolName)) {
      newCompleted.delete(toolName);
    } else {
      newCompleted.add(toolName);
    }
    setCompletedTools(newCompleted);
    
    // Update progress context
    updateProgress(chapterId, {
      toolsUsed: Array.from(newCompleted)
    });
  };

  const getToolIcon = (type: string) => {
    switch (type) {
      case 'worksheet': return '📝';
      case 'tool': return '🔧';
      case 'calculator': return '🧮';
      case 'template': return '📋';
      case 'framework': return '🏗️';
      case 'checklist': return '✅';
      case 'guide': return '📖';
      case 'resource': return '📚';
      case 'generator': return '⚡';
      case 'planner': return '📅';
      case 'dashboard': return '📊';
      case 'kit': return '🎯';
      default: return '🔧';
    }
  };

  if (tools.length === 0) {
    return (
      <div className="text-center py-12">
        <Wrench className="w-12 h-12 text-slate-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-slate-900 mb-2">Tools Coming Soon</h3>
        <p className="text-slate-600">
          Practical tools and worksheets for this chapter are being prepared.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">Practical Tools & Worksheets</h3>
        <p className="text-slate-600">
          Ready-to-use resources to help you implement the concepts from this chapter.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {tools.map((tool, index) => (
          <div key={index} className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="text-2xl">{getToolIcon(tool.type)}</div>
                <div>
                  <h4 className="font-semibold text-slate-900">{tool.name}</h4>
                  <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full capitalize mt-1">
                    {tool.type}
                  </span>
                </div>
              </div>
              
              <button
                onClick={() => handleToolComplete(tool.name)}
                className={`p-2 rounded-lg transition-colors duration-200 ${
                  completedTools.has(tool.name)
                    ? 'bg-green-100 text-green-600'
                    : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
                }`}
              >
                <CheckCircle className="w-5 h-5" />
              </button>
            </div>

            <p className="text-slate-600 text-sm mb-4 leading-relaxed">
              {tool.description}
            </p>

            <div className="flex items-center space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
              
              <button className="flex items-center space-x-2 px-4 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors duration-200">
                <ExternalLink className="w-4 h-4" />
                <span>Preview</span>
              </button>
            </div>

            {completedTools.has(tool.name) && (
              <div className="mt-4 flex items-center space-x-2 text-green-600 text-sm">
                <CheckCircle className="w-4 h-4" />
                <span>Completed</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h4 className="font-semibold text-blue-900 mb-2">💡 Pro Tip</h4>
        <p className="text-blue-800 text-sm">
          Work through these tools in order for the best results. Each tool builds on the concepts 
          and insights from the previous ones, creating a comprehensive implementation strategy.
        </p>
      </div>
    </div>
  );
}