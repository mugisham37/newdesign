/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features for better Three.js compatibility
  experimental: {
    optimizePackageImports: [
      "three",
      "@react-three/fiber",
      "@react-three/drei",
    ],
  },

  // Configure webpack for Three.js and WebGL compatibility
  webpack: (config, { isServer }) => {
    // Handle Three.js modules
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      type: "asset/resource",
    });

    // Optimize for client-side rendering of 3D content
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      };
    }

    return config;
  },

  // Enable static file serving for 3D models and assets
  async rewrites() {
    return [
      {
        source: "/models/:path*",
        destination: "/models/:path*",
      },
      {
        source: "/fonts/:path*",
        destination: "/fonts/:path*",
      },
    ];
  },

  // Optimize images and static assets
  images: {
    domains: [],
    formats: ["image/webp", "image/avif"],
  },

  // Enable TypeScript strict mode
  typescript: {
    ignoreBuildErrors: false,
  },

  // Configure for better performance with 3D content
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
