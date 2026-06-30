export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-neutral-900 bg-[#0a0a0a] py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-[10px] font-mono text-neutral-600">
          &copy; {currentYear} LUCAS MAINGI. ALL RIGHTS RESERVED.
        </div>
        <div className="text-[10px] font-mono text-neutral-600 flex items-center space-x-1">
          <span>BUILT WITH</span>
          <span className="text-neutral-400">NEXT.JS</span>
          <span>&bull;</span>
          <span className="text-neutral-400">TAILWIND CSS</span>
          <span>&bull;</span>
          <span className="text-neutral-400">INTER</span>
        </div>
      </div>
    </footer>
  );
}
