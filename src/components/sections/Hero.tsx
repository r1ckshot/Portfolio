"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { FiArrowRight, FiMail } from "react-icons/fi";
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiCplusplus,
  SiSwift,
  SiPhp,
  SiSpring,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiTailwindcss,
  SiBootstrap,
  SiJquery,
  SiQt,
  SiMysql,
  SiMongodb,
  SiHibernate,
  SiApache,
  SiNginx,
  SiJest,
  SiTestinglibrary,
  SiGit,
  SiGithub,
  SiDocker,
  SiPostman,
  SiSwagger,
  SiGradle,
  SiNpm,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { type IconType } from "react-icons";

interface TechItem {
  name: string;
  icon: IconType;
  color: string;
}

const TECH_ROW_1: TechItem[] = [
  { name: "Java", icon: FaJava, color: "#ED8B00" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
  { name: "Spring", icon: SiSpring, color: "#6DB33F" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "C++", icon: SiCplusplus, color: "#00599C" },
  { name: "Express.js", icon: SiExpress, color: "#ffffff" },
];

const TECH_ROW_2: TechItem[] = [
  { name: "PHP", icon: SiPhp, color: "#777BB4" },
  { name: "Swift", icon: SiSwift, color: "#FA7343" },
  { name: "Bootstrap", icon: SiBootstrap, color: "#7952B3" },
  { name: "jQuery", icon: SiJquery, color: "#0769AD" },
  { name: "Qt", icon: SiQt, color: "#41CD52" },
  { name: "Hibernate", icon: SiHibernate, color: "#59666C" },
  { name: "Jest", icon: SiJest, color: "#C21325" },
  { name: "Testing Library", icon: SiTestinglibrary, color: "#E33332" },
  { name: "Apache", icon: SiApache, color: "#D22128" },
  { name: "Nginx", icon: SiNginx, color: "#009639" },
  { name: "GitHub", icon: SiGithub, color: "#ffffff" },
  { name: "Postman", icon: SiPostman, color: "#FF6C37" },
  { name: "Swagger", icon: SiSwagger, color: "#85EA2D" },
  { name: "Gradle", icon: SiGradle, color: "#02303A" },
  { name: "npm", icon: SiNpm, color: "#CB3837" },
];

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" as const },
  }),
};

function TechBadge({ tech }: { tech: TechItem }) {
  const Icon = tech.icon;
  return (
    <span className="flex items-center gap-2 px-4 py-2 text-sm rounded-full bg-surface border border-white/10 text-text-secondary whitespace-nowrap hover:border-primary/30 transition-all duration-300 cursor-default">
      <Icon style={{ color: tech.color }} className="w-4 h-4 flex-shrink-0" />
      {tech.name}
    </span>
  );
}

function TechMarquee({
  items,
  reverse = false,
}: {
  items: TechItem[];
  reverse?: boolean;
}) {
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden marquee-container">
      <div
        className={`flex gap-3 w-max ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
      >
        {doubled.map((tech, i) => (
          <TechBadge key={`${tech.name}-${i}`} tech={tech} />
        ))}
      </div>
    </div>
  );
}

function ParticleOrb() {
  const rings = [
    { duration: "8s", delay: "0s", dots: 6, radius: "140px" },
    { duration: "12s", delay: "0.3s", dots: 8, radius: "158px" },
    { duration: "16s", delay: "0.6s", dots: 5, radius: "176px" },
  ];

  return (
    <div className="particle-orb">
      {rings.map((ring, ringIdx) => (
        <div
          key={ringIdx}
          className="particle-orb-ring"
          style={
            {
              "--duration": ring.duration,
              animationDelay: ring.delay,
              animationDirection: ringIdx % 2 === 0 ? "normal" : "reverse",
            } as React.CSSProperties
          }
        >
          {Array.from({ length: ring.dots }).map((_, dotIdx) => (
            <div
              key={dotIdx}
              className="particle-orb-dot"
              style={{
                transform: `rotate(${(360 / ring.dots) * dotIdx}deg) translateX(${ring.radius}) translateY(-50%)`,
                animationDelay: `${dotIdx * 0.3}s`,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden"
    >
      {/* Animated blobs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[15%] -left-20 w-[400px] h-[400px] rounded-full bg-primary/12 blur-[140px] animate-blob-1" />
        <div className="absolute top-[45%] -left-10 w-[300px] h-[300px] rounded-full bg-primary-dark/15 blur-[120px] animate-blob-2" />
        <div className="absolute top-[5%] -right-20 w-[350px] h-[350px] rounded-full bg-primary/8 blur-[140px] animate-blob-3" />
      </div>

      {/* Floating particles scattered across hero */}
      <div className="absolute inset-0 -z-5 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="floating-particle"
            style={{
              left: `${10 + (i * 37) % 80}%`,
              top: `${5 + (i * 53) % 85}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${4 + (i % 4) * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-6 w-full pt-28 pb-8">
        {/* Available badge - centered */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" as const }}
          className="flex justify-center mb-12"
        >
          <span className="px-5 py-2.5 rounded-full text-sm font-medium bg-primary/10 text-primary-light border border-primary/20 animate-pulse-glow">
            Available for new opportunities
          </span>
        </motion.div>

        {/* Main content - text left, photo right */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left - Text */}
          <div className="flex-1 text-center lg:text-left">
            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              Building Digital{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
                Solutions
              </span>
              <br />
              with Modern Tech & AI
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-lg md:text-xl text-text-secondary max-w-lg mb-8 mx-auto lg:mx-0"
            >
              Fresh graduate engineer who combines creativity with AI-powered
              development. I build full-stack applications with clean code,
              honest approach, and a passion for learning.
            </motion.p>

            <motion.div
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-4 justify-center lg:justify-start"
            >
              <a
                href="#projects"
                className="group flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-primary to-primary-dark text-background font-medium hover:shadow-lg hover:shadow-primary/25 transition-all duration-300"
              >
                Explore My Projects
                <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
              </a>
              <a
                href="#contact"
                className="group flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 text-text hover:border-primary/50 hover:text-primary transition-all duration-300"
              >
                {"Let's Connect"}
                <FiMail className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
              </a>
            </motion.div>
          </div>

          {/* Right - Photo with particle orb */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" as const }}
            className="flex-shrink-0"
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <ParticleOrb />
              <div className="absolute inset-0 rounded-full overflow-hidden border-2 border-primary/20">
                <Image
                  src="/Portfolio/photo.png"
                  alt="Mykhailo Kapustianyk"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tech stack - two row marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mt-6"
        >
          <p className="text-sm text-text-secondary text-center mb-4 uppercase tracking-widest">
            Tech I work with
          </p>
          <div className="flex flex-col gap-3">
            <TechMarquee items={TECH_ROW_1} />
            <TechMarquee items={TECH_ROW_2} reverse />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
