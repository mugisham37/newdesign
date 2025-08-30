import React from "react";
import { mySocials } from "../constants";
import Image from "next/image";
import type { FooterProps } from "../types/components";

const Footer: React.FC<FooterProps> = ({ className = "" }) => {
  return (
    <section
      className={`flex flex-wrap items-center justify-between gap-5 pb-3 text-sm text-neutral-400 c-space ${className}`}
    >
      <div className="mb-4 bg-gradient-to-r from-transparent via-neutral-700 to-transparent h-[1px] w-full" />
      <div className="flex gap-2">
        <p>Terms & Conditions</p>
        <p>|</p>
        <p>Privacy Policy</p>
      </div>
      <div className="flex gap-3">
        {mySocials.map((social, index: number) => (
          <a
            href={social.href}
            key={index}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src={social.icon} width={20} height={20} alt={social.name} />
          </a>
        ))}
      </div>
      <p>© 2025 Ali. All rights reserved.</p>
    </section>
  );
};

export default Footer;
