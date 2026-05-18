"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const NAV_ITEMS = [
  { label: "Home", href: "#hero" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);

      const isAtBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;
      if (isAtBottom) { setActiveSection("contact"); return; }

      const sections = NAV_ITEMS.map(i => i.href.slice(1));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      className="fixed top-3 left-0 right-0 z-50 flex justify-center"
      initial={{ y: -64, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="flex gap-8 text-sm px-8 py-3 rounded-full border transition-all duration-500"
        style={{
          backdropFilter: scrolled ? "blur(20px)" : "none",
          backgroundColor: scrolled ? "rgba(22,27,34,0.5)" : "transparent",
          borderColor: scrolled ? "rgba(255,255,255,0.08)" : "transparent",
        }}
      >
        {NAV_ITEMS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={"transition-colors duration-300 " + (
              activeSection === item.href.slice(1)
                ? "text-primary-light font-medium"
                : "text-text-secondary hover:text-primary"
            )}
          >
            {item.label}
          </a>
        ))}
      </div>
    </motion.nav>
  );
}
