import React from 'react';
import { CheckCircle, Clock, Eye, Info, AlertTriangle, Brain, Zap, Target, TrendingUp, Shield, Cpu, Activity, BarChart3, PieChart, BrainCircuit, Network, Database, Lock, Unlock, RefreshCw, Play, Pause, Settings, Maximize2, Minimize2, X } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { DashboardHeader } from './DashboardHeader';
import { ReviewQueue } from './ReviewQueue';
import { KPIDashboard, SpendByCategory, ProcessingTrends } from './KPIDashboard';
import { QualityMetrics } from './QualityMetrics';

export function ConvergoDashboard() {
  const { extractions, messages, currentRole } = useAppStore();
  
  const pendingExtractions = extractions.filter(ext => ext.status === 'pending');
  const processedMessages = messages.filter(msg => msg.convergo_command);
  
  return (
    <div className="h-full bg-gray-50 overflow-y-auto">
      <DashboardHeader />
      
      <div className="p-6 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Messages Processed</p>
                <p className="text-2xl font-bold text-gray-900">{processedMessages.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-xl">📨</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Review</p>
                <p className="text-2xl font-bold text-gray-900">{pendingExtractions.length}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <span className="text-yellow-600 text-xl">⏳</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Auto-Classification</p>
                <p className="text-2xl font-bold text-gray-900">91%</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 text-xl">🎯</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cost Savings</p>
                <p className="text-2xl font-bold text-gray-900">73%</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <span className="text-purple-600 text-xl">💰</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <ReviewQueue />
            <PreviouslyReviewed />
            <KPIDashboard />
            <PreviousAnomaliesXAI />
            <AIPoweredFeatures />
          </div>
          <div className="space-y-6">
            <QualityMetrics />
            <SpendByCategory />
            <ProcessingTrends />
          </div>
        </div>
      </div>
    </div>
  );
}

// Previous Anomalies & XAI Component
function PreviousAnomaliesXAI() {
  const [expandedAnomaly, setExpandedAnomaly] = React.useState<string | null>(null);
  const [selectedAnomaly, setSelectedAnomaly] = React.useState<string | null>(null);
  
  const previousAnomalies = [
    {
      id: 'anom_001',
      type: 'expense',
      severity: 'high',
      confidence: 0.23,
      amount: 25000,
      description: 'Unusually high expense request',
      originalMessage: '@convergo need to buy new gaming setup for office, budget 25k',
      anomalyReason: 'Amount exceeds department budget by 400%',
      xaiExplanation: {
        factors: [
          { factor: 'Amount Threshold', impact: 0.85, description: 'Amount 25,000 BDT exceeds normal range of 1,000-5,000 BDT' },
          { factor: 'Department Pattern', impact: 0.72, description: 'Engineering dept typically spends 2,000-3,000 BDT on equipment' },
          { factor: 'Keyword Analysis', impact: 0.68, description: 'Gaming setup not typical business expense' },
          { factor: 'Historical Context', impact: 0.91, description: 'No similar high-value requests in last 6 months' }
        ],
        recommendation: 'Require additional approval from department head',
        riskScore: 0.89,
        similarCases: 3
      },
      resolvedAt: '2 days ago',
      resolution: 'Rejected - Non-business expense',
      resolvedBy: 'finance.team'
    },
    {
      id: 'anom_002',
      type: 'reimbursement',
      severity: 'medium',
      confidence: 0.34,
      amount: 1500,
      description: 'Suspicious reimbursement pattern',
      originalMessage: '@convergo lunch reimbursement for 1500 taka, ate at expensive restaurant',
      anomalyReason: 'Multiple reimbursements from same vendor in short period',
      xaiExplanation: {
        factors: [
          { factor: 'Frequency Pattern', impact: 0.78, description: '3rd reimbursement from same restaurant this week' },
          { factor: 'Amount Analysis', impact: 0.65, description: 'Amount 50% higher than team average' },
          { factor: 'Time Pattern', impact: 0.82, description: 'All reimbursements submitted within 2-hour window' },
          { factor: 'Vendor History', impact: 0.71, description: 'Restaurant not in approved vendor list' }
        ],
        recommendation: 'Flag for manual review and vendor verification',
        riskScore: 0.67,
        similarCases: 7
      },
      resolvedAt: '1 week ago',
      resolution: 'Approved with warning - Vendor added to approved list',
      resolvedBy: 'hr.team'
    },
    {
      id: 'anom_003',
      type: 'leave',
      severity: 'low',
      confidence: 0.45,
      amount: null,
      description: 'Unusual leave request pattern',
      originalMessage: '@convergo need 15 days leave for vacation, going to Europe',
      anomalyReason: 'Extended leave request during peak project period',
      xaiExplanation: {
        factors: [
          { factor: 'Project Timeline', impact: 0.73, description: 'Request overlaps with critical project deadline' },
          { factor: 'Leave Balance', impact: 0.58, description: 'Employee has sufficient leave balance' },
          { factor: 'Team Impact', impact: 0.81, description: 'Only 2 team members available during period' },
          { factor: 'Historical Pattern', impact: 0.64, description: 'Employee typically takes 3-5 day leaves' }
        ],
        recommendation: 'Schedule meeting with manager to discuss project impact',
        riskScore: 0.52,
        similarCases: 2
      },
      resolvedAt: '3 days ago',
      resolution: 'Approved with conditions - Handover plan required',
      resolvedBy: 'manager.team'
    }
  ];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-red-600 bg-red-100 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-100 border-yellow-200';
      case 'low': return 'text-blue-600 bg-blue-100 border-blue-200';
      default: return 'text-gray-600 bg-gray-100 border-gray-200';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'high': return '🔴';
      case 'medium': return '🟡';
      case 'low': return '🔵';
      default: return '⚪';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="bg-gradient-to-r from-red-50 to-orange-50 px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-red-800 flex items-center">
          <Brain className="w-5 h-5 mr-2" />
          Previous Anomalies & Explainable AI (XAI)
        </h2>
        <p className="text-sm text-red-700 mt-1">AI-powered anomaly detection with detailed explanations and risk analysis</p>
      </div>
      
      <div className="divide-y divide-gray-200">
        {previousAnomalies.map((anomaly) => (
          <div key={anomaly.id} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-2xl">{getSeverityIcon(anomaly.severity)}</div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-gray-900 capitalize">{anomaly.type}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getSeverityColor(anomaly.severity)}`}>
                      {anomaly.severity.toUpperCase()} RISK
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                      {Math.round(anomaly.confidence * 100)}% Confidence
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{anomaly.description}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    Resolved by {anomaly.resolvedBy} • {anomaly.resolvedAt}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setExpandedAnomaly(expandedAnomaly === anomaly.id ? null : anomaly.id)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setSelectedAnomaly(anomaly.id)}
                  className="bg-indigo-600 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors flex items-center space-x-1"
                >
                  <Brain className="w-3 h-3" />
                  <span>XAI Analysis</span>
                </button>
              </div>
            </div>
            
            {expandedAnomaly === anomaly.id && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Original Message</h4>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-900">{anomaly.originalMessage}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Resolution</h4>
                    <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                      <p className="text-sm text-green-800 font-medium">{anomaly.resolution}</p>
                    </div>
                  </div>
                </div>
                
                {/* XAI Analysis */}
                <div className="mt-4">
                  <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                    <Brain className="w-4 h-4 mr-2 text-indigo-600" />
                    Explainable AI Analysis
                  </h4>
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4 border border-indigo-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h5 className="font-medium text-indigo-900 mb-2">Risk Factors</h5>
                        <div className="space-y-2">
                          {anomaly.xaiExplanation.factors.map((factor, index) => (
                            <div key={index} className="bg-white rounded p-3 border border-indigo-100">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium text-indigo-800">{factor.factor}</span>
                                <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded">
                                  {Math.round(factor.impact * 100)}% impact
                                </span>
                              </div>
                              <p className="text-xs text-indigo-600">{factor.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h5 className="font-medium text-indigo-900 mb-2">AI Recommendation</h5>
                          <div className="bg-white rounded p-3 border border-indigo-100">
                            <p className="text-sm text-indigo-800">{anomaly.xaiExplanation.recommendation}</p>
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="font-medium text-indigo-900 mb-2">Risk Assessment</h5>
                          <div className="bg-white rounded p-3 border border-indigo-100">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm text-indigo-800">Risk Score</span>
                              <span className="text-lg font-bold text-red-600">{Math.round(anomaly.xaiExplanation.riskScore * 100)}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-red-500 h-2 rounded-full" 
                                style={{ width: `${anomaly.xaiExplanation.riskScore * 100}%` }}
                              ></div>
                            </div>
                            <p className="text-xs text-indigo-600 mt-1">
                              {anomaly.xaiExplanation.similarCases} similar cases found in database
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// AI-Powered Features Component
function AIPoweredFeatures() {
  const [activeFeature, setActiveFeature] = React.useState<string | null>(null);
  const [isTraining, setIsTraining] = React.useState(false);
  const [modelStatus, setModelStatus] = React.useState('online');
  const [showConfigModal, setShowConfigModal] = React.useState(false);
  const [configSettings, setConfigSettings] = React.useState({
    learningRate: 0.001,
    batchSize: 32,
    epochs: 100,
    threshold: 0.85,
    autoOptimize: true,
    enableAIGuard: true,
    modelVersion: 'v2.1.4',
    deploymentMode: 'production'
  });
  
  const aiFeatures = [
    {
      id: 'ml_optimization',
      name: 'ML Model Optimization',
      description: 'Real-time model performance monitoring and auto-optimization',
      icon: Brain,
      status: 'active',
      metrics: {
        accuracy: 94.2,
        latency: 2.3,
        throughput: 1500,
        drift: 0.02
      }
    },
    {
      id: 'predictive_analytics',
      name: 'Predictive Analytics',
      description: 'Forecast approval patterns and detect potential fraud',
      icon: TrendingUp,
      status: 'active',
      metrics: {
        prediction_accuracy: 89.7,
        fraud_detection: 96.3,
        false_positives: 2.1,
        coverage: 98.5
      }
    },
    {
      id: 'nlp_enhancement',
      name: 'Advanced NLP',
      description: 'Multi-language processing with context understanding',
      icon: Network,
      status: 'active',
      metrics: {
        languages: 12,
        accuracy: 92.8,
        context_score: 88.5,
        sentiment_analysis: 94.1
      }
    },
    {
      id: 'auto_learning',
      name: 'Continuous Learning',
      description: 'Self-improving models based on user feedback',
      icon: RefreshCw,
      status: 'training',
      metrics: {
        learning_rate: 0.001,
        improvement: 2.3,
        samples_processed: 15432,
        model_version: 'v2.1.4'
      }
    }
  ];

  const startTraining = () => {
    setIsTraining(true);
    setTimeout(() => setIsTraining(false), 3000);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="bg-gradient-to-r from-purple-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-purple-800 flex items-center">
          <Zap className="w-5 h-5 mr-2" />
          AI-Powered Features & Model Intelligence
        </h2>
        <p className="text-sm text-purple-700 mt-1">Cutting-edge AI capabilities driving intelligent automation</p>
      </div>
      
      <div className="p-6">
        {/* Model Status Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-4 rounded-lg border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Model Status</p>
                <p className="text-lg font-bold text-green-900 capitalize">{modelStatus}</p>
                <div className="flex items-center space-x-1 mt-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-600">Real-time</span>
                </div>
              </div>
              <Cpu className="w-8 h-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Active Models</p>
                <p className="text-lg font-bold text-blue-900">4/4</p>
                <p className="text-xs text-blue-600 mt-1">All operational</p>
              </div>
              <Brain className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Training Status</p>
                <p className="text-lg font-bold text-purple-900">
                  {isTraining ? 'Training...' : 'Idle'}
                </p>
                <p className="text-xs text-purple-600 mt-1">
                  {isTraining ? 'Auto-optimizing' : 'Ready'}
                </p>
              </div>
              <RefreshCw className={`w-8 h-8 text-purple-600 ${isTraining ? 'animate-spin' : ''}`} />
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700">AI Confidence</p>
                <p className="text-lg font-bold text-orange-900">94.2%</p>
                <p className="text-xs text-orange-600 mt-1">↑ 2.1% this week</p>
              </div>
              <Target className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* AI Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {aiFeatures.map((feature) => (
            <div 
              key={feature.id}
              className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:border-purple-300 transition-colors cursor-pointer"
              onClick={() => setActiveFeature(activeFeature === feature.id ? null : feature.id)}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <feature.icon className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{feature.name}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    feature.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {feature.status}
                  </span>
                  <Maximize2 className="w-4 h-4 text-gray-400" />
                </div>
              </div>
              
              {activeFeature === feature.id && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(feature.metrics).map(([key, value]) => (
                      <div key={key} className="bg-white rounded p-3 border border-gray-100">
                        <p className="text-xs font-medium text-gray-600 capitalize">
                          {key.replace('_', ' ')}
                        </p>
                        <p className="text-lg font-bold text-gray-900">
                          {typeof value === 'number' && value > 100 ? value.toLocaleString() : value}
                          {key.includes('accuracy') || key.includes('score') || key.includes('rate') ? '%' : ''}
                          {key.includes('version') ? '' : ''}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* AI Controls */}
        <div className="mt-6 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-medium text-gray-900">AI Model Controls</h4>
              <p className="text-sm text-gray-600">Advanced model management and training controls</p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={startTraining}
                disabled={isTraining}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
              >
                <RefreshCw className={`w-4 h-4 ${isTraining ? 'animate-spin' : ''}`} />
                <span>{isTraining ? 'Training...' : 'Start Training'}</span>
              </button>
              <button 
                onClick={() => setShowConfigModal(true)}
                className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors flex items-center space-x-2"
              >
                <Settings className="w-4 h-4" />
                <span>Configure</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* AI Configuration Modal */}
      {showConfigModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                    <Settings className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">AI Model Configuration</h2>
                    <p className="text-purple-100">Advanced settings for model optimization and deployment</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowConfigModal(false)}
                  className="text-white hover:text-purple-200 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Model Status */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-green-50 to-emerald-100 p-4 rounded-xl border border-green-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                      <Cpu className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-700">Model Status</p>
                      <p className="text-lg font-bold text-green-900 capitalize">{modelStatus}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <Brain className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-blue-700">Version</p>
                      <p className="text-lg font-bold text-blue-900">{configSettings.modelVersion}</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                      <Shield className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-purple-700">Deployment</p>
                      <p className="text-lg font-bold text-purple-900 capitalize">{configSettings.deploymentMode}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Configuration Tabs */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">Model Parameters</h3>
                </div>
                
                <div className="p-6 space-y-6">
                  {/* Learning Configuration */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                      <RefreshCw className="w-4 h-4 mr-2 text-blue-600" />
                      Learning Configuration
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Learning Rate
                        </label>
                        <input
                          type="number"
                          step="0.001"
                          value={configSettings.learningRate}
                          onChange={(e) => setConfigSettings({
                            ...configSettings,
                            learningRate: parseFloat(e.target.value)
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">Controls training speed</p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Batch Size
                        </label>
                        <select
                          value={configSettings.batchSize}
                          onChange={(e) => setConfigSettings({
                            ...configSettings,
                            batchSize: parseInt(e.target.value)
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value={16}>16</option>
                          <option value={32}>32</option>
                          <option value={64}>64</option>
                          <option value={128}>128</option>
                        </select>
                        <p className="text-xs text-gray-500 mt-1">Memory vs speed trade-off</p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Training Epochs
                        </label>
                        <input
                          type="number"
                          value={configSettings.epochs}
                          onChange={(e) => setConfigSettings({
                            ...configSettings,
                            epochs: parseInt(e.target.value)
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <p className="text-xs text-gray-500 mt-1">Number of training cycles</p>
                      </div>
                    </div>
                  </div>

                  {/* Performance Settings */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                      <Zap className="w-4 h-4 mr-2 text-green-600" />
                      Performance Settings
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Confidence Threshold
                        </label>
                        <div className="flex items-center space-x-3">
                          <input
                            type="range"
                            min="0.5"
                            max="0.99"
                            step="0.01"
                            value={configSettings.threshold}
                            onChange={(e) => setConfigSettings({
                              ...configSettings,
                              threshold: parseFloat(e.target.value)
                            })}
                            className="flex-1"
                          />
                          <span className="text-sm font-medium text-gray-900 w-12">
                            {Math.round(configSettings.threshold * 100)}%
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Minimum confidence for auto-approval</p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Deployment Mode
                        </label>
                        <select
                          value={configSettings.deploymentMode}
                          onChange={(e) => setConfigSettings({
                            ...configSettings,
                            deploymentMode: e.target.value
                          })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="development">Development</option>
                          <option value="staging">Staging</option>
                          <option value="production">Production</option>
                        </select>
                        <p className="text-xs text-gray-500 mt-1">Environment configuration</p>
                      </div>
                    </div>
                  </div>

                  {/* Advanced Features */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                      <Brain className="w-4 h-4 mr-2 text-purple-600" />
                      Advanced Features
                    </h4>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h5 className="font-medium text-gray-900">Auto-Optimization</h5>
                          <p className="text-sm text-gray-600">Automatically tune model parameters based on performance</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={configSettings.autoOptimize}
                            onChange={(e) => setConfigSettings({
                              ...configSettings,
                              autoOptimize: e.target.checked
                            })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <h5 className="font-medium text-gray-900">AI Guard</h5>
                          <p className="text-sm text-gray-600">Enhanced security and bias detection</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={configSettings.enableAIGuard}
                            onChange={(e) => setConfigSettings({
                              ...configSettings,
                              enableAIGuard: e.target.checked
                            })}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Model Metrics */}
                  <div>
                    <h4 className="font-medium text-gray-900 mb-4 flex items-center">
                      <BarChart3 className="w-4 h-4 mr-2 text-orange-600" />
                      Current Model Metrics
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <p className="text-sm font-medium text-blue-700">Accuracy</p>
                        <p className="text-2xl font-bold text-blue-900">94.2%</p>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <p className="text-sm font-medium text-green-700">Latency</p>
                        <p className="text-2xl font-bold text-green-900">2.3s</p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                        <p className="text-sm font-medium text-purple-700">Throughput</p>
                        <p className="text-2xl font-bold text-purple-900">1.5K</p>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                        <p className="text-sm font-medium text-orange-700">Drift</p>
                        <p className="text-2xl font-bold text-orange-900">0.02</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => {
                      setConfigSettings({
                        learningRate: 0.001,
                        batchSize: 32,
                        epochs: 100,
                        threshold: 0.85,
                        autoOptimize: true,
                        enableAIGuard: true,
                        modelVersion: 'v2.1.4',
                        deploymentMode: 'production'
                      });
                    }}
                    className="text-gray-600 hover:text-gray-800 transition-colors flex items-center space-x-2"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Reset to Defaults</span>
                  </button>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setShowConfigModal(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      // Simulate saving configuration
                      setIsTraining(true);
                      setTimeout(() => {
                        setIsTraining(false);
                        setShowConfigModal(false);
                      }, 2000);
                    }}
                    disabled={isTraining}
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2 rounded-lg font-medium hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 flex items-center space-x-2"
                  >
                    {isTraining ? (
                      <>
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        <span>Applying...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        <span>Apply Configuration</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Previously Reviewed Component
function PreviouslyReviewed() {
  const [expandedItem, setExpandedItem] = React.useState<string | null>(null);
  
  // Hardcoded previously reviewed extractions
  const previouslyReviewed = [
    {
      id: 'prev_001',
      type: 'reimbursement',
      confidence: 0.94,
      fields: {
        amount: 500,
        department: 'Engineering',
        description: 'Lunch reimbursement',
        vendor: 'Local Restaurant'
      },
      originalMessage: '@convergo ajke lunch khaise 500 taka, reimbursement chai',
      reviewedAt: '2 days ago',
      reviewedBy: 'john.doe',
      status: 'confirmed'
    },
    {
      id: 'prev_002',
      type: 'leave',
      confidence: 0.89,
      fields: {
        reason: 'Sick Leave',
        date: '2024-01-15',
        duration: '1 day'
      },
      originalMessage: '@convergo ami ajke sick leave nibo, thanda lagche',
      reviewedAt: '3 days ago',
      reviewedBy: 'jane.smith',
      status: 'confirmed'
    },
    {
      id: 'prev_003',
      type: 'reimbursement',
      confidence: 0.91,
      fields: {
        amount: 750,
        department: 'Sales',
        description: 'Client lunch reimbursement',
        vendor: 'Business Restaurant'
      },
      originalMessage: '@convergo Need reimbursement for client lunch yesterday, spent 750 BDT',
      reviewedAt: '4 days ago',
      reviewedBy: 'mike.wilson',
      status: 'confirmed'
    },
    {
      id: 'prev_004',
      type: 'leave encashment',
      confidence: 0.87,
      fields: {
        amount: 15000,
        department: 'HR',
        description: 'Leave encashment for 5 unused vacation days',
        days: 5
      },
      originalMessage: '@convergo Requesting leave encashment for 5 unused vacation days',
      reviewedAt: '1 week ago',
      reviewedBy: 'sarah.jones',
      status: 'confirmed'
    },
    {
      id: 'prev_005',
      type: 'sick leave',
      confidence: 0.92,
      fields: {
        reason: 'Not feeling well',
        date: '2024-01-10',
        duration: '1 day'
      },
      originalMessage: '@convergo Taking sick leave today, not feeling well',
      reviewedAt: '1 week ago',
      reviewedBy: 'david.brown',
      status: 'confirmed'
    },
    {
      id: 'prev_006',
      type: 'leave',
      confidence: 0.88,
      fields: {
        reason: 'Family Emergency',
        date: '2024-01-08',
        duration: '3 days'
      },
      originalMessage: '@convergo Need 3 days leave for family emergency',
      reviewedAt: '2 weeks ago',
      reviewedBy: 'lisa.garcia',
      status: 'confirmed'
    },
    {
      id: 'prev_007',
      type: 'reimbursement',
      confidence: 0.93,
      fields: {
        amount: 1200,
        department: 'IT',
        description: 'Team dinner reimbursement',
        vendor: 'Team Restaurant'
      },
      originalMessage: '@convergo Team dinner reimbursement for 1200 BDT',
      reviewedAt: '2 weeks ago',
      reviewedBy: 'alex.chen',
      status: 'confirmed'
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'expense': return '💳';
      case 'procurement': return '📦';
      case 'approval': return '✅';
      case 'leave': return '🏖️';
      case 'reimbursement': return '💰';
      case 'leave encashment': return '💸';
      case 'sick leave': return '🏥';
      default: return '❓';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'text-green-600 bg-green-100';
    if (confidence >= 0.8) return 'text-blue-600 bg-blue-100';
    return 'text-yellow-600 bg-yellow-100';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-green-800 flex items-center">
          <CheckCircle className="w-5 h-5 mr-2" />
          Previously Reviewed
        </h2>
        <p className="text-sm text-green-700 mt-1">Historical extractions that have been processed and reviewed</p>
      </div>
      
      <div className="divide-y divide-gray-200">
        {previouslyReviewed.map((item) => (
          <div key={item.id} className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-2xl">{getTypeIcon(item.type)}</div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium text-gray-900 capitalize">{item.type}</h3>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(item.confidence)}`}>
                      {Math.round(item.confidence * 100)}%
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 flex items-center space-x-1">
                      <CheckCircle className="w-3 h-3" />
                      <span>Confirmed</span>
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {item.type.includes('leave') ? (
                      <>
                        Reason: {item.fields.reason || 'Annual Leave'} • 
                        Date: {item.fields.date || 'Not specified'}
                      </>
                    ) : (
                      <>
                        Department: {item.fields.department || 'Finance'} • 
                        Amount: {item.fields.amount ? `${item.fields.amount.toLocaleString()} BDT` : 'N/A'}
                      </>
                    )}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Reviewed by {item.reviewedBy} • {item.reviewedAt}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
            
            {expandedItem === item.id && (
              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Original Message</h4>
                    <div className="bg-gray-50 rounded-lg p-3">
                      <p className="text-sm text-gray-900">{item.originalMessage}</p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Extracted Data</h4>
                    <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                      {Object.entries(item.fields).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-sm font-medium text-gray-600 capitalize">{key}:</span>
                          <span className="text-sm text-gray-900">{String(value)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="font-medium text-gray-900 mb-2">Review Details</h4>
                  <div className="bg-blue-50 rounded-lg p-3">
                    <div className="text-sm space-y-1">
                      <p className="flex items-center space-x-1">
                        <span className="font-medium">Confidence Score:</span>
                        <Info className="w-3 h-3 text-blue-500" />
                        <span>{Math.round(item.confidence * 100)}%</span>
                      </p>
                      <p className="flex items-center space-x-1">
                        <span className="font-medium">Reviewed By:</span>
                        <span>{item.reviewedBy}</span>
                      </p>
                      <p className="flex items-center space-x-1">
                        <span className="font-medium">Review Date:</span>
                        <span>{item.reviewedAt}</span>
                      </p>
                      <p className="flex items-center space-x-1">
                        <span className="font-medium">Status:</span>
                        <span className="text-green-600 font-medium">Confirmed</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}