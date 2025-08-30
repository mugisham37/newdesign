"use client";

import createGlobe from "cobe";
import { useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import type { GlobeProps, GlobeConfig, GlobeMarker } from "@/types/components";

// Type for cobe library state object
interface CobeState {
  phi: number;
  width: number;
  height: number;
  [key: string]: unknown;
}

const MOVEMENT_DAMPING = 1400;

const GLOBE_CONFIG: GlobeConfig = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 1,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [1, 1, 1],
  glowColor: [1, 1, 1],
  markers: [
    { location: [14.5995, 120.9842], size: 0.03 },
    { location: [19.076, 72.8777], size: 0.1 },
    { location: [23.8103, 90.4125], size: 0.05 },
    { location: [30.0444, 31.2357], size: 0.07 },
    { location: [39.9042, 116.4074], size: 0.08 },
    { location: [-23.5505, -46.6333], size: 0.1 },
    { location: [19.4326, -99.1332], size: 0.1 },
    { location: [40.7128, -74.006], size: 0.1 },
    { location: [34.6937, 135.5022], size: 0.05 },
    { location: [41.0082, 28.9784], size: 0.06 },
  ] as GlobeMarker[],
};

export function Globe({ className, config = GLOBE_CONFIG }: GlobeProps) {
  const phiRef = useRef<number>(0);
  const widthRef = useRef<number>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef<number>(0);
  const [globeError, setGlobeError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const r = useMotionValue(0);
  const rs = useSpring(r, {
    mass: 1,
    damping: 30,
    stiffness: 100,
  });

  const updatePointerInteraction = (value: number | null): void => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? "grabbing" : "grab";
    }
  };

  const updateMovement = (clientX: number): void => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      r.set(r.get() + delta / MOVEMENT_DAMPING);
    }
  };

  useEffect(() => {
    const onResize = (): void => {
      try {
        if (canvasRef.current) {
          widthRef.current = canvasRef.current.offsetWidth;
        }
      } catch (error) {
        console.error("Globe resize error:", error);
      }
    };

    window.addEventListener("resize", onResize);
    onResize();

    if (!canvasRef.current) {
      setGlobeError("Canvas not available");
      return;
    }

    let globe: ReturnType<typeof createGlobe>;

    try {
      setIsLoading(true);
      globe = createGlobe(canvasRef.current, {
        ...config,
        width: widthRef.current * 2,
        height: widthRef.current * 2,
        phi: config.phi || 0,
        theta: config.theta || 0.3,
        dark: config.dark || 1,
        diffuse: config.diffuse || 0.4,
        mapSamples: config.mapSamples || 16000,
        mapBrightness: config.mapBrightness || 1.2,
        baseColor: config.baseColor || [1, 1, 1],
        markerColor: config.markerColor || [1, 1, 1],
        glowColor: config.glowColor || [1, 1, 1],
        markers: config.markers || [],
        devicePixelRatio: config.devicePixelRatio || 2,
        onRender: (state: Record<string, unknown>) => {
          try {
            if (!pointerInteracting.current) phiRef.current += 0.005;
            const cobeState = state as CobeState;
            cobeState.phi = phiRef.current + rs.get();
            cobeState.width = widthRef.current * 2;
            cobeState.height = widthRef.current * 2;
          } catch (error) {
            console.error("Globe render error:", error);
          }
        },
      });

      setTimeout(() => {
        try {
          if (canvasRef.current) {
            canvasRef.current.style.opacity = "1";
            setIsLoading(false);
          }
        } catch (error) {
          console.error("Globe opacity error:", error);
          setGlobeError("Failed to initialize globe display");
        }
      }, 100);
    } catch (error) {
      console.error("Globe creation error:", error);
      setGlobeError("Failed to create globe");
      setIsLoading(false);
    }

    return () => {
      try {
        if (globe) {
          globe.destroy();
        }
        window.removeEventListener("resize", onResize);
      } catch (error) {
        console.error("Globe cleanup error:", error);
      }
    };
  }, [rs, config]);

  // Show error state
  if (globeError) {
    return (
      <div
        className={twMerge(
          "mx-auto aspect-[1/1] w-full max-w-[600px] flex items-center justify-center",
          className
        )}
      >
        <div className="text-center p-6 bg-black/20 rounded-lg border border-white/10">
          <div className="text-4xl mb-2">🌍</div>
          <div className="text-red-400 text-lg mb-1">Globe Unavailable</div>
          <div className="text-neutral-400 text-sm">{globeError}</div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={twMerge(
        "mx-auto aspect-[1/1] w-full max-w-[600px] relative",
        className
      )}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin w-8 h-8 border-2 border-white/20 border-t-white rounded-full mx-auto mb-2"></div>
            <div className="text-neutral-400 text-sm">Loading globe...</div>
          </div>
        </div>
      )}
      <canvas
        className={twMerge(
          "size-[30rem] opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        )}
        ref={canvasRef}
        onPointerDown={(e: React.PointerEvent<HTMLCanvasElement>) => {
          try {
            pointerInteracting.current = e.clientX;
            updatePointerInteraction(e.clientX);
          } catch (error) {
            console.error("Globe pointer down error:", error);
          }
        }}
        onPointerUp={() => {
          try {
            updatePointerInteraction(null);
          } catch (error) {
            console.error("Globe pointer up error:", error);
          }
        }}
        onPointerOut={() => {
          try {
            updatePointerInteraction(null);
          } catch (error) {
            console.error("Globe pointer out error:", error);
          }
        }}
        onMouseMove={(e: React.MouseEvent<HTMLCanvasElement>) => {
          try {
            updateMovement(e.clientX);
          } catch (error) {
            console.error("Globe mouse move error:", error);
          }
        }}
        onTouchMove={(e: React.TouchEvent<HTMLCanvasElement>) => {
          try {
            if (e.touches[0]) {
              updateMovement(e.touches[0].clientX);
            }
          } catch (error) {
            console.error("Globe touch move error:", error);
          }
        }}
      />
    </div>
  );
}
