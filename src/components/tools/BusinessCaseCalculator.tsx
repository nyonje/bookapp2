import React, { useState } from 'react';
import { DollarSign, TrendingUp, Users, Calculator } from 'lucide-react';

interface Inputs {
  currentBookPrice: number;
  monthlyBookSales: number;
  currentAudienceSize: number;
  expectedCompletionIncrease: number; // percentage
  appSubscriptionPrice: number;
  expectedConversionRate: number; // percentage
  developmentCost: number;
  monthlyOperatingCost: number;
}

export function BusinessCaseCalculator() {
  const [inputs, setInputs] = useState<Inputs>({
    currentBookPrice: 20,
    monthlyBookSales: 50,
    currentAudienceSize: 5000,
    expectedCompletionIncrease: 200,
    appSubscriptionPrice: 9.99,
    expectedConversionRate: 5,
    developmentCost: 5000,
    monthlyOperatingCost: 200
  });

  const [timeframe, setTimeframe] = useState(12); // months

  const handleInputChange = (field: keyof Inputs, value: number) => {
    setInputs(prev => ({ ...prev, [field]: value }));
  };

  const calculateProjections = () => {
    const { 
      currentBookPrice, 
      monthlyBookSales, 
      currentAudienceSize,
      expectedCompletionIncrease,
      appSubscriptionPrice,
      expectedConversionRate,
      developmentCost,
      monthlyOperatingCost
    } = inputs;

    // Current revenue
    const currentMonthlyRevenue = monthlyBookSales * currentBookPrice;
    const currentAnnualRevenue = currentMonthlyRevenue * 12;

    // App projections
    const potentialAppUsers = Math.floor((currentAudienceSize * expectedConversionRate) / 100);
    const monthlyAppRevenue = potentialAppUsers * appSubscriptionPrice;
    const annualAppRevenue = monthlyAppRevenue * 12;

    // Improved book sales (due to increased completion and word-of-mouth)
    const improvementMultiplier = 1 + (expectedCompletionIncrease / 100);
    const improvedMonthlyBookSales = monthlyBookSales * improvementMultiplier;
    const improvedMonthlyBookRevenue = improvedMonthlyBookSales * currentBookPrice;
    const bookRevenueIncrease = improvedMonthlyBookRevenue - currentMonthlyRevenue;

    // Total projections
    const totalMonthlyRevenue = monthlyAppRevenue + improvedMonthlyBookRevenue;
    const totalAnnualRevenue = totalMonthlyRevenue * 12;
    const revenueIncrease = totalAnnualRevenue - currentAnnualRevenue;

    // Costs
    const totalDevelopmentCost = developmentCost;
    const annualOperatingCost = monthlyOperatingCost * 12;
    const totalAnnualCost = annualOperatingCost;

    // ROI calculations
    const annualProfit = revenueIncrease - totalAnnualCost;
    const roi = ((annualProfit - developmentCost) / developmentCost) * 100;
    const breakEvenMonths = developmentCost / (revenueIncrease / 12 - monthlyOperatingCost);
    const paybackPeriod = Math.ceil(breakEvenMonths);

    // Multi-year projections
    const projections = [];
    let cumulativeProfit = -developmentCost;
    
    for (let year = 1; year <= 3; year++) {
      const yearlyRevenue = revenueIncrease * year * 1.1; // 10% growth year over year
      const yearlyCost = totalAnnualCost * year;
      const yearlyProfit = yearlyRevenue - yearlyCost;
      cumulativeProfit += yearlyProfit;
      
      projections.push({
        year,
        revenue: yearlyRevenue,
        cost: yearlyCost,
        profit: yearlyProfit,
        cumulativeProfit
      });
    }

    return {
      current: {
        monthlyRevenue: currentMonthlyRevenue,
        annualRevenue: currentAnnualRevenue
      },
      app: {
        potentialUsers: potentialAppUsers,
        monthlyRevenue: monthlyAppRevenue,
        annualRevenue: annualAppRevenue
      },
      improved: {
        monthlyBookSales: improvedMonthlyBookSales,
        bookRevenueIncrease: bookRevenueIncrease * 12
      },
      totals: {
        monthlyRevenue: totalMonthlyRevenue,
        annualRevenue: totalAnnualRevenue,
        revenueIncrease: revenueIncrease,
        annualProfit: annualProfit,
        roi: roi,
        paybackPeriod: paybackPeriod
      },
      costs: {
        development: totalDevelopmentCost,
        annualOperating: annualOperatingCost
      },
      projections
    };
  };

  const results = calculateProjections();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatPercent = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow-sm border">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <DollarSign className="w-8 h-8 text-green-600" />
          <h2 className="text-2xl font-bold text-slate-900">Business Case Calculator</h2>
        </div>
        <p className="text-slate-600">
          Calculate the financial impact and ROI of creating a companion app for your book.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-slate-900 flex items-center">
            <Calculator className="w-5 h-5 mr-2 text-green-600" />
            Your Current Situation
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Current Book Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={inputs.currentBookPrice}
                  onChange={(e) => handleInputChange('currentBookPrice', parseFloat(e.target.value) || 0)}
                  className="w-full pl-8 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Monthly Book Sales (units)
              </label>
              <input
                type="number"
                min="0"
                value={inputs.monthlyBookSales}
                onChange={(e) => handleInputChange('monthlyBookSales', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Current Audience Size
              </label>
              <input
                type="number"
                min="0"
                value={inputs.currentAudienceSize}
                onChange={(e) => handleInputChange('currentAudienceSize', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <h4 className="text-lg font-semibold text-slate-900 mt-6">App Projections</h4>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Expected Completion Rate Increase (%)
              </label>
              <input
                type="number"
                min="0"
                max="500"
                value={inputs.expectedCompletionIncrease}
                onChange={(e) => handleInputChange('expectedCompletionIncrease', parseInt(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <p className="text-xs text-slate-500 mt-1">Studies show 200-300% increase is typical</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Monthly App Subscription Price
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  value={inputs.appSubscriptionPrice}
                  onChange={(e) => handleInputChange('appSubscriptionPrice', parseFloat(e.target.value) || 0)}
                  className="w-full pl-8 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Expected Conversion Rate (%)
              </label>
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                value={inputs.expectedConversionRate}
                onChange={(e) => handleInputChange('expectedConversionRate', parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <p className="text-xs text-slate-500 mt-1">Typical range: 2-10%</p>
            </div>

            <h4 className="text-lg font-semibold text-slate-900 mt-6">Costs</h4>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Development Cost (one-time)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
                <input
                  type="number"
                  min="0"
                  value={inputs.developmentCost}
                  onChange={(e) => handleInputChange('developmentCost', parseInt(e.target.value) || 0)}
                  className="w-full pl-8 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Monthly Operating Cost
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500">$</span>
                <input
                  type="number"
                  min="0"
                  value={inputs.monthlyOperatingCost}
                  onChange={(e) => handleInputChange('monthlyOperatingCost', parseInt(e.target.value) || 0)}
                  className="w-full pl-8 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-slate-900 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
            Financial Projections
          </h3>

          {/* Current vs Projected */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-lg border border-green-200">
            <h4 className="text-lg font-semibold text-green-900 mb-4">Revenue Comparison</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-green-700">Current Annual Revenue</div>
                <div className="text-2xl font-bold text-green-900">
                  {formatCurrency(results.current.annualRevenue)}
                </div>
              </div>
              <div>
                <div className="text-sm text-green-700">Projected Annual Revenue</div>
                <div className="text-2xl font-bold text-green-900">
                  {formatCurrency(results.totals.annualRevenue)}
                </div>
              </div>
            </div>
            <div className="mt-4 p-3 bg-white bg-opacity-50 rounded">
              <div className="text-sm text-green-700">Annual Increase</div>
              <div className="text-xl font-bold text-green-900">
                {formatCurrency(results.totals.revenueIncrease)}
                <span className="text-sm font-normal ml-2">
                  ({formatPercent((results.totals.revenueIncrease / results.current.annualRevenue) * 100)} increase)
                </span>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-blue-700">Potential App Users</span>
              </div>
              <div className="text-xl font-bold text-blue-900">
                {results.app.potentialUsers.toLocaleString()}
              </div>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
              <div className="text-sm text-purple-700 mb-2">Monthly App Revenue</div>
              <div className="text-xl font-bold text-purple-900">
                {formatCurrency(results.app.monthlyRevenue)}
              </div>
            </div>
          </div>

          {/* ROI Metrics */}
          <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
            <h4 className="text-lg font-semibold text-slate-900 mb-4">ROI Analysis</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-700">Annual Profit:</span>
                <span className={`font-semibold ${results.totals.annualProfit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatCurrency(results.totals.annualProfit)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-700">ROI (Year 1):</span>
                <span className={`font-semibold ${results.totals.roi > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {formatPercent(results.totals.roi)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-700">Payback Period:</span>
                <span className="font-semibold text-slate-900">
                  {results.totals.paybackPeriod > 0 ? `${results.totals.paybackPeriod} months` : 'Immediate'}
                </span>
              </div>
            </div>
          </div>

          {/* 3-Year Projection */}
          <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
            <div className="bg-slate-50 p-4 border-b">
              <h4 className="text-lg font-semibold text-slate-900">3-Year Projection</h4>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50 border-b text-sm">
                    <th className="text-left p-3">Year</th>
                    <th className="text-right p-3">Revenue</th>
                    <th className="text-right p-3">Costs</th>
                    <th className="text-right p-3">Profit</th>
                    <th className="text-right p-3">Cumulative</th>
                  </tr>
                </thead>
                <tbody>
                  {results.projections.map((proj) => (
                    <tr key={proj.year} className="border-b text-sm">
                      <td className="p-3 font-medium">Year {proj.year}</td>
                      <td className="text-right p-3">{formatCurrency(proj.revenue)}</td>
                      <td className="text-right p-3">{formatCurrency(proj.cost)}</td>
                      <td className={`text-right p-3 font-medium ${proj.profit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(proj.profit)}
                      </td>
                      <td className={`text-right p-3 font-bold ${proj.cumulativeProfit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {formatCurrency(proj.cumulativeProfit)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recommendations */}
          <div className={`p-4 rounded-lg border ${
            results.totals.roi > 100 
              ? 'bg-green-50 border-green-200' 
              : results.totals.roi > 0 
                ? 'bg-yellow-50 border-yellow-200'
                : 'bg-red-50 border-red-200'
          }`}>
            <h4 className="font-semibold mb-2">💡 Recommendation</h4>
            <p className="text-sm">
              {results.totals.roi > 100 
                ? "Strong business case! Your projected ROI suggests a companion app would be highly profitable."
                : results.totals.roi > 0 
                  ? "Moderate business case. Consider starting with a simpler MVP to validate assumptions."
                  : "Weak business case with current assumptions. Consider increasing conversion rates or reducing costs."
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}