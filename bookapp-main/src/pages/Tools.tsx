import React, { useState } from 'react';
import { Calculator, FileText, CheckSquare, Lightbulb } from 'lucide-react';
import { CostCalculator } from '../components/CostCalculator';
import { AppPlanningWorksheet } from '../components/AppPlanningWorksheet';

export function Tools() {
  const [activeCategory, setActiveCategory] = useState<'all' | 'planning' | 'cost' | 'templates'>('all');

  const categories = [
    { id: 'all', label: 'All Tools', icon: CheckSquare },
    { id: 'planning', label: 'Planning', icon: Lightbulb },
    { id: 'cost', label: 'Cost Analysis', icon: Calculator },
    { id: 'templates', label: 'Templates', icon: FileText },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          App Development Tools & Resources
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Practical tools and templates to help you plan, build, and launch your book companion app successfully.
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {(activeCategory === 'all' || activeCategory === 'cost') && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Calculator className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">Cost Calculator</h3>
                  <p className="text-slate-600">Estimate your app development investment</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <CostCalculator />
            </div>
          </div>
        )}

        {(activeCategory === 'all' || activeCategory === 'planning') && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Lightbulb className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">App Planning Worksheet</h3>
                  <p className="text-slate-600">Define your app's core features and strategy</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <AppPlanningWorksheet />
            </div>
          </div>
        )}
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