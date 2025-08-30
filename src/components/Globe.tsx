"use client";

import createGlobe from "cobe";
import { useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef } from "react";
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
      if (canvasRef.current) {
        widthRef.current = canvasRef.current.offsetWidth;
      }
    };

    window.addEventListener("resize", onResize);
    onResize();

    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
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
        if (!pointerInteracting.current) phiRef.current += 0.005;
        const cobeState = state as CobeState;
        cobeState.phi = phiRef.current + rs.get();
        cobeState.width = widthRef.current * 2;
        cobeState.height = widthRef.current * 2;
      },
    });

    setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1";
      }
    }, 0);

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [rs, config]);

  return (
    <div
      className={twMerge(
        "mx-auto aspect-[1/1] w-full max-w-[600px]",
        className
      )}
    >
      <canvas
        className={twMerge(
          "size-[30rem] opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        )}
        ref={canvasRef}
        onPointerDown={(e: React.PointerEvent<HTMLCanvasElement>) => {
          pointerInteracting.current = e.clientX;
          updatePointerInteraction(e.clientX);
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e: React.MouseEvent<HTMLCanvasElement>) =>
          updateMovement(e.clientX)
        }
        onTouchMove={(e: React.TouchEvent<HTMLCanvasElement>) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  );
}
