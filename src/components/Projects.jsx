import React from "react";
import { ArrowUpRight, Folder, Github } from "lucide-react";

const projectData = [
    {
      title: "Company Landing Page",
      description: "Clean animations, perfect UI/UX, color harmony, and performance optimizations",
      stack: ["Html", "Tailwind CSS", "Js"],
      link:'#',
      repo:'#',
      highlights: ["Scroll animations", "LCP < 1.5s", "Perfect score"],
      img:'#'
    },
    {
      title: "Weather Application",
      description: "Unique weather-themed UI with responsive design and dynamic backgrounds",
      img: "src/assets/weather.jpg",
      stack: ["Html", "Tailwind CSS", "Node JS"],
      link:'#',
      repo:'#',
      highlights: ["Dynamic UI", "Weather API", "Data layout"],
    },
    {
      title: "Orbit College Campus",
      description: "Full college website with admissions workflow, PDF storage, and admin panel",
      stack: ["Html", "Tailwind CSS", "PHP", "Js"],
      link:'https://theorbitcollege.edu.pk',
      repo:'#',
      highlights: ["Admissions system", "PDF storage", "Admin panel"],
      img:'src/assets/orbit.jpg'
    },
  ];

const Projects = () => {
   const accentRgb = "212, 175, 55"; 

  return (
    <section 
      id="projects" 
      className="py-20 md:py-24 relative" 
      style={{ backgroundColor: "var(--bg)", color: "var(--text-primary)" }}
      aria-labelledby="projects-heading"
    >
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        
        {/* Header */}
        <header className="mb-12 md:mb-16">
          <h2 id="projects-heading" className="text-4xl md:text-5xl text-center font-extrabold leading-tight">
            My <span 
              style={{ 
                color: "var(--accent)",  
              }}
            > Projects
            </span>
          </h2>
          <p className="text-base md:text-lg text-center mt-2" style={{ color: "var(--text-secondary)" }}>
            From landing pages to full backends, production-ready web systems that perform and delight.
          </p>
        </header>

        {/* PROJECT GRID CONTAINER: Responsive Layout Logic */}
        <div 
          className="flex flex-col items-center gap-6 pb-4 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-6 md:items-stretch"
        >
          {projectData.map((project, index) => (
            <div
              key={index}
              className="
                w-[90vw] md:w-auto 
                md:col-span-1 
                h-auto 
                p-0 rounded-xl transition-all duration-300 transform hover:scale-[1.02]
                overflow-hidden 
              "
              style={{
                backgroundColor: "var(--bg-alt)", 
                border: "1px solid var(--border)",
                boxShadow: "0 4px 15px rgba(0, 0, 0, 0.4)",
              }}
            >
              
              {/* 💡 IMAGE VIEW HANDLER */}
              <div className="w-full aspect-video">
                <img
                  src={project.img}
                  alt={`Screenshot of the ${project.title} project`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  // Optional: Add a subtle border bottom separating image from text
                  style={{ borderBottom: "1px solid var(--border)" }}
                />
              </div>

              {/* Project Content Container (Padding added here) */}
              <div className="p-6">
                
                {/* Card Header and Links */}
                <div className="flex justify-between items-start mb-6">
                  <Folder className="h-8 w-8" style={{ color: "var(--accent)" }} />
                  <div className="flex space-x-3">
                    <a 
                      href={project.repo} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      aria-label={`View code for ${project.title}`}
                      className="p-1 rounded-full hover:opacity-80 transition-opacity"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      <Github className="h-5 w-5" />
                    </a>
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      aria-label={`View live project ${project.title}`}
                      className="p-1 rounded-full hover:opacity-80 transition-opacity"
                      style={{ color: "var(--accent)" }}
                    >
                      <ArrowUpRight className="h-5 w-5" />
                    </a>
                  </div>
                </div>

                {/* Title and Description */}
                <h3 className="text-xl font-extrabold mb-3" style={{ color: "var(--text-primary)" }}>
                  {project.title}
                </h3>
                <p className="text-base mb-6" style={{ color: "var(--text-secondary)" }}>
                  {project.description}
                </p>

   {/* Stack/Technologies */}
                <div className="flex flex-wrap gap-2 pb-4"> 
                  {project.stack.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs font-semibold px-3 py-1 rounded-full tracking-wider"
                      style={{
                        backgroundColor: "var(--border)",
                        color: "var(--text-secondary)",
                        border: "1px solid var(--muted)",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>


                 {/* Highlights */}
                  <div className="flex flex-col gap-3 mb-4">
                    {project.highlights.map((highlight) => (
                      <div key={highlight} className="">
                        <div className="text-xs font-semibold text-muted-foreground">
                          {highlight}
                        </div>
                      </div>
                    ))}
                  </div>

             
              </div> {/* End Project Content Container */}
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};

export default Projects;