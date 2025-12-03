import React, { useState, useEffect } from "react";
import { Menu, X, Mail } from "lucide-react";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#footer" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // --- Reduced Motion & Scroll Effects ---
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
      // non-fatal
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    try {
      window.addEventListener("scroll", handleScroll, { passive: true });
    } catch (err) {
      // ignore
    }
    return () => {
      try {
        window.removeEventListener("scroll", handleScroll);
      } catch (e) {}
    };
  }, []);
  // ----------------------------------------

  const toggleMenu = () => setIsOpen((s) => !s);

  // Helper styles for the mid-to-side underline hover effect
  const hoverUnderlineStyle = {
    color: 'var(--text-secondary)', // Default color
    transition: 'color 0.3s ease',
    position: 'relative',
    display: 'inline-block',
  };

  const lineStyle = {
    backgroundColor: 'var(--accent)',
    position: 'absolute',
    bottom: '-2px',
    left: '50%',
    transform: 'translateX(-50%)',
    height: '2px',
    width: '0%', // Start at 0 width
    transition: prefersReducedMotion ? 'none' : 'width 0.3s ease-out',
  };

  const handleHoverIn = (e) => {
    e.currentTarget.style.color = 'var(--accent)';
    const span = e.currentTarget.querySelector('.nav-line');
    if (span) span.style.width = '100%';
  };

  const handleHoverOut = (e) => {
    e.currentTarget.style.color = isScrolled ? 'var(--text-secondary)' : 'var(--text-primary)';
    const span = e.currentTarget.querySelector('.nav-line');
    if (span) span.style.width = '0%';
  };

  // Helper styles for the contact button hover effect
  const handleButtonHoverIn = (e) => {
      e.currentTarget.style.backgroundColor = 'var(--accent-hover)';
      e.currentTarget.style.boxShadow = '0 8px 25px rgba(212, 175, 55, 0.7)'; // Custom shadow on hover
  };

  const handleButtonHoverOut = (e) => {
      e.currentTarget.style.backgroundColor = 'var(--accent)';
      e.currentTarget.style.boxShadow = isScrolled ? "0 8px 30px var(--muted)" : "0 6px 18px var(--muted)";
  };


  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all p-4 ${prefersReducedMotion ? "" : "duration-300"}`}
      style={{
        backgroundColor: "var(--bg-alt)",
        color: "var(--text-primary)",
        borderBottom: isScrolled ? "1px solid var(--border)" : "1px solid transparent",
        boxShadow: isScrolled ? "0 8px 30px var(--muted)" : "none",
        backdropFilter: "saturate(120%) blur(8px)",
        WebkitBackdropFilter: "saturate(120%) blur(8px)",
      }}
      aria-label="Primary Navigation"
    >
      <div className="max-w-[1300px] mx-auto px-6 flex justify-between items-center">
        {/* Brand */}
        <a
          href="#home"
          className="text-2xl font-extrabold tracking-widest flex items-center focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2"
          style={{ color: "var(--text-primary)" }}
        >
          <span style={{ color: "var(--accent)", marginRight: 6 }}>Hasan</span>
          <span className="sr-only">Hasan Ilyas</span>
          <span style={{ color: "var(--text-primary)" }}>ILYAS</span>
        </a>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center space-x-8" aria-label="Primary links">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className={`text-lg font-medium relative group focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-opacity-100`}
              // 💡 Applying mid-to-side hover logic
              style={{ 
                  ...hoverUnderlineStyle, 
                  color: isScrolled ? "var(--text-secondary)" : "var(--text-primary)" 
              }}
              onMouseOver={handleHoverIn}
              onMouseOut={handleHoverOut}
            >
              {item.name}
              <span
                className={`nav-line`} // Added class for selector
                style={lineStyle}
                aria-hidden
              />
            </a>
          ))}

          <a
            href="#contact"
            className={`inline-flex items-center justify-center h-10 px-5 rounded-lg font-semibold text-md ml-4 focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 transition-colors duration-200`}
            style={{
              backgroundColor: "var(--accent)",
              color: "var(--bg)",
              boxShadow: isScrolled ? "0 8px 30px var(--muted)" : "0 6px 18px var(--muted)",
            }}
            onMouseOver={handleButtonHoverIn}
            onMouseOut={handleButtonHoverOut}
            aria-label="Contact Hasan"
          >
            Let's Talk
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={toggleMenu}
          className="lg:hidden p-2 rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
          style={{ color: "var(--accent)", backgroundColor: "transparent" }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={`lg:hidden overflow-hidden ${isOpen ? "max-h-screen opacity-100 py-4" : "max-h-0 opacity-0"} transition-[max-height,opacity] duration-300 ease-in-out`}
        style={{ backgroundColor: "var(--bg-alt)" }}
        aria-hidden={!isOpen}
      >
        <nav className="flex flex-col items-center space-y-3" aria-label="Mobile links">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className="w-full text-center text-xl py-2 font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              // 💡 Applying accent color on hover for mobile links
              style={{ color: "var(--text-primary)", transition: "color 0.2s ease" }}
              onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent)'}
              onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-primary)'}
            >
              {item.name}
            </a>
          ))}

          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="inline-flex items-center justify-center w-4/5 h-12 px-5 mt-3 rounded-lg font-semibold text-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 transition-colors duration-200"
            style={{
              backgroundColor: "var(--accent)",
              color: "var(--bg)",
            }}
            onMouseOver={handleButtonHoverIn} // Reuse button hover effect
            onMouseOut={handleButtonHoverOut}
            aria-label="Get in touch"
          >
            <Mail size={18} className="mr-2" />
            Get in Touch
          </a>
        </nav>
      </div>
    </header>
  );
}