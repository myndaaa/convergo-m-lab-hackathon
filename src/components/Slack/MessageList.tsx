import { useState } from 'react'; 
import { Bot, User, Clock, AlertTriangle, HelpCircle } from 'lucide-react';
import { Message } from '../../types';
import { useAppStore } from '../../store/useAppStore';
import { ExplainabilityModal } from '../Shared/ExplainabilityModal';

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <div className="p-4 sm:p-6 h-full overflow-y-auto">
      {messages.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-purple-400 mb-4">
            <span className="text-5xl">💬</span>
          </div>
          <p className="text-purple-700 font-medium">No messages yet. Try the demo options on the right!</p>
          <p className="text-purple-600 text-sm mt-2">Send a message to see Convergo in action</p>
        </div>
      ) : (
        <div className="space-y-6 pb-8">
          {messages.map((message) => (
            <MessageItem key={message.id} message={message} />
          ))}
        </div>
      )}
    </div>
  );
}

function MessageItem({ message }: { message: Message }) {
  const [showExplanation, setShowExplanation] = useState(false);
  
  const classification = message.classificationResult || null;
  
  return (
    <div className="flex space-x-4">
      <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-sm">
        <User className="w-5 h-5 text-white" />
      </div>
      
      <div className="flex-1">
        <div className="flex items-center space-x-3 mb-2">
          <span className="font-semibold text-purple-900">{message.created_by}</span>
          <span className="text-xs text-purple-500 bg-purple-100 px-2 py-1 rounded-full">
            <Clock className="w-3 h-3 inline mr-1" />
            {new Date(message.timestamp).toLocaleTimeString()}
          </span>
        </div>
        
        <div className="bg-white border border-purple-200 rounded-xl p-4 mb-3 shadow-sm">
          <p className="text-gray-900 text-sm leading-relaxed">{message.text}</p>
          {message.attachments.length > 0 && (
            <div className="mt-3 text-sm text-purple-600 bg-purple-50 px-3 py-2 rounded-lg">
              📎 {message.attachments.length} attachment(s)
            </div>
          )}
        </div>
        
        {classification && (
          <div className="mt-2">
            <ConvergoResponse 
              classification={classification} 
              messageId={message.id} 
              onShowExplanation={() => setShowExplanation(true)}
            />
          </div>
        )}
      </div>

      {classification && (
        <ExplainabilityModal
          isOpen={showExplanation}
          onClose={() => setShowExplanation(false)}
          classification={classification}
        />
      )}
    </div>
  );
}

function ConvergoResponse({ 
  classification, 
  messageId, 
  onShowExplanation 
}: { 
  classification: any; 
  messageId: string;
  onShowExplanation: () => void;
}) {
  const [showProcessPopup, setShowProcessPopup] = useState(false);
  const [showTrainingPopup, setShowTrainingPopup] = useState(false);
  
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'expense': return 'bg-green-100 text-green-800 border-green-200';
      case 'procurement': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'approval': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleProcessWithConvergo = () => {
    setShowProcessPopup(true);
    setTimeout(() => setShowProcessPopup(false), 3000);
  };
   

  const handleTrainingAction = () => {
    setShowTrainingPopup(true);
    setTimeout(() => setShowTrainingPopup(false), 3000);
  };
  
  return (
    <div className="flex space-x-4">
      <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-sm overflow-hidden">
        <img src="/logo.png" alt="Convergo Logo" className="w-full h-full object-cover" />
      </div>
      
      <div className="flex-1">
        <div className="flex items-center space-x-3 mb-2">
          <span className="font-semibold text-indigo-900">Convergo AI</span>
          <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full font-medium">Bot</span>
        </div>
        
        <div className="bg-white border-2 border-indigo-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getTypeColor(classification.type)}`}>
                {classification.type.charAt(0).toUpperCase() + classification.type.slice(1)}
              </span>
              <span className="text-sm text-gray-600">
                {Math.round(classification.confidence * 100)}% confidence
              </span>
              {classification.confidence < 0.7 && (
                <AlertTriangle className="w-4 h-4 text-yellow-500" />
              )}
            </div>
            
            <button 
              onClick={onShowExplanation}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Why?</span>
            </button>
          </div>
          
          <div className="space-y-2">
            <div className="text-sm">
              <span className="font-medium text-gray-700">Detected:</span> {classification.description}
            </div>
            {classification.extracted_amount && (
              <div className="text-sm">
                <span className="font-medium text-gray-700">Amount:</span> {classification.extracted_amount}
              </div>
            )}
            
            <div className="flex space-x-3 mt-4">
              <button 
                onClick={handleProcessWithConvergo}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg text-sm font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-sm hover:shadow-md"
              >
                Process with Convergo
              </button>
              <button 
                onClick={handleTrainingAction}
                className="border-2 border-indigo-200 text-indigo-700 px-6 py-3 rounded-lg text-sm font-medium hover:bg-indigo-50 transition-colors"
              >
                Training Actions
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Process Popup */}
      {showProcessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md mx-auto shadow-xl">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <img src="/logo.png" alt="Convergo Logo" className="w-8 h-8 object-cover" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Demo Mode</h3>
              <p className="text-gray-600 text-sm">
                This will appear on your Slack workspace. This is a demo.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Training Popup */}
      {showTrainingPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md mx-auto shadow-xl">
            <div className="text-center">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Training Actions</h3>
              <p className="text-gray-600 text-sm">
                This is how users can choose to train Convergo consistently.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}