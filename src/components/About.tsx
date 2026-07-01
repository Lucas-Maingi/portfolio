"use client";

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

        {/* Education & Certifications Row */}
        <div className="border-t border-neutral-900 mt-16 pt-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 flex flex-col space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-accent">
              Credentials
            </span>
            <h3 className="text-2xl font-bold tracking-tight text-white">
              Education & Certifications
            </h3>
            <p className="text-neutral-400 text-sm leading-relaxed font-normal">
              My technical expertise is verified by academic bootcamps and reinforced through intensive, self-directed research in mathematics and computing principles.
            </p>
          </div>

          <div className="lg:col-span-7">
            <a
              href="https://intranet.alxswe.com/certificates/hEXFYy3827"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col sm:flex-row items-center gap-6 p-6 bg-card border border-neutral-800 hover:border-neutral-700 transition-all duration-300 rounded-sm glow-on-hover cursor-pointer"
            >
              {/* Visual Preview / Thumbnail */}
              <div className="relative w-full sm:w-48 h-32 bg-neutral-950 border border-neutral-900 rounded-sm overflow-hidden flex items-center justify-center shrink-0">
                {/* Fallback graphic template when file is missing */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-neutral-950 flex flex-col items-center justify-center p-4">
                  <svg className="w-8 h-8 text-accent mb-2 group-hover:scale-110 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.33l-7.5-5-7.5 5V21m3.75 0h7.5" />
                  </svg>
                  <span className="text-[9px] font-mono text-neutral-400 uppercase tracking-widest text-center">alx-certificate.png</span>
                </div>
                {/* Image overlay (will overlay placeholder if found in public/) */}
                <img
                  src="/alx-certificate.png"
                  alt="ALX Data Science Certification"
                  className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                  onLoad={(e) => {
                    e.currentTarget.style.opacity = '1';
                  }}
                />
              </div>

              {/* Certificate Meta Details */}
              <div className="flex flex-col space-y-2 w-full">
                <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-full border border-accent/20 bg-accent/5 self-start">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full"></span>
                  <span className="text-[9px] font-mono uppercase text-accent tracking-widest font-semibold">Verified Graduate</span>
                </div>
                
                <h4 className="text-lg font-bold text-white group-hover:text-accent transition-colors duration-200">
                  ALX Data Science Certification
                </h4>
                
                <p className="text-xs text-neutral-400 leading-relaxed font-normal">
                  An intensive 13-month professional curriculum covering Python scripting, data manipulation, statistical modeling, database operations, and machine learning pipelines.
                </p>

                <div className="flex items-center space-x-1 text-[10px] font-mono text-neutral-500 pt-1">
                  <span>ISSUED BY: ALX (AFRICAN LEADERSHIP GROUP)</span>
                  <span>&bull;</span>
                  <span>CLICK TO VERIFY</span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
