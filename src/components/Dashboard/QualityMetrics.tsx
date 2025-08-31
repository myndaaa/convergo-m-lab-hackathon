import React, { useState } from 'react';
import { Target, TrendingUp, AlertTriangle, CheckCircle, Activity, Info } from 'lucide-react';

export function QualityMetrics() {
  const [showInfo, setShowInfo] = useState<string | null>(null);
  const [investigatingAnomaly, setInvestigatingAnomaly] = useState<string | null>(null);
  
  const metrics = {
    precision: 0.91,
    recall: 0.86,
    f1Score: 0.88,
    accuracy: 0.93,
    samplesProcessed: 47
  };

  const metricExplanations = {
    precision: {
      title: "Precision",
      explanation: "Think of this like a smart assistant that rarely makes mistakes. When it says something is an expense, it's usually right! 🎯"
    },
    recall: {
      title: "Recall", 
      explanation: "This is like having a very thorough assistant who catches almost everything. It rarely misses an expense, even if it sometimes flags things that aren't expenses. 🔍"
    },
    f1Score: {
      title: "F1 Score",
      explanation: "This is the 'goldilocks' number - not too strict, not too loose. It's the sweet spot between being accurate and being thorough. ⚖️"
    },
    accuracy: {
      title: "Accuracy",
      explanation: "Simply put, this is how often our AI gets it right overall. Like a student's grade on a test! 📊"
    }
  };

  const anomalies = [
    {
      id: 'anom_1',
      type: 'expense',
      amount: 15000,
      reason: 'Amount 3.2σ above category mean',
      score: 3.24,
      threshold: 2.5,
      aiExplanation: {
        title: "AI Analysis: Unusual Expense Amount",
        factors: [
          "Historical data shows average expense in this category is $2,400",
          "This amount is 6.25x higher than the typical range",
          "Similar transactions in the past 6 months averaged $1,800",
          "Department budget for this category is $5,000/month",
          "Vendor has no previous transactions above $3,000"
        ],
        recommendation: "Consider requesting additional documentation or approval from manager",
        confidence: "High (94% confidence in anomaly detection)"
      }
    },
    {
      id: 'anom_2', 
      type: 'procurement',
      amount: 850,
      reason: 'Unusual vendor for category',
      score: 2.8,
      threshold: 2.5,
      aiExplanation: {
        title: "AI Analysis: Unusual Vendor Pattern",
        factors: [
          "This vendor has never been used for procurement before",
          "Historical data shows 95% of procurement goes to 3 preferred vendors",
          "Vendor is not in the approved supplier database",
          "Similar items typically cost $400-600 from approved vendors",
          "No previous transactions with this vendor in the last 2 years"
        ],
        recommendation: "Verify vendor credentials and compare with approved suppliers",
        confidence: "Medium (87% confidence in anomaly detection)"
      }
    }
  ];

  return (
    <div className="space-y-6">
      {/* Quality Metrics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <Target className="w-5 h-5 text-green-600" />
            <span>Model Quality</span>
            <button
              onClick={() => setShowInfo(showInfo === 'overview' ? null : 'overview')}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              title="Learn more about model quality"
            >
              <Info className="w-4 h-4" />
            </button>
          </h3>
          <span className="text-sm text-gray-500">n={metrics.samplesProcessed}</span>
        </div>
        
        {showInfo === 'overview' && (
          <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>What is Model Quality? 🤖</strong><br/>
              Think of our AI like a smart assistant that learns from examples. These numbers tell us how well it's doing its job. 
              Higher numbers = better performance! Click the (i) buttons next to each metric to learn more.
            </p>
          </div>
        )}
        
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center relative">
            <div className="text-2xl font-bold text-green-600">{(metrics.precision * 100).toFixed(0)}%</div>
            <div className="text-sm text-gray-600 flex items-center justify-center space-x-1">
              <span>Precision</span>
              <button
                onClick={() => setShowInfo(showInfo === 'precision' ? null : 'precision')}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                title="Learn about precision"
              >
                <Info className="w-3 h-3" />
              </button>
            </div>
            {showInfo === 'precision' && (
              <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-green-50 border border-green-200 rounded-lg z-10 shadow-lg">
                <p className="text-xs text-green-800">{metricExplanations.precision.explanation}</p>
              </div>
            )}
          </div>
          
          <div className="text-center relative">
            <div className="text-2xl font-bold text-blue-600">{(metrics.recall * 100).toFixed(0)}%</div>
            <div className="text-sm text-gray-600 flex items-center justify-center space-x-1">
              <span>Recall</span>
              <button
                onClick={() => setShowInfo(showInfo === 'recall' ? null : 'recall')}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                title="Learn about recall"
              >
                <Info className="w-3 h-3" />
              </button>
            </div>
            {showInfo === 'recall' && (
              <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg z-10 shadow-lg">
                <p className="text-xs text-blue-800">{metricExplanations.recall.explanation}</p>
              </div>
            )}
          </div>
          
          <div className="text-center relative">
            <div className="text-2xl font-bold text-purple-600">{(metrics.f1Score * 100).toFixed(0)}%</div>
            <div className="text-sm text-gray-600 flex items-center justify-center space-x-1">
              <span>F1 Score</span>
              <button
                onClick={() => setShowInfo(showInfo === 'f1Score' ? null : 'f1Score')}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                title="Learn about F1 score"
              >
                <Info className="w-3 h-3" />
              </button>
            </div>
            {showInfo === 'f1Score' && (
              <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-purple-50 border border-purple-200 rounded-lg z-10 shadow-lg">
                <p className="text-xs text-purple-800">{metricExplanations.f1Score.explanation}</p>
              </div>
            )}
          </div>
          
          <div className="text-center relative">
            <div className="text-2xl font-bold text-gray-900">{(metrics.accuracy * 100).toFixed(0)}%</div>
            <div className="text-sm text-gray-600 flex items-center justify-center space-x-1">
              <span>Accuracy</span>
              <button
                onClick={() => setShowInfo(showInfo === 'accuracy' ? null : 'accuracy')}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                title="Learn about accuracy"
              >
                <Info className="w-3 h-3" />
              </button>
            </div>
            {showInfo === 'accuracy' && (
              <div className="absolute top-full left-0 right-0 mt-2 p-3 bg-gray-50 border border-gray-200 rounded-lg z-10 shadow-lg">
                <p className="text-xs text-gray-800">{metricExplanations.accuracy.explanation}</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span className="text-sm text-green-800 font-medium">Model performing above enterprise threshold (85%)</span>
          </div>
        </div>
      </div>

      {/* Anomaly Detection */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-orange-600" />
            <span>Anomalies</span>
            <button
              onClick={() => setShowInfo(showInfo === 'anomalies' ? null : 'anomalies')}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              title="Learn about anomalies"
            >
              <Info className="w-4 h-4" />
            </button>
          </h3>
          <span className="text-sm bg-orange-100 text-orange-800 px-2 py-1 rounded-full font-medium">
            {anomalies.length} detected
          </span>
        </div>
        
        {showInfo === 'anomalies' && (
          <div className="mb-4 p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <p className="text-sm text-orange-800">
              <strong>What are Anomalies? 🚨</strong><br/>
              These are unusual transactions that our AI thinks might need extra attention. 
              Think of it like a security guard flagging something that looks suspicious. 
              It doesn't mean it's wrong - just that it's worth double-checking! 🔍
            </p>
          </div>
        )}
        
        <div className="space-y-3">
          {anomalies.map((anomaly) => (
            <div key={anomaly.id} className="p-4 border border-orange-200 rounded-lg bg-orange-50">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900 capitalize">{anomaly.type}</span>
                <span className="text-lg font-bold text-orange-600">${anomaly.amount.toLocaleString()}</span>
              </div>
              <p className="text-sm text-gray-700 mb-2">{anomaly.reason}</p>
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>Score: {anomaly.score.toFixed(2)} (threshold: {anomaly.threshold})</span>
                <button 
                  onClick={() => setInvestigatingAnomaly(investigatingAnomaly === anomaly.id ? null : anomaly.id)}
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  {investigatingAnomaly === anomaly.id ? 'Hide Analysis' : 'Investigate'}
                </button>
              </div>
              
              {investigatingAnomaly === anomaly.id && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="mb-3">
                    <h4 className="font-semibold text-blue-900 text-sm mb-2">{anomaly.aiExplanation.title}</h4>
                    <p className="text-xs text-blue-700 mb-3">{anomaly.aiExplanation.confidence}</p>
                  </div>
                  
                  <div className="mb-3">
                    <h5 className="font-medium text-blue-900 text-xs mb-2">Why was this flagged? 🤖</h5>
                    <ul className="space-y-1">
                      {anomaly.aiExplanation.factors.map((factor, index) => (
                        <li key={index} className="text-xs text-blue-800 flex items-start space-x-2">
                          <span className="text-blue-600 mt-0.5">•</span>
                          <span>{factor}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="p-3 bg-white border border-blue-200 rounded">
                    <h5 className="font-medium text-blue-900 text-xs mb-1">AI Recommendation 💡</h5>
                    <p className="text-xs text-blue-800">{anomaly.aiExplanation.recommendation}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <Activity className="w-5 h-5 text-gray-600" />
          <span>Recent Activity</span>
        </h3>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-900">Expense #ERP_1736533234567 approved</span>
            <span className="text-xs text-gray-500 ml-auto">2 min ago</span>
          </div>
          <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-sm text-gray-900">Procurement request classified with 94% confidence</span>
            <span className="text-xs text-gray-500 ml-auto">5 min ago</span>
          </div>
          <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span className="text-sm text-gray-900">Anomaly detected in Marketing spend</span>
            <span className="text-xs text-gray-500 ml-auto">12 min ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}