"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useMediaQuery } from "react-responsive";
import AnimatedHeaderSection from "../components/AnimatedHeaderSection";

// Dynamic import for ThreeScene component with SSR disabled
const ThreeScene = dynamic(() => import("../components/ThreeScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 -z-50 flex items-center justify-center">
      <div className="animate-pulse">
        <div className="w-32 h-32 bg-gray-200 rounded-full opacity-50"></div>
      </div>
    </div>
  ),
});

const Hero: React.FC = () => {
  const isMobile = useMediaQuery({ maxWidth: 853 });
  const text = `I help growing brands and startups gain an
unfair advantage through premium
results driven webs/apps`;

  return (
    <section id="home" className="flex flex-col justify-end min-h-screen">
      <AnimatedHeaderSection
        subTitle={"404 No Bugs Found"}
        title={"Ali Sanati"}
        text={text}
        textColor={"text-black"}
      />
      <ThreeScene isMobile={isMobile} />
    </section>
  );
};

export default Hero;
