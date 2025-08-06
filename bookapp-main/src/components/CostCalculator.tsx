import React, { useState } from 'react';
import { DollarSign, TrendingUp, Clock } from 'lucide-react';

export function CostCalculator() {
  const [stack, setStack] = useState<'rapid' | 'professional' | 'custom'>('rapid');
  const [features, setFeatures] = useState({
    basicContent: true,
    quizzes: true,
    progressTracking: true,
    community: false,
    audioContent: false,
    customBranding: false,
    analytics: false,
    paymentIntegration: false,
  });

  const stackCosts = {
    rapid: {
      monthly: 56,
      oneTime: 800,
      timeline: '1-3 days',
      description: 'Perfect for testing concepts quickly'
    },
    professional: {
      monthly: 104,
      oneTime: 2000,
      timeline: '1-2 weeks',
      description: 'Best balance of quality and speed'
    },
    custom: {
      monthly: 162,
      oneTime: 6000,
      timeline: '2-4 weeks',
      description: 'Maximum control and customization'
    }
  };

  const featureCosts = {
    audioContent: 200,
    customBranding: 300,
    analytics: 150,
    paymentIntegration: 400,
    community: 250,
  };

  const calculateTotal = () => {
    const baseCost = stackCosts[stack];
    let additionalCosts = 0;
    
    Object.entries(features).forEach(([feature, enabled]) => {
      if (enabled && featureCosts[feature as keyof typeof featureCosts]) {
        additionalCosts += featureCosts[feature as keyof typeof featureCosts];
      }
    });

    return {
      monthly: baseCost.monthly,
      oneTime: baseCost.oneTime + additionalCosts,
      firstYear: (baseCost.monthly * 12) + baseCost.oneTime + additionalCosts
    };
  };

  const totals = calculateTotal();

  return (
    <div className="space-y-6">
      {/* Stack Selection */}
      <div>
        <h4 className="font-semibold text-slate-900 mb-3">Choose Your Development Stack</h4>
        <div className="space-y-3">
          {Object.entries(stackCosts).map(([key, value]) => (
            <label key={key} className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-slate-50">
              <input
                type="radio"
                name="stack"
                value={key}
                checked={stack === key}
                onChange={(e) => setStack(e.target.value as any)}
                className="text-blue-600"
              />
              <div className="flex-1">
                <div className="font-medium text-slate-900 capitalize">{key} Deployment</div>
                <div className="text-sm text-slate-600">{value.description}</div>
                <div className="text-sm text-blue-600">Timeline: {value.timeline}</div>
              </div>
              <div className="text-right">
                <div className="font-medium text-slate-900">${value.monthly}/mo</div>
                <div className="text-sm text-slate-600">${value.oneTime} setup</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Feature Selection */}
      <div>
        <h4 className="font-semibold text-slate-900 mb-3">Additional Features</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {Object.entries(features).map(([feature, enabled]) => {
            const cost = featureCosts[feature as keyof typeof featureCosts];
            const isIncluded = ['basicContent', 'quizzes', 'progressTracking'].includes(feature);
            
            return (
              <label key={feature} className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-slate-50 ${isIncluded ? 'bg-green-50 border-green-200' : ''}`}>
                <div className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={enabled}
                    onChange={(e) => setFeatures(prev => ({...prev, [feature]: e.target.checked}))}
                    disabled={isIncluded}
                    className="text-blue-600"
                  />
                  <span className="text-sm font-medium text-slate-900 capitalize">
                    {feature.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </div>
                <span className="text-sm text-slate-600">
                  {isIncluded ? 'Included' : cost ? `+$${cost}` : 'Free'}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Cost Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="font-semibold text-blue-900 mb-4 flex items-center space-x-2">
          <DollarSign className="w-5 h-5" />
          <span>Cost Summary</span>
        </h4>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-900">${totals.monthly}</div>
            <div className="text-sm text-blue-700">Monthly Cost</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-900">${totals.oneTime.toLocaleString()}</div>
            <div className="text-sm text-blue-700">Initial Investment</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-900">${totals.firstYear.toLocaleString()}</div>
            <div className="text-sm text-blue-700">First Year Total</div>
          </div>
        </div>

        <div className="mt-4 p-4 bg-white rounded-lg border border-blue-200">
          <div className="flex items-center space-x-2 text-green-600 mb-2">
            <TrendingUp className="w-4 h-4" />
            <span className="font-medium">Break-even Analysis</span>
          </div>
          <p className="text-sm text-slate-600">
            With {stack === 'rapid' ? '3-6' : stack === 'professional' ? '8-15' : '25-40'} premium 
            subscribers at $29/month, you'll break even in {' '}
            {stack === 'rapid' ? '2-3' : stack === 'professional' ? '3-4' : '4-6'} months.
          </p>
        </div>

        <div className="mt-4 flex items-center space-x-2 text-blue-700">
          <Clock className="w-4 h-4" />
          <span className="text-sm">Development Timeline: {stackCosts[stack].timeline}</span>
        </div>
      </div>
    </div>
  );
}