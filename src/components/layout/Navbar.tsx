"use client";

import { useState, useEffect } from "react";

const NAV_ITEMS = [
  { label: "Home", href: "#hero" },
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleScroll = () => {
      const isAtBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;

      if (isAtBottom) {
        setActiveSection("contact");
        return;
      }

      const sections = NAV_ITEMS.map((item) => item.href.slice(1));

      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-3 left-0 right-0 z-50 flex justify-center">
      <div className="flex gap-8 text-sm px-8 py-3 rounded-full backdrop-blur-md bg-surface/70 border border-white/10">
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
    </nav>
  );
}
