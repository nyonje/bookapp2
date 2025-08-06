import React, { useState } from 'react';
import { Star, MessageCircle, Users, CheckCircle, Copy, Download } from 'lucide-react';

interface ReviewRequestData {
  bookInfo: {
    title: string;
    author: string;
    genre: string;
    wordCount: number;
    targetAudience: string;
  };
  reviewerInfo: {
    name: string;
    platform: string;
    audienceSize: number;
    reviewStyle: string;
    contactMethod: string;
  };
  requestDetails: {
    requestType: string;
    timeline: string;
    format: string;
    compensation: string;
  };
  generatedContent: {
    subjectLine: string;
    emailBody: string;
    followUpSequence: string[];
  };
}

export function BookReviewRequestGenerator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [requestData, setRequestData] = useState<ReviewRequestData>({
    bookInfo: {
      title: '',
      author: '',
      genre: '',
      wordCount: 0,
      targetAudience: ''
    },
    reviewerInfo: {
      name: '',
      platform: '',
      audienceSize: 0,
      reviewStyle: '',
      contactMethod: ''
    },
    requestDetails: {
      requestType: '',
      timeline: '',
      format: '',
      compensation: ''
    },
    generatedContent: {
      subjectLine: '',
      emailBody: '',
      followUpSequence: []
    }
  });
  const [generatedRequest, setGeneratedRequest] = useState<any>(null);

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

  const platforms = [
    'Book Blog', 'Goodreads', 'Amazon', 'Instagram', 'YouTube', 'TikTok',
    'Podcast', 'Newsletter', 'Book Club', 'Library', 'Academic Journal'
  ];

  const reviewStyles = [
    'Detailed analysis with quotes',
    'Brief summary with rating',
    'Video review',
    'Podcast discussion',
    'Social media post',
    'Blog post with personal thoughts'
  ];

  const requestTypes = [
    'ARC (Advance Reader Copy)',
    'Published book review',
    'Book tour participation',
    'Interview or Q&A',
    'Guest post or article',
    'Social media promotion'
  ];

  const timelines = [
    '1-2 weeks before launch',
    'Launch week',
    '1-2 weeks after launch',
    'Ongoing promotion',
    'Flexible timeline'
  ];

  const formats = [
    'Digital ARC (PDF/EPUB)',
    'Physical ARC',
    'Published book (digital)',
    'Published book (physical)',
    'Audiobook'
  ];

  const compensationTypes = [
    'Free copy of the book',
    'Free copy + small honorarium',
    'Revenue share from sales',
    'Cross-promotion opportunities',
    'No compensation (volunteer)',
    'Other (specify)'
  ];

  const handleBookInfoChange = (field: keyof ReviewRequestData['bookInfo'], value: string | number) => {
    setRequestData(prev => ({
      ...prev,
      bookInfo: {
        ...prev.bookInfo,
        [field]: value
      }
    }));
  };

  const handleReviewerInfoChange = (field: keyof ReviewRequestData['reviewerInfo'], value: string | number) => {
    setRequestData(prev => ({
      ...prev,
      reviewerInfo: {
        ...prev.reviewerInfo,
        [field]: value
      }
    }));
  };

  const handleRequestDetailsChange = (field: keyof ReviewRequestData['requestDetails'], value: string) => {
    setRequestData(prev => ({
      ...prev,
      requestDetails: {
        ...prev.requestDetails,
        [field]: value
      }
    }));
  };

  const generateReviewRequest = () => {
    const { bookInfo, reviewerInfo, requestDetails } = requestData;
    
    // Generate personalized subject line
    const subjectLine = `Review Request: "${bookInfo.title}" - ${requestDetails.requestType}`;
    
    // Generate email body
    const emailBody = generateEmailBody();
    
    // Generate follow-up sequence
    const followUpSequence = generateFollowUpSequence();
    
    const generated = {
      subjectLine,
      emailBody,
      followUpSequence,
      tips: generateTips()
    };
    
    setGeneratedRequest(generated);
    setCurrentStep(4);
  };

  const generateEmailBody = () => {
    const { bookInfo, reviewerInfo, requestDetails } = requestData;
    
    return `Dear ${reviewerInfo.name},

I hope this email finds you well. I'm reaching out because I believe your audience would be interested in my upcoming book, "${bookInfo.title}."

About the Book:
- Title: ${bookInfo.title}
- Author: ${bookInfo.author}
- Genre: ${bookInfo.genre}
- Word Count: ${bookInfo.wordCount.toLocaleString()} words
- Target Audience: ${bookInfo.targetAudience}

I'm looking for ${requestDetails.requestType.toLowerCase()} and would love to work with you. I can provide ${requestDetails.format.toLowerCase()} and offer ${requestDetails.compensation.toLowerCase()}.

Your platform and audience align perfectly with my target readers, and I believe this would be a great opportunity for both of us.

Would you be interested in reviewing "${bookInfo.title}"? I'm happy to provide more details about the book and discuss how we can work together.

Thank you for considering this opportunity!

Best regards,
${bookInfo.author}`;
  };

  const generateFollowUpSequence = () => {
    return [
      'Follow-up 1 (3-5 days later): "Just wanted to follow up on my review request for [Book Title]. I would love to hear your thoughts!"',
      'Follow-up 2 (1 week later): "Hi [Name], I hope you are doing well. I wanted to check in about the review request. Would you like me to send a sample chapter?"',
      'Follow-up 3 (2 weeks later): "Hi [Name], I understand you are busy. If you are not interested, no worries at all. Thanks for considering!"'
    ];
  };

  const generateTips = () => {
    const tips = [
      'Personalize each request - mention specific content from their platform',
      'Keep the initial email concise and professional',
      'Include relevant book details but don\'t overwhelm',
      'Offer multiple formats (digital/physical) when possible',
      'Follow up politely but don\'t be pushy',
      'Track your outreach in a spreadsheet',
      'Build relationships, not just transactions'
    ];
    
    return tips;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // You could add a toast notification here
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
                  value={requestData.bookInfo.title}
                  onChange={(e) => handleBookInfoChange('title', e.target.value)}
                  placeholder="Enter your book title"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Author Name</label>
                <input
                  type="text"
                  value={requestData.bookInfo.author}
                  onChange={(e) => handleBookInfoChange('author', e.target.value)}
                  placeholder="Your name"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Genre</label>
                <select
                  value={requestData.bookInfo.genre}
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
                  value={requestData.bookInfo.wordCount || ''}
                  onChange={(e) => handleBookInfoChange('wordCount', parseInt(e.target.value) || 0)}
                  placeholder="e.g., 80000"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Target Audience</label>
                <select
                  value={requestData.bookInfo.targetAudience}
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
            </div>
          </div>
        );
        
      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-slate-900">Reviewer Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Reviewer Name</label>
                <input
                  type="text"
                  value={requestData.reviewerInfo.name}
                  onChange={(e) => handleReviewerInfoChange('name', e.target.value)}
                  placeholder="Reviewer's name"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Platform</label>
                <select
                  value={requestData.reviewerInfo.platform}
                  onChange={(e) => handleReviewerInfoChange('platform', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Platform</option>
                  {platforms.map(platform => (
                    <option key={platform} value={platform}>{platform}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Audience Size</label>
                <input
                  type="number"
                  value={requestData.reviewerInfo.audienceSize || ''}
                  onChange={(e) => handleReviewerInfoChange('audienceSize', parseInt(e.target.value) || 0)}
                  placeholder="e.g., 5000"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Review Style</label>
                <select
                  value={requestData.reviewerInfo.reviewStyle}
                  onChange={(e) => handleReviewerInfoChange('reviewStyle', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Review Style</option>
                  {reviewStyles.map(style => (
                    <option key={style} value={style}>{style}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Contact Method</label>
                <input
                  type="text"
                  value={requestData.reviewerInfo.contactMethod}
                  onChange={(e) => handleReviewerInfoChange('contactMethod', e.target.value)}
                  placeholder="Email, social media, etc."
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
            <h3 className="text-xl font-semibold text-slate-900">Request Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Request Type</label>
                <select
                  value={requestData.requestDetails.requestType}
                  onChange={(e) => handleRequestDetailsChange('requestType', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Request Type</option>
                  {requestTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Timeline</label>
                <select
                  value={requestData.requestDetails.timeline}
                  onChange={(e) => handleRequestDetailsChange('timeline', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Timeline</option>
                  {timelines.map(timeline => (
                    <option key={timeline} value={timeline}>{timeline}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Format</label>
                <select
                  value={requestData.requestDetails.format}
                  onChange={(e) => handleRequestDetailsChange('format', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Format</option>
                  {formats.map(format => (
                    <option key={format} value={format}>{format}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Compensation</label>
                <select
                  value={requestData.requestDetails.compensation}
                  onChange={(e) => handleRequestDetailsChange('compensation', e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Compensation</option>
                  {compensationTypes.map(comp => (
                    <option key={comp} value={comp}>{comp}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        );
        
      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-slate-900">Generated Review Request</h3>
            {generatedRequest && (
              <div className="space-y-6">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h4 className="font-semibold text-slate-900 mb-4">Email Subject Line</h4>
                  <div className="flex items-center justify-between">
                    <p className="text-slate-700">{generatedRequest.subjectLine}</p>
                    <button
                      onClick={() => copyToClipboard(generatedRequest.subjectLine)}
                      className="p-2 text-blue-600 hover:text-blue-700"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                
                <div className="bg-green-50 rounded-lg p-6">
                  <h4 className="font-semibold text-slate-900 mb-4">Email Body</h4>
                  <div className="space-y-4">
                    <div className="bg-white rounded p-4 border">
                      <pre className="whitespace-pre-wrap text-sm text-slate-700">{generatedRequest.emailBody}</pre>
                    </div>
                    <button
                      onClick={() => copyToClipboard(generatedRequest.emailBody)}
                      className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                    >
                      <Copy className="w-4 h-4" />
                      <span>Copy Email Body</span>
                    </button>
                  </div>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-6">
                  <h4 className="font-semibold text-slate-900 mb-4">Follow-up Sequence</h4>
                  <div className="space-y-3">
                    {generatedRequest.followUpSequence.map((followUp: string, index: number) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-purple-600 rounded-full mt-2"></div>
                        <span className="text-slate-700">{followUp}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-yellow-50 rounded-lg p-6">
                  <h4 className="font-semibold text-slate-900 mb-4">Review Request Tips</h4>
                  <div className="space-y-3">
                    {generatedRequest.tips.map((tip: string, index: number) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-4 h-4 text-yellow-600 mt-0.5" />
                        <span className="text-slate-700">{tip}</span>
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
            onClick={generateReviewRequest}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Generate Request
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