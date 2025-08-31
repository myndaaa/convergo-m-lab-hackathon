import React, { useState } from 'react';
import { Database, CheckCircle, Clock, AlertTriangle, Filter, Download, Search, TrendingUp, X, BookOpen, Users, Shield, BarChart3, Eye, Settings, Zap } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export function ERPSystem() {
  const { erpEntries, erpConnected, setErpConnected, messages, sentDemoMessages } = useAppStore();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDocumentation, setShowDocumentation] = useState(false);

  const filteredEntries = erpEntries.filter(entry => {
    const matchesSearch = searchTerm === '' || 
      entry.normalized_fields.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.mock_erp_id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'all' || entry.status === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'rejected': return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default: return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const exportData = () => {
    try {
      const timestamp = new Date().toISOString().split('T')[0];
      
      // Define demo messages
      const demoMessages = [
        {
          id: 'assets',
          title: 'Send a message to Convergo to process the purchase of assets worth $10,000, for new furnitures in office',
          text: '@convergo We need to purchase new office furniture worth $10,000 for the engineering department. Please process this procurement request.',
          type: 'procurement',
          expectedERP: 'ERP-2024-001'
        },
        {
          id: 'mixed-lang',
          title: 'Mixed language demo (Bangla + English)',
          text: '@convergo ajke lunch purchased for 200 BDT from local restaurant',
          type: 'reimbursement',
          expectedERP: 'ERP-2024-002'
        },
        {
          id: 'receipt',
          title: 'Attach image message to Convergo, with text receipt for lunch',
          text: '@convergo Here is the receipt for today\'s lunch expense, amount is 3.03 USD and also state equivalent in BDT multiplied by 122 BDT',
          type: 'reimbursement',
          expectedERP: 'ERP-2024-005'
        },
        {
          id: 'leave-request',
          title: 'Request annual leave for personal event',
          text: '@convergo need annual leave on 15th december for my upcoming wedding',
          type: 'leave',
          expectedERP: 'ERP-2024-004'
        },
        {
          id: 'food-reimbursement',
          title: 'Food reimbursement request',
          text: '@convergo need reimbursement for team lunch yesterday, spent $45 on pizza',
          type: 'reimbursement',
          expectedERP: 'ERP-2024-002'
        },
        {
          id: 'meme-expense',
          title: 'Meme about expenses (low confidence demo)',
          text: '@convergo when the company says "we\'re all family" but won\'t reimburse your $5 coffee 😂',
          type: 'expense',
          expectedERP: 'ERP-2024-007'
        }
      ];

      // Filter only sent demo messages
      const sentDemoMessagesData = demoMessages.filter(demo => sentDemoMessages.includes(demo.id));
      
      // Create JSON data with only sent messages
      const jsonData = {
        exportInfo: {
          timestamp: new Date().toISOString(),
          totalSentMessages: sentDemoMessagesData.length,
          totalERPs: erpEntries.length,
          sentDemoMessages: sentDemoMessagesData.map(demo => ({
            id: demo.id,
            title: demo.title,
            text: demo.text,
            type: demo.type,
            expectedERP: demo.expectedERP,
            sent: true
          })),
          messages: messages.map(msg => ({
            id: msg.id,
            text: msg.text,
            timestamp: msg.timestamp,
            classification: msg.classificationResult,
            attachments: msg.attachments
          })),
          erpEntries: erpEntries.map(entry => ({
            id: entry.id,
            mock_erp_id: entry.mock_erp_id,
            type: entry.type,
            status: entry.status,
            normalized_fields: entry.normalized_fields,
            created_at: entry.created_at,
            approved_by: entry.approved_by,
            approved_at: entry.approved_at
          }))
        }
      };

      // Create JSON file
      const jsonBlob = new Blob([JSON.stringify(jsonData, null, 2)], { type: 'application/json' });
      const jsonUrl = window.URL.createObjectURL(jsonBlob);
      const jsonLink = document.createElement('a');
      jsonLink.href = jsonUrl;
      jsonLink.download = `convergo-sent-messages-${timestamp}.json`;
      jsonLink.click();
      window.URL.revokeObjectURL(jsonUrl);

      // Create simple HTML report with only sent messages
      const htmlContent = `
        <html>
          <head>
            <title>Convergo Sent Messages Report</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              h1 { color: #4f46e5; border-bottom: 2px solid #4f46e5; padding-bottom: 10px; }
              h2 { color: #6366f1; margin-top: 30px; }
              .sent-message { 
                background: #dcfce7; 
                border: 1px solid #10b981; 
                padding: 15px; 
                margin: 10px 0; 
                border-radius: 8px; 
              }
              .erp-entry { 
                background: #f0f9ff; 
                border: 1px solid #bae6fd; 
                padding: 12px; 
                margin: 8px 0; 
                border-radius: 6px; 
              }
              table { width: 100%; border-collapse: collapse; margin: 15px 0; }
              th, td { border: 1px solid #d1d5db; padding: 8px; text-align: left; }
              th { background: #f3f4f6; font-weight: bold; }
            </style>
          </head>
          <body>
            <h1>Convergo Sent Messages Report</h1>
            <p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>
            <p><strong>Sent Demo Messages:</strong> ${sentDemoMessagesData.length}</p>
            <p><strong>Total ERP Entries:</strong> ${erpEntries.length}</p>

            <h2>Sent Demo Messages</h2>
            ${sentDemoMessagesData.length > 0 ? 
              sentDemoMessagesData.map(demo => `
                <div class="sent-message">
                  <h3>${demo.title}</h3>
                  <p><strong>Message:</strong> ${demo.text}</p>
                  <p><strong>Type:</strong> ${demo.type}</p>
                  <p><strong>Expected ERP:</strong> ${demo.expectedERP}</p>
                </div>
              `).join('') : 
              '<p>No demo messages have been sent yet.</p>'
            }

            <h2>ERP Entries Summary</h2>
            <table>
              <thead>
                <tr>
                  <th>ERP ID</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Amount</th>
                  <th>Department</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                ${erpEntries.map(entry => `
                  <tr>
                    <td>${entry.mock_erp_id}</td>
                    <td>${entry.type}</td>
                    <td>${entry.status}</td>
                    <td>${entry.normalized_fields.amount ? `${entry.normalized_fields.amount.toLocaleString()} BDT` : 'N/A'}</td>
                    <td>${entry.normalized_fields.department || 'N/A'}</td>
                    <td>${entry.normalized_fields.description || 'N/A'}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>

            <h2>Summary</h2>
            <p>This report contains only the demo messages that have been sent, along with all ERP entries.</p>
            <p><strong>Report generated by Convergo ERP System</strong></p>
          </body>
        </html>
      `;

      // Create HTML file
      const htmlBlob = new Blob([htmlContent], { type: 'text/html' });
      const htmlUrl = window.URL.createObjectURL(htmlBlob);
      const htmlLink = document.createElement('a');
      htmlLink.href = htmlUrl;
      htmlLink.download = `convergo-sent-messages-report-${timestamp}.html`;
      htmlLink.click();
      window.URL.revokeObjectURL(htmlUrl);

      // Show success message
      alert(`Export completed! Downloaded:\n1. convergo-sent-messages-[date].json\n2. convergo-sent-messages-report-[date].html\n\nSent messages: ${sentDemoMessagesData.length}`);
    } catch (error) {
      console.error('Export error:', error);
      alert('Export failed. Please try again.');
    }
  };

  return (
    <div className="h-full bg-gray-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
              <Database className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Convergo ERP System</h1>
              <p className="text-indigo-100">AI-Powered Enterprise Resource Planning Platform</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
              <div className={`w-3 h-3 rounded-full ${erpConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
              <span className="text-sm font-medium text-white">
                {erpConnected ? 'System Online' : 'System Offline'}
              </span>
            </div>
            <button
              onClick={() => setErpConnected(!erpConnected)}
              className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl ${
                erpConnected
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              {erpConnected ? 'Disconnect System' : 'Connect System'}
            </button>
            <button
              onClick={exportData}
              className="bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/30 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <Download className="w-5 h-5" />
              <span>Export Data</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-indigo-100">Total Entries</p>
                <p className="text-3xl font-bold text-white">{erpEntries.length}</p>
                <p className="text-xs text-indigo-200 mt-1">All processed requests</p>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-indigo-100">Approved</p>
                <p className="text-3xl font-bold text-white">
                  {erpEntries.filter(e => e.status === 'approved').length}
                </p>
                <p className="text-xs text-indigo-200 mt-1">Successfully processed</p>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-indigo-100">Pending</p>
                <p className="text-3xl font-bold text-white">
                  {erpEntries.filter(e => e.status === 'pending').length}
                </p>
                <p className="text-xs text-indigo-200 mt-1">Awaiting approval</p>
              </div>
              <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-indigo-100">Processing Rate</p>
                <p className="text-3xl font-bold text-white">94%</p>
                <p className="text-xs text-indigo-200 mt-1">AI accuracy score</p>
              </div>
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-400" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="px-6 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search entries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="approved">Approved</option>
                <option value="pending">Pending</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>
          </div>
          
          <span className="text-sm text-gray-600">
            Showing {filteredEntries.length} of {erpEntries.length} entries
          </span>
        </div>
      </div>

      {/* ERP Entries Table */}
      <div className="p-6">
        {!erpConnected ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg">
              <Database className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Install Convergo Plugin for your ERP Application</h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Transform your ERP system with AI-powered message processing. Automatically extract, classify, and process business requests from Slack, Teams, and email directly into your ERP workflows.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setErpConnected(true)}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Install Convergo Plugin
              </button>
              <button 
                onClick={() => setShowDocumentation(true)}
                className="border-2 border-indigo-200 text-indigo-700 px-8 py-3 rounded-lg font-medium hover:bg-indigo-50 transition-colors"
              >
                View Documentation
            </button>
            </div>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Seamless Integration</h4>
                <p className="text-sm text-gray-600">Connect with SAP, Oracle, NetSuite, and more</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <AlertTriangle className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">AI-Powered Processing</h4>
                <p className="text-sm text-gray-600">Automated classification and data extraction</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Real-time Sync</h4>
                <p className="text-sm text-gray-600">Instant updates across all systems</p>
              </div>
            </div>
          </div>
        ) : filteredEntries.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Database className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No ERP entries found</h3>
            <p className="text-gray-600">
              Process and approve some messages in the Convergo Dashboard to see entries appear here.
            </p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                      Entry ID
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                      Created
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-indigo-600 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredEntries.map((entry) => (
                    <tr key={entry.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{entry.mock_erp_id}</div>
                        <div className="text-xs text-gray-500">ID: {entry.idempotency_key.substring(0, 8)}...</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                          {entry.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(entry.status)}
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize ${getStatusColor(entry.status)}`}>
                            {entry.status}
                          </span>
                          {entry.anomaly_flag && (
                            <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200">
                              Anomaly
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {entry.normalized_fields.amount ? `${entry.normalized_fields.amount.toLocaleString()} BDT` : 'N/A'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {entry.normalized_fields.department || 'Finance'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(entry.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 transition-colors">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Previously Reviewed Section */}
        {erpConnected && (
          <div className="mt-8">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-green-800 flex items-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Previously Reviewed Entries
                </h3>
                <p className="text-sm text-green-700 mt-1">Historical entries that have been processed and reviewed</p>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Entry ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Department
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Original Message
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Reviewed
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {/* Banglish Messages */}
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">ERP-2024-009</div>
                        <div className="text-xs text-gray-500">ID: bang_001_2024</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize">
                          reimbursement
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200 capitalize">
                            approved
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        500 BDT
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        Engineering
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                        <div className="bg-gray-50 p-2 rounded border">
                          <span className="text-gray-600">@convergo</span> ajke lunch khaise 500 taka, reimbursement chai
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        2 days ago
                      </td>
                    </tr>

                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">ERP-2024-010</div>
                        <div className="text-xs text-gray-500">ID: bang_002_2024</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                          leave
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200 capitalize">
                            approved
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        N/A
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        Marketing
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                        <div className="bg-gray-50 p-2 rounded border">
                          <span className="text-gray-600">@convergo</span> ami ajke sick leave nibo, thanda lagche
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        3 days ago
                      </td>
                    </tr>

                    {/* VM Messages */}
                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">ERP-2024-011</div>
                        <div className="text-xs text-gray-500">ID: vm_001_2024</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize">
                          reimbursement
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200 capitalize">
                            approved
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        750 BDT
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        Sales
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                        <div className="bg-gray-50 p-2 rounded border">
                          <span className="text-gray-600">@convergo</span> Need reimbursement for client lunch yesterday, spent 750 BDT
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        4 days ago
                      </td>
                    </tr>

                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">ERP-2024-012</div>
                        <div className="text-xs text-gray-500">ID: vm_002_2024</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 capitalize">
                          leave encashment
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200 capitalize">
                            approved
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        15,000 BDT
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        HR
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                        <div className="bg-gray-50 p-2 rounded border">
                          <span className="text-gray-600">@convergo</span> Requesting leave encashment for 5 unused vacation days
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        1 week ago
                      </td>
                    </tr>

                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">ERP-2024-013</div>
                        <div className="text-xs text-gray-500">ID: vm_003_2024</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                          sick leave
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200 capitalize">
                            approved
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        N/A
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        Finance
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                        <div className="bg-gray-50 p-2 rounded border">
                          <span className="text-gray-600">@convergo</span> Taking sick leave today, not feeling well
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        1 week ago
                      </td>
                    </tr>

                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">ERP-2024-014</div>
                        <div className="text-xs text-gray-500">ID: vm_004_2024</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 capitalize">
                          leave
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200 capitalize">
                            approved
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        N/A
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        Operations
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                        <div className="bg-gray-50 p-2 rounded border">
                          <span className="text-gray-600">@convergo</span> Need 3 days leave for family emergency
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        2 weeks ago
                      </td>
                    </tr>

                    <tr className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">ERP-2024-015</div>
                        <div className="text-xs text-gray-500">ID: vm_005_2024</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize">
                          reimbursement
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-4 h-4 text-green-600" />
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200 capitalize">
                            approved
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        1,200 BDT
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        IT
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                        <div className="bg-gray-50 p-2 rounded border">
                          <span className="text-gray-600">@convergo</span> Team dinner reimbursement for 1200 BDT
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        2 weeks ago
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Documentation Modal */}
      {showDocumentation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-8 h-8" />
                  <div>
                    <h2 className="text-2xl font-bold">Convergo Documentation</h2>
                    <p className="text-indigo-100">Complete Guide to AI-Powered ERP Integration</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowDocumentation(false)}
                  className="text-white hover:text-indigo-200 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-8">
              {/* Overview */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Zap className="w-5 h-5 text-indigo-600 mr-2" />
                  What is Convergo?
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Convergo is an AI-powered platform that transforms how businesses process and manage 
                  enterprise requests. Install our plugin in Slack, Teams, or email to automatically extract, 
                  classify, and process messages directly into your ERP system, eliminating manual data entry 
                  and reducing processing time by up to 90%.
                </p>
              </div>

              {/* User Features */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Users className="w-5 h-5 text-green-600 mr-2" />
                  What Users Will See & Use
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2">🔌 Messaging App Plugin</h4>
                    <p className="text-sm text-green-700">Install Convergo extension in Slack, Teams, or email to enable AI processing</p>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <h4 className="font-semibold text-blue-800 mb-2">🤖 Automatic Prediction</h4>
                    <p className="text-sm text-blue-700">AI predicts intent (Expense/Procurement/Approval) with confidence scores</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-800 mb-2">📄 OCR Receipt Processing</h4>
                    <p className="text-sm text-purple-700">Automatically extracts vendor, date, and amount from receipt images</p>
                  </div>
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                    <h4 className="font-semibold text-orange-800 mb-2">❓ Explainable AI</h4>
                    <p className="text-sm text-orange-700">"Why?" button shows rules used and OCR overlay boxes</p>
                  </div>
                </div>
              </div>

              {/* Admin Features */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Settings className="w-5 h-5 text-indigo-600 mr-2" />
                  Admin & Approver Features
                </h3>
                <div className="space-y-4">
                  <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                    <h4 className="font-semibold text-indigo-800 mb-2">📋 Editable Review Queue</h4>
                    <p className="text-sm text-indigo-700">Approve, edit, or reject parsed entries before ERP commit</p>
                  </div>
                  <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                    <h4 className="font-semibold text-indigo-800 mb-2">⏰ Approvals with SLA Timers</h4>
                    <p className="text-sm text-indigo-700">24-hour business SLA with overdue highlighting and auto-escalation</p>
                  </div>
                  <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-200">
                    <h4 className="font-semibold text-indigo-800 mb-2">🔄 Idempotent Write-back</h4>
                    <p className="text-sm text-indigo-700">Retry with backoff and idempotency keys to prevent duplicate entries</p>
                  </div>
                </div>
              </div>

              {/* Analytics & Monitoring */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <BarChart3 className="w-5 h-5 text-purple-600 mr-2" />
                  Analytics & Monitoring
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-800 mb-2">📊 KPI Dashboards</h4>
                    <p className="text-sm text-purple-700">Spend by category, Pending vs Approved, Budget vs Actual trends</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-800 mb-2">🔍 Anomaly Detection</h4>
                    <p className="text-sm text-purple-700">Robust stats (MAD/z-score) with visible flagging reasons</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-800 mb-2">📈 Simple Forecasting</h4>
                    <p className="text-sm text-purple-700">Exponential smoothing with α slider and MAPE accuracy metrics</p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-purple-800 mb-2">📋 Quality Metrics</h4>
                    <p className="text-sm text-purple-700">Confidence scores, precision/recall, and confusion matrix</p>
                  </div>
                </div>
              </div>

              {/* Security & Compliance */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Shield className="w-5 h-5 text-red-600 mr-2" />
                  Security & Compliance
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <h4 className="font-semibold text-red-800 mb-2">🔒 PII Masking</h4>
                    <p className="text-sm text-red-700">Toggle to mask sensitive personal information</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <h4 className="font-semibold text-red-800 mb-2">📋 Data Retention</h4>
                    <p className="text-sm text-red-700">Configurable data retention controls and policies</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <h4 className="font-semibold text-red-800 mb-2">🔍 Audit Trail</h4>
                    <p className="text-sm text-red-700">JSON patch diffs with hash chaining for tamper-evidence</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                    <h4 className="font-semibold text-red-800 mb-2">👥 Role-Based Access</h4>
                    <p className="text-sm text-red-700">Admin, Approver, Employee roles with demo switcher</p>
                  </div>
                </div>
              </div>

              {/* Training Guide */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <BookOpen className="w-5 h-5 text-green-600 mr-2" />
                  How to Train & Use Convergo
                </h3>
                <div className="space-y-4">
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2">🎯 Step 1: Install Plugin</h4>
                    <p className="text-sm text-green-700">Install Convergo extension in your messaging app (Slack, Teams, email) to enable AI processing</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2">🔍 Step 2: Send Messages</h4>
                    <p className="text-sm text-green-700">Send messages or attach receipts through your messaging app - AI automatically processes them</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2">✅ Step 3: Review Predictions</h4>
                    <p className="text-sm text-green-700">Check the Dashboard to see how AI classified your messages and review confidence scores</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                    <h4 className="font-semibold text-green-800 mb-2">📊 Step 4: Approve & Monitor</h4>
                    <p className="text-sm text-green-700">Use the Review Queue to approve/edit entries, then monitor them in the ERP system</p>
                  </div>
                </div>
              </div>

              {/* Anomaly Detection Guide */}
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Eye className="w-5 h-5 text-orange-600 mr-2" />
                  Understanding Anomaly Detection
                </h3>
                <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                  <p className="text-sm text-orange-700 mb-3">
                    Convergo automatically flags unusual patterns using advanced statistical methods:
                  </p>
                  <ul className="text-sm text-orange-700 space-y-1 ml-4">
                    <li>• <strong>Amount Anomalies:</strong> Expenses significantly higher than department averages</li>
                    <li>• <strong>Confidence Anomalies:</strong> Low-confidence predictions that may need human review</li>
                    <li>• <strong>Pattern Anomalies:</strong> Unusual submission times or frequencies</li>
                    <li>• <strong>Content Anomalies:</strong> Messages that don't match expected patterns (like memes/jokes)</li>
                  </ul>
                </div>
              </div>

              {/* Call to Action */}
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl border border-indigo-200 text-center">
                <h3 className="text-lg font-bold text-indigo-900 mb-2">Ready to Transform Your ERP?</h3>
                <p className="text-indigo-700 mb-4">
                  Install the Convergo plugin in your messaging apps, explore the Dashboard, and see how Convergo can streamline your business processes.
                </p>
                <button
                  onClick={() => setShowDocumentation(false)}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all duration-200"
                >
                  Get Started Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}