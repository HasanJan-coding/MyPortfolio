import React, { useEffect, useRef } from "react";
import { Download } from "lucide-react";
import gsap from "gsap";
import SplitText from "gsap/SplitText";
import Typewriter from "typewriter-effect/dist/core";

/**
 * Hero — GSAP + SplitText + Typewriter (React-ready)
 */
export default function Hero({
  imageSrc = "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.0.3&s=6a6ec0a0d2a8a6d3b7a1b3c9b0f0f4f1",
  profileImg = "src/assets/ha1.png",
  projectImg = "src/assets/orbit.jpg",
} = {}) {

  const rootRef = useRef(null);   
  const profileRef = useRef(null);
  const roleRotatorRef = useRef(null);
  const blobRef = useRef(null);
  const gsapContextRef = useRef(null);
  const splitTitleRef = useRef(null);
  const splitParaRef = useRef(null);
  const typewriterRef = useRef(null);









  
useEffect(() => {
  try {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    gsap.registerPlugin(SplitText);

    // scope everything to rootRef so selectors don't hit other components on the page
    gsapContextRef.current = gsap.context(() => {
      if (prefersReducedMotion) return;

      // SplitText instances
      splitTitleRef.current = new SplitText("#h-title", { type: "words,chars" });
      splitParaRef.current = new SplitText("#h-text", { type: "lines" });

      // entry tweens timeline
      gsap.from("#a-card", {
        delay: 0.5,
        opacity: 0,
        scale: 0.95,
        duration: 0.9,
        ease: "power2.out",
      });

      const tl = gsap.timeline();
      tl.from(splitTitleRef.current.chars, {
        y: -20,
        opacity: 0,
        stagger: 0.03,
        duration: 0.6,
        ease: "power3.out",
      });

      tl.from(
        splitParaRef.current.lines,
        { y: "100%", opacity: 0, stagger: 0.06, ease: "expo.out" },
        "-=0.3"
      );

      tl.from(
        ".h-btns",
        { scale: 0, opacity: 0, stagger: 0.08, duration: 0.45 },
        "-=0.2"
      );

      tl.from(
        ".h-boxes",
        { opacity: 0, scale: 0, stagger: { amount: 0.28, from: "end" }, duration: 0.45 },
        "-=0.25"
      );

      /* GSAP ANIMATIONS */
      /* Entry animations (existing) */
      // ---- smooth painting swing: use profileRef (avoid class collisions) ----
      if (profileRef && profileRef.current) {
        // ensure GSAP owns transform state and hint GPU
        gsap.set(profileRef.current, { transformOrigin: "top center", force3D: true, z: 0.01 });

        // single looping tween that won't overwrite other tweens on different props
        gsap.to(profileRef.current, {
          rotation: 6,
          duration: 2,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          overwrite: false,          // don't stomp other tweens
          // immediateRender false avoids snapping from immediate render
          immediateRender: false,
        });
      }
      /* END GSAP ANIMATIONS */
    }, rootRef); // <-- pass rootRef to limit selector scope
  } catch (err) {
    console.error("GSAP_INIT_ERR", err);
  }

  return () => {
    try {
      if (gsapContextRef.current) gsapContextRef.current.revert(); // kills local tweens
      if (splitTitleRef.current?.revert) splitTitleRef.current.revert();
      if (splitParaRef.current?.revert) splitParaRef.current.revert();
    } catch (err) {
      console.error("GSAP_REVERT_ERR", err);
    }
  };
}, []);









  // Typewriter effect (separate effect so it can be cleaned independently)
  useEffect(() => {
    try {
      const prefersReducedMotion =
        typeof window !== "undefined" &&
        window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (!roleRotatorRef.current) return;

      if (prefersReducedMotion) {
        roleRotatorRef.current.textContent = "React Developer";
        return;
      }

      typewriterRef.current = new Typewriter(roleRotatorRef.current, {
        loop: true,
        delay: 75,
        deleteSpeed: 40,
      });

      typewriterRef.current
        .typeString("UI/UX Engineer")
        .pauseFor(1200)
        .deleteAll()
        .typeString("React Developer")
        .pauseFor(1200)
        .deleteAll()
        .typeString("Tailwind Specialist")
        .pauseFor(1200)
        .deleteAll()
        .typeString("Performance Optimizer")
        .pauseFor(1200)
        .deleteAll()
        .start();
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("TYPEWRITER_INIT_ERR", err);
    }

    return () => {
      try {
        if (typewriterRef.current && typeof typewriterRef.current.stop === "function") {
          typewriterRef.current.stop();
        }
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("TYPEWRITER_CLEANUP_ERR", err);
      }
    };
  }, []);

  const handleDownloadCV = () => {
    try {
      window.open("/assets/hasan-cv.pdf", "_blank", "noopener,noreferrer");
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error("HERO_CV_DOWNLOAD_ERR", err);
      window.location.href = "/assets/hasan-cv.pdf";
    }
  };

  return (
    <main
      ref={rootRef}
      className="min-h-[64vh] sm:min-h-[72vh] lg:min-h-[85vh] relative flex items-center justify-center overflow-hidden pt-20 sm:pt-24 lg:pt-28"
      aria-label="Hero"
      style={{ backgroundColor: "var(--bg)" }}
      id="hero"
    >
      {/* Hero Gradient */}
      <svg
        id="light"
        ref={blobRef}
        className="absolute left-[-8%] top-0 w-[60vmax] h-[60vmax] opacity-30 sm:left-[-12%] sm:w-[80vmax] sm:h-[80vmax] md:left-[-8%] md:w-[60vmax] md:h-[60vmax]"
        viewBox="0 0 600 600"
        aria-hidden="true"
      >
        <g transform="translate(270,300)">
          <path
            d="M120,-170C164,-141,196,-92,204,-39C212,13,196,68,165,106C134,144,88,165,37,186C-14,207,-69,227,-110,204C-151,181,-178,115,-187,46C-197,-23,-189,-95,-153,-135C-118,-176,-59,-184,-1,-183C57,-182,114,-179,120,-170Z"
            fill="url(#g1)"
          />
          <defs>
            <linearGradient id="g1" x1="0" x2="1">
              <stop offset="0%" stopColor="var(--accent)" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.08" />
            </linearGradient>
          </defs>
        </g>
      </svg>

      <div className="relative z-10 max-w-6xl w-full mx-auto px-6 flex flex-col-reverse lg:flex-row items-center gap-12">
        {/* Left: Text */}
        <div className="w-full lg:w-1/2 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight">
            <span style={{ color: "var(--text-primary)" }}>Hi, I'm </span>
            <span id="h-title" style={{ color: "var(--accent)" }}>Hasan Ilyas</span>
          </h1>

          <div className="block mt-2 text-2xl md:text-3xl font-semibold" style={{ color: "white" }}>

            <span id="roleRotator" ref={roleRotatorRef} className="inline-block" aria-live="polite" />
          </div>

          <p id="h-text" className="mt-6 max-w-xl text-sm md:text-base" style={{ color: "var(--text-secondary)" }}>
            I build high-performance, accessible React applications with a focus on polished UI and scalable component
            architecture. I enjoy transforming complex design problems into intuitive user experiences.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
            <a
              href="#projects"
              className="h-btns inline-flex items-center gap-3 px-6 py-3 rounded-2xl font-semibold shadow-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2"
              aria-label="View work"
              style={{ backgroundColor: "var(--accent)", color: "var(--bg)" }}
            >
              <span className="w-3 h-3 rounded-full bg-white block" aria-hidden />
              View Work
            </a>

            <a
              href="#contact"
              className="h-btns inline-flex items-center px-6 py-3 rounded-2xl font-bold gap-3 focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2"
              aria-label="Hire me"
              style={{ backgroundColor: "var(--text-primary)", color: "var(--bg)" }}
            >
              Hire Me
            </a>

            <button
              onClick={handleDownloadCV}
              className="h-btns inline-flex items-center gap-2 px-4 py-3 rounded-2xl font-medium border focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2"
              aria-label="Download CV"
              style={{ borderColor: "var(--border)", color: "var(--text-primary)", backgroundColor: "transparent" }}
              data-gsap
            >
              <Download size={14} aria-hidden className="opacity-90" />
              Resume
            </button>
          </div>

          {/* Quick stats */}
          <div className="mt-8 grid grid-cols-3 gap-3 max-w-sm mx-auto lg:mx-0">
            <div className="h-boxes p-3 rounded-xl text-center" style={{ backgroundColor: "var(--bg-alt)", borderColor: "var(--border)" }}>
              <div className="text-xs" style={{ color: "var(--text-secondary)" }}>
                Experience
              </div>
              <div className="font-bold text-lg" style={{ color: "var(--text-primary)" }}>
                2+ yrs
              </div>
            </div>

            <div className="h-boxes p-3 rounded-xl text-center" style={{ backgroundColor: "var(--bg-alt)", borderColor: "var(--border)" }}>
              <div className="text-xs" style={{ color: "var(--text-secondary)" }}>
                Projects
              </div>
              <div className="font-bold text-lg" style={{ color: "var(--text-primary)" }}>
                2+
              </div>
            </div>

            <div className="h-boxes p-3 rounded-xl text-center" style={{ backgroundColor: "var(--bg-alt)", borderColor: "var(--border)" }}>
              <div className="text-xs" style={{ color: "var(--text-secondary)" }}>
                Clients
              </div>
              <div className="font-bold text-lg" style={{ color: "var(--text-primary)" }}>
                2
              </div>
            </div>
          </div>
        </div>

        {/* photo */}
        <div id="photo">
          <img className="rounded-xl h-[10rem] w-[12rem]" src={profileImg} alt="Hasan Ilyas" />
        </div>

        {/* Right: Profile + mini project */}
        <div
          ref={profileRef} 
          id="profileCard"
          className="w-full max-w-md p-6 rounded-3xl transform-gpu profile-swing shadow-2xl shadow-[var(--accent)]"
          style={{
            backgroundColor: "var(--bg-alt)",
            border: `1px solid var(--border)`,
          }}
          data-gsap
          aria-labelledby="profileName"
        >
          <div className="flex items-center gap-4">
            <img src={profileImg} alt="Hasan Ilyas" className="w-20 h-20 md:w-24 md:h-24 rounded-xl shadow-lg object-cover" loading="lazy" />
            <div>
              <h3 id="profileName" className="text-xl font-bold" style={{ color: "var(--text-primary)" }}>
                Hasan Ilyas
              </h3>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                Professional Web Developer
              </p>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="p-3 rounded-xl text-center bg-[var(--bg)]" style={{ borderColor: "var(--border)" }}>
              <div className="text-xs" style={{ color: "var(--text-secondary)" }}>
                Availability
              </div>
              <div className="font-semibold" style={{ color: "var(--text-primary)" }}>
                Open
              </div>
            </div>

            <div className="p-3 rounded-xl text-center" style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)" }}>
              <div className="text-xs" style={{ color: "var(--text-secondary)" }}>
                Location
              </div>
              <div className="font-semibold" style={{ color: "var(--text-primary)" }}>
                Remote
              </div>
            </div>

            <div className="p-3 rounded-xl text-center" style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)" }}>
              <div className="text-xs" style={{ color: "var(--text-secondary)" }}>
                Stack
              </div>
              <div className="font-semibold" style={{ color: "var(--text-primary)" }}>
                React
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3 justify-center">
            <a href="https://github.com/HasanJan-Coding" target="_blank" rel="noopener noreferrer" className="text-sm opacity-90 hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" style={{ color: "var(--text-secondary)" }} aria-label="GitHub">GitHub</a>
            <a href="https://linkedin.com/in/yourname" target="_blank" rel="noopener noreferrer" className="text-sm opacity-90 hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" style={{ color: "var(--text-secondary)" }} aria-label="LinkedIn">LinkedIn</a>
            <a href="mailto:hasan.ilyas@abbonova.com" className="text-sm opacity-90 hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2" style={{ color: "var(--text-secondary)" }} aria-label="Email">Email</a>
          </div>

          <div className="mt-6 p-3 rounded-xl border hidden sm:flex" style={{ backgroundColor: "var(--bg)", borderColor: "var(--border)" }}>
            <div className="flex items-start gap-3 w-full">
              <img src={projectImg} alt="project preview" className="w-16 h-16 rounded-md object-cover flex-shrink-0" loading="lazy" />
              <div className="flex-1">
                <div className="text-xs" style={{ color: "var(--text-secondary)" }}>Latest project</div>
                <div className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>Orbit Hill View Campus</div>
                <p className="text-gray-400 text-[0.7rem]">Full college website with admissions workflow, PDF storage, and admin panel</p>
                <div className="flex items-center gap-2 text-xs">
                  <a href="https://theorbitcollege.edu.pk" className="ml-auto font-medium" style={{ color: "var(--accent)" }}>View →</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}