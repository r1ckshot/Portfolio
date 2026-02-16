"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, type Variants } from "framer-motion";
import { FiExternalLink, FiGithub } from "react-icons/fi";

interface Project {
  title: string;
  year: number;
  description: string;
  tech: string[];
  github: string;
  category: "personal" | "collaborative";
}

const PROJECTS: Project[] = [
  {
    title: "FitTrack",
    year: 2025,
    description:
      "Full-stack fitness tracking application with workout logging, progress analytics, and personalized dashboards. Features REST API with dual database architecture.",
    tech: ["React", "Node.js", "MongoDB", "MySQL", "Docker"],
    github: "https://github.com/r1ckshot/FitTrack",
    category: "personal",
  },
  {
    title: "MiniWeatherApp",
    year: 2025,
    description:
      "Lightweight weather application built with Go that fetches real-time weather data from OpenWeatherMap API. Containerized with Docker for easy deployment.",
    tech: ["Go", "Docker", "OpenWeatherMap API"],
    github: "https://github.com/r1ckshot/MiniWeatherApp",
    category: "personal",
  },
  {
    title: "DobraGymPHP",
    year: 2024,
    description:
      "Gym management web application built with custom PHP MVC framework. Includes membership management, class scheduling, and admin dashboard.",
    tech: ["PHP", "MVC", "MySQL", "Bootstrap", "jQuery"],
    github: "https://github.com/r1ckshot/DobraGymPHP",
    category: "personal",
  },
  {
    title: "MikesGymWeb",
    year: 2024,
    description:
      "Responsive gym landing page with modern design, smooth animations, and mobile-first approach. Clean vanilla implementation without frameworks.",
    tech: ["HTML", "CSS", "JavaScript"],
    github: "https://github.com/r1ckshot/MikesGymWeb",
    category: "personal",
  },
  {
    title: "FitnessCenterQt",
    year: 2023,
    description:
      "Desktop fitness center management application with member tracking, workout planning, and reporting features. Built with C++ and Qt framework.",
    tech: ["C++", "Qt Framework"],
    github: "https://github.com/r1ckshot/FitnessCenterQt",
    category: "personal",
  },
  {
    title: "Anomaly Detection System",
    year: 2025,
    description:
      "System for automatic detection of acoustic anomalies in urban environments using a 14-layer CNN from the PANNs family. Recognizes dangerous sounds (gunshots, explosions, screams) with 95.60% accuracy. Three-tier architecture with real-time microphone monitoring.",
    tech: ["Spring Boot", "React", "TypeScript", "Python", "WebSocket"],
    github: "https://github.com/Dalvy07/anomaly-project-implementation",
    category: "collaborative",
  },
  {
    title: "Labyrinth Game",
    year: 2023,
    description:
      "A maze-based puzzle game with procedurally generated levels, player movement mechanics, and score tracking. Built collaboratively as a team project.",
    tech: ["Python", "Pygame"],
    github: "https://github.com/JacKoz7/Labyrinth-Game",
    category: "collaborative",
  },
];

const TABS = [
  { key: "personal" as const, label: "Personal" },
  { key: "collaborative" as const, label: "Collaborative" },
];

const sectionFade: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.15,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 70, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.15 },
  },
};

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      variants={cardVariants}
      className="group relative flex flex-col h-full p-5 rounded-xl bg-surface border border-white/10 hover:border-primary/30 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/8"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div>
          <h3 className="text-base font-semibold text-text group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>
          <span className="text-xs text-text-secondary font-mono">
            {project.year}
          </span>
        </div>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 rounded-lg text-text-secondary hover:text-primary hover:bg-primary/10 transition-all duration-300"
          aria-label={`View ${project.title} on GitHub`}
        >
          <FiGithub className="w-4 h-4" />
        </a>
      </div>

      {/* Description */}
      <p className="text-sm text-text-secondary leading-relaxed mb-4 flex-1">
        {project.description}
      </p>

      {/* Tech badges */}
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {project.tech.map((t) => (
          <span
            key={t}
            className="px-2 py-0.5 text-[11px] rounded-full bg-primary/8 text-primary-light border border-primary/15"
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export function Projects() {
  const [activeTab, setActiveTab] = useState<"personal" | "collaborative">(
    "personal"
  );
  const [showLink, setShowLink] = useState(false);
  const cardsAreaRef = useRef<HTMLDivElement>(null);
  const cardsInView = useInView(cardsAreaRef, { amount: 0.15 });

  const filtered = PROJECTS.filter((p) => p.category === activeTab);

  // Show link after card animations complete; reset only when switching tabs
  useEffect(() => {
    setShowLink(false);
  }, [activeTab]);

  useEffect(() => {
    if (!cardsInView || showLink) return;
    const totalMs =
      (0.15 + (filtered.length - 1) * 0.15 + 0.6) * 1000 + 200;
    const timer = setTimeout(() => setShowLink(true), totalMs);
    return () => clearTimeout(timer);
  }, [cardsInView, showLink, filtered.length]);

  return (
    <section id="projects" className="pt-16 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
              Projects
            </span>
          </h2>
          <p className="text-text-secondary max-w-lg mx-auto">
            A collection of projects I&apos;ve built and contributed to,
            spanning web apps, desktop tools, and collaborative systems.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center gap-2 mb-4"
        >
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeTab === tab.key
                  ? "text-background bg-gradient-to-r from-primary to-primary-dark shadow-lg shadow-primary/20"
                  : "text-text-secondary hover:text-text border border-white/10 hover:border-primary/30"
              }`}
            >
              {tab.label}
              {activeTab === tab.key && (
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary-light animate-pulse" />
              )}
            </button>
          ))}
        </motion.div>

        {/* Project cards */}
        <div ref={cardsAreaRef} className="min-h-[28rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              exit="exit"
              viewport={{ once: true, amount: 0.3 }}
              className={`grid gap-6 ${
                filtered.length >= 3
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                  : "grid-cols-1 max-w-xl mx-auto"
              }`}
            >
              {filtered.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </motion.div>
          </AnimatePresence>

          {/* View all on GitHub — appears after card animations finish */}
          <AnimatePresence>
            {showLink && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                transition={{ duration: 1, ease: "easeOut" as const }}
                className="flex justify-center mt-4"
              >
                <a
                  href="https://github.com/r1ckshot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 px-5 py-2.5 rounded-full text-sm text-text-secondary border border-white/10 hover:border-primary/30 hover:text-primary transition-all duration-300"
                >
                  View all on GitHub
                  <FiExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
