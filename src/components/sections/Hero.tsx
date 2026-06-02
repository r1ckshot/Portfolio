"use client";

import { useRef, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LogoLoop } from "@/components/ui/LogoLoop";
import { FiArrowRight, FiMail, FiDownload } from "react-icons/fi";
import ShinyText from "@/components/ui/ShinyText";
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiCplusplus,
  SiSpring,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiTailwindcss,
  SiMysql,
  SiMongodb,
  SiHibernate,
  SiGit,
  SiGithub,
  SiDocker,
  SiPostman,
  SiSwagger,
  SiGradle,
  SiNpm,
  SiFastapi,
  SiPytorch,
  SiScikitlearn,
  SiPandas,
  SiNumpy,
  SiJupyter,
  SiSupabase,
  SiFlutter,
  SiExpo,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { type IconType } from "react-icons";

interface TechItem {
  name: string;
  icon: IconType;
  color: string;
}

const TECH_ROW1: TechItem[] = [
  { name: "Java", icon: FaJava, color: "#ED8B00" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "C++", icon: SiCplusplus, color: "#00599C" },
  { name: "React", icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", icon: SiNextdotjs, color: "#ffffff" },
  { name: "Spring", icon: SiSpring, color: "#6DB33F" },
  { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
  { name: "FastAPI", icon: SiFastapi, color: "#009688" },
  { name: "Flutter", icon: SiFlutter, color: "#02569B" },
  { name: "Expo", icon: SiExpo, color: "#ffffff" },
];

const TECH_ROW2: TechItem[] = [
  { name: "Docker", icon: SiDocker, color: "#2496ED" },
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "GitHub", icon: SiGithub, color: "#ffffff" },
  { name: "Supabase", icon: SiSupabase, color: "#3ECF8E" },
  { name: "MongoDB", icon: SiMongodb, color: "#47A248" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  { name: "Hibernate", icon: SiHibernate, color: "#59666C" },
  { name: "PyTorch", icon: SiPytorch, color: "#EE4C2C" },
  { name: "scikit-learn", icon: SiScikitlearn, color: "#F7931E" },
  { name: "Pandas", icon: SiPandas, color: "#e70488" },
  { name: "NumPy", icon: SiNumpy, color: "#4DABCF" },
  { name: "Jupyter", icon: SiJupyter, color: "#F37626" },
  { name: "Postman", icon: SiPostman, color: "#FF6C37" },
  { name: "Swagger", icon: SiSwagger, color: "#85EA2D" },
  { name: "Gradle", icon: SiGradle, color: "#02303A" },
  { name: "npm", icon: SiNpm, color: "#CB3837" },
];

const toLogoItems = (items: TechItem[]) =>
  items.map(tech => ({
    node: (
      <span className="flex items-center gap-3 px-6 py-3 text-base rounded-full bg-surface border border-white/10 text-text-secondary whitespace-nowrap hover:border-primary/30 transition-colors duration-300 cursor-default">
        <tech.icon style={{ color: tech.color }} className="w-5 h-5 flex-shrink-0" />
        {tech.name}
      </span>
    ),
    ariaLabel: tech.name,
  }));

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" as const },
  }),
};


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
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const words = headingRef.current?.querySelectorAll(".word");
    if (!words?.length) return;
    gsap.to(words, {
      opacity: 1,
      y: 0,
      duration: 0.65,
      ease: "power3.out",
      stagger: 0.11,
      delay: 0.2,
    });
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-x-clip"
    >
      <div className="max-w-6xl mx-auto px-6 w-full pt-20 pb-8">
        {/* Available badge - centered */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" as const }}
          className="flex justify-center mb-12"
        >
          <span className="px-5 py-2.5 rounded-full text-sm font-medium bg-primary/10 text-primary-light border border-primary/20 animate-pulse-glow">
            Available for new opportunities
          </span>
        </motion.div>

        {/* Main content - text left, photo right */}
        <div className="flex flex-col lg:flex-row items-center lg:items-end gap-8 lg:gap-16">
          {/* Left - Text */}
          <div className="flex-1 text-center lg:text-left">
            <h1
              ref={headingRef}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              <span className="word inline-block" style={{ opacity: 0, transform: 'translateY(36px)' }}>Building</span>{" "}
              <span className="word inline-block" style={{ opacity: 0, transform: 'translateY(36px)' }}>Digital</span>{" "}
              <span className="word inline-block" style={{ opacity: 0, transform: 'translateY(36px)' }}>
                <ShinyText text="Solutions" speed={4} color="#4CAF50" shineColor="#c8ffc8" />
              </span>
              <br />
              <span className="word inline-block" style={{ opacity: 0, transform: 'translateY(36px)' }}>with</span>{" "}
              <span className="word inline-block" style={{ opacity: 0, transform: 'translateY(36px)' }}>Modern</span>{" "}
              <span className="word inline-block" style={{ opacity: 0, transform: 'translateY(36px)' }}>Tech</span>{" "}
              <span className="word inline-block" style={{ opacity: 0, transform: 'translateY(36px)' }}>&amp;</span>{" "}
              <span className="word inline-block" style={{ opacity: 0, transform: 'translateY(36px)' }}>AI</span>
            </h1>

            {/* Photo block — mobile only, between heading and paragraph */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.0, ease: "easeOut" as const, delay: 0.9 }}
              className="lg:hidden flex flex-col items-center gap-5 my-8"
            >
              <div className="relative w-[290px] h-[290px]">
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
              <a
                href="/Portfolio/cv.pdf"
                download
                className="group flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 text-text hover:border-primary/50 hover:text-primary transition-all duration-300"
              >
                Download CV
                <FiDownload className="download-icon w-4 h-4" />
              </a>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" as const, delay: 1.1 }}
              className="text-lg md:text-xl text-text-secondary max-w-lg mb-8 mx-auto lg:mx-0"
            >
              Fresh graduate engineer who combines creativity with AI-powered
              development. I build full-stack applications with clean code,
              honest approach, and a passion for learning.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" as const, delay: 1.4 }}
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

          {/* Right - Photo with particle orb (desktop only) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 30 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 1.0, ease: "easeOut" as const, delay: 0.9 }}
            className="hidden lg:flex flex-shrink-0 flex-col items-center gap-5"
          >
            <div className="relative w-[290px] h-[290px] md:w-[360px] md:h-[360px]">
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
            <a
              href="/Portfolio/cv.pdf"
              download
              className="group flex items-center gap-2 px-6 py-3 rounded-full border border-white/15 text-text hover:border-primary/50 hover:text-primary transition-all duration-300"
            >
              Download CV
              <FiDownload className="download-icon w-4 h-4" />
            </a>
          </motion.div>
        </div>

        {/* Tech stack - single larger marquee row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.7, duration: 0.8 }}
          className="mt-4 flex flex-col gap-0"
        >
          <p className="text-sm text-text-secondary text-center mb-1 uppercase tracking-widest">
            Tech I work with
          </p>
          <LogoLoop
            logos={toLogoItems(TECH_ROW1)}
            speed={60}
            direction="left"
            fadeOut
            hoverSpeed={15}
            scaleOnHover
            logoHeight={48}
            gap={12}
          />
          <LogoLoop
            logos={toLogoItems(TECH_ROW2)}
            speed={55}
            direction="right"
            fadeOut
            hoverSpeed={15}
            scaleOnHover
            logoHeight={48}
            gap={12}
            className="-mt-2"
          />
        </motion.div>
      </div>
    </section>
  );
}