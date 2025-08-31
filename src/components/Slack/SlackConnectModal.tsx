import React from 'react';
import { X, ExternalLink, Shield, Zap, Users } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

interface SlackConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SlackConnectModal({ isOpen, onClose }: SlackConnectModalProps) {
  const { setSlackConnected, slackConnected } = useAppStore();
  
  if (!isOpen) return null;
  
  const handleToggleConnection = () => {
    setSlackConnected(!slackConnected);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full transform transition-all">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900">Install Convergo for Slack</h3>
            <button 
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="mb-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold">C</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">Convergo AI</h4>
                <p className="text-sm text-gray-600">by Convergo Team</p>
              </div>
            </div>
            
            <p className="text-gray-600 mb-6">
              Transform your Slack messages into structured ERP data automatically. 
              Process receipts, handle approvals, and streamline your business workflows.
            </p>
            
            <div className="space-y-3 mb-6">
              <div className="flex items-center space-x-3">
                <Shield className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-700">Enterprise-grade security and compliance</span>
              </div>
              <div className="flex items-center space-x-3">
                <Zap className="w-4 h-4 text-yellow-600" />
                <span className="text-sm text-gray-700">AI-powered OCR and data extraction</span>
              </div>
              <div className="flex items-center space-x-3">
                <Users className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-700">Seamless approval workflows</span>
              </div>
            </div>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={handleToggleConnection}
              className={`w-full py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2 ${
                slackConnected
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              <span>{slackConnected ? 'Disconnect' : 'Allow & Install'}</span>
              <ExternalLink className="w-4 h-4" />
            </button>
            
            <button
              onClick={onClose}
              className="w-full border border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          </div>
          
          <p className="text-xs text-gray-500 mt-4 text-center">
            This will install Convergo in your workspace with permissions to read messages and post responses.
          </p>
        </div>
      </div>
    </div>
  );
}