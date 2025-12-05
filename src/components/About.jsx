import React, { useEffect, useState } from "react";
import { GraduationCap, Briefcase, Target } from "lucide-react";

export default function About() {
  const [mounted, setMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    try {
      const mq = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)");
      if (mq) {
        setPrefersReducedMotion(mq.matches);
        const handler = (e) => setPrefersReducedMotion(e.matches);
        if (mq.addEventListener) mq.addEventListener("change", handler);
        else mq.addListener(handler);
        return () => {
          if (mq.removeEventListener) mq.removeEventListener("change", handler);
          else mq.removeListener(handler);
        };
      }
    } catch (err) {
      // ignore
    }
  }, []);

  useEffect(() => {
    if (!prefersReducedMotion && typeof window !== "undefined") {
      const id = window.requestAnimationFrame(() => setMounted(true));
      return () => window.cancelAnimationFrame(id);
    } else {
      setMounted(true);
    }
  }, [prefersReducedMotion]);

  const revealClass = prefersReducedMotion ? "" : mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4";
  const transitionBase = prefersReducedMotion ? "" : "transition-all duration-700 ease-out";

  const cards = [
    {
      title: "Education",
      icon: GraduationCap,
      subtitle: "F.Sc (Current)",
      description: "Focused on web development & IT",
      iconBg: "var(--text-primary)",
      iconColor: "var(--bg)",
      cardBg: "var(--bg-alt)",
      borderColor: "var(--border)",
    },
    {
      title: "Experience",
      icon: Briefcase,
      subtitle: "Freelance Developer",
      description: "Building real-world projects",
      iconBg: "var(--accent)",
      iconColor: "var(--bg)",
      cardBg: "var(--bg-alt)",
      borderColor: "var(--border)",
    },
    {
      title: "Goals",
      icon: Target,
      subtitle: "Learn & Earn",
      description: "Building expertise through practice",
      iconBg: "var(--text-primary)",
      iconColor: "var(--bg)",
      cardBg: "var(--bg-alt)",
      borderColor: "var(--border)",
    },
  ];

  return (
    <section
      id="about"
      className="py-20 relative overflow-hidden flex justify-center"
      style={{ backgroundColor: "var(--bg)", color: "var(--text-primary)" }}
      aria-labelledby="about-heading"
    >
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className={`mb-12 ${transitionBase} ${revealClass}`}>
          
          
            <div className="text-center">
                      <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3" style={{ color: "var(--text-primary)" }}>
                About Me
              </h2>
            </div>
          </div>

          {/* Large Bio Card */}
      
           <div className="grid lg:grid-cols-2 gap-10 mb-16">
     
     
      <div
        className={`p-8 rounded-2xl border hover:scale-[1.03] shadow-white hover:shadow-[0_10px_15px_-3px_var(--accent/0.1),0_4px_6px_-2px_var(--accent/0.05)] transition-all duration-300 ${transitionBase} ${revealClass}`}
        style={{ backgroundColor: "var(--bg-alt)", borderColor: "var(--border)" }}
      >
        <h3 className="text-xl font-semibold mb-3" style={{ color: "var(--accent)" }}>Who I Am</h3>
        <p className="leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          A problem solver and creative thinker who thrives on building user-centric products. My journey blends coding precision with design intuition, ensuring every project is functional, scalable, and delightful.
        </p>
      </div>


      <div
        className={`p-8 rounded-2xl border hover:scale-[1.03] shadow-white hover:shadow-[0_10px_15px_-3px_var(--accent/0.1),0_4px_6px_-2px_var(--accent/0.05)] transition-all duration-300 ${transitionBase} ${revealClass}`}
        style={{ backgroundColor: "var(--bg-alt)", borderColor: "var(--border)" }}
      >
        <h3 className="text-xl font-semibold mb-3" style={{ color: "var(--accent)" }}>What I Do</h3>
        <p className="leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          From modern web apps to interactive interfaces, I help teams and clients transform ideas into digital solutions that are accessible, fast, and future-ready.
        </p>
      </div>
    </div>

          {/* Three Small Cards Aligned Horizontally */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 ">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <div
                  key={card.title}
                  className={`hover:scale-[1.03] shadow-white hover:shadow-[0_10px_15px_-3px_var(--accent/0.1),0_4px_6px_-2px_var(--accent/0.05)] transition-all duration-300 rounded-2xl p-6 text-center flex flex-col items-center gap-4 ${transitionBase} ${revealClass}`}
                  style={{ backgroundColor: card.cardBg, border: `1px solid ${card.borderColor}` }}
                  tabIndex={0}
                  role="group"
                  aria-label={`${card.title} card`}
                >
                  <div
                    className="p-4 rounded-xl inline-flex items-center justify-center mb-2"
                    style={{ backgroundColor: card.iconBg, color: card.iconColor }}
                  >
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>

                  <h4 className="text-2xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>
                    {card.title}
                  </h4>

                  <p className="text-sm font-semibold uppercase tracking-wide mb-1" style={{ color: "var(--text-primary)" }}>
                    {card.subtitle}
                  </p>

                  <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
                    {card.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
