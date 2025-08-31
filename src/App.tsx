import React from 'react';
import { useAppStore } from './store/useAppStore';
import { Navigation } from './components/Layout/Navigation';
import { SlackInterface } from './components/Slack/SlackInterface';
import { ConvergoDashboard } from './components/Dashboard/ConvergoDashboard';
import { ERPSystem } from './components/ERP/ERPSystem';
import { AdminPanel } from './components/Admin/AdminPanel';

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h1>
            <p className="text-gray-600 mb-4">The application encountered an error. Please refresh the page.</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

function App() {
  const { currentTab } = useAppStore();

  const renderCurrentTab = () => {
    switch (currentTab) {
      case 'slack':
        return <SlackInterface />;
      case 'dashboard':
        return <ConvergoDashboard />;
      case 'erp':
        return <ERPSystem />;
      case 'admin':
        return <AdminPanel />;
      default:
        return <SlackInterface />;
    }
  };

  return (
    <ErrorBoundary>
      <div className="h-screen flex flex-col bg-gray-50">
        <Navigation />
        <div className="flex-1 overflow-hidden">
          {renderCurrentTab()}
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default App;