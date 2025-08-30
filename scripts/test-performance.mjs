#!/usr/bin/env node

import { execSync } from "child_process";
import fs from "fs";
import path from "path";

console.log("🚀 Starting Performance Testing...\n");

// Function to run command and capture output
function runCommand(command, description) {
  console.log(`📊 ${description}...`);
  try {
    const output = execSync(command, { encoding: "utf8", stdio: "pipe" });
    return output;
  } catch (error) {
    console.error(`❌ Error running ${description}:`, error.message);
    return null;
  }
}

// Function to analyze build output
function analyzeBuildOutput() {
  const buildOutputPath = path.join(process.cwd(), ".next");

  if (!fs.existsSync(buildOutputPath)) {
    console.log('❌ Build output not found. Please run "npm run build" first.');
    return;
  }

  console.log("📦 Analyzing build output...");

  // Check for static files
  const staticPath = path.join(buildOutputPath, "static");
  if (fs.existsSync(staticPath)) {
    const chunks = fs
      .readdirSync(path.join(staticPath, "chunks"))
      .filter((file) => file.endsWith(".js"));
    console.log(`   Found ${chunks.length} JavaScript chunks`);

    // Find the largest chunks
    const chunkSizes = chunks
      .map((chunk) => {
        const filePath = path.join(staticPath, "chunks", chunk);
        const stats = fs.statSync(filePath);
        return { name: chunk, size: stats.size };
      })
      .sort((a, b) => b.size - a.size);

    console.log("   Largest chunks:");
    chunkSizes.slice(0, 5).forEach((chunk) => {
      console.log(`     ${chunk.name}: ${(chunk.size / 1024).toFixed(1)}KB`);
    });
  }

  // Check for Three.js specific chunks
  const threejsChunks = fs
    .readdirSync(path.join(staticPath, "chunks"))
    .filter((file) => file.includes("threejs") || file.includes("three"));

  if (threejsChunks.length > 0) {
    console.log(`   Three.js chunks: ${threejsChunks.length}`);
    threejsChunks.forEach((chunk) => {
      const filePath = path.join(staticPath, "chunks", chunk);
      const stats = fs.statSync(filePath);
      console.log(`     ${chunk}: ${(stats.size / 1024).toFixed(1)}KB`);
    });
  }
}

// Function to check for optimization opportunities
function checkOptimizations() {
  console.log("🔍 Checking for optimization opportunities...");

  const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
  const dependencies = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  // Check for heavy dependencies
  const heavyDeps = [
    "three",
    "@react-three/fiber",
    "@react-three/drei",
    "motion",
    "@gsap/react",
    "cobe",
  ];

  console.log("   Heavy dependencies found:");
  heavyDeps.forEach((dep) => {
    if (dependencies[dep]) {
      console.log(`     ✅ ${dep}: ${dependencies[dep]}`);
    }
  });

  // Check Next.js config optimizations
  const nextConfigPath = path.join(process.cwd(), "next.config.js");
  if (fs.existsSync(nextConfigPath)) {
    const configContent = fs.readFileSync(nextConfigPath, "utf8");

    const optimizations = [
      { check: "optimizePackageImports", name: "Package Import Optimization" },
      { check: "splitChunks", name: "Code Splitting" },
      { check: "transpilePackages", name: "Package Transpilation" },
      { check: "compress: true", name: "Compression" },
    ];

    console.log("   Next.js optimizations:");
    optimizations.forEach((opt) => {
      const enabled = configContent.includes(opt.check);
      console.log(`     ${enabled ? "✅" : "❌"} ${opt.name}`);
    });
  }
}

// Function to run performance tests
async function runPerformanceTests() {
  console.log("⚡ Running performance tests...\n");

  // Build the application
  console.log("1. Building application...");
  const buildOutput = runCommand("npm run build", "Production build");

  if (buildOutput) {
    console.log("✅ Build completed successfully\n");

    // Analyze build output
    analyzeBuildOutput();
    console.log("");

    // Check optimizations
    checkOptimizations();
    console.log("");

    // Run bundle analyzer if available
    console.log("📊 To analyze bundle size in detail, run:");
    console.log("   npm run build:analyze");
    console.log("");

    console.log("🎯 Performance recommendations:");
    console.log("   1. Monitor Three.js chunk sizes - should be < 500KB");
    console.log(
      "   2. Ensure dynamic imports are working for heavy components"
    );
    console.log("   3. Check that animations are properly code-split");
    console.log("   4. Verify GLTF models are cached with proper headers");
    console.log("   5. Test loading performance on slower networks");
  } else {
    console.log("❌ Build failed. Please fix build errors first.");
  }
}

// Run the performance tests
runPerformanceTests().catch(console.error);
