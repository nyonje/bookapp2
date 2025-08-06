import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, DollarSign, Eye, Star, Share2, Target, CheckCircle } from 'lucide-react';

interface AnalyticsData {
  bookInfo: {
    title: string;
    genre: string;
    launchDate: string;
    price: number;
  };
  marketingChannels: {
    emailMarketing: boolean;
    socialMedia: boolean;
    influencerOutreach: boolean;
    paidAdvertising: boolean;
    bookBlogs: boolean;
    podcastInterviews: boolean;
  };
  performanceMetrics: {
    totalSales: number;
    totalRevenue: number;
    emailListSize: number;
    socialMediaFollowers: number;
    websiteVisitors: number;
    reviewCount: number;
    averageRating: number;
  };
  channelPerformance: {
    emailMarketing: {
      opens: number;
      clicks: number;
      conversions: number;
      revenue: number;
    };
    socialMedia: {
      reach: number;
      engagement: number;
      conversions: number;
      revenue: number;
    };
    influencerOutreach: {
      collaborations: number;
      reach: number;
      conversions: number;
      revenue: number;
    };
    paidAdvertising: {
      spend: number;
      impressions: number;
      conversions: number;
      revenue: number;
    };
  };
}

export function MarketingAnalyticsDashboard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    bookInfo: {
      title: '',
      genre: '',
      launchDate: '',
      price: 0
    },
    marketingChannels: {
      emailMarketing: false,
      socialMedia: false,
      influencerOutreach: false,
      paidAdvertising: false,
      bookBlogs: false,
      podcastInterviews: false
    },
    performanceMetrics: {
      totalSales: 0,
      totalRevenue: 0,
      emailListSize: 0,
      socialMediaFollowers: 0,
      websiteVisitors: 0,
      reviewCount: 0,
      averageRating: 0
    },
    channelPerformance: {
      emailMarketing: {
        opens: 0,
        clicks: 0,
        conversions: 0,
        revenue: 0
      },
      socialMedia: {
        reach: 0,
        engagement: 0,
        conversions: 0,
        revenue: 0
      },
      influencerOutreach: {
        collaborations: 0,
        reach: 0,
        conversions: 0,
        revenue: 0
      },
      paidAdvertising: {
        spend: 0,
        impressions: 0,
        conversions: 0,
        revenue: 0
      }
    }
  });
  const [analytics, setAnalytics] = useState<any>(null);

  const genres = [
    'Fiction - Romance', 'Fiction - Mystery/Thriller', 'Fiction - Science Fiction',
    'Fiction - Fantasy', 'Fiction - Literary', 'Non-Fiction - Self-Help',
    'Non-Fiction - Business', 'Non-Fiction - Memoir', 'Non-Fiction - History',
    'Non-Fiction - Educational', 'Children\'s Books', 'Young Adult'
  ];

  const handleBookInfoChange = (field: keyof AnalyticsData['bookInfo'], value: string | number) => {
    setAnalyticsData(prev => ({
      ...prev,
      bookInfo: {
        ...prev.bookInfo,
        [field]: value
      }
    }));
  };

  const handleChannelChange = (channel: keyof AnalyticsData['marketingChannels']) => {
    setAnalyticsData(prev => ({
      ...prev,
      marketingChannels: {
        ...prev.marketingChannels,
        [channel]: !prev.marketingChannels[channel]
      }
    }));
  };

  const handleMetricsChange = (field: keyof AnalyticsData['performanceMetrics'], value: number) => {
    setAnalyticsData(prev => ({
      ...prev,
      performanceMetrics: {
        ...prev.performanceMetrics,
        [field]: value
      }
    }));
  };

  const handleChannelPerformanceChange = (channel: string, field: string, value: number) => {
    setAnalyticsData(prev => ({
      ...prev,
      channelPerformance: {
        ...prev.channelPerformance,
        [channel]: {
          ...prev.channelPerformance[channel as keyof typeof prev.channelPerformance],
          [field]: value
        }
      }
    }));
  };

  const generateAnalytics = () => {
    const { bookInfo, marketingChannels, performanceMetrics, channelPerformance } = analyticsData;
    
    // Calculate ROI for each channel
    const channelROI = {
      emailMarketing: channelPerformance.emailMarketing.revenue / (channelPerformance.emailMarketing.revenue * 0.1),
      socialMedia: channelPerformance.socialMedia.revenue / (channelPerformance.socialMedia.revenue * 0.05),
      influencerOutreach: channelPerformance.influencerOutreach.revenue / (channelPerformance.influencerOutreach.revenue * 0.15),
      paidAdvertising: channelPerformance.paidAdvertising.revenue / channelPerformance.paidAdvertising.spend
    };
    
    // Calculate conversion rates
    const conversionRates = {
      emailMarketing: (channelPerformance.emailMarketing.conversions / channelPerformance.emailMarketing.clicks) * 100,
      socialMedia: (channelPerformance.socialMedia.conversions / channelPerformance.socialMedia.reach) * 100,
      influencerOutreach: (channelPerformance.influencerOutreach.conversions / channelPerformance.influencerOutreach.reach) * 100,
      paidAdvertising: (channelPerformance.paidAdvertising.conversions / channelPerformance.paidAdvertising.impressions) * 100
    };
    
    // Calculate total marketing spend
    const totalSpend = channelPerformance.paidAdvertising.spend + 
                      (channelPerformance.emailMarketing.revenue * 0.1) +
                      (channelPerformance.socialMedia.revenue * 0.05) +
                      (channelPerformance.influencerOutreach.revenue * 0.15);
    
    // Calculate overall ROI
    const overallROI = performanceMetrics.totalRevenue / totalSpend;
    
    // Generate insights
    const insights = generateInsights();
    
    // Generate recommendations
    const recommendations = generateRecommendations();
    
    const analytics = {
      bookInfo,
      performanceMetrics,
      channelROI,
      conversionRates,
      totalSpend,
      overallROI,
      insights,
      recommendations
    };
    
    setAnalytics(analytics);
    setCurrentStep(4);
  };

  const generateInsights = () => {
    const insights = [];
    const { channelROI, conversionRates, performanceMetrics } = analyticsData;
    
    // Find best performing channel
    const bestChannel = Object.entries(channelROI).reduce((a, b) => channelROI[a[0]] > channelROI[b[0]] ? a : b);
    insights.push(`${bestChannel[0].replace(/([A-Z])/g, ' $1').trim()} is your best performing channel with ${Math.round(bestChannel[1] * 100)}% ROI`);
    
    // Email list insights
    if (performanceMetrics.emailListSize > 1000) {
      insights.push('Your email list is strong - focus on segmentation and personalization');
    } else {
      insights.push('Consider growing your email list - it has the highest ROI');
    }
    
    // Social media insights
    if (performanceMetrics.socialMediaFollowers > 5000) {
      insights.push('Large social media following - leverage for organic reach');
    } else {
      insights.push('Focus on growing social media presence for organic marketing');
    }
    
    // Review insights
    if (performanceMetrics.averageRating > 4.0) {
      insights.push('High ratings - use positive reviews in marketing materials');
    } else {
      insights.push('Focus on improving book quality and reader satisfaction');
    }
    
    return insights;
  };

  const generateRecommendations = () => {
    const recommendations = [];
    const { channelROI, conversionRates, performanceMetrics } = analyticsData;
    
    // Find worst performing channel
    const worstChannel = Object.entries(channelROI).reduce((a, b) => channelROI[a[0]] < channelROI[b[0]] ? a : b);
    recommendations.push(`Optimize ${worstChannel[0].replace(/([A-Z])/g, ' $1').trim()} - current ROI is ${Math.round(worstChannel[1] * 100)}%`);
    
    // Conversion rate recommendations
    Object.entries(conversionRates).forEach(([channel, rate]) => {
      if (rate < 2) {
        recommendations.push(`Improve ${channel.replace(/([A-Z])/g, ' $1').trim()} conversion rate (currently ${rate.toFixed(1)}%)`);
      }
    });
    
    // Revenue recommendations
    if (performanceMetrics.totalRevenue < 1000) {
      recommendations.push('Focus on increasing sales volume and average order value');
    }
    
    // Email recommendations
    if (performanceMetrics.emailListSize < 500) {
      recommendations.push('Prioritize email list building - highest ROI marketing channel');
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
                  value={analyticsData.bookInfo.title}
                  onChange={(e) => handleBookInfoChange('title', e.target.value)}
                  placeholder="Enter your book title"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Genre</label>
                <select
                  value={analyticsData.bookInfo.genre}
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
                <label className="block text-sm font-medium text-slate-700 mb-2">Launch Date</label>
                <input
                  type="date"
                  value={analyticsData.bookInfo.launchDate}
                  onChange={(e) => handleBookInfoChange('launchDate', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Book Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={analyticsData.bookInfo.price || ''}
                  onChange={(e) => handleBookInfoChange('price', parseFloat(e.target.value) || 0)}
                  placeholder="e.g., 24.99"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-slate-900">Marketing Channels</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(analyticsData.marketingChannels).map(([channel, isSelected]) => (
                <label key={channel} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={() => handleChannelChange(channel as keyof AnalyticsData['marketingChannels'])}
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-slate-700 capitalize">{channel.replace(/([A-Z])/g, ' $1').trim()}</span>
                </label>
              ))}
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-slate-900">Performance Metrics</h3>
            
            <div className="space-y-4">
              <h4 className="font-medium text-slate-700">Overall Performance</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Total Sales (copies)</label>
                  <input
                    type="number"
                    value={analyticsData.performanceMetrics.totalSales || ''}
                    onChange={(e) => handleMetricsChange('totalSales', parseInt(e.target.value) || 0)}
                    placeholder="e.g., 500"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Total Revenue ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={analyticsData.performanceMetrics.totalRevenue || ''}
                    onChange={(e) => handleMetricsChange('totalRevenue', parseFloat(e.target.value) || 0)}
                    placeholder="e.g., 12450"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Email List Size</label>
                  <input
                    type="number"
                    value={analyticsData.performanceMetrics.emailListSize || ''}
                    onChange={(e) => handleMetricsChange('emailListSize', parseInt(e.target.value) || 0)}
                    placeholder="e.g., 1000"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Social Media Followers</label>
                  <input
                    type="number"
                    value={analyticsData.performanceMetrics.socialMediaFollowers || ''}
                    onChange={(e) => handleMetricsChange('socialMediaFollowers', parseInt(e.target.value) || 0)}
                    placeholder="e.g., 5000"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Website Visitors</label>
                  <input
                    type="number"
                    value={analyticsData.performanceMetrics.websiteVisitors || ''}
                    onChange={(e) => handleMetricsChange('websiteVisitors', parseInt(e.target.value) || 0)}
                    placeholder="e.g., 2000"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Review Count</label>
                  <input
                    type="number"
                    value={analyticsData.performanceMetrics.reviewCount || ''}
                    onChange={(e) => handleMetricsChange('reviewCount', parseInt(e.target.value) || 0)}
                    placeholder="e.g., 25"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Average Rating</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={analyticsData.performanceMetrics.averageRating || ''}
                    onChange={(e) => handleMetricsChange('averageRating', parseFloat(e.target.value) || 0)}
                    placeholder="e.g., 4.2"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-slate-700">Channel Performance</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(analyticsData.channelPerformance).map(([channel, metrics]) => (
                  <div key={channel} className="border border-slate-200 rounded-lg p-4">
                    <h5 className="font-medium text-slate-900 mb-3 capitalize">{channel.replace(/([A-Z])/g, ' $1').trim()}</h5>
                    <div className="space-y-2">
                      {Object.entries(metrics).map(([metric, value]) => (
                        <div key={metric}>
                          <label className="block text-sm font-medium text-slate-700 mb-1 capitalize">{metric}</label>
                          <input
                            type="number"
                            value={value || ''}
                            onChange={(e) => handleChannelPerformanceChange(channel, metric, parseFloat(e.target.value) || 0)}
                            placeholder={`Enter ${metric}`}
                            className="w-full px-2 py-1 text-sm border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-slate-900">Analytics Dashboard</h3>
            {analytics && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <DollarSign className="w-6 h-6 text-blue-600" />
                      <div>
                        <p className="text-sm text-slate-600">Total Revenue</p>
                        <p className="text-xl font-bold text-blue-600">${analytics.performanceMetrics.totalRevenue.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <Users className="w-6 h-6 text-green-600" />
                      <div>
                        <p className="text-sm text-slate-600">Total Sales</p>
                        <p className="text-xl font-bold text-green-600">{analytics.performanceMetrics.totalSales}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="w-6 h-6 text-purple-600" />
                      <div>
                        <p className="text-sm text-slate-600">Overall ROI</p>
                        <p className="text-xl font-bold text-purple-600">{Math.round(analytics.overallROI * 100)}%</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <div className="flex items-center space-x-3">
                      <Star className="w-6 h-6 text-yellow-600" />
                      <div>
                        <p className="text-sm text-slate-600">Avg Rating</p>
                        <p className="text-xl font-bold text-yellow-600">{analytics.performanceMetrics.averageRating}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg p-6 border border-slate-200">
                    <h4 className="font-semibold text-slate-900 mb-4">Channel ROI</h4>
                    <div className="space-y-3">
                      {Object.entries(analytics.channelROI).map(([channel, roi]) => (
                        <div key={channel} className="flex justify-between items-center">
                          <span className="text-slate-700 capitalize">{channel.replace(/([A-Z])/g, ' $1').trim()}</span>
                          <span className={`font-medium ${roi > 1 ? 'text-green-600' : 'text-red-600'}`}>
                            {Math.round(roi * 100)}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg p-6 border border-slate-200">
                    <h4 className="font-semibold text-slate-900 mb-4">Conversion Rates</h4>
                    <div className="space-y-3">
                      {Object.entries(analytics.conversionRates).map(([channel, rate]) => (
                        <div key={channel} className="flex justify-between items-center">
                          <span className="text-slate-700 capitalize">{channel.replace(/([A-Z])/g, ' $1').trim()}</span>
                          <span className={`font-medium ${rate > 2 ? 'text-green-600' : 'text-red-600'}`}>
                            {rate.toFixed(1)}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-6">
                  <h4 className="font-semibold text-slate-900 mb-4">Key Insights</h4>
                  <div className="space-y-3">
                    {analytics.insights.map((insight: string, index: number) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                        <span className="text-slate-700">{insight}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-yellow-50 rounded-lg p-6">
                  <h4 className="font-semibold text-slate-900 mb-4">Recommendations</h4>
                  <div className="space-y-3">
                    {analytics.recommendations.map((rec: string, index: number) => (
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
            onClick={generateAnalytics}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Generate Analytics
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