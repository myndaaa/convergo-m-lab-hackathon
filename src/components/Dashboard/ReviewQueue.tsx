import React, { useState } from 'react';
import { Clock, AlertTriangle, CheckCircle, X, Eye, Edit3, Info } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { Extraction } from '../../types';

export function ReviewQueue() {
  const { extractions, updateExtraction, addERPEntry, addAuditLog } = useAppStore();
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  
  const pendingExtractions = extractions.filter(ext => ext.status === 'pending');
  
  const handleApprove = (extraction: Extraction) => {
    // Check for anomalies based on amount and confidence
    const amount = extraction.fields.amount;
    let anomalyFlag = undefined;
    
    // Check for low confidence (meme/joke content)
    if (extraction.confidence < 0.4) {
      anomalyFlag = {
        reason: 'Very low confidence - possible joke/meme content',
        score: 1 - extraction.confidence,
        threshold: 0.6
      };
    }
    // Check for amount anomalies
    else if (amount) {
      if (amount > 5000) {
        anomalyFlag = {
          reason: 'Amount exceeds normal threshold for category',
          score: amount / 1000,
          threshold: 5.0
        };
      } else if (amount < 10) {
        anomalyFlag = {
          reason: 'Unusually low amount detected',
          score: 10 / amount,
          threshold: 2.0
        };
      }
    }
    
    // Create ERP entry
    const idempotencyKey = btoa(`${extraction.message_id}_${JSON.stringify(extraction.fields)}`).replace(/[+/=]/g, '').substring(0, 32);
    
    addERPEntry({
      type: extraction.type,
      normalized_fields: extraction.fields,
      status: 'approved',
      mock_erp_id: `ERP_${Date.now()}`,
      idempotency_key: idempotencyKey,
      created_at: new Date().toISOString(),
      approved_by: 'current_user',
      approved_at: new Date().toISOString(),
      anomaly_flag: anomalyFlag
    });
    
    // Update extraction status
    updateExtraction(extraction.id, { status: 'confirmed' });
    
    // Add audit log
    addAuditLog({
      entity_type: 'extraction',
      entity_id: extraction.id,
      action: 'approve',
      actor: 'current_user',
      timestamp: new Date().toISOString(),
      json_patch: [{ op: 'replace', path: '/status', value: 'confirmed' }]
    });
  };
  
  const handleReject = (extraction: Extraction) => {
    updateExtraction(extraction.id, { status: 'rejected' });
    
    addAuditLog({
      entity_type: 'extraction',
      entity_id: extraction.id,
      action: 'reject',
      actor: 'current_user',
      timestamp: new Date().toISOString(),
      json_patch: [{ op: 'replace', path: '/status', value: 'rejected' }]
    });
  };
  
  if (pendingExtractions.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
        <div className="text-center">
          <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">All caught up!</h3>
          <p className="text-gray-600">No pending extractions to review.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Review Queue</h2>
        <p className="text-sm text-gray-600">{pendingExtractions.length} items awaiting review</p>
      </div>
      
      <div className="divide-y divide-gray-200">
        {pendingExtractions.map((extraction) => (
          <ExtractionItem
            key={extraction.id}
            extraction={extraction}
            expanded={expandedItem === extraction.id}
            onToggleExpand={() => setExpandedItem(expandedItem === extraction.id ? null : extraction.id)}
            onApprove={() => handleApprove(extraction)}
            onReject={() => handleReject(extraction)}
            canApprove={true}
          />
        ))}
      </div>
    </div>
  );
}

interface ExtractionItemProps {
  extraction: Extraction;
  expanded: boolean;
  onToggleExpand: () => void;
  onApprove: () => void;
  onReject: () => void;
  canApprove: boolean;
}

function ExtractionItem({ extraction, expanded, onToggleExpand, onApprove, onReject, canApprove }: ExtractionItemProps) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'expense': return '💳';
      case 'procurement': return '📦';
      case 'approval': return '✅';
      case 'leave': return '🏖️';
      case 'reimbursement': return '💰';
      default: return '❓';
    }
  };
  
  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return 'text-green-600 bg-green-100';
    if (confidence >= 0.6) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };
  
  return (
    <div className="p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="text-2xl">{getTypeIcon(extraction.type)}</div>
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-medium text-gray-900 capitalize">{extraction.type}</h3>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConfidenceColor(extraction.confidence)}`}>
                {Math.round(extraction.confidence * 100)}%
              </span>
              {extraction.anomaly_flag && (
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 flex items-center space-x-1">
                  <AlertTriangle className="w-3 h-3" />
                  <span>Anomaly</span>
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 mt-1">
              {extraction.type === 'leave' ? (
                <>
                  Reason: {extraction.fields.reason || 'Annual Leave'} • 
                  Date: {extraction.fields.date || 'Not specified'}
                </>
              ) : (
                <>
                  Department: {extraction.fields.department || 'Finance'} • 
                  Amount: {extraction.fields.amount || 'N/A'}
                </>
              )}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={onToggleExpand}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Eye className="w-4 h-4" />
          </button>
          
          {canApprove && (
            <>
              <button
                onClick={onApprove}
                className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center space-x-1"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Accept</span>
              </button>
              <button
                onClick={onReject}
                className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center space-x-1"
              >
                <X className="w-4 h-4" />
                <span>Reject</span>
              </button>
            </>
          )}
        </div>
      </div>
      
      {expanded && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Extracted Data</h4>
              <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                {Object.entries(extraction.fields).map(([key, value]) => (
                  <div key={key} className="flex justify-between">
                    <span className="text-sm font-medium text-gray-600 capitalize">{key}:</span>
                    <span className="text-sm text-gray-900">{String(value)}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-2">AI Explanation</h4>
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="text-sm space-y-1">
                  <p className="flex items-center space-x-1">
                    <span className="font-medium">Rules fired:</span>
                    <Info className="w-3 h-3 text-blue-500" title="AI rules that were triggered to classify this message" />
                    <span>{extraction.provenance.rules_fired.join(', ')}</span>
                  </p>
                  <p className="flex items-center space-x-1">
                    <span className="font-medium">ML Score:</span>
                    <Info className="w-3 h-3 text-blue-500" title="Machine learning confidence score based on text analysis" />
                    <span>{extraction.provenance.tfidf_score.toFixed(3)}</span>
                  </p>
                  <p className="flex items-center space-x-1">
                    <span className="font-medium">Confidence:</span>
                    <Info className="w-3 h-3 text-blue-500" title="Overall confidence score combining rules and ML analysis" />
                    <span>{Math.round(extraction.confidence * 100)}%</span>
                  </p>
                </div>
                
                <button className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1">
                  <Edit3 className="w-3 h-3" />
                  <span>Train Mapping</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}