import React from "react";
import { Timeline } from "../components/Timeline";
import { experiences } from "../constants";
import type { ExperiencesProps } from "../types/components";

const Experiences: React.FC<ExperiencesProps> = ({ className = "" }) => {
  return (
    <div className={`w-full ${className}`}>
      <Timeline data={experiences} />
    </div>
  );
};

export default Experiences;
