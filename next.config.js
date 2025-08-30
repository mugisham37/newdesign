/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: [
      "motion",
      "@react-three/fiber",
      "@react-three/drei",
      "three",
      "maath",
      "cobe",
    ],
  },
  images: {
    domains: ["robohash.org"], // For testimonial images
  },
  webpack: (config) => {
    // Handle GLTF files for Three.js
    config.module.rules.push({
      test: /\.(glb|gltf)$/,
      type: "asset/resource",
    });

    // Handle audio files
    config.module.rules.push({
      test: /\.(mp3|wav|ogg)$/,
      type: "asset/resource",
    });

    return config;
  },
  // Optimize for Three.js and animation libraries
  transpilePackages: ["three", "@react-three/fiber", "@react-three/drei"],
};

module.exports = nextConfig;
