"use client";

import React, { useState, useRef } from "react";

interface SkillGroup {
  category: string;
  description: string;
  skills: string[];
}

function SkillCard({ group }: { group: SkillGroup }) {
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
    
    // Smooth 3D tilt
    const rY = (mouseX / (width / 2)) * 6;
    const rX = -(mouseY / (height / 2)) * 6;

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
        transform: `perspective(1000px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale3d(${isHovered ? 1.015 : 1}, ${isHovered ? 1.015 : 1}, 1)`,
        transition: isHovered 
          ? "transform 0.05s ease-out, border-color 0.3s ease" 
          : "transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), border-color 0.3s ease"
      }}
      className="p-8 bg-card border border-neutral-800 hover:border-neutral-700 transition-all duration-300 rounded-sm glow-on-hover preserve-3d reflection-effect cursor-pointer"
    >
      <div className="preserve-3d" style={{ transform: "translateZ(20px)" }}>
        {/* Category Title */}
        <h3 className="text-base font-bold text-white mb-2 tracking-tight">
          {group.category}
        </h3>
        
        {/* Category Description */}
        <p className="text-xs text-neutral-500 mb-6 font-normal leading-relaxed">
          {group.description}
        </p>

        {/* Skills Tags */}
        <div className="flex flex-wrap gap-2">
          {group.skills.map((skill) => (
            <span
              key={skill}
              className="inline-flex items-center px-2.5 py-1 bg-[#0e0e0e] border border-neutral-900 text-[10px] font-mono text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors duration-200 rounded-sm"
            >
              <span className="w-1 h-1 bg-accent/60 rounded-full mr-1.5" />
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const skillGroups: SkillGroup[] = [
    {
      category: "AI Agents & LLM Engineering",
      description: "Building tool-calling agents, evaluation/regression-gate tooling, and LLM security guardrails — provider-agnostic and production-shaped.",
      skills: [
        "Agent Orchestration & Tool Use",
        "LLM Evaluation & Regression Gates",
        "Prompt Injection & PII Defense",
        "Provider-Agnostic LLM Adapters",
        "RAG & Grounded Retrieval",
        "Prompt Engineering",
        "Hugging Face",
      ],
    },
    {
      category: "Machine Learning",
      description: "Building predictive models, training deep learning neural nets, and explaining their decisions.",
      skills: [
        "Python",
        "PyTorch",
        "TensorFlow",
        "scikit-learn",
        "XGBoost",
        "LightGBM",
        "SHAP Explainability",
      ],
    },
    {
      category: "Data Engineering & Backend",
      description: "Designing database structures, server logic, data pipelines, and real-world integrations (payments, messaging).",
      skills: [
        "SQL",
        "PostgreSQL",
        "Supabase",
        "Redis Caching",
        "FastAPI",
        "Flask",
        "M-Pesa Daraja API",
        "WhatsApp Cloud API",
        "Apache Kafka",
        "ETL Pipelines",
        "Docker Containerization",
      ],
    },
    {
      category: "Frontend & Full Stack",
      description: "Creating responsive, interactive clients and seamless full-stack web applications.",
      skills: [
        "Next.js",
        "React",
        "TypeScript",
        "JavaScript",
        "Tailwind CSS",
        "HTML5",
        "CSS3",
      ],
    },
    {
      category: "Cloud, MLOps & Tools",
      description: "Deploying production services, setting up automated pipelines, and managing model assets.",
      skills: [
        "AWS (S3, EC2)",
        "Vercel",
        "CI/CD Pipelines",
        "MLflow",
        "Git",
      ],
    },
  ];

  return (
    <section id="skills" className="py-24 border-t border-neutral-900 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col space-y-4 mb-16">
          <span className="text-xs font-mono uppercase tracking-widest text-accent">
            Expertise
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Technical Skillset
          </h2>
          <p className="text-neutral-400 max-w-xl text-sm font-normal">
            A comprehensive inventory of languages, frameworks, cloud services, and engineering tools I leverage to build end-to-end intelligent systems.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skillGroups.map((group) => (
            <SkillCard key={group.category} group={group} />
          ))}
        </div>
      </div>
    </section>
  );
}
