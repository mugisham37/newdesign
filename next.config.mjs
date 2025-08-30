import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Performance optimizations
  poweredByHeader: false,
  compress: true,

  // Experimental features for better performance
  experimental: {
    optimizePackageImports: [
      "motion",
      "@react-three/fiber",
      "@react-three/drei",
      "three",
      "three-stdlib",
      "maath",
      "cobe",
      "@emailjs/browser",
      "@gsap/react",
      "tailwind-merge",
    ],
  },

  // Image optimization
  images: {
    domains: ["robohash.org"], // For testimonial images
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Handle GLTF files for Three.js
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      type: "asset/resource",
      generator: {
        filename: "static/models/[name].[hash][ext]",
      },
    });

    // Handle audio files
    config.module.rules.push({
      test: /\.(mp3|wav|ogg)$/,
      type: "asset/resource",
      generator: {
        filename: "static/audio/[name].[hash][ext]",
      },
    });

    // Optimize Three.js bundle size
    if (!dev && !isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        // Use ES modules for better tree shaking
        "three/examples/jsm": "three/examples/jsm",
      };

      // Optimize chunks for better caching
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          ...config.optimization.splitChunks,
          cacheGroups: {
            ...config.optimization.splitChunks?.cacheGroups,
            // Separate Three.js into its own chunk
            threejs: {
              test: /[\\/]node_modules[\\/](three|@react-three)[\\/]/,
              name: "threejs",
              chunks: "all",
              priority: 10,
            },
            // Separate animation libraries
            animations: {
              test: /[\\/]node_modules[\\/](motion|@gsap)[\\/]/,
              name: "animations",
              chunks: "all",
              priority: 9,
            },
            // Separate other heavy libraries
            vendor: {
              test: /[\\/]node_modules[\\/](cobe|maath|three-stdlib)[\\/]/,
              name: "vendor",
              chunks: "all",
              priority: 8,
            },
          },
        },
      };
    }

    // Performance optimizations for development
    if (dev) {
      config.watchOptions = {
        ...config.watchOptions,
        ignored: /node_modules/,
        poll: false,
      };
    }

    return config;
  },

  // Optimize for Three.js and animation libraries
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],

  // Output configuration for better performance
  output: "standalone",

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Headers for better caching
  async headers() {
    return [
      {
        source: "/models/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/assets/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(nextConfig);
