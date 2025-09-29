"use client";

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  projectName?: string;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  isLoading: boolean;
}

class ProjectErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      isLoading: false
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      isLoading: false
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      error,
      isLoading: false
    });

    // Call onError callback if provided
    this.props.onError?.(error, errorInfo);

    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ProjectErrorBoundary caught an error:', error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ 
      hasError: false, 
      error: null,
      isLoading: true 
    });
    
    // Simulate loading delay for better UX
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 1000);
  };

  render() {
    if (this.state.isLoading) {
      return (
        <div className="w-full h-full flex flex-col p-3">
          <div className="flex-1 relative overflow-hidden rounded mb-2">
            <div className="w-full h-full bg-gradient-to-br from-gray-700/50 to-gray-600/50 animate-pulse">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-gray-400 text-center">
                  <div className="w-8 h-8 border-2 border-green-400 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                  <div className="text-sm">Loading project...</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-1">
            <div className="h-5 w-16 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-full animate-pulse"></div>
            <div className="h-5 w-20 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-full animate-pulse"></div>
            <div className="h-5 w-12 bg-gradient-to-r from-gray-600/20 to-gray-500/20 rounded-full animate-pulse"></div>
          </div>
        </div>
      );
    }

    if (this.state.hasError) {
      return (
        <div className="w-full h-full flex flex-col p-3">
          <div className="flex-1 relative overflow-hidden rounded mb-2 bg-gradient-to-br from-red-900/30 to-red-800/20 border border-red-500/20">
            <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
              <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mb-3">
                <svg
                  className="w-6 h-6 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              
              <h4 className="text-white font-medium text-sm mb-1">
                {this.props.projectName || 'Project'} failed to load
              </h4>
              
              <p className="text-gray-400 text-xs mb-3 leading-tight">
                {this.state.error?.message || 'Unable to load project preview'}
              </p>
              
              <button
                onClick={this.handleRetry}
                className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-medium rounded-full hover:from-red-600 hover:to-red-700 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-1 focus:ring-red-500"
              >
                Retry
              </button>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-1">
            <span className="text-xs bg-gradient-to-r from-red-600/20 to-red-500/20 text-red-300 border border-red-500/30 px-2 py-1 rounded-full backdrop-blur-sm">
              Error
            </span>
            <span className="text-xs bg-gradient-to-r from-gray-600/20 to-gray-500/20 text-gray-300 border border-gray-500/30 px-2 py-1 rounded-full backdrop-blur-sm">
              Retry available
            </span>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ProjectErrorBoundary;