// Performance monitoring utilities for development and production

export interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  bundleSize?: number;
  componentName: string;
}

// Performance measurement hook for components
export const measureComponentPerformance = (componentName: string) => {
  const startTime = performance.now();

  return {
    end: () => {
      const endTime = performance.now();
      const loadTime = endTime - startTime;

      if (process.env.NODE_ENV === "development") {
        console.log(`🚀 ${componentName} loaded in ${loadTime.toFixed(2)}ms`);
      }

      return {
        componentName,
        loadTime,
        renderTime: loadTime,
      } as PerformanceMetrics;
    },
  };
};

// Bundle size analyzer for development
export const logBundleInfo = () => {
  if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    // Log performance navigation timing
    const navigation = performance.getEntriesByType(
      "navigation"
    )[0] as PerformanceNavigationTiming;

    if (navigation) {
      console.group("📊 Performance Metrics");
      console.log(
        `DOM Content Loaded: ${
          navigation.domContentLoadedEventEnd -
          navigation.domContentLoadedEventStart
        }ms`
      );
      console.log(
        `Page Load Complete: ${
          navigation.loadEventEnd - navigation.loadEventStart
        }ms`
      );
      console.log(
        `First Paint: ${
          navigation.domContentLoadedEventEnd - navigation.fetchStart
        }ms`
      );
      console.groupEnd();
    }

    // Log resource loading times
    const resources = performance.getEntriesByType(
      "resource"
    ) as PerformanceResourceTiming[];
    const heavyResources = resources
      .filter((resource) => resource.transferSize > 100000) // > 100KB
      .sort((a, b) => b.transferSize - a.transferSize)
      .slice(0, 10);

    if (heavyResources.length > 0) {
      console.group("📦 Heavy Resources (>100KB)");
      heavyResources.forEach((resource) => {
        console.log(
          `${resource.name.split("/").pop()}: ${(
            resource.transferSize / 1024
          ).toFixed(1)}KB in ${resource.duration.toFixed(1)}ms`
        );
      });
      console.groupEnd();
    }
  }
};

// Memory usage monitoring
export const logMemoryUsage = () => {
  if (
    typeof window !== "undefined" &&
    "memory" in performance &&
    process.env.NODE_ENV === "development"
  ) {
    const memory = (
      performance as {
        memory?: {
          usedJSHeapSize: number;
          totalJSHeapSize: number;
          jsHeapSizeLimit: number;
        };
      }
    ).memory;
    if (memory) {
      console.group("🧠 Memory Usage");
      console.log(
        `Used: ${(memory.usedJSHeapSize / 1024 / 1024).toFixed(1)}MB`
      );
      console.log(
        `Total: ${(memory.totalJSHeapSize / 1024 / 1024).toFixed(1)}MB`
      );
      console.log(
        `Limit: ${(memory.jsHeapSizeLimit / 1024 / 1024).toFixed(1)}MB`
      );
      console.groupEnd();
    }
  }
};

// Three.js specific performance monitoring
export const monitorThreeJSPerformance = () => {
  if (typeof window !== "undefined" && process.env.NODE_ENV === "development") {
    let frameCount = 0;
    let lastTime = performance.now();

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime - lastTime >= 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));

        if (fps < 30) {
          console.warn(`⚠️ Low FPS detected: ${fps}fps`);
        } else if (fps >= 60) {
          console.log(`✅ Good FPS: ${fps}fps`);
        }

        frameCount = 0;
        lastTime = currentTime;
      }

      requestAnimationFrame(measureFPS);
    };

    requestAnimationFrame(measureFPS);
  }
};

// Preload critical resources
export const preloadCriticalResources = () => {
  if (typeof window !== "undefined") {
    // Preload the astronaut model
    const astronautLink = document.createElement("link");
    astronautLink.rel = "preload";
    astronautLink.href = "/models/tenhun_falling_spaceman_fanart.glb";
    astronautLink.as = "fetch";
    astronautLink.crossOrigin = "anonymous";
    document.head.appendChild(astronautLink);

    // Preload critical images
    const criticalImages = ["/assets/hero.png", "/assets/about.png"];

    criticalImages.forEach((src) => {
      const link = document.createElement("link");
      link.rel = "preload";
      link.href = src;
      link.as = "image";
      document.head.appendChild(link);
    });
  }
};

// Lazy load non-critical resources
export const lazyLoadResources = () => {
  if (typeof window !== "undefined" && "IntersectionObserver" in window) {
    const lazyImages = document.querySelectorAll("img[data-src]");

    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          img.src = img.dataset.src!;
          img.classList.remove("lazy");
          imageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach((img) => imageObserver.observe(img));
  }
};
