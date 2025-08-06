import React, { useState } from 'react';
import { Save, Download, CheckCircle } from 'lucide-react';

export function AppPlanningWorksheet() {
  const [formData, setFormData] = useState({
    bookTitle: '',
    targetAudience: '',
    primaryGoal: '',
    keyFeatures: [] as string[],
    successMetrics: '',
    timeline: '',
    budget: '',
  });

  const [completedSections, setCompletedSections] = useState<Set<string>>(new Set());

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({...prev, [field]: value}));
    
    if (value.trim()) {
      setCompletedSections(prev => new Set(prev).add(field));
    } else {
      setCompletedSections(prev => {
        const newSet = new Set(prev);
        newSet.delete(field);
        return newSet;
      });
    }
  };

  const handleFeatureToggle = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      keyFeatures: prev.keyFeatures.includes(feature)
        ? prev.keyFeatures.filter(f => f !== feature)
        : [...prev.keyFeatures, feature]
    }));
  };

  const availableFeatures = [
    'Chapter Summaries',
    'Interactive Quizzes',
    'Progress Tracking',
    'Community Discussion',
    'Audio Content',
    'Video Tutorials',
    'Worksheets & Templates',
    'Push Notifications',
    'Offline Access',
    'Social Sharing',
    'Goal Setting',
    'Achievement Badges'
  ];

  const handleSave = () => {
    localStorage.setItem('appPlanningWorksheet', JSON.stringify(formData));
    alert('Worksheet saved successfully!');
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(formData, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'app-planning-worksheet.json';
    link.click();
  };

  const completionPercentage = Math.round((completedSections.size / 6) * 100);

  return (
    <div className="space-y-6">
      {/* Progress Header */}
      <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
        <div>
          <h4 className="font-semibold text-slate-900">Worksheet Progress</h4>
          <p className="text-sm text-slate-600">{completedSections.size} of 6 sections completed</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-2xl font-bold text-blue-600">{completionPercentage}%</div>
          <div className="w-16 h-2 bg-slate-200 rounded-full">
            <div 
              className="h-2 bg-blue-600 rounded-full transition-all duration-300"
              style={{width: `${completionPercentage}%`}}
            />
          </div>
        </div>
      </div>

      <form className="space-y-6">
        {/* Book Information */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <h4 className="font-semibold text-slate-900">Book Information</h4>
            {completedSections.has('bookTitle') && <CheckCircle className="w-4 h-4 text-green-600" />}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Book Title
            </label>
            <input
              type="text"
              value={formData.bookTitle}
              onChange={(e) => handleInputChange('bookTitle', e.target.value)}
              placeholder="Enter your book title"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Target Audience */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <h4 className="font-semibold text-slate-900">Target Audience</h4>
            {completedSections.has('targetAudience') && <CheckCircle className="w-4 h-4 text-green-600" />}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Who is your ideal app user?
            </label>
            <textarea
              value={formData.targetAudience}
              onChange={(e) => handleInputChange('targetAudience', e.target.value)}
              placeholder="Describe your target audience (age, profession, goals, challenges)"
              rows={3}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Primary Goal */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <h4 className="font-semibold text-slate-900">Primary Goal</h4>
            {completedSections.has('primaryGoal') && <CheckCircle className="w-4 h-4 text-green-600" />}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              What is the main problem your app solves?
            </label>
            <textarea
              value={formData.primaryGoal}
              onChange={(e) => handleInputChange('primaryGoal', e.target.value)}
              placeholder="Complete this: My app helps [target audience] achieve [specific outcome] by providing [unique value]..."
              rows={3}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Key Features */}
        <div className="space-y-4">
          <h4 className="font-semibold text-slate-900">Key Features</h4>
          <p className="text-sm text-slate-600">Select the features most important for your app</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {availableFeatures.map((feature) => (
              <label key={feature} className="flex items-center space-x-2 p-3 border rounded-lg cursor-pointer hover:bg-slate-50">
                <input
                  type="checkbox"
                  checked={formData.keyFeatures.includes(feature)}
                  onChange={() => handleFeatureToggle(feature)}
                  className="text-blue-600"
                />
                <span className="text-sm text-slate-700">{feature}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Success Metrics */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <h4 className="font-semibold text-slate-900">Success Metrics</h4>
            {completedSections.has('successMetrics') && <CheckCircle className="w-4 h-4 text-green-600" />}
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              How will you measure success?
            </label>
            <textarea
              value={formData.successMetrics}
              onChange={(e) => handleInputChange('successMetrics', e.target.value)}
              placeholder="e.g., 100 active users, 70% completion rate, $5000 monthly revenue"
              rows={3}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Timeline & Budget */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <h4 className="font-semibold text-slate-900">Timeline</h4>
              {completedSections.has('timeline') && <CheckCircle className="w-4 h-4 text-green-600" />}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                When do you want to launch?
              </label>
              <select
                value={formData.timeline}
                onChange={(e) => handleInputChange('timeline', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select timeline</option>
                <option value="1-2 weeks">1-2 weeks</option>
                <option value="1 month">1 month</option>
                <option value="2-3 months">2-3 months</option>
                <option value="6+ months">6+ months</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <h4 className="font-semibold text-slate-900">Budget</h4>
              {completedSections.has('budget') && <CheckCircle className="w-4 h-4 text-green-600" />}
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                What's your budget range?
              </label>
              <select
                value={formData.budget}
                onChange={(e) => handleInputChange('budget', e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select budget</option>
                <option value="Under $2,000">Under $2,000</option>
                <option value="$2,000 - $5,000">$2,000 - $5,000</option>
                <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                <option value="$10,000+">$10,000+</option>
              </select>
            </div>
          </div>
        </div>
      </form>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-6 border-t border-slate-200">
        <div className="text-sm text-slate-600">
          {completionPercentage === 100 ? 'Worksheet completed! 🎉' : 'Fill out all sections to complete your planning worksheet.'}
        </div>
        <div className="flex space-x-3">
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 px-4 py-2 text-slate-600 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors duration-200"
          >
            <Save className="w-4 h-4" />
            <span>Save</span>
          </button>
          <button
            onClick={handleExport}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        </div>
      </div>
    </div>
  );
}