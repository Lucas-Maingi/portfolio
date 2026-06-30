interface Project {
  name: string;
  category: string;
  problem: string;
  tech: string[];
  metric: string;
  metricLabel: string;
  liveUrl?: string;
  githubUrl: string;
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
      githubUrl: "https://github.com/maingilucas0/aletheia",
    },
    {
      name: "Fraud Detection System",
      category: "Machine Learning + Data Engineering",
      problem: "Mobile money transactions are vulnerable to instant fraud. This system monitors transactions in real-time, preventing financial loss before transfers settle.",
      tech: ["Python", "XGBoost", "FastAPI"],
      metric: "94%",
      metricLabel: "AUC-ROC Accuracy",
      githubUrl: "https://github.com/maingilucas0/fraud-detection",
    },
    {
      name: "Churn Prediction API",
      category: "Machine Learning",
      problem: "High SaaS churn costs businesses revenue. This API predicts which customers are likely to cancel, with SHAP explanation values to guide retention campaigns.",
      tech: ["LightGBM", "SHAP", "scikit-learn"],
      metric: "<200ms",
      metricLabel: "Inference Latency",
      githubUrl: "https://github.com/maingilucas0/churn-prediction",
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
            <div
              key={project.name}
              className="flex flex-col justify-between p-8 bg-card border border-neutral-800 hover:border-neutral-700 transition-all duration-300 rounded-sm glow-on-hover"
            >
              <div>
                {/* Category & Badge */}
                <div className="flex items-center justify-between mb-6">
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

              <div>
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
          ))}
        </div>
      </div>
    </section>
  );
}
