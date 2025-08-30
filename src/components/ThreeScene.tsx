"use client";

import React, { Suspense, Component, ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Float, Lightformer } from "@react-three/drei";
import { Planet } from "./Planet";

// Define props interface for ThreeScene component
interface ThreeSceneProps {
  isMobile: boolean;
}

// Error boundary component for Three.js errors
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ThreeSceneErrorBoundary extends Component<
  { children: ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("ThreeScene Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 -z-50 flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
          <div className="text-center p-8">
            <div className="text-gray-400 text-sm">
              3D Scene temporarily unavailable
            </div>
            {process.env.NODE_ENV === "development" && this.state.error && (
              <div className="text-xs text-gray-300 mt-2">
                {this.state.error.message}
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Loading component for Three.js scene
function ThreeSceneLoading() {
  return (
    <div className="absolute inset-0 -z-50 flex items-center justify-center">
      <div className="animate-pulse">
        <div className="w-32 h-32 bg-gray-200 rounded-full"></div>
      </div>
    </div>
  );
}

// Main ThreeScene component
export function ThreeScene({ isMobile }: ThreeSceneProps) {
  return (
    <ThreeSceneErrorBoundary>
      <figure
        className="absolute inset-0 -z-50"
        style={{ width: "100vw", height: "100vh" }}
      >
        <Canvas
          shadows
          camera={{ position: [0, 0, -10], fov: 17.5, near: 1, far: 20 }}
        >
          <ambientLight intensity={0.5} />
          <Suspense fallback={null}>
            <Float speed={0.5}>
              <Planet scale={isMobile ? 0.7 : 1} />
            </Float>
            <Environment resolution={256}>
              <group rotation={[-Math.PI / 3, 4, 1]}>
                <Lightformer
                  form={"circle"}
                  intensity={2}
                  position={[0, 5, -9]}
                  scale={10}
                />
                <Lightformer
                  form={"circle"}
                  intensity={2}
                  position={[0, 3, 1]}
                  scale={10}
                />
                <Lightformer
                  form={"circle"}
                  intensity={2}
                  position={[-5, -1, -1]}
                  scale={10}
                />
                <Lightformer
                  form={"circle"}
                  intensity={2}
                  position={[10, 1, 0]}
                  scale={16}
                />
              </group>
            </Environment>
          </Suspense>
        </Canvas>
      </figure>
    </ThreeSceneErrorBoundary>
  );
}

export default ThreeScene;
