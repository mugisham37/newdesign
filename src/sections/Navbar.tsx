"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import type { NavbarProps } from "../types/components";
import type { NavLink } from "../types/global";

// Navigation links data
const navigationLinks: NavLink[] = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#contact", label: "Contact" },
];

interface NavigationProps {
  onLinkClick?: () => void;
}

function Navigation({ onLinkClick }: NavigationProps): JSX.Element {
  return (
    <ul className="nav-ul">
      {navigationLinks.map((link) => (
        <li key={link.href} className="nav-li">
          <a className="nav-link" href={link.href} onClick={onLinkClick}>
            {link.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

const Navbar = ({ className }: NavbarProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleMenu = (): void => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = (): void => {
    setIsOpen(false);
  };

  return (
    <div
      className={`fixed inset-x-0 z-20 w-full backdrop-blur-lg bg-primary/40 ${
        className || ""
      }`}
    >
      <div className="mx-auto c-space max-w-7xl">
        <div className="flex items-center justify-between py-2 sm:py-0">
          <a
            href="/"
            className="text-xl font-bold transition-colors text-neutral-400 hover:text-white"
          >
            Ali
          </a>
          <button
            onClick={toggleMenu}
            className="flex cursor-pointer text-neutral-400 hover:text-white focus:outline-none sm:hidden"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            <Image
              src={isOpen ? "/assets/close.svg" : "/assets/menu.svg"}
              width={24}
              height={24}
              className="w-6 h-6"
              alt="toggle"
            />
          </button>
          <nav className="hidden sm:flex">
            <Navigation />
          </nav>
        </div>
      </div>
      {isOpen && (
        <motion.div
          className="block overflow-hidden text-center sm:hidden"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          style={{ maxHeight: "100vh" }}
          transition={{ duration: 1 }}
        >
          <nav className="pb-5">
            <Navigation onLinkClick={closeMenu} />
          </nav>
        </motion.div>
      )}
    </div>
  );
};

export default Navbar;
