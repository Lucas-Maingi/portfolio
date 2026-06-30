export default function About() {
  return (
    <section id="about" className="py-24 border-t border-neutral-900 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Bio Text Column */}
          <div className="lg:col-span-7 flex flex-col space-y-6">
            <div className="flex flex-col space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-accent">
                Biography
              </span>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                About Me
              </h2>
            </div>

            <div className="text-neutral-400 text-sm leading-relaxed space-y-6 font-normal">
              <p>
                I am a software and machine learning engineer who designs, builds, and deploys end-to-end intelligent systems. I specialize in translating complex machine learning models into reliable, high-performance web applications and backend APIs that can scale to meet real-world demands.
              </p>
              <p>
                My educational foundation is a hybrid of the intensive ALX Data Science bootcamp and a rigorous self-directed curriculum. Underpinning this is a strong background in mathematics and physics, which allows me to analyze algorithms from first principles and design data structures that maximize efficiency and execution speed.
              </p>
              <p>
                I am actively looking for a remote ML Engineer or Full Stack Developer role with an international team. I aim to contribute my experience in shipping functional systems (like automated threat intelligence dashboards and real-time transaction monitoring systems) to teams that value clean architecture and pragmatic engineering.
              </p>
            </div>
          </div>

          {/* Math/Physics SVG Plot Column */}
          <div className="lg:col-span-5 flex justify-center select-none">
            <div className="w-full max-w-[360px] p-6 bg-card border border-neutral-800 rounded-sm relative overflow-hidden">
              <div className="absolute top-2 left-3 font-mono text-[8px] text-neutral-600">
                FIGURE 1.2: CONVEX OPTIMIZATION / GRADIENT DESCENT
              </div>
              <svg
                className="w-full h-auto text-neutral-800"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Grid Lines */}
                <line x1="20" y1="180" x2="180" y2="180" stroke="#1c1c1c" strokeWidth="1" />
                <line x1="20" y1="20" x2="20" y2="180" stroke="#1c1c1c" strokeWidth="1" />
                
                <line x1="60" y1="20" x2="60" y2="180" stroke="#141414" strokeWidth="0.5" strokeDasharray="2 2" />
                <line x1="100" y1="20" x2="100" y2="180" stroke="#141414" strokeWidth="0.5" strokeDasharray="2 2" />
                <line x1="140" y1="20" x2="140" y2="180" stroke="#141414" strokeWidth="0.5" strokeDasharray="2 2" />
                
                <line x1="20" y1="60" x2="180" y2="60" stroke="#141414" strokeWidth="0.5" strokeDasharray="2 2" />
                <line x1="20" y1="100" x2="180" y2="100" stroke="#141414" strokeWidth="0.5" strokeDasharray="2 2" />
                <line x1="20" y1="140" x2="180" y2="140" stroke="#141414" strokeWidth="0.5" strokeDasharray="2 2" />

                {/* Convergence Curve (Loss Function) */}
                <path
                  d="M 30 40 Q 90 170 170 80"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                />

                {/* Gradient Descent Iterations */}
                <path
                  d="M 35 48 L 52 75 L 70 102 L 85 119 L 98 123"
                  stroke="#3b82f6"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                  strokeDasharray="1 1"
                />

                {/* Optimization Points */}
                <circle cx="35" cy="48" r="3" fill="#ef4444" />
                <circle cx="52" cy="75" r="2.5" fill="#3b82f6" />
                <circle cx="70" cy="102" r="2" fill="#3b82f6" />
                <circle cx="85" cy="119" r="1.5" fill="#3b82f6" />
                <circle cx="98" cy="123" r="3" fill="#22c55e" />

                {/* Vector math symbols */}
                <text x="45" y="42" fill="#ef4444" className="font-mono text-[6px]">w_0 (Start)</text>
                <text x="110" y="125" fill="#22c55e" className="font-mono text-[6px]">w* (Minimum)</text>
                
                <text x="145" y="70" fill="#a3a3a3" className="font-mono text-[6px]" fontStyle="italic">J(w)</text>
                
                {/* Vectors annotations */}
                <path d="M 52 75 L 40 85" stroke="#ef4444" strokeWidth="0.5" />
                <text x="35" y="93" fill="#a3a3a3" className="font-mono text-[5px]">&nabla;J(w_k)</text>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
