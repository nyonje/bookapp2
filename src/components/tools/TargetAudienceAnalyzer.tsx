import React, { useState } from 'react';
import { Target, Users, TrendingUp, BarChart3, CheckCircle } from 'lucide-react';

interface AudienceData {
  demographics: {
    ageRanges: string[];
    gender: string[];
    education: string[];
    income: string[];
  };
  psychographics: {
    interests: string[];
    values: string[];
    lifestyle: string[];
    readingHabits: string[];
  };
  behavior: {
    platforms: string[];
    contentTypes: string[];
    engagementLevel: string;
    purchaseBehavior: string;
  };
}

export function TargetAudienceAnalyzer() {
  const [currentStep, setCurrentStep] = useState(1);
  const [audienceData, setAudienceData] = useState<AudienceData>({
    demographics: {
      ageRanges: [],
      gender: [],
      education: [],
      income: []
    },
    psychographics: {
      interests: [],
      values: [],
      lifestyle: [],
      readingHabits: []
    },
    behavior: {
      platforms: [],
      contentTypes: [],
      engagementLevel: '',
      purchaseBehavior: ''
    }
  });
  const [analysis, setAnalysis] = useState<any>(null);

  const ageRanges = ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'];
  const genderOptions = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];
  const educationLevels = ['High School', 'Some College', 'Bachelor\'s Degree', 'Master\'s Degree', 'PhD/Doctorate'];
  const incomeLevels = ['Under $30k', '$30k-$50k', '$50k-$75k', '$75k-$100k', '$100k-$150k', '$150k+'];
  const interests = ['Technology', 'Business', 'Self-help', 'Fiction', 'Non-fiction', 'Science', 'History', 'Travel', 'Cooking', 'Fitness', 'Art', 'Music'];
  const values = ['Education', 'Entertainment', 'Self-improvement', 'Escape', 'Knowledge', 'Inspiration', 'Community', 'Innovation'];
  const lifestyle = ['Busy Professional', 'Student', 'Retired', 'Stay-at-home Parent', 'Entrepreneur', 'Creative Professional'];
  const readingHabits = ['Daily Reader', 'Weekly Reader', 'Monthly Reader', 'Occasional Reader', 'Audiobook Listener'];
  const platforms = ['Amazon', 'Goodreads', 'Social Media', 'Book Clubs', 'Libraries', 'Independent Bookstores', 'Online Forums'];
  const contentTypes = ['Blog Posts', 'Social Media', 'Email Newsletters', 'Podcasts', 'YouTube Videos', 'Webinars', 'Live Events'];

  const handleDemographicsChange = (category: keyof AudienceData['demographics'], value: string) => {
    setAudienceData(prev => ({
      ...prev,
      demographics: {
        ...prev.demographics,
        [category]: prev.demographics[category].includes(value)
          ? prev.demographics[category].filter(item => item !== value)
          : [...prev.demographics[category], value]
      }
    }));
  };

  const handlePsychographicsChange = (category: keyof AudienceData['psychographics'], value: string) => {
    setAudienceData(prev => ({
      ...prev,
      psychographics: {
        ...prev.psychographics,
        [category]: prev.psychographics[category].includes(value)
          ? prev.psychographics[category].filter(item => item !== value)
          : [...prev.psychographics[category], value]
      }
    }));
  };

  const handleBehaviorChange = (category: keyof AudienceData['behavior'], value: string) => {
    setAudienceData(prev => ({
      ...prev,
      behavior: {
        ...prev.behavior,
        [category]: Array.isArray(prev.behavior[category as keyof typeof prev.behavior])
          ? (prev.behavior[category as keyof typeof prev.behavior] as string[]).includes(value)
            ? (prev.behavior[category as keyof typeof prev.behavior] as string[]).filter(item => item !== value)
            : [...(prev.behavior[category as keyof typeof prev.behavior] as string[]), value]
          : value
      }
    }));
  };

  const generateAnalysis = () => {
    const totalSelections = 
      audienceData.demographics.ageRanges.length +
      audienceData.demographics.gender.length +
      audienceData.demographics.education.length +
      audienceData.demographics.income.length +
      audienceData.psychographics.interests.length +
      audienceData.psychographics.values.length +
      audienceData.psychographics.lifestyle.length +
      audienceData.psychographics.readingHabits.length +
      audienceData.behavior.platforms.length +
      audienceData.behavior.contentTypes.length +
      (audienceData.behavior.engagementLevel ? 1 : 0) +
      (audienceData.behavior.purchaseBehavior ? 1 : 0);

    const analysis = {
      audienceSize: totalSelections > 20 ? 'Large' : totalSelections > 10 ? 'Medium' : 'Small',
      primaryAgeGroup: audienceData.demographics.ageRanges[0] || 'Not specified',
      topInterests: audienceData.psychographics.interests.slice(0, 3),
      preferredPlatforms: audienceData.behavior.platforms.slice(0, 3),
      engagementLevel: audienceData.behavior.engagementLevel || 'Not specified',
      recommendations: generateRecommendations()
    };

    setAnalysis(analysis);
    setCurrentStep(4);
  };

  const generateRecommendations = () => {
    const recommendations = [];
    
    if (audienceData.demographics.ageRanges.includes('18-24') || audienceData.demographics.ageRanges.includes('25-34')) {
      recommendations.push('Focus on social media marketing and mobile-first content');
    }
    
    if (audienceData.psychographics.interests.includes('Technology')) {
      recommendations.push('Consider creating a companion app or digital resources');
    }
    
    if (audienceData.behavior.platforms.includes('Amazon')) {
      recommendations.push('Optimize your Amazon book listing and encourage reviews');
    }
    
    if (audienceData.psychographics.readingHabits.includes('Audiobook Listener')) {
      recommendations.push('Consider creating an audiobook version of your book');
    }
    
    if (recommendations.length === 0) {
      recommendations.push('Focus on building an email list for direct marketing');
      recommendations.push('Create valuable content that addresses your audience\'s pain points');
    }
    
    return recommendations;
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-slate-900">Demographics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-slate-700 mb-3">Age Ranges</h4>
                <div className="space-y-2">
                  {ageRanges.map(age => (
                    <label key={age} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={audienceData.demographics.ageRanges.includes(age)}
                        onChange={() => handleDemographicsChange('ageRanges', age)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-slate-700">{age}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-slate-700 mb-3">Gender</h4>
                <div className="space-y-2">
                  {genderOptions.map(gender => (
                    <label key={gender} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={audienceData.demographics.gender.includes(gender)}
                        onChange={() => handleDemographicsChange('gender', gender)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-slate-700">{gender}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-slate-700 mb-3">Education Level</h4>
                <div className="space-y-2">
                  {educationLevels.map(education => (
                    <label key={education} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={audienceData.demographics.education.includes(education)}
                        onChange={() => handleDemographicsChange('education', education)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-slate-700">{education}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-slate-700 mb-3">Income Level</h4>
                <div className="space-y-2">
                  {incomeLevels.map(income => (
                    <label key={income} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={audienceData.demographics.income.includes(income)}
                        onChange={() => handleDemographicsChange('income', income)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-slate-700">{income}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-slate-900">Psychographics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-slate-700 mb-3">Interests</h4>
                <div className="space-y-2">
                  {interests.map(interest => (
                    <label key={interest} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={audienceData.psychographics.interests.includes(interest)}
                        onChange={() => handlePsychographicsChange('interests', interest)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-slate-700">{interest}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-slate-700 mb-3">Values</h4>
                <div className="space-y-2">
                  {values.map(value => (
                    <label key={value} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={audienceData.psychographics.values.includes(value)}
                        onChange={() => handlePsychographicsChange('values', value)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-slate-700">{value}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-slate-700 mb-3">Lifestyle</h4>
                <div className="space-y-2">
                  {lifestyle.map(style => (
                    <label key={style} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={audienceData.psychographics.lifestyle.includes(style)}
                        onChange={() => handlePsychographicsChange('lifestyle', style)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-slate-700">{style}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-slate-700 mb-3">Reading Habits</h4>
                <div className="space-y-2">
                  {readingHabits.map(habit => (
                    <label key={habit} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={audienceData.psychographics.readingHabits.includes(habit)}
                        onChange={() => handlePsychographicsChange('readingHabits', habit)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-slate-700">{habit}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
        
      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-slate-900">Behavior & Platforms</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-slate-700 mb-3">Platforms They Use</h4>
                <div className="space-y-2">
                  {platforms.map(platform => (
                    <label key={platform} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={audienceData.behavior.platforms.includes(platform)}
                        onChange={() => handleBehaviorChange('platforms', platform)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-slate-700">{platform}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-slate-700 mb-3">Content Types They Engage With</h4>
                <div className="space-y-2">
                  {contentTypes.map(content => (
                    <label key={content} className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={audienceData.behavior.contentTypes.includes(content)}
                        onChange={() => handleBehaviorChange('contentTypes', content)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-slate-700">{content}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-slate-700 mb-3">Engagement Level</h4>
                <div className="space-y-2">
                  {['High - Actively seeks out content', 'Medium - Engages when convenient', 'Low - Passive consumer'].map(level => (
                    <label key={level} className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="engagementLevel"
                        checked={audienceData.behavior.engagementLevel === level}
                        onChange={() => handleBehaviorChange('engagementLevel', level)}
                        className="border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-slate-700">{level}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-medium text-slate-700 mb-3">Purchase Behavior</h4>
                <div className="space-y-2">
                  {['Impulse buyer', 'Research-heavy buyer', 'Price-conscious', 'Quality-focused', 'Brand loyal'].map(behavior => (
                    <label key={behavior} className="flex items-center space-x-3">
                      <input
                        type="radio"
                        name="purchaseBehavior"
                        checked={audienceData.behavior.purchaseBehavior === behavior}
                        onChange={() => handleBehaviorChange('purchaseBehavior', behavior)}
                        className="border-slate-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-slate-700">{behavior}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-slate-900">Audience Analysis Results</h3>
            {analysis && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h4 className="font-semibold text-slate-900 mb-4">Audience Profile</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Audience Size:</span>
                      <span className="font-medium">{analysis.audienceSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Primary Age Group:</span>
                      <span className="font-medium">{analysis.primaryAgeGroup}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Engagement Level:</span>
                      <span className="font-medium">{analysis.engagementLevel}</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-6">
                  <h4 className="font-semibold text-slate-900 mb-4">Top Interests</h4>
                  <div className="space-y-2">
                    {analysis.topInterests.map((interest: string, index: number) => (
                      <div key={index} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="text-slate-700">{interest}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-6 md:col-span-2">
                  <h4 className="font-semibold text-slate-900 mb-4">Marketing Recommendations</h4>
                  <div className="space-y-3">
                    {analysis.recommendations.map((rec: string, index: number) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
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
            onClick={generateAnalysis}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Generate Analysis
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