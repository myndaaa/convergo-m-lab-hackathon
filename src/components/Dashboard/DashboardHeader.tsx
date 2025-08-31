import React from 'react';
import { Sparkles, TrendingUp, Shield, Zap } from 'lucide-react';

export function DashboardHeader() {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Convergo Dashboard</h1>
            <p className="text-gray-600">
              Transform chat messages into structured ERP data with AI-powered automation
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Live Processing</span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
            <Sparkles className="w-5 h-5 text-blue-600" />
            <div>
              <p className="font-medium text-gray-900">AI-Powered Classification</p>
              <p className="text-sm text-gray-600">Automatic intent detection and data extraction</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-200">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <div>
              <p className="font-medium text-gray-900">Real-time Analytics</p>
              <p className="text-sm text-gray-600">KPIs, forecasting, and anomaly detection</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
            <Shield className="w-5 h-5 text-purple-600" />
            <div>
              <p className="font-medium text-gray-900">Enterprise Security</p>
              <p className="text-sm text-gray-600">Audit trails, compliance, and data protection</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}