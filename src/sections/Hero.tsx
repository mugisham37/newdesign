"use client";

import React, { Suspense, useCallback, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { easing } from "maath";
import HeroText from "../components/HeroText";
import ParallaxBackground from "../components/ParallaxBackground";
import { Astronaut } from "../components/Astronaut";
import Loader from "../components/Loader";
import ThreeJSErrorBoundary from "../components/ThreeJSErrorBoundary";
import ClientOnlyFallback from "../components/ClientOnlyFallback";
import type { ComponentProps } from "../types/components";
import type * as THREE from "three";

// Type for the Hero component props
type HeroProps = ComponentProps;

// Camera rig component for smooth mouse-based camera movement
function Rig() {
  return useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [state.pointer.x / 10, 1 + state.pointer.y / 10, 3],
      0.5,
      delta
    );
  });
}

// Enhanced Canvas component with error handling
const SafeCanvas: React.FC<{
  children: React.ReactNode;
  onError: (error: Error) => void;
  isMobile: boolean;
}> = ({ children, onError, isMobile }) => {
  const handleCanvasCreated = useCallback(
    ({ gl }: { gl: THREE.WebGLRenderer }) => {
      try {
        // Optimize renderer settings
        gl.setClearColor(0x000000, 0);
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = 2; // PCFSoftShadowMap

        // Mobile optimizations
        if (isMobile) {
          gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        }
      } catch (error) {
        console.error("Canvas setup error:", error);
        onError(error as Error);
      }
    },
    [onError, isMobile]
  );

  return (
    <Canvas
      camera={{ position: [0, 1, 3] }}
      gl={{
        antialias: !isMobile, // Disable antialiasing on mobile for performance
        alpha: true,
        powerPreference: "high-performance",
      }}
      dpr={isMobile ? [1, 1.5] : [1, 2]} // Lower DPR on mobile
      onCreated={handleCanvasCreated}
    >
      {children}
    </Canvas>
  );
};

const Hero: React.FC<HeroProps> = ({ className = "" }) => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const [canvasError, setCanvasError] = useState(false);

  // Handle canvas errors
  const handleCanvasError = useCallback((error: Error) => {
    console.error("Hero canvas error:", error);
    setCanvasError(true);
  }, []);

  // Fallback component for when 3D content fails
  const ThreeDFallback = () => (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="text-center">
        <div className="text-6xl mb-4">🚀</div>
        <div className="text-white/60 text-lg">Interactive 3D Experience</div>
        <div className="text-neutral-500 text-sm mt-2">
          {canvasError ? "3D content unavailable" : "Loading..."}
        </div>
      </div>
    </div>
  );

  return (
    <section
      className={`flex items-start justify-center min-h-screen overflow-hidden md:items-start md:justify-start c-space ${className}`}
    >
      {/* Hero text content */}
      <HeroText />

      {/* Parallax background */}
      <ParallaxBackground />

      {/* Three.js Canvas with 3D astronaut */}
      <figure
        className="absolute inset-0"
        style={{ width: "100vw", height: "100vh" }}
      >
        <ClientOnlyFallback fallback={<ThreeDFallback />}>
          <ThreeJSErrorBoundary fallback={<ThreeDFallback />}>
            <SafeCanvas onError={handleCanvasError} isMobile={isMobile}>
              <Suspense
                fallback={
                  <Loader message="Loading astronaut..." timeout={15000} />
                }
              >
                {/* Ambient lighting for better model visibility */}
                <ambientLight intensity={0.5} />
                <directionalLight
                  position={[10, 10, 5]}
                  intensity={1}
                  castShadow
                  shadow-mapSize-width={isMobile ? 1024 : 2048}
                  shadow-mapSize-height={isMobile ? 1024 : 2048}
                />

                {/* Floating astronaut with responsive positioning */}
                <Float
                  speed={1.5}
                  rotationIntensity={0.5}
                  floatIntensity={0.5}
                  floatingRange={[-0.1, 0.1]}
                >
                  <Astronaut
                    scale={isMobile ? 0.23 : 0.3}
                    position={isMobile ? [0, -1.5, 0] : [1.3, -1, 0]}
                  />
                </Float>

                {/* Camera rig for mouse interaction */}
                <Rig />
              </Suspense>
            </SafeCanvas>
          </ThreeJSErrorBoundary>
        </ClientOnlyFallback>
      </figure>
    </section>
  );
};

export default Hero;
