import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { FloatingParticles } from "@/components/ui/FloatingParticles";

export default function Home() {
  return (
    <>
      {/* Global floating particles background */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <FloatingParticles count={30} includeEdges />
      </div>

      <Navbar />
      <main>
        <Hero />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
