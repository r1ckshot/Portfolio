"use client";

import { useEffect } from "react";
import { Hero } from "@/components/sections/Hero";
import { Projects } from "@/components/sections/Projects";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/sections/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { GridWave } from "@/components/ui/GridWave";

export default function Home() {
  useEffect(() => {
    // Handle hash navigation on mount
    if (window.location.hash) {
      // Use setTimeout to ensure DOM is ready
      setTimeout(() => {
        const id = window.location.hash.slice(1);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "auto" });
        }
      }, 0);
    }
  }, []);

  return (
    <>
      <GridWave />

      {/* Page-wide ambient blobs */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-60 -left-60 w-[900px] h-[900px] rounded-full animate-blob-1"
          style={{ background: "radial-gradient(circle, rgba(76,175,80,0.07) 0%, transparent 70%)" }}
        />
        <div
          className="absolute -bottom-60 -right-60 w-[800px] h-[800px] rounded-full animate-blob-2"
          style={{ background: "radial-gradient(circle, rgba(76,175,80,0.05) 0%, transparent 70%)" }}
        />
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
