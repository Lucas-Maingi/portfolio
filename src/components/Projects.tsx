"use client";

import React, { useState, useRef } from "react";
import Link from "next/link";

interface Project {
  name: string;
  slug: string;
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

        {/* Case study link */}
        <Link
          href={`/projects/${project.slug}`}
          className="mb-4 inline-flex items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-accent transition-colors hover:text-white"
        >
          Read case study
          <span aria-hidden>→</span>
        </Link>

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
      name: "Argus",
      slug: "argus",
      category: "AI Tooling / Open Source",
      problem: "Teams shipping LLM features can't tell if a prompt change made things worse. Argus runs YAML eval suites against any callable and fails CI when quality regresses — its own pipeline dogfoods the gate by catching a deliberately induced regression on every push.",
      tech: ["Python", "Click", "SQLite", "Streamlit", "GitHub Actions"],
      metric: "CI-gated",
      metricLabel: "Quality Regressions",
      liveUrl: "https://huggingface.co/spaces/lucas-maingi/argus-eval",
      githubUrl: "https://github.com/Lucas-Maingi/argus",
      icon: (
        <svg className="w-8 h-8 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      )
    },
    {
      name: "Hermes",
      slug: "hermes",
      category: "AI Agents / Fintech",
      problem: "In Kenya, WhatsApp is the storefront and M-Pesa is the checkout. Hermes is an AI agent that answers FAQs from a shop's catalog, takes orders conversationally in English or Swahili, and collects payment via a real M-Pesa STK push — handing off to a human when unsure.",
      tech: ["Python", "FastAPI", "M-Pesa Daraja", "WhatsApp API", "Docker"],
      metric: "Order→Pay",
      metricLabel: "End-to-end, no human",
      liveUrl: "https://github.com/Lucas-Maingi/hermes",
      githubUrl: "https://github.com/Lucas-Maingi/hermes",
      icon: (
        <svg className="w-8 h-8 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
        </svg>
      )
    },
    {
      name: "Aletheia",
      slug: "aletheia",
      category: "Full Stack + AI Engineering",
      problem: "Security teams struggle to see their own public exposure. Aletheia runs authorized OSINT workflows across pluggable connectors — breach checks, attack-surface, sanctions — then uses an LLM to synthesize findings into a cited report in seconds.",
      tech: ["Next.js", "TypeScript", "Prisma", "LLMs"],
      metric: "17+",
      metricLabel: "Sources Correlated",
      liveUrl: "https://www.aletheia.software",
      githubUrl: "https://github.com/Lucas-Maingi/Aletheia",
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
      slug: "pesaguard",
      category: "Machine Learning + Data Engineering",
      problem: "Mobile money transactions are vulnerable to instant fraud. This hybrid XGBoost + Isolation Forest engine scores each transaction in real-time with SHAP explanations, flagging theft before cash-out settles.",
      tech: ["Python", "XGBoost", "FastAPI", "Docker"],
      metric: "0.89",
      metricLabel: "PR-AUC on PaySim",
      liveUrl: "https://pesaguard.streamlit.app/",
      githubUrl: "https://github.com/Lucas-Maingi/PesaGuard",
      icon: (
        <svg className="w-8 h-8 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      )
    },
    {
      name: "Aegis Churn Analytics",
      slug: "aegis",
      category: "Machine Learning",
      problem: "High SaaS churn silently drains revenue. This authenticated FastAPI service predicts which customers will cancel and returns SHAP-based, plain-English reasons so retention teams know exactly who to save and why.",
      tech: ["XGBoost", "SHAP", "FastAPI", "Docker"],
      metric: "0.81",
      metricLabel: "Churn Recall (Telco)",
      liveUrl: "https://aegis-churn-analytics.streamlit.app/",
      githubUrl: "https://github.com/Lucas-Maingi/aegis-churn-analytics",
      icon: (
        <svg className="w-8 h-8 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v5.25c0 .621-.504 1.125-1.125 1.125h-2.25A1.125 1.125 0 013 18.375v-5.25zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125v-9.75zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v14.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>
      )
    },
    {
      name: "JobSentry",
      slug: "job-sentry",
      category: "AI Agents / Automation",
      problem: "Job hunting is a repetitive pipeline. JobSentry discovers roles, scores them against your resume, drafts tailored cover letters, and pre-fills applications with Playwright — stopping for human review before anything is sent. A copilot, deliberately not a mass-applier.",
      tech: ["Python", "FastAPI", "Playwright", "Streamlit", "IMAP"],
      metric: "Search→Apply",
      metricLabel: "Human-in-the-loop",
      liveUrl: "https://github.com/Lucas-Maingi/job-sentry",
      githubUrl: "https://github.com/Lucas-Maingi/job-sentry",
      icon: (
        <svg className="w-8 h-8 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h.001a.75.75 0 00.75-.75c0-.231-.035-.454-.1-.664M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
        </svg>
      )
    },
    {
      name: "SentryBrain",
      slug: "sentry-brain",
      category: "AI Agents / DevOps",
      problem: "On-call is exhausting because the same incidents recur. SentryBrain streams server telemetry, uses an LLM to diagnose root causes and propose fixes, and gates every destructive command behind human approval — then verifies its own work before closing the incident.",
      tech: ["Python", "FastAPI", "psutil", "SQLite", "LLM"],
      metric: "Detect→Fix",
      metricLabel: "With human approval",
      liveUrl: "https://github.com/Lucas-Maingi/sentry-brain",
      githubUrl: "https://github.com/Lucas-Maingi/sentry-brain",
      icon: (
        <svg className="w-8 h-8 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 01-3-3m3 3a3 3 0 100 6h13.5a3 3 0 100-6m-16.5-3a3 3 0 013-3h13.5a3 3 0 013 3m-19.5 0a4.5 4.5 0 01.9-2.7L5.737 5.1a3.375 3.375 0 012.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 01.9 2.7m0 0a3 3 0 01-3 3m0 3h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008zm-3 6h.008v.008h-.008v-.008zm0-6h.008v.008h-.008v-.008z" />
        </svg>
      )
    },
    {
      name: "Aegis Shield",
      slug: "aegis-shield",
      category: "LLM Security / Infrastructure",
      problem: "Every LLM feature has an unguarded seam: raw input goes up, raw output comes down. Aegis Shield is a drop-in proxy that scans both directions for PII leaks, prompt injections, and secret exposure — OpenAI-compatible, one base_url override, with caching and rate limiting.",
      tech: ["Python", "FastAPI", "SQLite", "Streamlit", "Docker"],
      metric: "1-line",
      metricLabel: "Drop-in LLM firewall",
      liveUrl: "https://github.com/Lucas-Maingi/aegis-shield",
      githubUrl: "https://github.com/Lucas-Maingi/aegis-shield",
      icon: (
        <svg className="w-8 h-8 text-accent" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
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
