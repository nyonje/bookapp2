import React, { useState } from 'react';
import { TrendingUp, Calendar, Users, Target, CheckCircle, MessageCircle, Star, Share2 } from 'lucide-react';

interface CampaignData {
  bookInfo: {
    title: string;
    genre: string;
    targetAudience: string;
    launchDate: string;
    preOrderDate: string;
  };
  campaignGoals: {
    salesTarget: number;
    reviewTarget: number;
    emailListTarget: number;
    socialMediaReach: number;
  };
  marketingChannels: {
    emailMarketing: boolean;
    socialMedia: boolean;
    influencerOutreach: boolean;
    bookBlogs: boolean;
    podcastInterviews: boolean;
    bookClubs: boolean;
    paidAdvertising: boolean;
    bookstores: boolean;
  };
  timeline: {
    preLaunch: string[];
    launchWeek: string[];
    postLaunch: string[];
  };
  budget: {
    totalBudget: number;
    emailMarketing: number;
    socialMedia: number;
    influencerOutreach: number;
    paidAdvertising: number;
    otherExpenses: number;
  };
}

export function BookLaunchCampaignBuilder() {
  const [currentStep, setCurrentStep] = useState(1);
  const [campaignData, setCampaignData] = useState<CampaignData>({
    bookInfo: {
      title: '',
      genre: '',
      targetAudience: '',
      launchDate: '',
      preOrderDate: ''
    },
    campaignGoals: {
      salesTarget: 0,
      reviewTarget: 0,
      emailListTarget: 0,
      socialMediaReach: 0
    },
    marketingChannels: {
      emailMarketing: false,
      socialMedia: false,
      influencerOutreach: false,
      bookBlogs: false,
      podcastInterviews: false,
      bookClubs: false,
      paidAdvertising: false,
      bookstores: false
    },
    timeline: {
      preLaunch: [],
      launchWeek: [],
      postLaunch: []
    },
    budget: {
      totalBudget: 0,
      emailMarketing: 0,
      socialMedia: 0,
      influencerOutreach: 0,
      paidAdvertising: 0,
      otherExpenses: 0
    }
  });
  const [campaign, setCampaign] = useState<any>(null);

  const genres = [
    'Fiction - Romance', 'Fiction - Mystery/Thriller', 'Fiction - Science Fiction',
    'Fiction - Fantasy', 'Fiction - Literary', 'Non-Fiction - Self-Help',
    'Non-Fiction - Business', 'Non-Fiction - Memoir', 'Non-Fiction - History',
    'Non-Fiction - Educational', 'Children\'s Books', 'Young Adult'
  ];

  const targetAudiences = [
    'General Adult Readers', 'Young Adults (18-25)', 'Middle-aged Professionals',
    'Retirees', 'Students', 'Business Professionals', 'Parents',
    'Hobbyists', 'Academic/Research', 'Children', 'Teenagers'
  ];

  const preLaunchTasks = [
    'Build email list 6 months before launch',
    'Create author website and social media presence',
    'Develop book cover and marketing materials',
    'Secure advance reader copies (ARCs)',
    'Plan pre-order campaign',
    'Identify and contact potential reviewers',
    'Create book trailer or promotional video',
    'Develop author bio and press kit'
  ];

  const launchWeekTasks = [
    'Launch day social media blitz',
    'Email campaign to subscribers',
    'Paid advertising campaign',
    'Virtual book launch event',
    'Press release distribution',
    'Influencer outreach and partnerships',
    'Bookstore and library outreach',
    'Podcast and media interviews'
  ];

  const postLaunchTasks = [
    'Follow up with reviewers and bloggers',
    'Continue social media engagement',
    'Plan book tour or virtual events',
    'Monitor sales and adjust strategy',
    'Collect and respond to reader feedback',
    'Plan sequel or next book promotion',
    'Maintain relationships with influencers',
    'Analyze campaign performance'
  ];

  const handleBookInfoChange = (field: keyof CampaignData['bookInfo'], value: string) => {
    setCampaignData(prev => ({
      ...prev,
      bookInfo: {
        ...prev.bookInfo,
        [field]: value
      }
    }));
  };

  const handleGoalsChange = (field: keyof CampaignData['campaignGoals'], value: number) => {
    setCampaignData(prev => ({
      ...prev,
      campaignGoals: {
        ...prev.campaignGoals,
        [field]: value
      }
    }));
  };

  const handleChannelChange = (channel: keyof CampaignData['marketingChannels']) => {
    setCampaignData(prev => ({
      ...prev,
      marketingChannels: {
        ...prev.marketingChannels,
        [channel]: !prev.marketingChannels[channel]
      }
    }));
  };

  const handleBudgetChange = (field: keyof CampaignData['budget'], value: number) => {
    setCampaignData(prev => ({
      ...prev,
      budget: {
        ...prev.budget,
        [field]: value
      }
    }));
  };

  const generateCampaign = () => {
    const { bookInfo, campaignGoals, marketingChannels, budget } = campaignData;
    
    // Calculate campaign metrics
    const selectedChannels = Object.values(marketingChannels).filter(Boolean).length;
    const totalBudget = Object.values(budget).reduce((sum, val) => sum + val, 0);
    
    // Generate timeline based on selected channels
    const preLaunch = preLaunchTasks.filter((_, index) => 
      index < Math.min(selectedChannels * 2, preLaunchTasks.length)
    );
    const launchWeek = launchWeekTasks.filter((_, index) => 
      index < Math.min(selectedChannels * 2, launchWeekTasks.length)
    );
    const postLaunch = postLaunchTasks.filter((_, index) => 
      index < Math.min(selectedChannels * 2, postLaunchTasks.length)
    );

    // Calculate expected outcomes
    const expectedSales = Math.round(campaignGoals.salesTarget * (selectedChannels * 0.3));
    const expectedReviews = Math.round(campaignGoals.reviewTarget * (selectedChannels * 0.4));
    const expectedReach = Math.round(campaignGoals.socialMediaReach * (selectedChannels * 0.5));

    const campaign = {
      bookInfo,
      goals: campaignGoals,
      channels: marketingChannels,
      timeline: { preLaunch, launchWeek, postLaunch },
      budget: { ...budget, totalBudget },
      metrics: {
        selectedChannels,
        expectedSales,
        expectedReviews,
        expectedReach,
        budgetEfficiency: Math.round((expectedSales / totalBudget) * 100) / 100
      },
      recommendations: generateRecommendations()
    };

    setCampaign(campaign);
    setCurrentStep(4);
  };

  const generateRecommendations = () => {
    const recommendations = [];
    const { marketingChannels, campaignGoals } = campaignData;
    
    if (!marketingChannels.emailMarketing) {
      recommendations.push('Add email marketing - highest ROI channel for book launches');
    }
    
    if (!marketingChannels.socialMedia) {
      recommendations.push('Include social media - essential for building author brand');
    }
    
    if (campaignGoals.salesTarget > 1000 && !marketingChannels.paidAdvertising) {
      recommendations.push('Consider paid advertising for high sales targets');
    }
    
    if (campaignGoals.reviewTarget > 50 && !marketingChannels.influencerOutreach) {
      recommendations.push('Add influencer outreach to reach review targets');
    }
    
    if (recommendations.length === 0) {
      recommendations.push('Your campaign strategy looks comprehensive!');
      recommendations.push('Focus on consistent execution across all channels');
    }
    
    return recommendations;
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-slate-900">Book Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Book Title</label>
                <input
                  type="text"
                  value={campaignData.bookInfo.title}
                  onChange={(e) => handleBookInfoChange('title', e.target.value)}
                  placeholder="Enter your book title"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Genre</label>
                <select
                  value={campaignData.bookInfo.genre}
                  onChange={(e) => handleBookInfoChange('genre', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Genre</option>
                  {genres.map(genre => (
                    <option key={genre} value={genre}>{genre}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Target Audience</label>
                <select
                  value={campaignData.bookInfo.targetAudience}
                  onChange={(e) => handleBookInfoChange('targetAudience', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Target Audience</option>
                  {targetAudiences.map(audience => (
                    <option key={audience} value={audience}>{audience}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Launch Date</label>
                <input
                  type="date"
                  value={campaignData.bookInfo.launchDate}
                  onChange={(e) => handleBookInfoChange('launchDate', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Pre-Order Date</label>
                <input
                  type="date"
                  value={campaignData.bookInfo.preOrderDate}
                  onChange={(e) => handleBookInfoChange('preOrderDate', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-slate-900">Campaign Goals</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Sales Target (copies)</label>
                <input
                  type="number"
                  value={campaignData.campaignGoals.salesTarget || ''}
                  onChange={(e) => handleGoalsChange('salesTarget', parseInt(e.target.value) || 0)}
                  placeholder="e.g., 1000"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Review Target</label>
                <input
                  type="number"
                  value={campaignData.campaignGoals.reviewTarget || ''}
                  onChange={(e) => handleGoalsChange('reviewTarget', parseInt(e.target.value) || 0)}
                  placeholder="e.g., 50"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email List Target</label>
                <input
                  type="number"
                  value={campaignData.campaignGoals.emailListTarget || ''}
                  onChange={(e) => handleGoalsChange('emailListTarget', parseInt(e.target.value) || 0)}
                  placeholder="e.g., 500"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Social Media Reach Target</label>
                <input
                  type="number"
                  value={campaignData.campaignGoals.socialMediaReach || ''}
                  onChange={(e) => handleGoalsChange('socialMediaReach', parseInt(e.target.value) || 0)}
                  placeholder="e.g., 10000"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-slate-900">Marketing Channels & Budget</h3>
            
            <div className="space-y-4">
              <h4 className="font-medium text-slate-700">Select Marketing Channels</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(campaignData.marketingChannels).map(([channel, isSelected]) => (
                  <label key={channel} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => handleChannelChange(channel as keyof CampaignData['marketingChannels'])}
                      className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-slate-700 capitalize">{channel.replace(/([A-Z])/g, ' $1').trim()}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-slate-700">Budget Allocation ($)</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email Marketing</label>
                  <input
                    type="number"
                    step="0.01"
                    value={campaignData.budget.emailMarketing || ''}
                    onChange={(e) => handleBudgetChange('emailMarketing', parseFloat(e.target.value) || 0)}
                    placeholder="e.g., 500"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Social Media</label>
                  <input
                    type="number"
                    step="0.01"
                    value={campaignData.budget.socialMedia || ''}
                    onChange={(e) => handleBudgetChange('socialMedia', parseFloat(e.target.value) || 0)}
                    placeholder="e.g., 300"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Influencer Outreach</label>
                  <input
                    type="number"
                    step="0.01"
                    value={campaignData.budget.influencerOutreach || ''}
                    onChange={(e) => handleBudgetChange('influencerOutreach', parseFloat(e.target.value) || 0)}
                    placeholder="e.g., 1000"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Paid Advertising</label>
                  <input
                    type="number"
                    step="0.01"
                    value={campaignData.budget.paidAdvertising || ''}
                    onChange={(e) => handleBudgetChange('paidAdvertising', parseFloat(e.target.value) || 0)}
                    placeholder="e.g., 2000"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Other Expenses</label>
                  <input
                    type="number"
                    step="0.01"
                    value={campaignData.budget.otherExpenses || ''}
                    onChange={(e) => handleBudgetChange('otherExpenses', parseFloat(e.target.value) || 0)}
                    placeholder="e.g., 500"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-slate-900">Campaign Strategy Results</h3>
            {campaign && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h4 className="font-semibold text-slate-900 mb-4">Campaign Overview</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Book:</span>
                        <span className="font-medium">{campaign.bookInfo.title}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Launch Date:</span>
                        <span className="font-medium">{campaign.bookInfo.launchDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Channels:</span>
                        <span className="font-medium">{campaign.metrics.selectedChannels}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Total Budget:</span>
                        <span className="font-medium text-green-600">${campaign.budget.totalBudget}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-6">
                    <h4 className="font-semibold text-slate-900 mb-4">Expected Outcomes</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-slate-600">Expected Sales:</span>
                        <span className="font-medium text-green-600">{campaign.metrics.expectedSales}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Expected Reviews:</span>
                        <span className="font-medium text-green-600">{campaign.metrics.expectedReviews}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Expected Reach:</span>
                        <span className="font-medium text-green-600">{campaign.metrics.expectedReach.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-600">Budget Efficiency:</span>
                        <span className="font-medium text-green-600">{campaign.metrics.budgetEfficiency}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-6">
                  <h4 className="font-semibold text-slate-900 mb-4">Campaign Timeline</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <h5 className="font-medium text-slate-900 mb-3">Pre-Launch (6 months)</h5>
                      <div className="space-y-2">
                        {campaign.timeline.preLaunch.map((task, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5" />
                            <span className="text-sm text-slate-700">{task}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-slate-900 mb-3">Launch Week</h5>
                      <div className="space-y-2">
                        {campaign.timeline.launchWeek.map((task, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5" />
                            <span className="text-sm text-slate-700">{task}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-slate-900 mb-3">Post-Launch (3 months)</h5>
                      <div className="space-y-2">
                        {campaign.timeline.postLaunch.map((task, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-purple-600 mt-0.5" />
                            <span className="text-sm text-slate-700">{task}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-yellow-50 rounded-lg p-6">
                  <h4 className="font-semibold text-slate-900 mb-4">Recommendations</h4>
                  <div className="space-y-3">
                    {campaign.recommendations.map((rec: string, index: number) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
                        <span className="text-slate-700">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-8">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              currentStep >= step 
                ? 'bg-blue-600 text-white' 
                : 'bg-slate-200 text-slate-600'
            }`}>
              {step}
            </div>
            {step < 4 && (
              <div className={`w-12 h-1 mx-2 ${
                currentStep > step ? 'bg-blue-600' : 'bg-slate-200'
              }`}></div>
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="bg-white rounded-lg p-6 border border-slate-200">
        {renderStep()}
      </div>

      {/* Navigation */}
      <div className="flex justify-between">
        <button
          onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
          disabled={currentStep === 1}
          className="px-6 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        
        {currentStep < 3 ? (
          <button
            onClick={() => setCurrentStep(currentStep + 1)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Next
          </button>
        ) : currentStep === 3 ? (
          <button
            onClick={generateCampaign}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Generate Campaign
          </button>
        ) : (
          <button
            onClick={() => setCurrentStep(1)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Start Over
          </button>
        )}
      </div>
    </div>
  );
} 