import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 w-full bg-[#0a0a0a]">
        <Hero />
        <Projects />
        <Skills />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
