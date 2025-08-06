import React, { useState } from 'react';
import { DollarSign, TrendingUp, BookOpen, Target, CheckCircle, BarChart3 } from 'lucide-react';

interface PricingData {
  bookInfo: {
    genre: string;
    wordCount: number;
    targetAudience: string;
    competitionLevel: string;
  };
  marketResearch: {
    averagePrice: number;
    priceRange: string;
    competitorPrices: number[];
    marketDemand: string;
  };
  costStructure: {
    productionCosts: number;
    marketingBudget: number;
    distributionCosts: number;
    desiredProfit: number;
  };
  pricingStrategy: {
    strategy: string;
    recommendedPrice: number;
    pricePoints: number[];
    reasoning: string[];
  };
}

export function BookPricingStrategyCalculator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [pricingData, setPricingData] = useState<PricingData>({
    bookInfo: {
      genre: '',
      wordCount: 0,
      targetAudience: '',
      competitionLevel: ''
    },
    marketResearch: {
      averagePrice: 0,
      priceRange: '',
      competitorPrices: [],
      marketDemand: ''
    },
    costStructure: {
      productionCosts: 0,
      marketingBudget: 0,
      distributionCosts: 0,
      desiredProfit: 0
    },
    pricingStrategy: {
      strategy: '',
      recommendedPrice: 0,
      pricePoints: [],
      reasoning: []
    }
  });
  const [analysis, setAnalysis] = useState<any>(null);

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

  const competitionLevels = ['Low - Niche market', 'Medium - Some competition', 'High - Saturated market'];
  const marketDemandLevels = ['Low - Limited interest', 'Medium - Steady demand', 'High - Strong demand'];

  const handleBookInfoChange = (field: keyof PricingData['bookInfo'], value: string | number) => {
    setPricingData(prev => ({
      ...prev,
      bookInfo: {
        ...prev.bookInfo,
        [field]: value
      }
    }));
  };

  const handleMarketResearchChange = (field: keyof PricingData['marketResearch'], value: string | number | number[]) => {
    setPricingData(prev => ({
      ...prev,
      marketResearch: {
        ...prev.marketResearch,
        [field]: value
      }
    }));
  };

  const handleCostStructureChange = (field: keyof PricingData['costStructure'], value: number) => {
    setPricingData(prev => ({
      ...prev,
      costStructure: {
        ...prev.costStructure,
        [field]: value
      }
    }));
  };

  const generatePricingStrategy = () => {
    const { bookInfo, marketResearch, costStructure } = pricingData;
    
    // Calculate total costs
    const totalCosts = costStructure.productionCosts + costStructure.marketingBudget + costStructure.distributionCosts;
    
    // Calculate break-even price
    const breakEvenPrice = totalCosts / 1000; // Assuming 1000 copies sold
    
    // Determine pricing strategy based on market conditions
    let strategy = '';
    let recommendedPrice = 0;
    let pricePoints: number[] = [];
    let reasoning: string[] = [];

    if (bookInfo.competitionLevel === 'High - Saturated market') {
      strategy = 'Competitive Pricing';
      recommendedPrice = Math.max(breakEvenPrice, marketResearch.averagePrice * 0.9);
      pricePoints = [recommendedPrice * 0.8, recommendedPrice, recommendedPrice * 1.2];
      reasoning = [
        'High competition requires competitive pricing',
        'Focus on value proposition over price',
        'Consider promotional pricing for launch'
      ];
    } else if (bookInfo.competitionLevel === 'Medium - Some competition') {
      strategy = 'Value-Based Pricing';
      recommendedPrice = Math.max(breakEvenPrice, marketResearch.averagePrice);
      pricePoints = [recommendedPrice * 0.9, recommendedPrice, recommendedPrice * 1.1];
      reasoning = [
        'Moderate competition allows for value-based pricing',
        'Price reflects quality and unique value',
        'Consider premium pricing for special editions'
      ];
    } else {
      strategy = 'Premium Pricing';
      recommendedPrice = Math.max(breakEvenPrice, marketResearch.averagePrice * 1.2);
      pricePoints = [recommendedPrice * 0.95, recommendedPrice, recommendedPrice * 1.3];
      reasoning = [
        'Low competition allows for premium pricing',
        'Focus on unique value proposition',
        'Consider higher price for perceived quality'
      ];
    }

    // Adjust for genre-specific factors
    if (bookInfo.genre.includes('Non-Fiction')) {
      recommendedPrice = Math.min(recommendedPrice * 1.1, 29.99);
      reasoning.push('Non-fiction typically commands higher prices');
    } else if (bookInfo.genre.includes('Children')) {
      recommendedPrice = Math.min(recommendedPrice * 0.8, 19.99);
      reasoning.push('Children\'s books typically have lower price points');
    }

    const analysis = {
      strategy,
      recommendedPrice: Math.round(recommendedPrice * 100) / 100,
      pricePoints: pricePoints.map(p => Math.round(p * 100) / 100),
      reasoning,
      totalCosts,
      breakEvenPrice: Math.round(breakEvenPrice * 100) / 100,
      profitMargin: Math.round(((recommendedPrice - breakEvenPrice) / recommendedPrice) * 100),
      roi: Math.round(((recommendedPrice - breakEvenPrice) / totalCosts) * 100)
    };

    setAnalysis(analysis);
    setCurrentStep(4);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-slate-900">Book Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Genre</label>
                <select
                  value={pricingData.bookInfo.genre}
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
                <label className="block text-sm font-medium text-slate-700 mb-2">Word Count</label>
                <input
                  type="number"
                  value={pricingData.bookInfo.wordCount || ''}
                  onChange={(e) => handleBookInfoChange('wordCount', parseInt(e.target.value) || 0)}
                  placeholder="e.g., 80000"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Target Audience</label>
                <select
                  value={pricingData.bookInfo.targetAudience}
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
                <label className="block text-sm font-medium text-slate-700 mb-2">Competition Level</label>
                <select
                  value={pricingData.bookInfo.competitionLevel}
                  onChange={(e) => handleBookInfoChange('competitionLevel', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Competition Level</option>
                  {competitionLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-slate-900">Market Research</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Average Market Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={pricingData.marketResearch.averagePrice || ''}
                  onChange={(e) => handleMarketResearchChange('averagePrice', parseFloat(e.target.value) || 0)}
                  placeholder="e.g., 24.99"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Price Range</label>
                <input
                  type="text"
                  value={pricingData.marketResearch.priceRange}
                  onChange={(e) => handleMarketResearchChange('priceRange', e.target.value)}
                  placeholder="e.g., $19.99 - $29.99"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Competitor Prices (comma-separated)</label>
                <input
                  type="text"
                  value={pricingData.marketResearch.competitorPrices.join(', ')}
                  onChange={(e) => {
                    const prices = e.target.value.split(',').map(p => parseFloat(p.trim()) || 0).filter(p => p > 0);
                    handleMarketResearchChange('competitorPrices', prices);
                  }}
                  placeholder="e.g., 24.99, 26.99, 22.99"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Market Demand</label>
                <select
                  value={pricingData.marketResearch.marketDemand}
                  onChange={(e) => handleMarketResearchChange('marketDemand', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Market Demand</option>
                  {marketDemandLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-slate-900">Cost Structure</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Production Costs ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={pricingData.costStructure.productionCosts || ''}
                  onChange={(e) => handleCostStructureChange('productionCosts', parseFloat(e.target.value) || 0)}
                  placeholder="e.g., 5000"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Marketing Budget ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={pricingData.costStructure.marketingBudget || ''}
                  onChange={(e) => handleCostStructureChange('marketingBudget', parseFloat(e.target.value) || 0)}
                  placeholder="e.g., 3000"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Distribution Costs ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={pricingData.costStructure.distributionCosts || ''}
                  onChange={(e) => handleCostStructureChange('distributionCosts', parseFloat(e.target.value) || 0)}
                  placeholder="e.g., 2000"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Desired Profit Margin (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={pricingData.costStructure.desiredProfit || ''}
                  onChange={(e) => handleCostStructureChange('desiredProfit', parseFloat(e.target.value) || 0)}
                  placeholder="e.g., 30"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-slate-900">Pricing Strategy Results</h3>
            {analysis && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h4 className="font-semibold text-slate-900 mb-4">Recommended Strategy</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Strategy:</span>
                      <span className="font-medium">{analysis.strategy}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Recommended Price:</span>
                      <span className="font-medium text-green-600">${analysis.recommendedPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Profit Margin:</span>
                      <span className="font-medium text-green-600">{analysis.profitMargin}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">ROI:</span>
                      <span className="font-medium text-green-600">{analysis.roi}%</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-6">
                  <h4 className="font-semibold text-slate-900 mb-4">Price Points</h4>
                  <div className="space-y-2">
                    {analysis.pricePoints.map((price: number, index: number) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-slate-700">${price} - {index === 0 ? 'Budget' : index === 1 ? 'Standard' : 'Premium'}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-6 md:col-span-2">
                  <h4 className="font-semibold text-slate-900 mb-4">Pricing Reasoning</h4>
                  <div className="space-y-3">
                    {analysis.reasoning.map((reason: string, index: number) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                        <span className="text-slate-700">{reason}</span>
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
            onClick={generatePricingStrategy}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Generate Strategy
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