"use client";

import React from "react";
import ErrorBoundary from "./ErrorBoundary";

interface ThreeJSErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const ThreeJSFallback: React.FC<{ error?: string }> = ({ error }) => (
  <div className="flex items-center justify-center w-full h-full min-h-[400px] bg-gradient-to-br from-black/40 to-black/20 rounded-lg border border-white/10">
    <div className="text-center p-6">
      <div className="text-6xl mb-4">🚀</div>
      <div className="text-white/80 text-lg mb-2">3D Content Unavailable</div>
      <div className="text-neutral-400 text-sm max-w-md">
        {error ||
          "Your browser may not support WebGL or 3D graphics. The content will still work without 3D effects."}
      </div>
    </div>
  </div>
);

const ThreeJSErrorBoundary: React.FC<ThreeJSErrorBoundaryProps> = ({
  children,
  fallback,
}) => {
  return (
    <ErrorBoundary
      fallback={fallback || <ThreeJSFallback />}
      onError={(error) => {
        console.error("Three.js Error:", error);
        // You could send this to an error reporting service
      }}
    >
      {children}
    </ErrorBoundary>
  );
};

export default ThreeJSErrorBoundary;
