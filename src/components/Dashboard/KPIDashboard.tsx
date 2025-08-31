import React from 'react';
import { TrendingUp, PieChart, BarChart3, Activity, DollarSign, Clock, CheckCircle, AlertTriangle, Users, Zap, Target, Award } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart as RechartsPieChart, Cell, BarChart, Bar, Pie } from 'recharts';

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export function KPIDashboard() {
  const spendData = [
    { name: 'IT Equipment', value: 45000, color: COLORS[0] },
    { name: 'Office Supplies', value: 12000, color: COLORS[1] },
    { name: 'Travel & Meals', value: 8500, color: COLORS[2] },
    { name: 'Professional Services', value: 15000, color: COLORS[3] },
    { name: 'Facilities', value: 6500, color: COLORS[4] }
  ];

  const trendData = [
    { month: 'Oct', processed: 145, approved: 120, rejected: 25 },
    { month: 'Nov', processed: 178, approved: 155, rejected: 23 },
    { month: 'Dec', processed: 203, approved: 185, rejected: 18 },
    { month: 'Jan', processed: 234, approved: 210, rejected: 24 }
  ];

  const budgetData = [
    { dept: 'Engineering', budget: 50000, actual: 32500, forecast: 48000 },
    { dept: 'Marketing', budget: 25000, actual: 18750, forecast: 24200 },
    { dept: 'Sales', budget: 35000, actual: 28900, forecast: 33500 },
    { dept: 'Operations', budget: 20000, actual: 15600, forecast: 19800 }
  ];

  return (
    <div className="space-y-6">
      {/* KPI Metrics Overview */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
            <Target className="w-5 h-5 text-indigo-600" />
            <span>Key Performance Indicators</span>
          </h3>
          <span className="text-sm text-gray-500">Real-time Metrics</span>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Processing Efficiency */}
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-700">Processing Efficiency</p>
                <p className="text-2xl font-bold text-blue-900">94.2%</p>
                <p className="text-xs text-blue-600 mt-1">↑ 2.1% vs last month</p>
              </div>
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          {/* Average Processing Time */}
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-700">Avg. Processing Time</p>
                <p className="text-2xl font-bold text-green-900">2.3s</p>
                <p className="text-xs text-green-600 mt-1">↓ 0.8s vs last month</p>
              </div>
              <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          {/* Cost Savings */}
          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-700">Cost Savings</p>
                <p className="text-2xl font-bold text-purple-900">$127K</p>
                <p className="text-xs text-purple-600 mt-1">↑ 15% vs last quarter</p>
              </div>
              <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>

          {/* User Satisfaction */}
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700">User Satisfaction</p>
                <p className="text-2xl font-bold text-orange-900">4.8/5</p>
                <p className="text-xs text-orange-600 mt-1">↑ 0.2 vs last month</p>
              </div>
              <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          {/* Approval Rate */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">Approval Rate</h4>
              <CheckCircle className="w-4 h-4 text-green-600" />
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '89%' }}></div>
              </div>
              <span className="text-sm font-medium text-gray-900">89%</span>
            </div>
            <p className="text-xs text-gray-600 mt-1">1,234 approved / 1,387 total</p>
          </div>

          {/* Anomaly Detection */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">Anomaly Detection</h4>
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '76%' }}></div>
              </div>
              <span className="text-sm font-medium text-gray-900">76%</span>
            </div>
            <p className="text-xs text-gray-600 mt-1">23 anomalies detected</p>
          </div>

          {/* Active Users */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium text-gray-900">Active Users</h4>
              <Users className="w-4 h-4 text-blue-600" />
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
              <span className="text-sm font-medium text-gray-900">92%</span>
            </div>
            <p className="text-xs text-gray-600 mt-1">156 active / 170 total users</p>
          </div>
        </div>

        {/* Performance Summary */}
        <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-200">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <div>
              <h4 className="font-medium text-indigo-900">Performance Summary</h4>
              <p className="text-sm text-indigo-700">
                Convergo has processed <strong>15,432 requests</strong> this month with an average accuracy of <strong>94.2%</strong>. 
                Processing time reduced by <strong>28%</strong> compared to manual workflows.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Spend by Category Component
export function SpendByCategory() {
  const spendData = [
    { name: 'IT Equipment', value: 45000, color: COLORS[0] },
    { name: 'Office Supplies', value: 12000, color: COLORS[1] },
    { name: 'Travel & Meals', value: 8500, color: COLORS[2] },
    { name: 'Professional Services', value: 15000, color: COLORS[3] },
    { name: 'Facilities', value: 6500, color: COLORS[4] }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <PieChart className="w-5 h-5 text-blue-600" />
          <span>Spend by Category</span>
        </h3>
        <span className="text-sm text-gray-500">This Month</span>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={spendData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {spendData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']} />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
      
      <div className="grid grid-cols-2 gap-2 mt-4">
        {spendData.map((item, index) => (
          <div key={item.name} className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
            <span className="text-sm text-gray-600">{item.name}</span>
            <span className="text-sm font-medium text-gray-900">${item.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Processing Trends Component
export function ProcessingTrends() {
  const [selectedPeriod, setSelectedPeriod] = React.useState('4months');

  // Different datasets for different time periods
  const trendDataSets = {
    '4months': [
      { month: 'Oct', processed: 145, approved: 120, rejected: 25 },
      { month: 'Nov', processed: 178, approved: 155, rejected: 23 },
      { month: 'Dec', processed: 203, approved: 185, rejected: 18 },
      { month: 'Jan', processed: 234, approved: 210, rejected: 24 }
    ],
    '6months': [
      { month: 'Aug', processed: 98, approved: 85, rejected: 13 },
      { month: 'Sep', processed: 112, approved: 95, rejected: 17 },
      { month: 'Oct', processed: 145, approved: 120, rejected: 25 },
      { month: 'Nov', processed: 178, approved: 155, rejected: 23 },
      { month: 'Dec', processed: 203, approved: 185, rejected: 18 },
      { month: 'Jan', processed: 234, approved: 210, rejected: 24 }
    ],
    '12months': [
      { month: 'Feb', processed: 67, approved: 58, rejected: 9 },
      { month: 'Mar', processed: 89, approved: 75, rejected: 14 },
      { month: 'Apr', processed: 134, approved: 118, rejected: 16 },
      { month: 'May', processed: 156, approved: 142, rejected: 14 },
      { month: 'Jun', processed: 178, approved: 165, rejected: 13 },
      { month: 'Jul', processed: 145, approved: 132, rejected: 13 },
      { month: 'Aug', processed: 98, approved: 85, rejected: 13 },
      { month: 'Sep', processed: 112, approved: 95, rejected: 17 },
      { month: 'Oct', processed: 145, approved: 120, rejected: 25 },
      { month: 'Nov', processed: 178, approved: 155, rejected: 23 },
      { month: 'Dec', processed: 203, approved: 185, rejected: 18 },
      { month: 'Jan', processed: 234, approved: 210, rejected: 24 }
    ]
  };

  const currentData = trendDataSets[selectedPeriod as keyof typeof trendDataSets];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center space-x-2">
          <TrendingUp className="w-5 h-5 text-green-600" />
          <span>Processing Trends</span>
        </h3>
        <select 
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="4months">Last 4 Months</option>
          <option value="6months">Last 6 Months</option>
          <option value="12months">Last Year</option>
        </select>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={currentData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="processed" stroke="#3B82F6" strokeWidth={2} name="Processed" />
            <Line type="monotone" dataKey="approved" stroke="#10B981" strokeWidth={2} name="Approved" />
            <Line type="monotone" dataKey="rejected" stroke="#EF4444" strokeWidth={2} name="Rejected" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}