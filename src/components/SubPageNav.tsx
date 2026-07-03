import Link from "next/link";

/** Lightweight top navigation for /projects and /blog routes. */
export default function SubPageNav() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full border-b border-neutral-900 bg-[#0a0a0a]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
        <Link
          href="/"
          className="font-mono text-sm font-semibold tracking-wider text-white transition-colors hover:text-accent"
        >
          LUCAS MAINGI
        </Link>
        <nav className="flex space-x-6">
          <Link
            href="/#projects"
            className="text-xs font-medium uppercase tracking-widest text-neutral-400 transition-colors hover:text-white"
          >
            Projects
          </Link>
          <Link
            href="/blog"
            className="text-xs font-medium uppercase tracking-widest text-neutral-400 transition-colors hover:text-white"
          >
            Writing
          </Link>
          <Link
            href="/#contact"
            className="text-xs font-medium uppercase tracking-widest text-neutral-400 transition-colors hover:text-white"
          >
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
