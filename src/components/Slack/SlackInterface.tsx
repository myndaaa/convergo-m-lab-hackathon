import React, { useState } from 'react';
import { useAppStore } from '../../store/useAppStore';
import { SlackConnectModal } from './SlackConnectModal';
import { MessageList } from './MessageList';
import { DemoSection } from './DemoSection';
import { Slack, Wifi, WifiOff } from 'lucide-react';

export function SlackInterface() {
  const { slackConnected, messages } = useAppStore();
  const [showConnectModal, setShowConnectModal] = useState(false);

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Slack className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-bold text-gray-900">Slack Workspace</h1>
              <p className="text-sm sm:text-base text-gray-600">#general channel</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
            <div className="flex items-center space-x-2">
              {slackConnected ? (
                <div className="flex items-center space-x-2 text-green-600">
                  <Wifi className="w-4 h-4" />
                  <span className="text-sm font-medium">Convergo Connected</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2 text-gray-500">
                  <WifiOff className="w-4 h-4" />
                  <span className="text-sm font-medium">Not Connected</span>
                </div>
              )}
            </div>
            
            <button
              onClick={() => setShowConnectModal(true)}
              className={`px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                slackConnected
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {slackConnected ? 'Disconnect' : 'Connect to Slack'}
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-hidden">
        {!slackConnected ? (
          <div className="h-full flex items-center justify-center p-8">
            <div className="max-w-md text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg">
                <Slack className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Connect to Slack</h3>
              <p className="text-gray-600 mb-6">
                Install the Convergo plugin to start transforming your chat messages into structured ERP data.
              </p>
              <button
                onClick={() => setShowConnectModal(true)}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Install Convergo Plugin
              </button>
            </div>
          </div>
        ) : (
          <div className="h-full flex gap-6 p-6">
            {/* Messages Area - Left Column */}
            <div className="w-[48%] bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-indigo-600 px-4 py-3">
                <h2 className="text-white font-semibold text-lg">Slack Messages</h2>
                <p className="text-purple-100 text-sm">Real-time message processing</p>
              </div>
              <div className="flex-1 overflow-y-auto" style={{ height: 'calc(100vh - 250px)', maxHeight: '70vh' }}>
                <MessageList messages={messages} />
              </div>
            </div>
            
            {/* Demo Section - Right Column */}
            <div className="w-[48%] bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-3">
                <h2 className="text-white font-semibold text-lg">Convergo Demo</h2>
                <p className="text-blue-100 text-sm">Try different message types</p>
              </div>
              <div className="overflow-y-auto" style={{ height: 'calc(100vh - 250px)', maxHeight: '70vh' }}>
                <DemoSection />
              </div>
            </div>
          </div>
        )}
      </div>

      <SlackConnectModal 
        isOpen={showConnectModal} 
        onClose={() => setShowConnectModal(false)} 
      />
    </div>
  );
}