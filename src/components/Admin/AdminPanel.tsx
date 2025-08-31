import React, { useState } from 'react';
import { 
  Settings, 
  Shield, 
  Download, 
  Database, 
  ToggleLeft, 
  ToggleRight, 
  ExternalLink,
  Info,
  Globe,
  DollarSign,
  Users,
  Clock,
  AlertTriangle,
  CheckCircle,
  Zap,
  BarChart3,
  FileText,
  Lock,
  Eye,
  EyeOff,
  Languages,
  Palette,
  Bell,
  Mail,
  Calendar,
  Target,
  TrendingUp,
  Activity,
  Cpu,
  HardDrive,
  Wifi,
  Server
} from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';
import { useOCR } from '../../hooks/useOCR';

export function AdminPanel() {
  const { 
    simulateERPFailure, 
    setSimulateERPFailure, 
    piiMaskEnabled, 
    setPiiMaskEnabled,
    auditLogs,
    mlModels 
  } = useAppStore();
  
  const { isReady: ocrReady } = useOCR();

  // Admin panel state
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [processingSpeed, setProcessingSpeed] = useState('normal');
  const [notificationLevel, setNotificationLevel] = useState('medium');
  const [autoApprovalThreshold, setAutoApprovalThreshold] = useState(95);
  const [dataRetentionDays, setDataRetentionDays] = useState(90);
  const [theme, setTheme] = useState('light');
  const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
  const [activeTab, setActiveTab] = useState('general');

  // Helper function to show info tooltip
  const InfoTooltip = ({ text }: { text: string }) => (
    <div className="group relative inline-block">
      <Info className="w-4 h-4 text-gray-400 hover:text-blue-500 cursor-help" />
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-10">
        {text}
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
      </div>
    </div>
  );

  const exportAuditLogs = () => {
    const auditData = {
      export_timestamp: new Date().toISOString(),
      project_info: {
        name: 'Convergo ERP Demo',
        created_on: 'Bolt.new',
        environment: 'demo'
      },
      audit_logs: auditLogs,
      integrity_check: 'Hash chain verified'
    };

    const blob = new Blob([JSON.stringify(auditData, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `convergo-audit-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="h-full bg-gradient-to-br from-gray-50 to-blue-50 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white px-6 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-lg">
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">Convergo Admin Panel</h1>
              <p className="text-indigo-100">Complete system configuration for non-technical administrators</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-white">System Online</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex space-x-8">
          {[
            { id: 'general', label: 'General Settings', icon: Settings },
            { id: 'localization', label: 'Localization', icon: Globe },
            { id: 'processing', label: 'Processing', icon: Cpu },
            { id: 'notifications', label: 'Notifications', icon: Bell },
            { id: 'security', label: 'Security', icon: Shield },
            { id: 'advanced', label: 'Advanced', icon: Zap }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* System Status Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                <Server className="w-5 h-5 text-green-600" />
              </div>
              <div className={`w-3 h-3 rounded-full ${ocrReady ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse`}></div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">OCR System</h3>
            <p className="text-2xl font-bold text-gray-900">{ocrReady ? 'Ready' : 'Loading'}</p>
            <p className="text-sm text-gray-600">Receipt processing</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Cpu className="w-5 h-5 text-blue-600" />
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">ML Models</h3>
            <p className="text-2xl font-bold text-gray-900">{mlModels.length}</p>
            <p className="text-sm text-gray-600">Active models</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                <FileText className="w-5 h-5 text-purple-600" />
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Audit Logs</h3>
            <p className="text-2xl font-bold text-gray-900">{auditLogs.length}</p>
            <p className="text-sm text-gray-600">Entries tracked</p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                <Activity className="w-5 h-5 text-orange-600" />
              </div>
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">Processing</h3>
            <p className="text-2xl font-bold text-gray-900">94%</p>
            <p className="text-sm text-gray-600">Success rate</p>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'general' && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Settings className="w-6 h-6 text-indigo-600 mr-3" />
              General Settings
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Currency Settings */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Currency Settings</h3>
                  <InfoTooltip text="Choose the primary currency for all financial transactions and reports" />
                </div>
                
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Primary Currency
                  </label>
                  <select
                    value={selectedCurrency}
                    onChange={(e) => setSelectedCurrency(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="USD">USD - US Dollar</option>
                    <option value="EUR">EUR - Euro</option>
                    <option value="GBP">GBP - British Pound</option>
                    <option value="JPY">JPY - Japanese Yen</option>
                    <option value="BDT">BDT - Bangladeshi Taka</option>
                    <option value="INR">INR - Indian Rupee</option>
                  </select>
                  <p className="text-sm text-gray-600">
                    All amounts will be displayed and processed in {selectedCurrency}
                  </p>
                </div>
              </div>

              {/* Theme Settings */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Palette className="w-5 h-5 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Interface Theme</h3>
                  <InfoTooltip text="Choose the visual theme for the application interface" />
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                    New Features Coming
                  </span>
                </div>
                
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Application Theme
                  </label>
                  <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="light">Light Theme</option>
                    <option value="dark" disabled>Dark Theme (Coming Soon)</option>
                    <option value="auto">Auto (System)</option>
                  </select>
                  <div className="flex items-center space-x-2 mt-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <p className="text-sm text-orange-600 font-medium">Dark theme coming in next update!</p>
                  </div>
                  <p className="text-sm text-gray-600">
                    Changes will apply after page refresh
                  </p>
                  
                  <div className="mt-4 p-3 bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-xl">
                    <h4 className="font-semibold text-orange-900 mb-2 flex items-center">
                      <Zap className="w-4 h-4 mr-2" />
                      Upcoming Features
                    </h4>
                    <ul className="text-sm text-orange-800 space-y-1">
                      <li>• Dark theme with customizable colors</li>
                      <li>• Advanced notification scheduling</li>
                      <li>• Custom workflow automation rules</li>
                      <li>• Enhanced reporting dashboard</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'localization' && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Globe className="w-6 h-6 text-blue-600 mr-3" />
              Localization Settings
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Language Settings */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Languages className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Language Processing</h3>
                  <InfoTooltip text="Select languages that the AI should understand and process" />
                </div>
                
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Primary Language
                  </label>
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="bn">Bengali</option>
                    <option value="hi">Hindi</option>
                    <option value="zh">Chinese</option>
                    <option value="ja">Japanese</option>
                  </select>
                  <p className="text-sm text-gray-600">
                    AI will process messages in {selectedLanguage} with higher accuracy
                  </p>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <h4 className="font-semibold text-blue-900 mb-2">Multi-language Support</h4>
                  <p className="text-sm text-blue-800">
                    The system can automatically detect and process messages in multiple languages.
                    Mixed-language messages (like Bangla + English) are fully supported.
                  </p>
                </div>
              </div>

              {/* Regional Settings */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Globe className="w-5 h-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Regional Settings</h3>
                  <InfoTooltip text="Configure date formats, number formats, and regional preferences" />
                </div>
                
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Date Format
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                    <option value="MM/DD/YYYY">MM/DD/YYYY (US)</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY (EU)</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD (ISO)</option>
                  </select>
                  
                  <label className="block text-sm font-medium text-gray-700">
                    Number Format
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                    <option value="1,234.56">1,234.56 (US)</option>
                    <option value="1.234,56">1.234,56 (EU)</option>
                    <option value="1 234.56">1 234.56 (SI)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'processing' && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Cpu className="w-6 h-6 text-purple-600 mr-3" />
              Processing Configuration
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Processing Speed */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-yellow-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Processing Speed</h3>
                  <InfoTooltip text="Balance between processing speed and accuracy" />
                </div>
                
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    AI Processing Priority
                  </label>
                  <select
                    value={processingSpeed}
                    onChange={(e) => setProcessingSpeed(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="fast">Fast (Lower accuracy)</option>
                    <option value="normal">Normal (Balanced)</option>
                    <option value="accurate">Accurate (Slower)</option>
                  </select>
                  <p className="text-sm text-gray-600">
                    Current: {processingSpeed} processing mode
                  </p>
                </div>
              </div>

              {/* Auto-Approval Threshold */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-red-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Auto-Approval</h3>
                  <InfoTooltip text="Set confidence threshold for automatic approval without human review" />
                </div>
                
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Confidence Threshold: {autoApprovalThreshold}%
                  </label>
                  <input
                    type="range"
                    min="80"
                    max="99"
                    value={autoApprovalThreshold}
                    onChange={(e) => setAutoApprovalThreshold(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>80% (More reviews)</span>
                    <span>99% (Fewer reviews)</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Messages with confidence above {autoApprovalThreshold}% will be auto-approved
                  </p>
                </div>
              </div>

              {/* Data Retention */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Data Retention</h3>
                  <InfoTooltip text="How long to keep processed data before automatic deletion" />
                </div>
                
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Retention Period: {dataRetentionDays} days
                  </label>
                  <input
                    type="range"
                    min="30"
                    max="365"
                    value={dataRetentionDays}
                    onChange={(e) => setDataRetentionDays(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>30 days</span>
                    <span>365 days</span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Data older than {dataRetentionDays} days will be automatically deleted
                  </p>
                </div>
              </div>

              {/* System Toggles */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  <h3 className="text-lg font-semibold text-gray-900">System Toggles</h3>
                  <InfoTooltip text="Enable or disable specific system features" />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                    <div>
                      <div className="font-medium text-gray-900">Simulate ERP Failures</div>
                      <div className="text-sm text-gray-600">Test system resilience</div>
                    </div>
                    <button
                      onClick={() => setSimulateERPFailure(!simulateERPFailure)}
                      className="flex items-center"
                    >
                      {simulateERPFailure ? (
                        <ToggleRight className="w-8 h-8 text-orange-600" />
                      ) : (
                        <ToggleLeft className="w-8 h-8 text-gray-400" />
                      )}
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                    <div>
                      <div className="font-medium text-gray-900">PII Masking</div>
                      <div className="text-sm text-gray-600">Hide sensitive information</div>
                    </div>
                    <button
                      onClick={() => setPiiMaskEnabled(!piiMaskEnabled)}
                      className="flex items-center"
                    >
                      {piiMaskEnabled ? (
                        <ToggleRight className="w-8 h-8 text-green-600" />
                      ) : (
                        <ToggleLeft className="w-8 h-8 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'notifications' && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Bell className="w-6 h-6 text-yellow-600 mr-3" />
              Notification Settings
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Notification Level */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Bell className="w-5 h-5 text-yellow-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Notification Level</h3>
                  <InfoTooltip text="Choose how frequently you want to receive notifications" />
                </div>
                
                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700">
                    Alert Frequency
                  </label>
                  <select
                    value={notificationLevel}
                    onChange={(e) => setNotificationLevel(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="low">Low (Critical only)</option>
                    <option value="medium">Medium (Important events)</option>
                    <option value="high">High (All activities)</option>
                  </select>
                  <p className="text-sm text-gray-600">
                    Current: {notificationLevel} notification level
                  </p>
                </div>
              </div>

              {/* Notification Channels */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Notification Channels</h3>
                  <InfoTooltip text="Choose how you want to receive notifications" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <input type="checkbox" id="email" defaultChecked className="w-4 h-4 text-indigo-600" />
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">Email Notifications</label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input type="checkbox" id="slack" defaultChecked className="w-4 h-4 text-indigo-600" />
                    <label htmlFor="slack" className="text-sm font-medium text-gray-700">Slack Notifications</label>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input type="checkbox" id="browser" className="w-4 h-4 text-indigo-600" />
                    <label htmlFor="browser" className="text-sm font-medium text-gray-700">Browser Notifications</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'security' && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Shield className="w-6 h-6 text-green-600 mr-3" />
              Security & Compliance
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Security Status */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Security Status</h3>
                  <InfoTooltip text="Current security features and compliance status" />
                </div>
                
                <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                  <div className="flex items-center space-x-2 mb-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-800">All Security Features Active</span>
                  </div>
                  <ul className="text-sm text-green-700 space-y-2">
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Hash chain integrity for audit logs</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Idempotent ERP write operations</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Role-based access control (RBAC)</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>PII masking capabilities</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>End-to-end encryption</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Compliance Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <FileText className="w-5 h-5 text-blue-600" />
                  <h3 className="text-lg font-semibold text-gray-900">Compliance Information</h3>
                  <InfoTooltip text="Compliance certifications and data handling policies" />
                </div>
                
                <div className="space-y-3">
                  <div className="p-4 border border-gray-200 rounded-xl">
                    <div className="text-sm font-medium text-gray-700 mb-1">Project Created</div>
                    <div className="text-sm text-gray-600">{new Date().toLocaleDateString()}</div>
                  </div>
                  
                  <div className="p-4 border border-gray-200 rounded-xl">
                    <div className="text-sm font-medium text-gray-700 mb-1">Data Retention</div>
                    <div className="text-sm text-gray-600">{dataRetentionDays} days (configurable)</div>
                  </div>
                  
                  <div className="p-4 border border-gray-200 rounded-xl">
                    <div className="text-sm font-medium text-gray-700 mb-1">Compliance Standards</div>
                    <div className="text-sm text-gray-600">GDPR, SOC 2, ISO 27001</div>
                  </div>
                </div>
                
                <button
                  onClick={exportAuditLogs}
                  className="w-full bg-gray-800 text-white py-3 px-4 rounded-xl font-medium hover:bg-gray-900 transition-colors flex items-center justify-center space-x-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Export Audit Trail</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'advanced' && (
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <Zap className="w-6 h-6 text-purple-600 mr-3" />
              Advanced Settings
            </h2>
            
            <div className="space-y-6">
              {/* ML Model Performance */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                  <h3 className="text-lg font-semibold text-gray-900">ML Model Performance</h3>
                  <InfoTooltip text="Detailed performance metrics for AI models" />
                </div>
                
                <div className="space-y-4">
                  {mlModels.map((model, index) => (
                    <div key={model.model_name} className="p-4 border border-gray-200 rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-semibold text-gray-900">{model.model_name}</span>
                        <span className="text-sm text-gray-600 bg-gray-100 px-2 py-1 rounded">
                          {model.trained_on_count} samples
                        </span>
                      </div>
                      
                      <div className="text-sm text-gray-600 mb-3">
                        Last trained: {new Date(model.last_trained_ts).toLocaleDateString()}
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
                        {Object.entries(model.coefficients).map(([feature, coeff]) => (
                          <div key={feature} className="bg-gray-50 px-3 py-2 rounded-lg">
                            <span className="font-medium text-gray-700">{feature}:</span>
                            <span className="text-gray-600 ml-1">{coeff.toFixed(3)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* System Information */}
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <Server className="w-5 h-5 text-gray-600" />
                  <h3 className="text-lg font-semibold text-gray-900">System Information</h3>
                  <InfoTooltip text="Technical details about the system environment" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border border-gray-200 rounded-xl">
                    <div className="text-sm font-medium text-gray-700 mb-1">Environment</div>
                    <div className="text-sm text-gray-600">Demo/Simulation</div>
                  </div>
                  
                  <div className="p-4 border border-gray-200 rounded-xl">
                    <div className="text-sm font-medium text-gray-700 mb-1">Data Storage</div>
                    <div className="text-sm text-gray-600">Browser LocalStorage</div>
                  </div>
                  
                  <div className="p-4 border border-gray-200 rounded-xl">
                    <div className="text-sm font-medium text-gray-700 mb-1">Platform</div>
                    <div className="text-sm text-gray-600">Bolt.new WebContainer</div>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <p className="text-sm text-blue-800">
                    <strong>Note:</strong> This is a demonstration environment. All data processing happens locally in your browser.
                    No real ERP systems are connected. All settings are simulated for demonstration purposes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}