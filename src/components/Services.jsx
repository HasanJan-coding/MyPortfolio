// Services.jsx
import React, { useEffect, useRef } from "react";
import {
  Code2,
  Palette,
  Globe,
  Server,
  Zap,
  ArrowRight,
} from "lucide-react";

/**
 * Services data definition
 */
const services = [
  {
    icon: Code2,
    title: "Full-Stack Development",
    description:
      "End-to-end systems with clean architecture, maintainable code, and scalable APIs.",
    features: [
      "React / SPA Architecture",
      "REST & Auth Systems",
      "Database Modeling",
      "Production Deployment",
    ],
  },
  {
    icon: Palette,
    title: "UI / UX Engineering",
    description:
      "Interfaces built for clarity, accessibility, and long-term usability — not trends.",
    features: [
      "Responsive Layouts",
      "Accessible Components",
      "Design Systems",
      "UX Flow Refinement",
    ],
  },
  {
    icon: Globe,
    title: "Landing Pages & Sites",
    description:
      "High-performance websites focused on speed, SEO, and conversion-ready structure.",
    features: [
      "SEO-Ready Markup",
      "Fast LCP & CLS",
      "Mobile-First Builds",
      "Cross-Browser Support",
    ],
  },
  {
    icon: Server,
    title: "Backend & Integrations",
    description:
      "Secure, reliable backend logic with clean APIs and structured data flow.",
    features: [
      "API Design",
      "File & Data Storage",
      "Security Practices",
      "Server Logic",
    ],
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description:
      "Audited and refined codebases for real-world speed and smooth interaction.",
    features: [
      "Code Splitting",
      "Lazy Loading",
      "Animation Budgeting",
      "Accessibility Checks",
    ],
  },
];

export default function Services() {
  const cardsRef = useRef([]);

  useEffect(() => {
    try {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (prefersReducedMotion) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const index = cardsRef.current.indexOf(entry.target);
              entry.target.animate(
                [
                  { opacity: 0, transform: "translateY(10px)" },
                  { opacity: 1, transform: "translateY(0)" },
                ],
                {
                  duration: 600,
                  easing: "cubic-bezier(.22,.61,.36,1)",
                  delay: index * 80,
                  fill: "forwards",
                }
              );
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15 }
      );

      cardsRef.current.forEach((el) => el && observer.observe(el));
      return () => observer.disconnect();
    } catch (err) {
      console.error("SERVICES_ANIMATION_ERROR", err);
    }
  }, []);

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="py-24 md:py-32"
      style={{
        backgroundColor: "var(--bg)",
        color: "var(--text-primary)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <header className="text-center mb-14">
          <h2
            id="services-heading"
            className="text-5xl md:text-6xl font-extrabold mb-4"
            style={{ color: "#ffffff" }}
          >
            Services
          </h2>
          <p
            className="max-w-2xl mx-auto text-base md:text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            Carefully engineered solutions focused on clarity, performance, and
            long-term value.
          </p>
        </header>

        {/* Grid */}
        <div
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          style={{ gridAutoRows: "1fr" }}
        >
          {services.map((service, index) => {
            const Icon = service.icon;

            return (
              <article
                key={service.title}
                ref={(el) => (cardsRef.current[index] = el)}
                className="service-card h-full flex flex-col rounded-xl p-6 opacity-0"
                style={{
                  background:
                    "linear-gradient(180deg, rgba(255,255,255,0.04), rgba(255,255,255,0.01))",
                  border: "1px solid var(--border)",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.55)",
                }}
              >
                {/* Icon */}
                <div
                  className="mb-5 w-fit rounded-lg p-3 backdrop-blur-md"
                  style={{
                    border: "1px solid var(--border)",
                    backgroundColor: "var(--accent)", // ✅ ACCENT
                  }}
                  aria-hidden="true"
                >
                  <Icon className="h-5 w-5 text-black" />
                </div>

                {/* Content */}
                <h3
                  className="text-xl font-extrabold mb-2"
                  style={{ color: "#ffffff" }}
                >
                  {service.title}
                </h3>

                <p
                  className="text-sm mb-5 leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {service.description}
                </p>

                {/* Features */}
                <ul className="flex-1 space-y-2 mb-6 text-sm">
                  {service.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <span
                        className="inline-block w-1.5 h-1.5 rounded-full"
                        style={{
                          backgroundColor: "var(--accent)", // ✅ ACCENT DOTS
                        }}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="#contact"
                  className="group inline-flex items-center justify-between gap-2 rounded-md px-4 py-2 text-xs font-bold uppercase"
                  style={{
                    border: "1px solid var(--border)",
                    color: "#ffffff",
                    background:
                      "linear-gradient(180deg, rgba(255,255,255,0.04), transparent)",
                  }}
                >
                  Request Service
                  <ArrowRight className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-1" />
                </a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
