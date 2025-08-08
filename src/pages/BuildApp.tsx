import React, { useState } from 'react';
import { Upload, FileText, Code, Download, Sparkles, BookOpen, Users, Target, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { SubscriptionGate } from '../components/SubscriptionGate';

interface BookDetails {
  title: string;
  author: string;
  genre: string;
  targetAudience: string;
  bookIntention: string;
  keyTakeaways: string;
  mainChallenges: string;
  desiredOutcomes: string;
  existingPlatform: string;
  budget: string;
  timeline: string;
}

export function BuildApp() {
  const { hasAccess } = useAuth();
  const [step, setStep] = useState(1);
  const [bookDetails, setBookDetails] = useState<BookDetails>({
    title: '',
    author: '',
    genre: '',
    targetAudience: '',
    bookIntention: '',
    keyTakeaways: '',
    mainChallenges: '',
    desiredOutcomes: '',
    existingPlatform: '',
    budget: '',
    timeline: ''
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<any>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (!hasAccess('build_app')) {
    return (
      <div className="container mx-auto px-4 py-8">
        <SubscriptionGate feature="build_app">
          {/* This will show the upgrade prompt */}
        </SubscriptionGate>
      </div>
    );
  }

  const handleInputChange = (field: keyof BookDetails, value: string) => {
    setBookDetails(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const resetForm = () => {
    setStep(1);
    setBookDetails({
      title: '',
      author: '',
      genre: '',
      targetAudience: '',
      bookIntention: '',
      keyTakeaways: '',
      mainChallenges: '',
      desiredOutcomes: '',
      existingPlatform: '',
      budget: '',
      timeline: ''
    });
    setGeneratedContent(null);
    setUploadedFile(null);
    setError(null);
    setIsGenerating(false);
  };

  const generateAppPlan = async () => {
    try {
      setIsGenerating(true);
      setError(null);
      
      // Simulate API call for generation (reduced from 3 seconds to 1.5 seconds)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const generated = {
      prd: `# Product Requirements Document: ${bookDetails.title} Companion App

## 1. Executive Summary
This companion app transforms "${bookDetails.title}" by ${bookDetails.author} into an interactive learning experience that addresses the ${bookDetails.mainChallenges} faced by ${bookDetails.targetAudience}.

## 2. Product Vision
Create a companion app that bridges the gap between passive reading and active implementation, ensuring readers can effectively apply the book's insights in their daily lives.

## 3. Target Audience
- Primary: ${bookDetails.targetAudience}
- Secondary: Readers seeking practical implementation of ${bookDetails.genre} concepts

## 4. Core Value Proposition
Transform one-time readers into engaged learners who consistently apply the book's principles through interactive tools, progress tracking, and community support.

## 5. Key Features

### 5.1 Interactive Learning Modules
- Chapter-by-chapter interactive summaries
- Implementation checklists for each concept
- Progress tracking and achievement system
- Audio summaries for on-the-go learning

### 5.2 Community & Accountability
- Reader community forums
- Accountability partnerships
- Progress sharing and celebration
- Expert Q&A sessions

### 5.3 Implementation Tools
- Custom worksheets and templates
- Goal setting and tracking
- Habit formation support
- Real-world application examples

### 5.4 Gamification Elements
- Achievement badges and milestones
- Streak tracking for consistent engagement
- Leaderboards and friendly competition
- Reward system for completed actions

## 6. Technical Requirements
- Cross-platform compatibility (iOS, Android, Web)
- Offline functionality for core features
- Push notifications for engagement
- Data synchronization across devices
- Integration with calendar and reminder systems

## 7. Success Metrics
- User engagement rate (target: 70% weekly active users)
- Implementation completion rate (target: 60% of readers complete action items)
- Community participation (target: 40% of users engage in community features)
- Reader retention (target: 80% continue using app after 30 days)

## 8. Development Timeline
- Phase 1 (Weeks 1-4): Core app structure and basic features
- Phase 2 (Weeks 5-8): Interactive tools and community features
- Phase 3 (Weeks 9-12): Advanced features and optimization
- Phase 4 (Weeks 13-16): Testing, refinement, and launch preparation

## 9. Budget Considerations
- Development costs: $${bookDetails.budget}
- Ongoing maintenance: 15-20% of development cost annually
- Marketing and user acquisition: 30% of development cost

## 10. Risk Assessment
- User adoption challenges
- Technical complexity of interactive features
- Content creation and maintenance requirements
- Competition from similar apps in the market`,
      
      prompt: `Create a comprehensive companion app for the book "${bookDetails.title}" by ${bookDetails.author}. 

BOOK DETAILS:
- Genre: ${bookDetails.genre}
- Target Audience: ${bookDetails.targetAudience}
- Book Intention: ${bookDetails.bookIntention}
- Key Takeaways: ${bookDetails.keyTakeaways}
- Main Challenges Addressed: ${bookDetails.mainChallenges}
- Desired Outcomes: ${bookDetails.desiredOutcomes}

REQUIREMENTS:

1. APP STRUCTURE:
- Landing page with book overview and value proposition
- Chapter-by-chapter interactive learning modules
- Progress tracking dashboard
- Community features for reader engagement
- Implementation tools and worksheets
- Audio summaries for each chapter
- Achievement and gamification system

2. CORE FEATURES:
- Interactive quizzes for each chapter (10 questions minimum)
- Implementation checklists and action items
- Progress tracking with visual indicators
- Community forums and discussion boards
- Audio summaries with playback controls
- Custom worksheets and templates
- Goal setting and habit tracking
- Push notifications for engagement

3. USER EXPERIENCE:
- Clean, modern interface with intuitive navigation
- Mobile-first responsive design
- Offline functionality for core features
- Seamless cross-device synchronization
- Accessibility features for diverse users
- Fast loading times and smooth interactions

4. CONTENT STRATEGY:
- Transform each chapter into interactive learning modules
- Create practical implementation tools for each concept
- Develop community engagement prompts
- Design achievement systems that encourage progress
- Include real-world application examples

5. TECHNICAL SPECIFICATIONS:
- Cross-platform compatibility (iOS, Android, Web)
- User authentication and profile management
- Data storage and synchronization
- Push notification system
- Analytics and user behavior tracking
- Integration capabilities with external tools

6. MONETIZATION (if applicable):
- Freemium model with premium features
- One-time purchase option
- Subscription model for ongoing content
- Community membership tiers

7. SUCCESS METRICS:
- User engagement and retention rates
- Implementation completion rates
- Community participation levels
- User satisfaction and feedback scores

The app should transform passive reading into active learning, ensuring readers can effectively implement the book's insights in their daily lives. Focus on creating an engaging, practical, and community-driven experience that maximizes the book's impact.

Please provide detailed specifications for each feature, including user flows, interface designs, and technical implementation details.`,
      
      appStructure: `## App Architecture Overview

### 1. Navigation Structure
- Home/Dashboard
- Chapters (Interactive Learning)
- Tools & Worksheets
- Community
- Progress & Achievements
- Profile & Settings

### 2. Core Modules

#### Chapter Learning Module
- Interactive chapter summaries
- Audio playback with transcript
- Progress tracking per chapter
- Implementation checklists
- Related tools and worksheets

#### Community Module
- Discussion forums by chapter
- Reader success stories
- Expert Q&A sessions
- Accountability partnerships
- Progress sharing features

#### Tools & Worksheets Module
- Customizable templates
- Interactive calculators
- Goal setting tools
- Habit tracking systems
- Implementation guides

#### Progress & Achievements Module
- Visual progress indicators
- Achievement badges
- Streak tracking
- Milestone celebrations
- Performance analytics

### 3. Technical Stack Recommendations
- Frontend: React Native or Flutter for cross-platform
- Backend: Node.js with Express or Firebase
- Database: MongoDB or PostgreSQL
- Authentication: Auth0 or Firebase Auth
- File Storage: AWS S3 or Firebase Storage
- Push Notifications: Firebase Cloud Messaging
- Analytics: Mixpanel or Amplitude

### 4. Development Phases
- Phase 1: Core app structure and basic features
- Phase 2: Interactive tools and community features
- Phase 3: Advanced features and optimization
- Phase 4: Testing, refinement, and launch`,
      
      features: [
        'Interactive Chapter Summaries',
        'Audio Summaries with Playback Controls',
        'Progress Tracking Dashboard',
        'Community Forums and Discussions',
        'Implementation Checklists',
        'Custom Worksheets and Templates',
        'Achievement and Gamification System',
        'Push Notifications for Engagement',
        'Offline Functionality',
        'Cross-Device Synchronization',
        'Goal Setting and Habit Tracking',
        'Reader Success Stories',
        'Expert Q&A Sessions',
        'Accountability Partnerships',
        'Performance Analytics'
      ]
    };
    
      setGeneratedContent(generated);
      setIsGenerating(false);
      setStep(3);
    } catch (err) {
      setError('Failed to generate app plan. Please try again.');
      setIsGenerating(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Sparkles className="w-8 h-8 text-purple-600" />
            <h1 className="text-4xl font-bold text-slate-900">Build Your App Step by Step</h1>
            <Sparkles className="w-8 h-8 text-purple-600" />
          </div>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Transform your book into a powerful companion app. Upload your book details and get a comprehensive 
            PRD and ready-to-use prompts for no-code book builders.
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 ${step >= 1 ? 'text-blue-600' : 'text-slate-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-slate-200'}`}>
                1
              </div>
              <span className="font-medium">Book Details</span>
            </div>
            <div className="w-12 h-0.5 bg-slate-300"></div>
            <div className={`flex items-center space-x-2 ${step >= 2 ? 'text-blue-600' : 'text-slate-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-slate-200'}`}>
                2
              </div>
              <span className="font-medium">Generate</span>
            </div>
            <div className="w-12 h-0.5 bg-slate-300"></div>
            <div className={`flex items-center space-x-2 ${step >= 3 ? 'text-blue-600' : 'text-slate-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-slate-200'}`}>
                3
              </div>
              <span className="font-medium">Download</span>
            </div>
          </div>
        </div>

        {/* Step 1: Book Details Form */}
        {step === 1 && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Tell Us About Your Book</h2>
              <p className="text-slate-600">Provide detailed information about your book to generate the best possible companion app plan.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Book Title *</label>
                <input
                  type="text"
                  value={bookDetails.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your book title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Author *</label>
                <input
                  type="text"
                  value={bookDetails.author}
                  onChange={(e) => handleInputChange('author', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter author name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Genre/Category *</label>
                <input
                  type="text"
                  value={bookDetails.genre}
                  onChange={(e) => handleInputChange('genre', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Business, Self-Help, Education"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Target Audience *</label>
                <input
                  type="text"
                  value={bookDetails.targetAudience}
                  onChange={(e) => handleInputChange('targetAudience', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Entrepreneurs, Students, Professionals"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">Book Intention/Purpose *</label>
                <textarea
                  value={bookDetails.bookIntention}
                  onChange={(e) => handleInputChange('bookIntention', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="What is the main purpose of your book? What do you want readers to achieve?"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">Key Takeaways *</label>
                <textarea
                  value={bookDetails.keyTakeaways}
                  onChange={(e) => handleInputChange('keyTakeaways', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="What are the main lessons or insights readers should gain from your book?"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">Main Challenges Addressed *</label>
                <textarea
                  value={bookDetails.mainChallenges}
                  onChange={(e) => handleInputChange('mainChallenges', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="What problems or challenges does your book help readers solve?"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">Desired Outcomes *</label>
                <textarea
                  value={bookDetails.desiredOutcomes}
                  onChange={(e) => handleInputChange('desiredOutcomes', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="What specific outcomes do you want readers to achieve after reading your book?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Budget Range</label>
                <select
                  value={bookDetails.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select budget range</option>
                  <option value="5,000-10,000">$5,000 - $10,000</option>
                  <option value="10,000-25,000">$10,000 - $25,000</option>
                  <option value="25,000-50,000">$25,000 - $50,000</option>
                  <option value="50,000+">$50,000+</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Timeline</label>
                <select
                  value={bookDetails.timeline}
                  onChange={(e) => handleInputChange('timeline', e.target.value)}
                  className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select timeline</option>
                  <option value="1-3 months">1-3 months</option>
                  <option value="3-6 months">3-6 months</option>
                  <option value="6-12 months">6-12 months</option>
                  <option value="12+ months">12+ months</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">Upload Book File (Optional)</label>
                <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    accept=".pdf,.doc,.docx,.txt"
                    className="hidden"
                    id="book-upload"
                  />
                  <label htmlFor="book-upload" className="cursor-pointer">
                    <span className="text-blue-600 hover:text-blue-700 font-medium">Click to upload</span>
                    <span className="text-slate-500"> or drag and drop</span>
                  </label>
                  <p className="text-sm text-slate-500 mt-1">PDF, DOC, DOCX, or TXT files accepted</p>
                  {uploadedFile && (
                    <p className="text-sm text-green-600 mt-2">✓ {uploadedFile.name} uploaded</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button
                onClick={() => setStep(2)}
                disabled={!bookDetails.title || !bookDetails.author || !bookDetails.genre || !bookDetails.targetAudience || !bookDetails.bookIntention}
                className="px-8 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Continue to Generate
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Generation */}
        {step === 2 && (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Generating Your App Plan</h2>
              <p className="text-slate-600">Creating a comprehensive PRD and prompt for your book companion app...</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-700">{error}</p>
                <button
                  onClick={() => setError(null)}
                  className="mt-2 text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Try Again
                </button>
              </div>
            )}

            {isGenerating ? (
              <div className="text-center">
                <div className="inline-flex items-center space-x-3 px-6 py-4 bg-blue-50 rounded-lg">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  <span className="text-blue-700 font-medium">Generating your app plan...</span>
                </div>
                <p className="text-sm text-slate-500 mt-4">This should take about 1-2 minutes</p>
              </div>
            ) : (
              <div className="text-center">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">Ready to Generate</h3>
                  <p className="text-slate-600">Click the button below to generate your comprehensive app plan</p>
                </div>
                <button
                  onClick={generateAppPlan}
                  className="px-8 py-4 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200"
                >
                  Generate App Plan
                </button>
              </div>
            )}
          </div>
        )}

        {/* Step 3: Results */}
        {step === 3 && generatedContent && (
          <div className="space-y-8">
            {/* PRD Section */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-green-50 to-blue-50">
                <div className="flex items-center space-x-3">
                  <FileText className="w-6 h-6 text-green-600" />
                  <h3 className="text-xl font-semibold text-slate-900">Product Requirements Document (PRD)</h3>
                </div>
                <p className="text-slate-600 mt-2">Comprehensive technical specification for your companion app</p>
              </div>
              <div className="p-6">
                <div className="bg-slate-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                  <pre className="text-sm text-slate-800 whitespace-pre-wrap font-mono">{generatedContent.prd}</pre>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => {
                      const element = document.createElement('a');
                      const file = new Blob([generatedContent.prd], { type: 'text/markdown' });
                      element.href = URL.createObjectURL(file);
                      element.download = `${bookDetails.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_prd.md`;
                      document.body.appendChild(element);
                      element.click();
                      document.body.removeChild(element);
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PRD</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Prompt Section */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-purple-50 to-pink-50">
                <div className="flex items-center space-x-3">
                  <Code className="w-6 h-6 text-purple-600" />
                  <h3 className="text-xl font-semibold text-slate-900">No-Code Builder Prompt</h3>
                </div>
                <p className="text-slate-600 mt-2">Ready-to-use prompt for no-code book builder platforms</p>
              </div>
              <div className="p-6">
                <div className="bg-slate-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                  <pre className="text-sm text-slate-800 whitespace-pre-wrap font-mono">{generatedContent.prompt}</pre>
                </div>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => {
                      const element = document.createElement('a');
                      const file = new Blob([generatedContent.prompt], { type: 'text/plain' });
                      element.href = URL.createObjectURL(file);
                      element.download = `${bookDetails.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_prompt.txt`;
                      document.body.appendChild(element);
                      element.click();
                      document.body.removeChild(element);
                    }}
                    className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Prompt</span>
                  </button>
                </div>
              </div>
            </div>

            {/* App Structure */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="flex items-center space-x-3">
                  <Zap className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-semibold text-slate-900">App Structure Overview</h3>
                </div>
                <p className="text-slate-600 mt-2">Technical architecture and development roadmap</p>
              </div>
              <div className="p-6">
                <div className="bg-slate-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                  <pre className="text-sm text-slate-800 whitespace-pre-wrap font-mono">{generatedContent.appStructure}</pre>
                </div>
              </div>
            </div>

            {/* Features List */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="p-6 border-b border-slate-200 bg-gradient-to-r from-orange-50 to-yellow-50">
                <div className="flex items-center space-x-3">
                  <Target className="w-6 h-6 text-orange-600" />
                  <h3 className="text-xl font-semibold text-slate-900">Recommended Features</h3>
                </div>
                <p className="text-slate-600 mt-2">Key features to include in your companion app</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {generatedContent.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

                         {/* Next Steps */}
             <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white">
               <h3 className="text-2xl font-bold mb-4">What's Next?</h3>
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div className="text-center">
                   <BookOpen className="w-8 h-8 mx-auto mb-3" />
                   <h4 className="font-semibold mb-2">Review Your PRD</h4>
                   <p className="text-blue-100 text-sm">Carefully review the technical specifications and adjust as needed</p>
                 </div>
                 <div className="text-center">
                   <Code className="w-8 h-8 mx-auto mb-3" />
                   <h4 className="font-semibold mb-2">Use the Prompt</h4>
                   <p className="text-blue-100 text-sm">Copy the prompt into your preferred no-code book builder platform</p>
                 </div>
                 <div className="text-center">
                   <Users className="w-8 h-8 mx-auto mb-3" />
                   <h4 className="font-semibold mb-2">Start Building</h4>
                   <p className="text-blue-100 text-sm">Begin developing your companion app with the provided roadmap</p>
                 </div>
               </div>
               <div className="text-center mt-6">
                 <button
                   onClick={resetForm}
                   className="px-6 py-3 bg-white text-blue-700 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-200"
                 >
                   Generate Another App Plan
                 </button>
               </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
} 