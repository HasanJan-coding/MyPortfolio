// Services.jsx
import React from "react";
import { Code2, Palette, Globe, Server, Zap, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Code2,
    title: "Full-Stack Development",
    description: "End-to-end web applications with React, Node.js, and MongoDB.",
    features: ["React Applications", "RESTful APIs", "Database Design", "Authentication"],
  },
  {
    icon: Palette,
    title: "UI/UX Improvements",
    description: "Accessibility-focused design, user flows, and interactive prototypes.",
    features: ["Responsive Design", "User Research", "Wireframing", "Prototyping"],
  },
  {
    icon: Globe,
    title: "Landing Pages & Sites",
    description: "Performance-first builds with modern frameworks and best practices.",
    features: ["SEO Optimization", "Fast Loading", "Mobile-First", "Cross-Browser"],
  },
  {
    icon: Server,
    title: "API Integration & Backend",
    description: "Secure endpoints, data storage, and file management systems.",
    features: ["REST APIs", "Database Management", "File Storage", "Security"],
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Speed improvements and smooth micro-interactions with accessibility.",
    features: ["Code Splitting", "Lazy Loading", "Animation", "Accessibility"],
  },
];

const accentRgb = "212, 175, 55"; // nearly same color

export default function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="py-20 md:py-32"
      style={{ backgroundColor: "var(--bg)", color: "var(--text-primary)" }}
    >
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto text-center mb-12">
          
          <h2 id="services-heading" className="text-4xl md:text-5xl font-extrabold leading-tight mb-3">
            My <span
              style={{
                color: "var(--accent)",
              }}
            >
               Services
            </span>
          </h2>

          <p className="text-base md:text-lg" style={{ color: "var(--text-secondary)" }}>
            From landing pages to full backends, production-ready web systems that perform and delight.
          </p>
        </div>

        <div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          style={{ gridAutoRows: "1fr" }}>
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <article
                key={s.title}
                className="h-full flex flex-col p-6 rounded-xl border transition-transform hover:scale-[1.01] focus-within:scale-[1.01]"
                style={{
                  backgroundColor: "var(--bg-alt)",
                  borderColor: "var(--border)",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.6)",
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: "var(--accent)", color: "var(--text-primary)" }}
                    aria-hidden="true"
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
               </div>

                <h3 className="text-xl font-extrabold mb-2" style={{ color: "var(--text-primary)" }}>
                  {s.title}
                </h3>

                <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
                  {s.description}
                </p>

                {/* features take flexible space so CTA always sticks to bottom */}
                <ul className="mb-6 space-y-2 text-sm flex-1" aria-label={`${s.title} features`}>
                  {s.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 font-semibold tracking-wider" style={{ color: "var(--text-secondary)" }}>
                      <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "var(--accent)" }} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-md font-bold text-xs uppercase border"
                  style={{
                    borderColor: "var(--border)",
                    color: "var(--accent)",
                    backgroundColor: "transparent",
                  }}
                >
                  Request Service <ArrowRight className="h-3 w-3" aria-hidden="true" />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
