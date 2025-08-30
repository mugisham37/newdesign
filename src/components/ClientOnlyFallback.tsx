"use client";

import React, { useEffect, useState } from "react";

interface ClientOnlyFallbackProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  loading?: React.ReactNode;
}

const DefaultFallback: React.FC = () => (
  <div className="flex items-center justify-center w-full h-full min-h-[200px] bg-gradient-to-br from-black/20 to-black/10 rounded-lg border border-white/10">
    <div className="text-center p-4">
      <div className="text-4xl mb-2">🌐</div>
      <div className="text-white/80 text-lg mb-1">Interactive Content</div>
      <div className="text-neutral-400 text-sm">
        This feature requires JavaScript to be enabled
      </div>
    </div>
  </div>
);

const DefaultLoading: React.FC = () => (
  <div className="flex items-center justify-center w-full h-full min-h-[200px]">
    <div className="text-center">
      <div className="animate-spin w-8 h-8 border-2 border-white/20 border-t-white rounded-full mx-auto mb-2"></div>
      <div className="text-neutral-400 text-sm">
        Loading interactive content...
      </div>
    </div>
  </div>
);

const ClientOnlyFallback: React.FC<ClientOnlyFallbackProps> = ({
  children,
  fallback = <DefaultFallback />,
  loading = <DefaultLoading />,
}) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Show loading during hydration
  if (!hasMounted) {
    return <>{loading}</>;
  }

  // Check if we're in a browser environment with necessary APIs
  if (typeof window === "undefined") {
    return <>{fallback}</>;
  }

  // Check for WebGL support for 3D content
  const canvas = document.createElement("canvas");
  const gl =
    canvas.getContext("webgl") || canvas.getContext("experimental-webgl");

  if (!gl) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

export default ClientOnlyFallback;
