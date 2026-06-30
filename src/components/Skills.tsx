interface SkillGroup {
  category: string;
  description: string;
  skills: string[];
}

export default function Skills() {
  const skillGroups: SkillGroup[] = [
    {
      category: "Machine Learning & Data Science",
      description: "Building, evaluating, and deploying analytical models and predictive algorithms.",
      skills: [
        "Python",
        "XGBoost",
        "LightGBM",
        "SHAP",
        "scikit-learn",
        "pandas",
        "FastAPI",
        "Streamlit",
      ],
    },
    {
      category: "Full Stack Development",
      description: "Developing robust client-side interfaces and scalable backend server logic.",
      skills: [
        "Next.js",
        "React",
        "TypeScript",
        "Tailwind CSS",
        "PostgreSQL",
        "Supabase",
      ],
    },
    {
      category: "AI & LLM Integration",
      description: "Structuring pipelines for natural language processing and agentic automation.",
      skills: [
        "Prompt Engineering",
        "LLM Integration",
        "RAG Pipelines",
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
            A focused and honest inventory of the languages, frameworks, and engineering concepts I use to deliver production applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skillGroups.map((group) => (
            <div
              key={group.category}
              className="p-8 bg-card border border-neutral-800 hover:border-neutral-700 transition-all duration-300 rounded-sm"
            >
              {/* Category Title */}
              <h3 className="text-base font-bold text-white mb-2 tracking-tight">
                {group.category}
              </h3>
              
              {/* Category Description */}
              <p className="text-xs text-neutral-500 mb-6 font-normal leading-relaxed">
                {group.description}
              </p>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2.5">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center px-3 py-1.5 bg-[#0e0e0e] border border-neutral-900 text-xs font-mono text-neutral-300 hover:text-white hover:border-neutral-700 transition-colors duration-200 rounded-sm"
                  >
                    <span className="w-1.5 h-1.5 bg-accent/60 rounded-full mr-2" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
