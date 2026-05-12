"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, type Variants } from "framer-motion";
import { FiExternalLink, FiGithub } from "react-icons/fi";

interface Project {
  title: string;
  year: number;
  description: string;
  tech: string[];
  github: string;
  live?: string;
  preview?: string;
  category: "personal" | "collaborative";
}

const PROJECTS: Project[] = [
  {
    title: "LiftLens",
    year: 2026,
    description:
      "Upload a workout video, get AI feedback on your form. MediaPipe maps 33 body landmarks per frame; Spring Boot + FastAPI microservices process the video and score your technique.",
    tech: ["Spring Boot", "FastAPI", "Next.js", "MediaPipe", "MySQL", "Docker"],
    github: "https://github.com/r1ckshot/LiftLens",
    preview: "/Portfolio/projects/liftlens.webp",
    category: "personal",
  },
  {
    title: "GradeScope",
    year: 2026,
    description:
      "Four ML models running entirely in the browser via ONNX Runtime Web — no backend needed. Predicts student exam outcomes with Random Forest, SVM, KNN, and Neural Network inference client-side.",
    tech: ["React", "Python", "scikit-learn", "ONNX", "WebAssembly"],
    github: "https://github.com/r1ckshot/GradeScope",
    live: "https://r1ckshot.github.io/GradeScope",
    preview: "/Portfolio/projects/gradescope.webp",
    category: "personal",
  },
  {
    title: "YagodaKarpat",
    year: 2026,
    description:
      "Production website for a real client — a family blueberry estate. Bilingual UA/EN, dual video hero, deployed to a custom Cyrillic domain: ЯгодаКарпат.укр.",
    tech: ["Next.js", "TypeScript", "Framer Motion", "next-intl", "Vercel"],
    github: "https://github.com/r1ckshot/YagodaKarpat",
    live: "https://xn--80aaafltebbtln1h0c.xn--ukr-8cd3e.ua",
    preview: "/Portfolio/projects/yagodakarpat.webp",
    category: "personal",
  },
  {
    title: "FitTrack",
    year: 2025,
    description:
      "Full-stack fitness tracker with workout plans, diet logs, and analytics dashboards. Dual DB: MongoDB + MySQL, integrates ExerciseDB and Spoonacular APIs, containerized with Docker Compose.",
    tech: ["React", "Node.js", "MongoDB", "MySQL", "Docker"],
    github: "https://github.com/r1ckshot/FitTrack",
    preview: "/Portfolio/projects/fittrack.webp",
    category: "personal",
  },
  {
    title: "Anomaly Detection System",
    year: 2026,
    description:
      "Engineering thesis — real-time dangerous sound detection at 95.60% accuracy. CNN14 pre-trained on 527 AudioSet classes; Spring Boot + FastAPI + React with WebSocket live alerts.",
    tech: ["Spring Boot", "FastAPI", "React", "TypeScript", "PyTorch", "Docker"],
    github: "https://github.com/Dalvy07/anomaly-project-implementation",
    live: "https://anomaly.dalvy07.dev",
    preview: "/Portfolio/projects/anomaly.webp",
    category: "collaborative",
  },
  {
    title: "Labyrinth Game",
    year: 2023,
    description:
      "Collaborative maze puzzle game with procedurally generated levels, player mechanics, and score tracking. Built as a first-year team project.",
    tech: ["Python", "Pygame"],
    github: "https://github.com/JacKoz7/Labyrinth-Game",
    preview: "/Portfolio/projects/labyrinth.webp",
    category: "collaborative",
  },
];

const TABS = [
  { key: "personal" as const, label: "Personal" },
  { key: "collaborative" as const, label: "Collaborative" },
];

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
  exit: { opacity: 0, scale: 0.97, transition: { duration: 0.15 } },
};

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      variants={cardVariants}
      className="group relative flex flex-col h-full rounded-xl bg-surface border border-white/10 hover:border-primary/30 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/8 overflow-hidden transform-gpu"
    >
      {project.preview && (
        <div className="relative h-52 overflow-hidden shrink-0 transform-gpu will-change-transform">
          <img
            src={project.preview}
            alt={project.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#161b22] to-transparent" />
          <div className="absolute bottom-0 inset-x-0 h-2 bg-[#161b22]" />
        </div>
      )}

      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-base font-semibold text-text group-hover:text-primary transition-colors duration-300">
              {project.title}
            </h3>
            <span className="text-xs text-text-secondary font-mono">
              {project.year}
            </span>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg text-text-secondary hover:text-primary hover:bg-primary/10 transition-all duration-300"
                aria-label={`View ${project.title} live demo`}
              >
                <FiExternalLink className="w-4 h-4" />
              </a>
            )}
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
        </div>

        <p className="text-base text-text-secondary leading-relaxed mb-4 flex-1">
          {project.description}
        </p>

        <div className="flex gap-1.5 mt-auto">
          {project.tech.slice(0, 3).map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 text-xs rounded-full bg-primary/8 text-primary-light border border-primary/15 whitespace-nowrap"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span className="px-2 py-0.5 text-xs rounded-full bg-white/5 text-text-secondary border border-white/10 whitespace-nowrap">
              +{project.tech.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function Projects() {
  const [activeTab, setActiveTab] = useState<"personal" | "collaborative">("personal");
  const cardsAreaRef = useRef<HTMLDivElement>(null);
  useInView(cardsAreaRef, { amount: 0.15 });

  const personal = PROJECTS.filter((p) => p.category === "personal").slice(0, 3);
  const collaborative = PROJECTS.filter((p) => p.category === "collaborative");
  const filtered = activeTab === "personal" ? personal : collaborative;
  const showGithubCard = activeTab === "collaborative";

  return (
    <section id="projects" className="pt-16 pb-16 px-6">
      <div className="max-w-6xl mx-auto">
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
          <p className="text-base md:text-lg text-text-secondary max-w-lg mx-auto">
            A collection of projects I&apos;ve built and contributed to,
            spanning web apps, AI systems, and collaborative work.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center gap-2 mb-6"
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

        <div ref={cardsAreaRef}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              exit="exit"
              viewport={{ once: true, amount: 0.2 }}
              className="grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}

              {showGithubCard && (
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 40, scale: 0.97 },
                    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: "easeOut" as const, delay: 0.4 } },
                    exit: { opacity: 0, scale: 0.97, transition: { duration: 0.15 } },
                  }}
                  className="group flex flex-col items-center justify-center min-h-[200px] p-5 rounded-xl bg-surface border border-white/10 hover:border-primary/30 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-primary/8 transform-gpu cursor-pointer"
                  onClick={() => window.open("https://github.com/r1ckshot", "_blank", "noopener,noreferrer")}
                >
                  <FiExternalLink className="w-12 h-12 text-text group-hover:text-primary mb-4 transition-colors duration-300" />
                  <span className="text-lg font-semibold text-text group-hover:text-primary transition-colors duration-300">
                    View all on GitHub
                  </span>
                  <span className="text-sm text-text-secondary mt-2">
                    Explore more projects
                  </span>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
