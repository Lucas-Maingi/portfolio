export default function Contact() {
  const contactMethods = [
    {
      name: "Email",
      value: "lucasmaingi.tech@gmail.com",
      href: "mailto:lucasmaingi.tech@gmail.com",
      label: "Send a direct message",
    },
    {
      name: "GitHub",
      value: "github.com/Lucas-Maingi",
      href: "https://github.com/Lucas-Maingi",
      label: "Review my repositories",
    },
    {
      name: "LinkedIn",
      value: "linkedin.com/in/lucas-maingi",
      href: "https://www.linkedin.com/in/lucas-maingi",
      label: "Connect professionally",
    },
  ];

  return (
    <section id="contact" className="py-24 border-t border-neutral-900 bg-[#0a0a0a]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Text/Header Column */}
          <div className="lg:col-span-5 flex flex-col space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-accent">
              Get In Touch
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Let's Connect
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed max-w-sm font-normal">
              I am open to discuss contract roles, full-time remote engineering positions, or collaborative projects. Drop me an email or connect with me on social platforms.
            </p>
          </div>

          {/* Contact Items Column */}
          <div className="lg:col-span-7 w-full space-y-4">
            {contactMethods.map((method) => (
              <a
                key={method.name}
                href={method.href}
                target={method.name !== "Email" ? "_blank" : undefined}
                rel={method.name !== "Email" ? "noopener noreferrer" : undefined}
                className="group flex items-center justify-between p-6 bg-card border border-neutral-800 hover:border-neutral-700 transition-all duration-300 rounded-sm glow-on-hover"
              >
                <div className="flex flex-col space-y-1">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">
                    {method.name}
                  </div>
                  <div className="text-base font-bold text-white group-hover:text-accent transition-colors duration-200">
                    {method.value}
                  </div>
                  <div className="text-xs text-neutral-500 font-normal">
                    {method.label}
                  </div>
                </div>

                {/* Arrow indicator */}
                <div className="text-neutral-600 group-hover:text-accent transition-colors duration-200">
                  <svg
                    className="w-5 h-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-200"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
