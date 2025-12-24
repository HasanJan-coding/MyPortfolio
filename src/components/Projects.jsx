import React, { useEffect, useRef } from "react";
import { ArrowUpRight, Folder, Github } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Projects data
 */
const projectData = [
  {
    title: "Company Landing Page",
    description:
      "Clean animations, strong visual hierarchy, and performance-focused UI.",
    stack: ["HTML", "Tailwind CSS", "JavaScript"],
    link: "https://abbonova-enhanced.netlify.app",
    repo: "#",
    highlights: ["Perfect layout", "Smooth animations", "Best UX"],
    img: "src/assets/abbonova.jpg",
  },
  {
    title: "Weather Application",
    description:
      "Weather-themed UI with responsive layouts and dynamic backgrounds.",
    img: "src/assets/weather.jpg",
    stack: ["HTML", "Tailwind CSS", "Node.js"],
    link: "#",
    repo: "#",
    highlights: ["Dynamic UI", "Weather API", "Adaptive layout"],
  },
  {
    title: "Orbit College Campus",
    description:
      "Production college website with admissions workflow and admin control.",
    stack: ["HTML", "Tailwind CSS", "PHP", "JavaScript"],
    link: "https://theorbitcollege.edu.pk",
    repo: "#",
    highlights: ["Admissions system", "PDF storage", "Admin panel"],
    img: "src/assets/orbit.jpg",
  },
];

/**
 * Single Project Card (GSAP controlled)
 */
function ProjectCard({ project }) {
  const cardRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    let ctx;

    try {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) return;

      ctx = gsap.context(() => {
        // Initial states
        gsap.set(cardRef.current, {
          opacity: 0,
          y: 48,
        });

        gsap.set(imageRef.current, {
          scale: 1,
        });

        // Card reveal
        gsap.to(cardRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            once: true,
          },
        });

        // Image subtle scale
        gsap.to(imageRef.current, {
          scale: 1.06,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top 85%",
            once: true,
          },
        });
      }, cardRef);
    } catch (error) {
      console.error("GSAP_PROJECT_CARD_ERROR_001", error);
    }

    return () => {
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <article
      ref={cardRef}
      className="relative overflow-hidden rounded-2xl border"
      style={{
        backgroundColor: "var(--bg-alt)",
        borderColor: "var(--border)",
      }}
    >
      {/* IMAGE */}
      <div className="relative aspect-video overflow-hidden">
        <img
          ref={imageRef}
          src={project.img}
          alt={`Screenshot of ${project.title}`}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* CONTENT */}
      <div className="p-6 md:p-7">
        <div className="flex justify-between items-start mb-5">
          <Folder className="h-7 w-7" style={{ color: "var(--accent)" }} />
          <div className="flex gap-3">
            <a
              href={project.repo}
              aria-label="View repository"
              className="opacity-70 hover:opacity-100 transition-opacity"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={project.link}
              aria-label="View live project"
              className="opacity-80 hover:opacity-100 transition-opacity"
              style={{ color: "var(--accent)" }}
            >
              <ArrowUpRight className="h-5 w-5" />
            </a>
          </div>
        </div>

        <h3 className="text-xl font-extrabold text-white mb-2">
          {project.title}
        </h3>

        <p
          className="text-sm leading-relaxed mb-5"
          style={{ color: "var(--text-secondary)" }}
        >
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="text-[11px] px-3 py-1 rounded-full font-semibold"
              style={{
                backgroundColor: "var(--border)",
                color: "var(--text-secondary)",
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        <ul className="space-y-2 text-xs" style={{ color: "var(--text-secondary)" }}>
          {project.highlights.map((item) => (
            <li key={item}>• {item}</li>
          ))}
        </ul>
      </div>
    </article>
  );
}

/**
 * Projects Section
 */
export default function Projects() {
  return (
    <section
      id="projects"
      className="py-24"
      style={{ backgroundColor: "var(--bg)" }}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <header className="mb-16 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white">
            Selected Projects
          </h2>
          <p
            className="mt-3 max-w-2xl mx-auto text-base"
            style={{ color: "var(--text-secondary)" }}
          >
            Real-world projects focused on performance, usability, and clean
            architecture.
          </p>
        </header>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectData.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
