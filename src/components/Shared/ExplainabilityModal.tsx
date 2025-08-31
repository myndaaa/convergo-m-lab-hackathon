import React from 'react';
import { X, Brain, Target, Zap } from 'lucide-react';

interface ExplainabilityModalProps {
  isOpen: boolean;
  onClose: () => void;
  classification: {
    type: string;
    confidence: number;
    rules_fired: string[];
    tfidf_score: number;
    extracted_fields?: Record<string, any>;
  };
}

export function ExplainabilityModal({ isOpen, onClose, classification }: ExplainabilityModalProps) {
  if (!isOpen) return null;

  const ruleDescriptions: Record<string, string> = {
    'hasReceiptOrExpenseKeyword': 'Message contains expense-related keywords (receipt, reimburs, expense, etc.)',
    'hasApprovalKeywordWithRef': 'Message contains approval keywords with reference number',
    'hasProcurementKeyword': 'Message contains procurement keywords (order, vendor, buy, etc.)',
    'hasAssetKeyword': 'Message mentions specific assets (laptop, equipment, etc.)'
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center space-x-2">
              <Brain className="w-6 h-6 text-purple-600" />
              <span>AI Decision Explanation</span>
            </h3>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Classification Result */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center space-x-3 mb-2">
              <Target className="w-5 h-5 text-blue-600" />
              <span className="font-semibold text-blue-900">Classification Result</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Type:</span>
                <span className="ml-2 font-medium capitalize">{classification.type}</span>
              </div>
              <div>
                <span className="text-gray-600">Confidence:</span>
                <span className="ml-2 font-medium">{Math.round(classification.confidence * 100)}%</span>
              </div>
            </div>
          </div>

          {/* Rules Fired */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center space-x-2">
              <Zap className="w-4 h-4 text-yellow-600" />
              <span>Rules Triggered</span>
            </h4>
            
            {classification.rules_fired.length > 0 ? (
              <div className="space-y-2">
                {classification.rules_fired.map((rule, index) => (
                  <div key={index} className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="font-medium text-yellow-900">{rule}</div>
                    <div className="text-sm text-yellow-700 mt-1">
                      {ruleDescriptions[rule] || 'Custom rule triggered'}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-600 italic">No specific rules triggered - classified using ML model only</p>
            )}
          </div>

          {/* ML Scoring */}
          <div className="mb-6">
            <h4 className="font-semibold text-gray-900 mb-3">Machine Learning Score</h4>
            <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">TF-IDF Score:</span>
                  <span className="ml-2 font-medium">{classification.tfidf_score.toFixed(3)}</span>
                </div>
                <div>
                  <span className="text-gray-600">Final Confidence:</span>
                  <span className="ml-2 font-medium">{Math.round(classification.confidence * 100)}%</span>
                </div>
              </div>
              
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${classification.confidence * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          {/* Extracted Fields */}
          {classification.extracted_fields && Object.keys(classification.extracted_fields).length > 0 && (
            <div className="mb-6">
              <h4 className="font-semibold text-gray-900 mb-3">Extracted Data</h4>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  {Object.entries(classification.extracted_fields).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <span className="text-gray-600 capitalize">{key}:</span>
                      <span className="font-medium text-gray-900">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Training Actions */}
          <div className="border-t border-gray-200 pt-4">
            <h4 className="font-semibold text-gray-900 mb-3">Training Actions</h4>
            <div className="flex space-x-3">
              <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-green-700 transition-colors">
                Confirm Classification
              </button>
              <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors">
                Report Incorrect
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}