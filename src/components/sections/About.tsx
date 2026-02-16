"use client";

import { useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { FiUser, FiCpu, FiHeart, FiStar, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import type { IconType } from "react-icons";

const MorphingScene = dynamic(
  () =>
    import("@/components/ui/MorphingScene").then((mod) => mod.MorphingScene),
  { ssr: false },
);

const ABOUT_BLOCKS = [
  {
    icon: FiUser,
    title: "Who I Am",
    text: "A fresh graduate engineer from Ukraine, currently pursuing my Master's in Poland. Full-stack developer who loves building things end-to-end — from databases and APIs to interactive frontends. Languages: Ukrainian (Native), Polish (Fluent), English (Fluent), Russian (Fluent).",
  },
  {
    icon: FiCpu,
    title: "AI & Development",
    text: "I openly use AI as a tool in my workflow — it helps me move faster and explore ideas efficiently. But I always understand what's under the hood. AI accelerates, solid fundamentals drive.",
  },
  {
    icon: FiHeart,
    title: "Beyond Code",
    text: "Passionate about fitness, healthy eating, and cooking. I thrive in team environments and genuinely enjoy collaborating — good communication is just as important as good code.",
  },
  {
    icon: FiStar,
    title: "Values",
    text: "Honesty, continuous growth, and faith guide me. I'm a practicing Christian, and that shapes how I approach both life and work.",
  },
];

const slideVariants = {
  enter: {
    opacity: 0,
  },
  center: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

export function About() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const shapeIndexRef = useRef(0);

  const goTo = useCallback(
    (index: number) => {
      setDirection(index > activeIndex ? 1 : -1);
      setActiveIndex(index);
      shapeIndexRef.current = index;
    },
    [activeIndex],
  );

  const prev = useCallback(() => {
    const next = activeIndex === 0 ? ABOUT_BLOCKS.length - 1 : activeIndex - 1;
    goTo(next);
  }, [activeIndex, goTo]);

  const next = useCallback(() => {
    const nextIdx = activeIndex === ABOUT_BLOCKS.length - 1 ? 0 : activeIndex + 1;
    goTo(nextIdx);
  }, [activeIndex, goTo]);

  const block = ABOUT_BLOCKS[activeIndex];
  const Icon = block.icon;

  return (
    <section id="about" className="pt-16 pb-24 px-6">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-6xl mx-auto mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          About{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
            Me
          </span>
        </h2>
        <p className="text-text-secondary max-w-lg mx-auto">
          A bit about who I am, how I work, and what drives me forward.
        </p>
      </motion.div>

      {/* Mobile: simple stack */}
      <div className="lg:hidden max-w-xl mx-auto space-y-4">
        {ABOUT_BLOCKS.map((b, i) => (
          <MobileCard key={b.title} block={b} index={i} />
        ))}
      </div>

      {/* Desktop: 3D scene + card carousel */}
      <div className="hidden lg:block max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="grid grid-cols-[1fr_1fr] gap-12 items-center"
        >
          {/* Left: 3D scene */}
          <div style={{ height: "550px" }}>
            <MorphingScene shapeIndexRef={shapeIndexRef} />
          </div>

          {/* Right: card carousel */}
          <div className="flex flex-col items-center">
            {/* Card with arrows */}
            <div className="flex items-center gap-4 w-full">
              {/* Prev arrow */}
              <button
                onClick={prev}
                className="shrink-0 p-2 rounded-full border border-white/10 text-text-secondary hover:text-primary hover:border-primary/40 transition-colors"
                aria-label="Previous"
              >
                <FiChevronLeft className="w-5 h-5" />
              </button>

              {/* Card */}
              <div className="relative flex-1 overflow-hidden py-4 -my-4 px-2 -mx-2" style={{ minHeight: "220px" }}>
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={activeIndex}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      duration: 0.35,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    className="group p-6 rounded-2xl bg-surface/90 backdrop-blur-sm border border-white/10 shadow-[0_4px_15px_rgba(76,175,80,0.08)] hover:border-primary/30 hover:-translate-y-1 hover:shadow-[0_6px_20px_rgba(76,175,80,0.12)] transition-all duration-500"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-2.5 rounded-lg bg-primary/10">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold text-text group-hover:text-primary transition-colors duration-300">
                        {block.title}
                      </h3>
                    </div>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {block.text}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Next arrow */}
              <button
                onClick={next}
                className="shrink-0 p-2 rounded-full border border-white/10 text-text-secondary hover:text-primary hover:border-primary/40 transition-colors"
                aria-label="Next"
              >
                <FiChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Dot indicators */}
            <div className="flex gap-2 mt-5">
              {ABOUT_BLOCKS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to ${ABOUT_BLOCKS[i].title}`}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                    i === activeIndex
                      ? "bg-primary scale-110"
                      : "bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Mobile card ─────────────────────────────────────────── */
function MobileCard({
  block,
  index,
}: {
  block: { icon: IconType; title: string; text: string };
  index: number;
}) {
  const Icon = block.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group p-5 rounded-xl bg-surface/80 backdrop-blur-sm border border-white/10 shadow-[0_4px_15px_rgba(76,175,80,0.08)]"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <h3 className="text-xl font-semibold text-text group-hover:text-primary transition-colors duration-300">{block.title}</h3>
      </div>
      <p className="text-sm text-text-secondary leading-relaxed">
        {block.text}
      </p>
    </motion.div>
  );
}
