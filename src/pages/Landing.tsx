import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Users, 
  TrendingUp, 
  Zap, 
  CheckCircle, 
  ArrowRight, 
  Star,
  Play,
  Award,
  Target,
  Clock,
  Wrench
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { AuthModal } from '../components/AuthModal';

export function Landing() {
  const { user } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');

  const features = [
    {
      icon: BookOpen,
      title: "Interactive Learning",
      description: "Transform passive reading into active engagement with quizzes, tools, and progress tracking."
    },
    {
      icon: Wrench,
      title: "Practical Tools",
      description: "Access worksheets, calculators, and templates to immediately apply what you learn."
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Connect with fellow authors, share progress, and get feedback on your app ideas."
    },
    {
      icon: TrendingUp,
      title: "Proven Framework",
      description: "Follow our systematic 7-week process used by hundreds of successful authors."
    }
  ];

  const benefits = [
    "90% of readers never finish non-fiction books - companion apps increase completion by 300%",
    "Build direct relationships with your readers instead of relying on platforms",
    "Create new revenue streams with premium features and coaching",
    "Use AI-powered no-code tools - no technical experience required",
    "Launch your first app in as little as 1-3 days"
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Productivity Author",
      content: "My companion app has 250+ active users and generates $3,200/month in recurring revenue. This course changed everything!",
      avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=100&h=100&fit=crop&crop=face&auto=compress"
    },
    {
      name: "Mike Rodriguez",
      role: "Finance Writer",
      content: "I went from idea to live app in 2 weeks. The step-by-step process made it so much easier than I expected.",
      avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?w=100&h=100&fit=crop&crop=face&auto=compress"
    },
    {
      name: "Jennifer Park",
      role: "Leadership Coach",
      content: "The community support and practical tools are incredible. I'm already planning my second app!",
      avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?w=100&h=100&fit=crop&crop=face&auto=compress"
    }
  ];

  const stats = [
    { number: "500+", label: "Authors Trained" },
    { number: "150+", label: "Apps Launched" },
    { number: "98%", label: "Success Rate" },
    { number: "$2.1M+", label: "Revenue Generated" }
  ];

  const handleGetStarted = () => {
    if (user) {
      // User is already authenticated, redirect to dashboard
      window.location.href = '/dashboard';
    } else {
      // Show sign up modal
      setAuthMode('signup');
      setShowAuthModal(true);
    }
  };

  return (
    <>
      <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-slate-50 to-blue-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              <span>Transform Your Book Into a Thriving App Business</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
              Build Your Book's
              <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent"> Companion App</span>
            </h1>
            
            <p className="text-xl text-slate-600 mb-8 leading-relaxed max-w-3xl mx-auto">
              Stop losing 90% of your readers to the attention economy. Learn how to create engaging companion apps 
              that transform passive reading into active learning and build direct relationships with your audience.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-12">
              <button
                onClick={handleGetStarted}
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white font-semibold text-lg rounded-xl hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Play className="w-5 h-5 mr-2" />
                {user ? 'Go to Dashboard' : 'Start Learning Now'}
              </button>
              
              <Link
                to="/tools"
                className="inline-flex items-center px-8 py-4 bg-white text-slate-700 font-semibold text-lg rounded-xl border border-slate-300 hover:bg-slate-50 transition-all duration-200"
              >
                <Wrench className="w-5 h-5 mr-2" />
                Explore Tools
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">{stat.number}</div>
                  <div className="text-sm text-slate-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                The Reading Crisis Every Author Must Know
              </h2>
              <p className="text-xl text-slate-600 leading-relaxed">
                Despite your best efforts in crafting compelling content, most readers aren't getting 
                the full value from your work. Here's why:
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
              <div className="text-center p-8 bg-red-50 rounded-2xl border border-red-200">
                <div className="text-5xl font-bold text-red-600 mb-4">90%</div>
                <h3 className="text-xl font-semibold text-red-900 mb-3">Books Never Finished</h3>
                <p className="text-red-700">
                  The vast majority of non-fiction books are abandoned before completion.
                </p>
              </div>

              <div className="text-center p-8 bg-orange-50 rounded-2xl border border-orange-200">
                <div className="text-5xl font-bold text-orange-600 mb-4">50%</div>
                <h3 className="text-xl font-semibold text-orange-900 mb-3">Content Forgotten</h3>
                <p className="text-orange-700">
                  Readers forget half of what they read within 24 hours without engagement.
                </p>
              </div>

              <div className="text-center p-8 bg-yellow-50 rounded-2xl border border-yellow-200">
                <div className="text-5xl font-bold text-yellow-600 mb-4">0%</div>
                <h3 className="text-xl font-semibold text-yellow-900 mb-3">Direct Connection</h3>
                <p className="text-yellow-700">
                  Traditional books provide no way to build ongoing relationships with readers.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white text-center">
              <h3 className="text-2xl font-bold mb-4">The Solution: Companion Apps</h3>
              <p className="text-green-100 text-lg mb-6">
                Transform passive reading into active learning and increase completion rates by up to 300%
              </p>
              <div className="text-4xl font-bold">300%</div>
              <div className="text-green-100">Increase in Completion Rates</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Everything You Need to Succeed
              </h2>
              <p className="text-xl text-slate-600">
                Our comprehensive platform provides all the tools, knowledge, and support you need.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 bg-blue-100 rounded-xl">
                      <feature.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-slate-900 mb-3">{feature.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Why Authors Choose Companion Apps
              </h2>
              <p className="text-xl text-slate-600">
                Join hundreds of successful authors who've transformed their books into thriving app businesses.
              </p>
            </div>

            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4 p-6 bg-green-50 rounded-xl border border-green-200">
                  <div className="p-1 bg-green-100 rounded-full mt-1">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-slate-700 text-lg leading-relaxed">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Success Stories from Our Community
              </h2>
              <p className="text-xl text-slate-600">
                Real authors, real results, real revenue.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white rounded-xl p-8 shadow-sm border border-slate-200">
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-slate-700 mb-6 leading-relaxed">"{testimonial.content}"</p>
                  
                  <div className="flex items-center space-x-3">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold text-slate-900">{testimonial.name}</div>
                      <div className="text-sm text-slate-600">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your Book Into an App?
            </h2>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              Join our proven 5-chapter course and learn the exact system used by hundreds of successful authors 
              to build companion apps that engage readers and generate recurring revenue.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-12">
              <button
                onClick={handleGetStarted}
                className="inline-flex items-center px-8 py-4 bg-white text-blue-700 font-semibold text-lg rounded-xl hover:bg-blue-50 transition-all duration-200 shadow-lg"
              >
                <Award className="w-5 h-5 mr-2" />
                {user ? 'Continue Journey' : 'Start Your Journey'}
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
              
              <Link
                to="/community"
                className="inline-flex items-center px-8 py-4 bg-blue-500 text-white font-semibold text-lg rounded-xl hover:bg-blue-400 transition-all duration-200"
              >
                <Users className="w-5 h-5 mr-2" />
                Join Community
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <Target className="w-8 h-8 text-blue-200 mx-auto mb-3" />
                <div className="font-semibold mb-1">5 Comprehensive Chapters</div>
                <div className="text-blue-200 text-sm">Complete learning path</div>
              </div>
              
              <div className="text-center">
                <Clock className="w-8 h-8 text-blue-200 mx-auto mb-3" />
                <div className="font-semibold mb-1">7-Week Timeline</div>
                <div className="text-blue-200 text-sm">From idea to launch</div>
              </div>
              
              <div className="text-center">
                <Users className="w-8 h-8 text-blue-200 mx-auto mb-3" />
                <div className="font-semibold mb-1">Community Support</div>
                <div className="text-blue-200 text-sm">500+ active members</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      </div>
      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        defaultMode={authMode}
      />
    </>
  );
}