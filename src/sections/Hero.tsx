"use client";

import React, { Suspense, useCallback, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { easing } from "maath";
import HeroText from "../components/HeroText";
import ParallaxBackground from "../components/ParallaxBackground";
import { Astronaut } from "../components/Astronaut";
import Loader from "../components/Loader";
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

// Error boundary component for Three.js content
const ThreeJSErrorBoundary: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleError = () => setHasError(true);
    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, []);

  if (hasError) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <div className="text-red-400 text-lg">Failed to load 3D content</div>
      </div>
    );
  }

  return <>{children}</>;
};

const Hero: React.FC<HeroProps> = ({ className = "" }) => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const [canvasError, setCanvasError] = useState(false);

  // Handle canvas creation errors
  const handleCanvasCreated = useCallback(
    ({ gl }: { gl: THREE.WebGLRenderer }) => {
      try {
        // Optimize renderer settings
        gl.setClearColor(0x000000, 0);
        gl.shadowMap.enabled = true;
        gl.shadowMap.type = 2; // PCFSoftShadowMap
      } catch (error) {
        console.error("Canvas setup error:", error);
        setCanvasError(true);
      }
    },
    []
  );

  if (canvasError) {
    return (
      <section
        className={`flex items-start justify-center min-h-screen overflow-hidden md:items-start md:justify-start c-space ${className}`}
      >
        <HeroText />
        <ParallaxBackground />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-red-400 text-lg">3D content unavailable</div>
        </div>
      </section>
    );
  }

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
        <ThreeJSErrorBoundary>
          <Canvas
            camera={{ position: [0, 1, 3] }}
            gl={{
              antialias: true,
              alpha: true,
              powerPreference: "high-performance",
            }}
            dpr={[1, 2]} // Device pixel ratio for better performance
            onCreated={handleCanvasCreated}
          >
            <Suspense fallback={<Loader />}>
              {/* Ambient lighting for better model visibility */}
              <ambientLight intensity={0.5} />
              <directionalLight
                position={[10, 10, 5]}
                intensity={1}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
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
          </Canvas>
        </ThreeJSErrorBoundary>
      </figure>
    </section>
  );
};

export default Hero;
