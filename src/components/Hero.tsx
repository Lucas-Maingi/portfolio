"use client";

import { useState, useRef } from "react";

export default function Hero() {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const graphicRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!graphicRef.current) return;
    const rect = graphicRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Scale rotation to max 15 degrees
    const rY = (mouseX / (width / 2)) * 15;
    const rX = -(mouseY / (height / 2)) * 15;

    setRotate({ x: rX, y: rY });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16 overflow-hidden dot-grid">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full z-10 py-12">
        {/* Text Area */}
        <div className="lg:col-span-7 flex flex-col items-start space-y-6">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-neutral-800 bg-card/60 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <span className="text-[10px] uppercase tracking-widest text-neutral-400 font-mono">
              Available for Remote Opportunities
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight font-sans">
            <span className="block text-accent">
              Lucas Maingi
            </span>
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-400">
              AI Engineer &
            </span>
            <span className="block text-white">
              Agentic Systems Builder
            </span>
          </h1>

          <p className="text-base sm:text-lg text-neutral-400 max-w-xl font-normal leading-relaxed">
            I design and ship production-shaped AI agents, LLM tooling, and machine learning systems — from a WhatsApp commerce agent with real M-Pesa payments to an LLM eval/regression-gate toolkit and a drop-in LLM security gateway. Eight shipped systems, real integrations, honest metrics.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
            <a
              href="#projects"
              className="inline-flex items-center justify-center px-6 py-3 border border-accent bg-accent text-white text-xs font-semibold uppercase tracking-widest hover:bg-transparent hover:text-accent transition-all duration-200 rounded-sm text-center"
            >
              Explore Projects
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3 border border-neutral-800 bg-card hover:bg-neutral-900 text-white text-xs font-semibold uppercase tracking-widest transition-all duration-200 rounded-sm text-center"
            >
              Get In Touch
            </a>
          </div>
        </div>

        {/* Visual/Graphic Area with 3D Tilt Effect */}
        <div 
          ref={graphicRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="lg:col-span-5 hidden lg:flex justify-center relative select-none cursor-pointer perspective-1000"
        >
          <div
            className="w-full max-w-[400px] h-auto preserve-3d"
            style={{
              transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
              transition: rotate.x === 0 && rotate.y === 0 
                ? "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)" 
                : "transform 0.1s ease-out"
            }}
          >
            <svg
              className="w-full h-auto text-neutral-800"
              viewBox="0 0 400 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Grid base */}
              <circle cx="200" cy="200" r="180" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
              <circle cx="200" cy="200" r="120" stroke="currentColor" strokeWidth="0.5" />
              <circle cx="200" cy="200" r="60" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
              
              {/* Axes */}
              <line x1="20" y1="200" x2="380" y2="200" stroke="currentColor" strokeWidth="0.5" />
              <line x1="200" y1="20" x2="200" y2="380" stroke="currentColor" strokeWidth="0.5" />
              
              {/* Network Connections */}
              <path d="M100 100 L200 60 L300 100 L340 200 L300 300 L200 340 L100 300 L60 200 Z" stroke="currentColor" strokeWidth="0.75" />
              
              {/* Inner connections representing neural layers */}
              <line x1="200" y1="60" x2="200" y2="340" stroke="currentColor" strokeWidth="0.5" />
              <line x1="60" y1="200" x2="340" y2="200" stroke="currentColor" strokeWidth="0.5" />
              
              <line x1="100" y1="100" x2="300" y2="300" stroke="currentColor" strokeWidth="0.5" />
              <line x1="100" y1="300" x2="300" y2="100" stroke="currentColor" strokeWidth="0.5" />
              
              {/* Custom glowing nodes */}
              <circle cx="200" cy="60" r="4" fill="#3b82f6" className="animate-pulse" />
              <circle cx="340" cy="200" r="4" fill="#3b82f6" />
              <circle cx="200" cy="340" r="4" fill="#3b82f6" />
              <circle cx="60" cy="200" r="4" fill="#3b82f6" />
              
              <circle cx="100" cy="100" r="3" fill="#ffffff" />
              <circle cx="300" cy="100" r="3" fill="#ffffff" />
              <circle cx="300" cy="300" r="3" fill="#ffffff" />
              <circle cx="100" cy="300" r="3" fill="#ffffff" />
              
              <circle cx="200" cy="200" r="6" fill="#3b82f6" stroke="#0a0a0a" strokeWidth="2" />
              
              {/* Math/Vector markers */}
              <path d="M200 200 L260 140" stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" />
              <polygon points="260,140 252,143 257,148" fill="#3b82f6" />
              <text x="270" y="135" fill="#3b82f6" className="font-mono text-[10px]" fontWeight="bold">v&#8407;</text>

              <text x="210" y="220" fill="#a3a3a3" className="font-mono text-[8px]">y = f(Wx + b)</text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
