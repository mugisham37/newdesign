"use client";

import React, { useState } from "react";
import ErrorBoundary from "./ErrorBoundary";
import ThreeJSErrorBoundary from "./ThreeJSErrorBoundary";
import ClientOnlyFallback from "./ClientOnlyFallback";

// Component that throws an error for testing
const ErrorThrowingComponent: React.FC<{ shouldThrow: boolean }> = ({
  shouldThrow,
}) => {
  if (shouldThrow) {
    throw new Error("Test error for error boundary");
  }
  return <div className="text-green-400">Component loaded successfully!</div>;
};

// Component that simulates Three.js error
const ThreeJSErrorComponent: React.FC<{ shouldThrow: boolean }> = ({
  shouldThrow,
}) => {
  if (shouldThrow) {
    throw new Error("WebGL context lost");
  }
  return <div className="text-blue-400">Three.js component working!</div>;
};

// Component that requires client-side features
const ClientOnlyComponent: React.FC = () => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div>Loading...</div>;

  return (
    <div className="text-purple-400">
      Client-side component loaded! Window width: {window.innerWidth}px
    </div>
  );
};

const ErrorHandlingTest: React.FC = () => {
  const [throwError, setThrowError] = useState(false);
  const [throwThreeJSError, setThrowThreeJSError] = useState(false);

  return (
    <div className="p-6 space-y-6 bg-black/20 rounded-lg border border-white/10">
      <h2 className="text-xl font-bold text-white mb-4">
        Error Handling Test Suite
      </h2>

      {/* General Error Boundary Test */}
      <div className="space-y-2">
        <h3 className="text-lg text-white">1. General Error Boundary</h3>
        <button
          onClick={() => setThrowError(!throwError)}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded text-white text-sm"
        >
          {throwError ? "Fix Error" : "Throw Error"}
        </button>
        <ErrorBoundary>
          <ErrorThrowingComponent shouldThrow={throwError} />
        </ErrorBoundary>
      </div>

      {/* Three.js Error Boundary Test */}
      <div className="space-y-2">
        <h3 className="text-lg text-white">2. Three.js Error Boundary</h3>
        <button
          onClick={() => setThrowThreeJSError(!throwThreeJSError)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white text-sm"
        >
          {throwThreeJSError ? "Fix Three.js Error" : "Throw Three.js Error"}
        </button>
        <ThreeJSErrorBoundary>
          <ThreeJSErrorComponent shouldThrow={throwThreeJSError} />
        </ThreeJSErrorBoundary>
      </div>

      {/* Client-Only Fallback Test */}
      <div className="space-y-2">
        <h3 className="text-lg text-white">3. Client-Only Fallback</h3>
        <p className="text-sm text-neutral-400">
          This should show loading state briefly, then the client component
        </p>
        <ClientOnlyFallback>
          <ClientOnlyComponent />
        </ClientOnlyFallback>
      </div>

      {/* Loading State Test */}
      <div className="space-y-2">
        <h3 className="text-lg text-white">4. Loading States</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-black/40 p-4 rounded">
            <h4 className="text-sm text-white mb-2">Default Loading</h4>
            <div className="flex items-center justify-center h-20">
              <div className="animate-spin w-6 h-6 border-2 border-white/20 border-t-white rounded-full"></div>
            </div>
          </div>
          <div className="bg-black/40 p-4 rounded">
            <h4 className="text-sm text-white mb-2">Custom Loading</h4>
            <div className="flex items-center justify-center h-20">
              <div className="text-center">
                <div className="text-2xl mb-1">🚀</div>
                <div className="text-xs text-neutral-400">Loading...</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Error States Test */}
      <div className="space-y-2">
        <h3 className="text-lg text-white">5. Error States</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-red-900/20 p-4 rounded border border-red-500/30">
            <h4 className="text-sm text-red-400 mb-2">Network Error</h4>
            <div className="text-xs text-neutral-400">
              Failed to load resource
            </div>
          </div>
          <div className="bg-yellow-900/20 p-4 rounded border border-yellow-500/30">
            <h4 className="text-sm text-yellow-400 mb-2">WebGL Error</h4>
            <div className="text-xs text-neutral-400">
              3D content unavailable
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorHandlingTest;
