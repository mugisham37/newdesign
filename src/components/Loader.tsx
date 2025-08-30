"use client";

import { Html, useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

interface LoaderProps {
  message?: string;
  showProgress?: boolean;
  timeout?: number;
}

const Loader: React.FC<LoaderProps> = ({
  message = "Loading 3D content...",
  showProgress = true,
  timeout = 10000, // 10 seconds timeout
}) => {
  const { progress, loaded, total } = useProgress();
  const [isTimeout, setIsTimeout] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (progress < 100) {
        setIsTimeout(true);
      }
    }, timeout);

    return () => clearTimeout(timer);
  }, [progress, timeout]);

  if (isTimeout) {
    return (
      <Html center className="text-center">
        <div className="bg-black/80 p-4 rounded-lg border border-white/20">
          <div className="text-yellow-400 text-lg mb-2">⚠️ Loading timeout</div>
          <div className="text-neutral-400 text-sm">
            3D content is taking longer than expected
          </div>
        </div>
      </Html>
    );
  }

  return (
    <Html center className="text-center">
      <div className="bg-black/80 p-4 rounded-lg border border-white/20">
        <div className="text-white text-lg mb-2">{message}</div>
        {showProgress && (
          <>
            <div className="text-neutral-400 text-sm mb-3">
              {Math.round(progress)}% ({loaded}/{total} assets)
            </div>
            <div className="w-48 h-2 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </>
        )}
      </div>
    </Html>
  );
};

export default Loader;
