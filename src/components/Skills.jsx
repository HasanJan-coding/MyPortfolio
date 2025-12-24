import React, { useEffect, useState } from "react";
import { Code, Database, Wrench, Palette, Gauge } from "lucide-react";


const skillMap = {
  frontend: {
    icon: Code,
    title: "Frontend Engineering",
    emphasis: true,
    skills: [
      { name: "HTML5", level: 95 },
      { name: "CSS / Tailwind", level: 95 },
      { name: "React / Next.js", level: 85 },
    ],
  },
  backend: {
    icon: Database,
    title: "Backend & Databases",
    skills: [
      { name: "Node.js", level: 80 },
      { name: "Express", level: 75 },
      { name: "MongoDB", level: 70 },
      { name: "PostgreSQL", level: 65 },
    ],
  },
  tooling: {
    icon: Wrench,
    title: "Dev Tools & Flow",
    skills: [
      { name: "Git & GitHub", level: 90 },
      { name: "REST APIs", level: 80 },
      { name: "Deployment", level: 75 },
      { name: "Testing", level: 65 },
    ],
  },
  design: {
    icon: Palette,
    title: "Design & UX",
    skills: [
      { name: "UI/UX Principles", level: 85 },
      { name: "Responsive Design", level: 95 },
      { name: "Web Performance", level: 80 },
    ],
  },
  performance: {
    icon: Gauge,
    title: "Quality & Performance",
    wide: true,
    skills: [
      { name: "Accessibility (a11y)", level: 85 },
      { name: "Lighthouse Optimization", level: 80 },
      { name: "SEO & Core Web Vitals", level: 75 },
    ],
  },
};

/**
 * Skills component: responsive, accessible, reduced-motion aware.
 * @returns {JSX.Element}
 */
export default function Skills() {
  const [mounted, setMounted] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    try {
      const mq =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mq) {
        setReduceMotion(mq.matches);
        const handler = (e) => setReduceMotion(e.matches);
        if (mq.addEventListener) mq.addEventListener("change", handler);
        else mq.addListener(handler);
        return () => {
          if (mq.removeEventListener) mq.removeEventListener("change", handler);
          else mq.removeListener(handler);
        };
      }
    } catch (err) {
      // safe fallback: prefer motion
      setReduceMotion(false);
    }
  }, []);

  useEffect(() => {
    // small mount reveal (uses requestAnimationFrame so this is not background work)
    const id = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(id);
  }, []);

  const reveal = mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6";
  const transitionBase = reduceMotion ? "" : "transition-all duration-700 ease-out";

  return (
    <section id="skills" className="relative py-24" style={{ backgroundColor: "var(--bg)" }}>
      <div className="max-w-[1300px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[320px_1fr] gap-14">
        <aside
          className={`self-start ${reveal} ${transitionBase}
            lg:sticky lg:top-32 lg:text-left text-center mx-auto max-w-xl
          `}
          aria-hidden={false}
        >
          <h2
            className="text-5xl text-center font-extrabold leading-tight text-white"
            style={{ lineHeight: 1.02 }}
          >
            My Skills

            <img id="skills-img" className="my-10" src="src/assets/skills.png" alt="" />
          </h2>

          <p
            className="mt-4 text-lg"
            style={{ color: "var(--text-secondary)", maxWidth: 520, margin: "0.6rem auto 0" }}
          >
            End-to-end development mindset from design to deployment.
          </p>

          {/* small accent underline flourish that is responsive and respects reduced motion */}
          <div
            aria-hidden
            className={`mt-5 h-1 w-20 rounded-full mx-auto lg:mx-0`}
            style={{
              background: "linear-gradient(90deg, var(--accent), transparent)",
              transformOrigin: "left",
              transition: reduceMotion ? "none" : "transform 600ms cubic-bezier(.2,.8,.2,1), opacity 300ms",
              transform: mounted ? "scaleX(1)" : "scaleX(0)",
              opacity: mounted ? 1 : 0,
            }}
          />
        </aside>

        {/* === Skill Fields === */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {Object.values(skillMap).map((group, i) => {
            const Icon = group.icon;
            return (
              <article
                key={group.title}
                tabIndex={0}
                className={`
                  rounded-2xl border p-8 focus:outline-none focus-visible:ring-4 focus-visible:ring-[color:var(--accent)/0.18]
                  ${group.wide ? "md:col-span-2" : ""}
                  ${group.emphasis ? "ring-1 ring-[var(--accent)]" : ""}
                  ${reveal} ${transitionBase}
                `}
                style={{
                  backgroundColor: "var(--bg-alt)",
                  borderColor: "var(--border)",
                  transitionDelay: reduceMotion ? "0ms" : `${i * 120}ms`,
                }}
                aria-labelledby={`group-${i}`}
              >
                <header className="flex items-center gap-4 mb-6">
                  <div
                    className="p-3 rounded-xl inline-flex items-center justify-center"
                    style={{
                      backgroundColor: "var(--accent-weak)",
                      color: "var(--accent)",
                    }}
                    aria-hidden
                  >
                    <Icon size={20} />
                  </div>
                  {/* GROUP TITLE: forced white per your request */}
                  <h3 id={`group-${i}`} className="text-2xl font-bold text-white">
                    {group.title}
                  </h3>
                </header>

                <div className="space-y-6">
                  {group.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between mb-1 text-sm">
                        <span style={{ color: "var(--text-secondary)" }}>{skill.name}</span>
                        <span style={{ color: "var(--accent)" }}>{skill.level}%</span>
                      </div>

                      <div
                        className="h-2 rounded-full"
                        style={{ backgroundColor: "var(--border)" }}
                        role="progressbar"
                        aria-valuenow={skill.level}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${skill.name} proficiency`}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{
                            width: `${skill.level}%`,
                            backgroundColor: "var(--accent)",
                            transition: reduceMotion ? "none" : "width 1s cubic-bezier(.2,.8,.2,1)",
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
