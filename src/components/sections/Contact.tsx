"use client";

import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import { FiMail } from "react-icons/fi";
import {
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
  FaFacebookF,
  FaDiscord,
  FaTelegramPlane,
  FaWhatsapp,
} from "react-icons/fa";

interface SocialLink {
  icon: IconType;
  label: string;
  href: string;
  orbit: number; // 0 = inner, 1 = middle, 2 = outer
  startAngle: number; // degrees offset on orbit
}

const SOCIALS: SocialLink[] = [
  // Inner orbit — professional
  {
    icon: FaGithub,
    label: "GitHub",
    href: "https://github.com/r1ckshot",
    orbit: 0,
    startAngle: 0,
  },
  {
    icon: FaLinkedinIn,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/mykhailo-kapustianyk",
    orbit: 0,
    startAngle: 180,
  },
  // Middle orbit — messengers
  {
    icon: FaTelegramPlane,
    label: "Telegram",
    href: "https://t.me/r1ckshot",
    orbit: 1,
    startAngle: 0,
  },
  {
    icon: FaDiscord,
    label: "Discord",
    href: "https://discordapp.com/users/426406251640127489",
    orbit: 1,
    startAngle: 120,
  },
  {
    icon: FaWhatsapp,
    label: "WhatsApp",
    href: "https://wa.me/48570815843",
    orbit: 1,
    startAngle: 240,
  },
  // Outer orbit — social
  {
    icon: FaInstagram,
    label: "Instagram",
    href: "https://www.instagram.com/misha_kapustianyk_777?igsh=NHl3ZGtyYTAwbTZ0",
    orbit: 2,
    startAngle: 60,
  },
  {
    icon: FaFacebookF,
    label: "Facebook",
    href: "https://www.facebook.com/share/1BoTNQz28X/",
    orbit: 2,
    startAngle: 240,
  },
];

const ORBIT_CONFIG = [
  { radius: 125, duration: "14s", reverse: false },
  { radius: 185, duration: "20s", reverse: true },
  { radius: 250, duration: "28s", reverse: false },
];

const EMAIL = "kapusticnyk.com@gmail.com";

export function Contact() {
  return (
    <section id="contact" className="pt-16 pb-6 px-6">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-6xl mx-auto mb-6 md:mb-[-10px]"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-3">
          Get in{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-light">
            Touch
          </span>
        </h2>
        <p className="text-base md:text-lg text-text-secondary max-w-lg mx-auto">
          Feel free to reach out — whether it&apos;s a project idea, a question,
          or just to say hi.
        </p>
      </motion.div>

      {/* Desktop: Solar system */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="hidden md:flex flex-col items-center justify-center"
      >
        <div
          className="solar-system"
          style={{ width: ORBIT_CONFIG[2].radius * 2 + 80, height: ORBIT_CONFIG[2].radius * 2 + 80 }}
        >
          {/* Orbit track lines */}
          {ORBIT_CONFIG.map((orbit, i) => (
            <div
              key={`track-${i}`}
              className="absolute rounded-full border border-white/5"
              style={{
                width: orbit.radius * 2,
                height: orbit.radius * 2,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          ))}

          {/* Orbiting icons */}
          {SOCIALS.map((social) => {
            const orbit = ORBIT_CONFIG[social.orbit];
            return (
              <div
                key={social.label}
                className={`solar-orbit-ring ${orbit.reverse ? "reverse" : ""}`}
                style={{
                  "--duration": orbit.duration,
                  "--start": `${social.startAngle}deg`,
                  width: orbit.radius * 2,
                  height: orbit.radius * 2,
                  top: "50%",
                  left: "50%",
                  marginTop: -orbit.radius,
                  marginLeft: -orbit.radius,
                } as React.CSSProperties}
              >
                <div
                  className="solar-icon-wrapper"
                  style={{ "--duration": orbit.duration } as React.CSSProperties}
                >
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-surface border border-white/10 hover:border-primary/50 hover:scale-125 hover:bg-primary/10 transition-all duration-300"
                  >
                    <social.icon className="w-5 h-5 text-text-secondary group-hover:text-primary transition-colors duration-300" />
                    <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-xs text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none">
                      {social.label}
                    </span>
                  </a>
                </div>
              </div>
            );
          })}

          {/* Center: Email button */}
          <a
            href={`mailto:${EMAIL}`}
            className="solar-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center justify-center w-36 h-36 rounded-full bg-surface border border-primary/30 hover:border-primary/60 hover:scale-105 transition-all duration-500 group"
          >
            <FiMail className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
            <span className="text-xs text-text-secondary group-hover:text-primary transition-colors duration-300">
              Send Email
            </span>
          </a>
        </div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center text-lg text-text-secondary mt-1"
        >
          Always open to new opportunities and interesting conversations.
        </motion.p>
      </motion.div>

      {/* Mobile: Icon grid */}
      <div className="md:hidden max-w-sm mx-auto mt-6">
        {/* Email button */}
        <motion.a
          href={`mailto:${EMAIL}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="group flex items-center justify-center gap-3 w-full py-4 mb-6 rounded-2xl bg-surface border border-primary/30 hover:border-primary/50 transition-all duration-300 solar-center"
        >
          <FiMail className="w-5 h-5 text-primary" />
          <span className="text-sm text-text group-hover:text-primary transition-colors duration-300">
            {EMAIL}
          </span>
        </motion.a>

        {/* Social grid */}
        <div className="flex flex-wrap justify-center gap-3">
          {SOCIALS.map((social, i) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="group flex flex-col items-center gap-1.5 py-3 rounded-xl bg-surface border border-white/10 hover:border-primary/30 transition-all duration-300 w-20"
              aria-label={social.label}
            >
              <social.icon className="w-5 h-5 text-text-secondary group-hover:text-primary transition-colors duration-300" />
              <span className="text-xs text-text-secondary group-hover:text-primary transition-colors duration-300">
                {social.label}
              </span>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Bottom text — mobile only */}
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="md:hidden text-center text-lg text-text-secondary mt-4"
      >
        Always open to new opportunities and interesting conversations.
      </motion.p>
    </section>
  );
}
