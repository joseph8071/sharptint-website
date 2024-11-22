import React from 'react';

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600">Something went wrong</h2>
            <button 
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md"
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