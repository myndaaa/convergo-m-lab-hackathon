import React, { useState } from 'react';
import { Send, Image, Globe, DollarSign, ArrowRight, RotateCcw, X, Eye } from 'lucide-react'; 
import { useAppStore } from '../../store/useAppStore';
import { useClassification } from '../../hooks/useClassification';

export function DemoSection() {
  const { addMessage, clearAllData, isDemoDataExpired, demoDataTimestamp, sentDemoMessages, markDemoMessageSent, setCurrentTab } = useAppStore();
  const { classifyMessage } = useClassification();
  const [showImageModal, setShowImageModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Check if demo data has expired on component mount
  React.useEffect(() => {
    try {
      console.log('DemoSection mounted, checking persistence:', {
        demoDataTimestamp,
        sentDemoMessages,
        hasExpired: demoDataTimestamp ? isDemoDataExpired() : 'no timestamp'
      });
      
      if (demoDataTimestamp && isDemoDataExpired()) {
        console.log('Demo data expired, clearing...');
        clearAllData();
      }
      setIsLoading(false);
      
      // Check current state after loading
      setTimeout(checkCurrentState, 100);
    } catch (error) {
      console.error('Error checking demo data expiration:', error);
      // If there's an error, clear the data to be safe
      clearAllData();
      setIsLoading(false);
    }
  }, [demoDataTimestamp, isDemoDataExpired, clearAllData]);
  
  const demoMessages = [
    {
      id: 'assets',
      title: 'Send a message to Convergo to process the purchase of assets worth $10,000, for new furnitures in office',
      text: '@convergo We need to purchase new office furniture worth $10,000 for the engineering department. Please process this procurement request.',
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50 border-green-200 hover:bg-green-100',
      description: 'This will be classified as a procurement request and processed into the ERP system.'
    },
    {
      id: 'mixed-lang',
      title: 'Mixed language demo (Bangla + English)',
      text: '@convergo ajke lunch purchased for 200 BDT from local restaurant',
      icon: Globe,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50 border-blue-200 hover:bg-blue-100',
      description: 'This will be classified as a reimbursement request and processed into the ERP system.'
    },
    {
      id: 'receipt',
      title: 'Attach image message to Convergo, with text receipt for lunch',
      text: '@convergo Here is the receipt for today\'s lunch expense, amount is 3.03 USD and also state equivalent in BDT multiplied by 122 BDT',
      icon: Image,
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50 border-purple-200 hover:bg-purple-100',
      hasAttachment: true,
      attachmentName: 'receipt.jpg',
      description: 'This will be classified as a reimbursement request and processed using OCR.'
    },
    {
      id: 'leave-request',
      title: 'Request annual leave for personal event',
      text: '@convergo need annual leave on 15th december for my upcoming wedding',
      icon: Globe,
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-50 border-orange-200 hover:bg-orange-100',
      description: 'This will be classified as a leave request and processed through HR system.'
    },
    {
      id: 'food-reimbursement',
      title: 'Food reimbursement request',
      text: '@convergo need reimbursement for team lunch yesterday, spent $45 on pizza',
      icon: DollarSign,
      color: 'from-teal-500 to-cyan-600',
      bgColor: 'bg-teal-50 border-teal-200 hover:bg-teal-100',
      description: 'This will be classified as a reimbursement request and processed into the ERP system.'
    },
    {
      id: 'meme-expense',
      title: 'Meme about expenses (low confidence demo)',
      text: '@convergo when the company says "we\'re all family" but won\'t reimburse your $5 coffee 😂',
      icon: Globe,
      color: 'from-gray-500 to-slate-600',
      bgColor: 'bg-gray-50 border-gray-200 hover:bg-gray-100',
      description: 'This will be flagged with very low confidence due to meme/joke content.'
    }
  ];
  
  const handleSendMessage = (demo: typeof demoMessages[0]) => {
    // Mark this message as sent first (immediate state update)
    markDemoMessageSent(demo.id);
    
    // Add message to Slack workspace
    const attachments = demo.hasAttachment ? [{
      filename: demo.attachmentName || 'receipt.jpg',
      content_type: 'image/jpeg',
      size: 245760,
      url: '/receipt.jpg'
    }] : [];

    const classification = classifyMessage(demo.text, attachments);
    
    addMessage({
      source: 'slack',
      text: demo.text,
      attachments,
      timestamp: new Date().toISOString(),
      created_by: 'demo_user',
      convergo_command: true
    }, classification);
    
    // Show a brief popup message
    const popup = document.createElement('div');
    popup.className = 'fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    popup.textContent = 'Demo message sent! Check the Slack workspace.';
    document.body.appendChild(popup);
    
    // Remove popup after 2 seconds
    setTimeout(() => {
      document.body.removeChild(popup);
    }, 2000);
  };

  const handleRestore = () => {
    clearAllData();
  };

  const handleImagePreview = () => {
    setShowImageModal(true);
  };

  const checkCurrentState = () => {
    console.log('Current state check:', {
      sentDemoMessages,
      isArray: Array.isArray(sentDemoMessages),
      length: Array.isArray(sentDemoMessages) ? sentDemoMessages.length : 'not array',
      includesMixed: Array.isArray(sentDemoMessages) ? sentDemoMessages.includes('mixed-lang') : false
    });
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="flex items-center justify-center h-32">
          <div className="text-gray-600">Loading demo data...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6">
      {/* Header Section with Visual Separation */}
      <div className="mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start mb-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mr-3">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900">Try Convergo Demo</h3>
          </div>
          <p className="text-gray-600 text-sm sm:text-base max-w-2xl">
            Send messages to Convergo and see how it processes them into structured ERP data.
          </p>
        </div>
        
        <button
          onClick={handleRestore}
          className="bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors flex items-center space-x-2 self-center sm:self-auto"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Restore</span>
        </button>
      </div>
      
      {/* Demo Messages Container */}
      <div className="demo-messages-container p-4 sm:p-6">
        <div className="mb-4">
          <h4 className="text-lg font-semibold text-gray-900 text-center sm:text-left">Available Demo Messages</h4>
        </div>
        <div className="space-y-4 sm:space-y-5">
          {demoMessages.map((demo) => {
            const Icon = demo.icon;
            const isSent = Array.isArray(sentDemoMessages) ? sentDemoMessages.includes(demo.id) : false;
            
            return (
              <div
                key={demo.id}
                className={`p-4 sm:p-5 border-2 rounded-xl transition-all shadow-sm hover:shadow-md ${demo.bgColor}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-start space-x-3 mb-3">
                    <div className={`w-8 h-8 bg-gradient-to-r ${demo.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <Icon className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 text-sm leading-tight">{demo.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">{demo.description}</p>
                    </div>
                  </div>
                  
                  <div className="bg-white border border-gray-200 rounded-lg p-3 mb-3">
                    <p className="text-sm text-gray-800 font-mono break-words">{demo.text}</p>
                    {demo.hasAttachment && (
                      <div className="mt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <div className="flex items-center space-x-2 text-xs text-gray-600">
                          <Image className="w-3 h-3" />
                          <span>{demo.attachmentName}</span>
                          <span className="text-gray-400">•</span>
                          <span>199 KB</span>
                        </div>
                        <button
                          onClick={handleImagePreview}
                          className="flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-800 transition-colors self-start sm:self-auto"
                        >
                          <Eye className="w-3 h-3" />
                          <span>Preview</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                
                <button
                  onClick={() => {
                    console.log('Button clicked for:', demo.id);
                    handleSendMessage(demo);
                  }}
                  disabled={isSent}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-2 self-start sm:self-auto ${
                    isSent 
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-green-600 text-white hover:bg-green-700 active:bg-green-800'
                  }`}
                >
                  <Send className="w-4 h-4" />
                  <span>{isSent ? 'Sent' : 'Send'}</span>
                </button>
              </div>
            </div>
          );
        })}
        </div>
      </div>
      
      <div className="mt-4 sm:mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-blue-900">Ready to see the magic?</p>
            <p className="text-xs text-blue-700">Head over to Convergo Dashboard to see processed data</p>
          </div>
          <button
            onClick={() => setCurrentTab('dashboard')}
            className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors self-start sm:self-auto"
          >
            <ArrowRight className="w-5 h-5" />
            <span className="text-sm font-medium">Go to Dashboard</span>
          </button>
        </div>
      </div>
      
      {demoDataTimestamp && (
        <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-xs text-green-800">
            <span className="font-medium">✓ Data persistence:</span> Your demo data will be preserved for 10 minutes. 
            Refresh the page to test persistence!
          </p>
          <p className="text-xs text-green-700 mt-1">
            Sent messages: {Array.isArray(sentDemoMessages) ? sentDemoMessages.length : 0} | 
            Timestamp: {new Date(demoDataTimestamp).toLocaleTimeString()}
          </p>
          <p className="text-xs text-green-600 mt-1">
            Sent IDs: {Array.isArray(sentDemoMessages) ? sentDemoMessages.join(', ') : 'none'}
          </p>
        </div>
      )}
      
      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-xs text-yellow-800">
          <span className="font-medium">* Conditions apply:</span> This is a mock demonstration of how our app works. 
          No real Slack integration, OCR, or NLP processing occurs.
        </p>
      </div>

      {/* Image Preview Modal */}
      {showImageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Receipt Preview</h3>
              <button
                onClick={() => setShowImageModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="p-4">
              <img
                src="/receipt.jpg"
                alt="Lunch receipt"
                className="w-full h-auto rounded-lg shadow-lg"
                style={{ maxHeight: '70vh' }}
              />
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">
                  This receipt will be processed by Convergo's OCR to extract expense details
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}