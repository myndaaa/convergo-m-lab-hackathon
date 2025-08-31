import React from 'react';
import { Slack, BarChart3, Database, Settings } from 'lucide-react';
import { useAppStore } from '../../store/useAppStore';

export function Navigation() {
  const { currentTab, setCurrentTab } = useAppStore();
  
  const tabs = [
    { id: 'slack' as const, label: 'Slack', icon: Slack },
    { id: 'dashboard' as const, label: 'Convergo Dashboard', icon: BarChart3 },
    { id: 'erp' as const, label: 'ERP System', icon: Database },
    { id: 'admin' as const, label: 'Admin', icon: Settings }
  ];
  
  return (
    <div className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-4 sm:space-x-8">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center overflow-hidden">
              <img src="/logo.png" alt="Convergo Logo" className="w-full h-full object-cover" />
            </div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900">Convergo</h1>
          </div>
          
          <nav className="flex flex-wrap gap-1 sm:space-x-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = currentTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setCurrentTab(tab.id)}
                  className={`
                    flex items-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base
                    ${isActive 
                      ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                    }
                  `}
                >
                  <Icon className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </div>
  );
}