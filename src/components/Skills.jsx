import React, { useEffect, useState } from "react";
import { Code, Database, Wrench, Palette } from "lucide-react";

const skillCategories = [
  { icon: Code, title: "Frontend", skills: [
    { name: "HTML5", level: 95 },
    { name: "CSS", level: 90 },
    { name: "Tailwind CSS", level: 95 }, 
    { name: "React / Next.js", level: 85 },
  ], },
  { icon: Database, title: "Backend & DB", skills: [
    { name: "Node.js", level: 80 },
    { name: "Express", level: 75 },
    { name: "MongoDB", level: 70 },
    { name: "PostgreSQL / SQL", level: 65 }, 
  ], },
  { icon: Wrench, title: "Dev Tools & Flow", skills: [
    { name: "Git & GitHub", level: 90 },
    { name: "RESTful APIs", level: 80 }, 
    { name: "Deployment (Vercel/Netlify)", level: 75 },
    { name: "Testing (Jest/React Testing Library)", level: 65 }, 
  ], },
  { icon: Palette, title: "Design & UX", skills: [ 
    { name: "UI/UX Principles", level: 85 },
    { name: "Figma / Sketch", level: 70 }, 
    { name: "Responsive Design", level: 95 },
    { name: "Web Performance", level: 80 },
  ], },
];

export default function Skills() {
  const [mounted, setMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // --- Reduced Motion & Mount Logic ---
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
    } catch (err) { /* ignore */ }
  }, []);

  useEffect(() => {
       if (!prefersReducedMotion && typeof window !== "undefined") {
      const id = window.requestAnimationFrame(() => setMounted(true));
      return () => window.cancelAnimationFrame(id);
    }
    setMounted(true); 
  }, [prefersReducedMotion]);

  // --- Animation Classes ---
  // The reveal classes are controlled by the `mounted` state
  const revealBase = mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4";
  const revealTransition = prefersReducedMotion ? "" : "transition-all duration-700 ease-out";
  
  const headerReveal = mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2";
  const headerTransition = prefersReducedMotion ? "" : "transition-all duration-500 ease-out";

  return (
    <section 
      id="skills" 
      className="py-20 md:py-32 relative overflow-hidden"
      style={{ 
        backgroundColor: "var(--bg)",
        color: "var(--text-primary)" 
      }}
      aria-labelledby="skills-heading"
    >
      {/* Ambient Glow: Toned down, moved to a less disruptive location */}
      <div 
        aria-hidden 
        className="absolute top-20 left-0 w-72 h-72 rounded-full blur-3xl opacity-10 pointer-events-none" 
        style={{ backgroundColor: "var(--accent)" }} 
      />

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          
          {/* Header */}
          <header className={`mb-16 md:mb-20 ${headerTransition} ${headerReveal}`}>
               
           
            <h2 
              id="skills-heading" 
              className="lg:text-6xl md:text-5xl text-4xl text-center font-extrabold leading-none mb-4"
            >
              Skills &amp; 
              <span className="inline-block" style={{color: "var(--accent)",}}
              >
                Technologies
              </span>
            <p className="text-xl py-3 font-medium" style={{ color: "var(--text-secondary)" }}>
              Comfortable with end-to-end project development: design → build → deploy.
            </p>
            </h2>
          </header>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
            {skillCategories.map((category, idx) => {
              const Icon = category.icon;
              // Delay calculation for staggered animation
              const animDelayStyle = !prefersReducedMotion ? { transitionDelay: `${idx * 0.1}s` } : undefined; 

              return (
                <div 
                  key={category.title} 
                  className={`hover:scale-[1.03] shadow-white hover:shadow-[0_10px_15px_-3px_var(--accent/0.1),0_4px_6px_-2px_var(--accent/0.05)] transition-all duration-300
                    ${revealTransition} 
                    ${revealBase} 
                    rounded-2xl p-6 md:p-10 bg-[--bg-alt]
                  `}
                  style={{
                    // Cleaned up the background and border for a minimalist dark card look
 
                    border: "1px solid var(--border)", 
                    ...(animDelayStyle || {}),
                  }}
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div 
                      className="p-3 rounded-xl inline-flex items-center justify-center border" 
                      style={{ 
                        backgroundColor: "var(--accent-weak, rgba(212, 175, 55, 0.1))", // Used a more direct variable for weak accent
                        color: "var(--accent)",
                        borderColor: "var(--accent)",
                      }}
                      aria-hidden
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="text-3xl md:text-4xl font-extrabold" style={{ color: "var(--text-primary)" }}>
                      {category.title}
                    </h3>
                  </div>

                  <div className="space-y-7"> {/* Increased space for better separation */}
                    {category.skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-base font-semibold tracking-wide" style={{ color: "var(--text-secondary)" }}>
                            {skill.name}
                          </span>
                          <span className="text-base font-black" style={{ color: "var(--accent)" }}>
                            {skill.level}%
                          </span>
                        </div>
                        
                        {/* Accessible progress bar */}
                        <div 
                          className="w-full h-2 rounded-full" 
                          style={{ backgroundColor: "var(--border)" }} // Used --border for the background track
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
                              // Used a simple, solid accent color for a cleaner look
                              backgroundColor: "var(--accent)", 
                              transition: prefersReducedMotion ? "none" : "width 1.2s cubic-bezier(.2,.9,.2,1)",
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}