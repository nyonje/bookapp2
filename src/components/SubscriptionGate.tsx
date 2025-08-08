import React, { useState } from 'react';
import { Lock, Crown, Zap, CheckCircle, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface SubscriptionGateProps {
  feature: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function SubscriptionGate({ feature, children, fallback }: SubscriptionGateProps) {
  const { hasAccess, subscription, isAdmin } = useAuth();
  const [showUpgrade, setShowUpgrade] = useState(false);

  if (hasAccess(feature)) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  const getRequiredTier = (feature: string) => {
    if (feature === 'community' || feature.startsWith('chapter_') && feature !== 'chapter_1') {
      return 'pro';
    }
    if (['tools', 'build_app', 'search', 'analytics', 'marketing_vault'].includes(feature)) {
      return 'premium';
    }
    return 'pro';
  };

  const requiredTier = getRequiredTier(feature);
  const currentTier = subscription?.tier_id || 'free';

  const tiers = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      features: ['Chapter 1 Access', 'Basic Progress Tracking'],
      color: 'bg-slate-100 text-slate-700',
      icon: Lock
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 29,
      features: ['All Chapters', 'Community Access', 'Quizzes', 'Progress Tracking'],
      color: 'bg-blue-100 text-blue-700',
      icon: CheckCircle
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 99,
      features: ['Everything in Pro', 'Interactive Tools', 'Build App Feature', 'Smart Search', 'Analytics Dashboard', 'Marketing Vault'],
      color: 'bg-purple-100 text-purple-700',
      icon: Crown
    }
  ];

  const requiredTierInfo = tiers.find(t => t.id === requiredTier);
  const RequiredIcon = requiredTierInfo?.icon || Lock;

  return (
    <>
      <div className="min-h-[400px] flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 rounded-xl border border-slate-200">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-xl shadow-lg p-8 text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <RequiredIcon className="w-8 h-8 text-white" />
            </div>
            
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              {requiredTier === 'pro' ? 'Pro' : 'Premium'} Feature
            </h3>
            
            <p className="text-slate-600 mb-6">
              This feature requires a {requiredTier === 'pro' ? 'Pro' : 'Premium'} subscription. 
              Upgrade to unlock this and many other powerful features.
            </p>
            
            <div className="space-y-3 mb-6">
              <button
                onClick={() => setShowUpgrade(true)}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Zap className="w-5 h-5" />
                <span>Upgrade Now</span>
              </button>
              
              <p className="text-sm text-slate-500">
                Current plan: <span className="font-medium capitalize">{currentTier}</span>
              </p>
            </div>

            <div className="text-left">
              <h4 className="font-semibold text-slate-900 mb-2">What you'll get:</h4>
              <ul className="text-sm text-slate-600 space-y-1">
                {requiredTierInfo?.features.map((feature, index) => (
                  <li key={index} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Upgrade Modal */}
      {showUpgrade && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Choose Your Plan</h2>
                <button
                  onClick={() => setShowUpgrade(false)}
                  className="text-slate-400 hover:text-slate-600"
                >
                  ×
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tiers.map((tier) => {
                  const TierIcon = tier.icon;
                  const isCurrentTier = currentTier === tier.id;
                  const isUpgrade = tier.id === requiredTier;
                  
                  return (
                    <div
                      key={tier.id}
                      className={`relative rounded-xl border-2 p-6 ${
                        isUpgrade 
                          ? 'border-blue-500 bg-blue-50' 
                          : isCurrentTier
                            ? 'border-green-500 bg-green-50'
                            : 'border-slate-200 bg-white'
                      }`}
                    >
                      {isUpgrade && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                            Recommended
                          </span>
                        </div>
                      )}
                      
                      {isCurrentTier && (
                        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                          <span className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                            Current Plan
                          </span>
                        </div>
                      )}

                      <div className="text-center mb-6">
                        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 ${tier.color}`}>
                          <TierIcon className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900">{tier.name}</h3>
                        <div className="text-3xl font-bold text-slate-900 mt-2">
                          ${tier.price}
                          {tier.price > 0 && <span className="text-sm font-normal text-slate-600">/month</span>}
                        </div>
                      </div>

                      <ul className="space-y-3 mb-6">
                        {tier.features.map((feature, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-slate-700">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <button
                        disabled={isCurrentTier}
                        className={`w-full px-4 py-3 rounded-lg font-semibold transition-colors ${
                          isCurrentTier
                            ? 'bg-slate-100 text-slate-500 cursor-not-allowed'
                            : isUpgrade
                              ? 'bg-blue-600 text-white hover:bg-blue-700'
                              : 'bg-slate-600 text-white hover:bg-slate-700'
                        }`}
                      >
                        {isCurrentTier ? 'Current Plan' : tier.price === 0 ? 'Current Plan' : 'Upgrade'}
                      </button>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8 p-4 bg-slate-50 rounded-lg">
                <p className="text-sm text-slate-600 text-center">
                  Note: This is a demo application. In a real implementation, this would integrate with Stripe or another payment processor.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}