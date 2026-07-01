"use client";

import React, { useState, useRef } from "react";

interface Project {
  name: string;
  category: string;
  problem: string;
  tech: string[];
  metric: string;
  metricLabel: string;
  liveUrl?: string;
  githubUrl: string;
  icon: React.ReactNode;
}

function ProjectCard({ project }: { project: Project }) {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    // Tilt angle limited to max 8 degrees for smooth 3D feeling
    const rY = (mouseX / (width / 2)) * 8;
    const rX = -(mouseY / (height / 2)) * 8;

    setRotate({ x: rX, y: rY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(${isHovered ? 1.02 : 1}, ${isHovered ? 1.02 : 1}, 1)`,
        transition: isHovered 
          ? "transform 0.05s ease-out, border-color 0.3s ease" 
          : "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.3s ease"
      }}
      className="flex flex-col justify-between p-8 bg-card border border-neutral-800 hover:border-neutral-700 transition-all duration-300 rounded-sm glow-on-hover preserve-3d reflection-effect cursor-pointer"
    >
      <div className="preserve-3d" style={{ transform: "translateZ(30px)" }}>
        {/* Header Icon & Category */}
        <div className="flex items-center justify-between mb-6">
          {project.icon}
          <span className="text-[10px] font-semibold font-mono tracking-widest text-accent uppercase bg-accent/5 px-2.5 py-1 rounded-sm border border-accent/10">
            {project.category}
          </span>
        </div>

        {/* Project Title */}
        <h3 className="text-xl font-bold text-white mb-4">
          {project.name}
        </h3>

        {/* Problem Statement */}
        <p className="text-neutral-400 text-sm leading-relaxed mb-6 font-normal">
          {project.problem}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-8">
          {project.tech.map((tag) => (
            <span
              key={tag}
              className="text-[10px] font-mono text-neutral-500 bg-neutral-950 px-2 py-0.5 border border-neutral-900"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="preserve-3d" style={{ transform: "translateZ(20px)" }}>
        {/* Highlight Metric */}
        <div className="border-t border-neutral-900 pt-6 mb-6">
          <div className="text-3xl font-extrabold text-white tracking-tight font-mono">
            {project.metric}
          </div>
          <div className="text-[10px] font-mono uppercase tracking-wider text-neutral-500 mt-1">
            {project.metricLabel}
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="grid grid-cols-2 gap-3">
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-4 py-2 bg-accent border border-accent text-white text-[10px] font-bold uppercase tracking-wider hover:bg-transparent hover:text-accent transition-colors duration-200 rounded-sm"
            >
              Live Demo
            </a>
          ) : (
            <span
              className="inline-flex items-center justify-center px-4 py-2 bg-neutral-950 border border-neutral-900 text-neutral-600 text-[10px] font-bold uppercase tracking-wider cursor-not-allowed rounded-sm"
              title="Deployment in progress"
            >
              Demo Pending
            </span>
          )}
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-4 py-2 border border-neutral-800 hover:border-neutral-700 bg-transparent text-white text-[10px] font-bold uppercase tracking-wider transition-colors duration-200 rounded-sm"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const projects: Project[] = [
    {
      name: "Aletheia",
      category: "Full Stack + AI Engineering",
      problem: "OSINT and threat intelligence is manually intensive and slow. Aletheia automates tracking of open-source threats, reducing intelligence analysis times from hours to seconds.",
      tech: ["Next.js", "Python", "LLMs"],
      metric: "17+",
      metricLabel: "Data Sources Automated",
      liveUrl: "https://aletheia.software",
      githubUrl: "https://github.com/Lucas-Maingi/aletheia.git",
      icon: (
        <svg className="w-8 h-8 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 9h.008v.008H9V9z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 12h.008v.008H12V12z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 15h.008v.008H15V15z" />
        </svg>
      )
    },
    {
      name: "PesaGuard",
      category: "Machine Learning + Data Engineering",
      problem: "Mobile money transactions are vulnerable to instant fraud. This system monitors transactions in real-time, preventing financial loss before transfers settle.",
      tech: ["Python", "XGBoost", "FastAPI"],
      metric: "94%",
      metricLabel: "AUC-ROC Accuracy",
      liveUrl: "https://pesaguard.streamlit.app/",
      githubUrl: "https://github.com/Lucas-Maingi/PesaGuard.git",
      icon: (
        <svg className="w-8 h-8 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      )
    },
    {
      name: "Aegis Churn Analytics",
      category: "Machine Learning",
      problem: "High SaaS churn costs businesses revenue. This API predicts which customers are likely to cancel, with SHAP explanation values to guide retention campaigns.",
      tech: ["LightGBM", "SHAP", "scikit-learn"],
      metric: "<200ms",
      metricLabel: "Inference Latency",
      liveUrl: "https://aegis-churn-analytics.streamlit.app/",
      githubUrl: "https://github.com/Lucas-Maingi/aegis-churn-analytics.git",
      icon: (
        <svg className="w-8 h-8 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v5.25c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 013 18.375v-5.25zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125v-9.75zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v14.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      )
    },
  ];

  return (
    <section id="projects" className="py-24 border-t border-neutral-900 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col space-y-4 mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-accent">
            Selected Work
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Production-Ready Projects
          </h2>
          <p className="text-neutral-400 max-w-xl text-sm font-normal">
            A showcase of systems engineered to solve business problems, featuring high-accuracy machine learning pipelines and modern full-stack web applications.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
