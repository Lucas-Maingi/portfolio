"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 border-b border-neutral-900 bg-[#0a0a0a]/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link 
          href="#" 
          className="font-mono text-sm font-semibold tracking-wider text-white hover:text-accent transition-colors"
        >
          LUCAS MAINGI
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xs uppercase tracking-widest text-neutral-400 hover:text-white transition-colors font-medium"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-neutral-400 hover:text-white focus:outline-none"
          aria-label="Toggle Menu"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      {isOpen && (
        <div className="md:hidden border-b border-neutral-900 bg-[#0a0a0a] px-6 py-4 flex flex-col space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-xs uppercase tracking-widest text-neutral-400 hover:text-white transition-colors font-medium"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
