"use client";

import { useEffect } from "react";
import {
  logBundleInfo,
  logMemoryUsage,
  monitorThreeJSPerformance,
  preloadCriticalResources,
} from "../lib/performance";

interface PerformanceMonitorProps {
  enableThreeJSMonitoring?: boolean;
  enableMemoryMonitoring?: boolean;
  enableBundleAnalysis?: boolean;
  enablePreloading?: boolean;
}

export const PerformanceMonitor: React.FC<PerformanceMonitorProps> = ({
  enableThreeJSMonitoring = true,
  enableMemoryMonitoring = true,
  enableBundleAnalysis = true,
  enablePreloading = true,
}) => {
  useEffect(() => {
    // Only run in development mode
    if (process.env.NODE_ENV !== "development") {
      return;
    }

    // Preload critical resources
    if (enablePreloading) {
      preloadCriticalResources();
    }

    // Log bundle information after initial load
    if (enableBundleAnalysis) {
      const timer = setTimeout(() => {
        logBundleInfo();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [enableBundleAnalysis, enablePreloading]);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") {
      return;
    }

    // Monitor Three.js performance
    if (enableThreeJSMonitoring) {
      monitorThreeJSPerformance();
    }

    // Monitor memory usage periodically
    if (enableMemoryMonitoring) {
      const memoryInterval = setInterval(() => {
        logMemoryUsage();
      }, 10000); // Every 10 seconds

      return () => clearInterval(memoryInterval);
    }
  }, [enableThreeJSMonitoring, enableMemoryMonitoring]);

  // This component doesn't render anything
  return null;
};

export default PerformanceMonitor;
