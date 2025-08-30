"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error details
    console.error("ErrorBoundary caught an error:", error, errorInfo);

    // Call optional error handler
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      // Render custom fallback UI or default error message
      return (
        this.props.fallback || (
          <div className="flex items-center justify-center w-full h-full min-h-[200px] bg-black/20 rounded-lg border border-white/10">
            <div className="text-center p-4">
              <div className="text-red-400 text-lg mb-2">
                ⚠️ Something went wrong
              </div>
              <div className="text-neutral-400 text-sm">
                {this.state.error?.message || "An unexpected error occurred"}
              </div>
              <button
                onClick={() =>
                  this.setState({ hasError: false, error: undefined })
                }
                className="mt-3 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md text-sm transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
