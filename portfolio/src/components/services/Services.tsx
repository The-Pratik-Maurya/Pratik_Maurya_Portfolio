"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    id: "01",
    title: "AI & GenAI Development",
    description: "Integrating Large Language Models (LLMs),and creating intelligent AI agents to automate and enhance business processes.",
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a3 3 0 1 0-3 3m6 0a3 3 0 1 0-3-3m0 0v6m0 0v6m0-6h6m-6 0H6m12 6a3 3 0 1 0 3-3m-18 3a3 3 0 1 0 3-3"/></svg>
    )
  },
  {
    id: "02",
    title: "Full Stack Engineering",
    description: "Architecting and building scalable web applications using Next.js, React, FastAPI, and robust PostgreSQL databases.",
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
    )
  },
  {
    id: "03",
    title: "Automation & Scraping",
    description: "Developing custom Python scripts and Selenium workflows for data extraction, automated content generation, and task optimization.",
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20m-7-7h14m-14-6h14"/></svg>
    )
  },
  {
    id: "04",
    title: "Digital Content Creation",
    description: "Creating high-retention video content, implementing YouTube SEO, and crafting cinematic visual storytelling for rapid audience growth.",
    svg: (
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
    )
  }
];

export default function Services() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    // 1. SCROLL-TRIGGERED TYPEWRITER EFFECT FOR HEADING
    const heading = document.querySelector(".services-heading");
    if (heading && !heading.querySelector(".char")) {
      const text = heading.textContent || "";
      heading.innerHTML = text
        .split("")
        .map(char => `<span class="char inline-block opacity-0 translate-y-[15px]">${char === " " ? "&nbsp;" : char}</span>`)
        .join("") + `<span class="blink-cursor inline-block h-[30px] w-[3px] bg-[#00E5FF] ml-1 align-middle md:h-[45px]"></span>`;
      
      gsap.to(".blink-cursor", { opacity: 0, repeat: -1, duration: 0.6, ease: "steps(1)" });
    }

    gsap.to(".services-heading .char", {
      opacity: 1,
      y: 0,
      stagger: 0.05,
      duration: 0.3,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".services-header-wrap",
        start: "top 85%",
        toggleActions: "play reverse play reverse",
      }
    });

    // 2. STAGGERED FADE-IN FOR CARDS (with loop logic)
    gsap.fromTo(".service-card", 
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".services-grid",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play reverse play reverse",
        }
      }
    );
  }, { scope: container });

  return (
    <section ref={container} id="services" className="relative px-6 py-32 bg-transparent" style={{ perspective: "1200px" }}>
      
      <div className="mx-auto max-w-6xl">
        
        {/* Header */}
        <div className="services-header-wrap mb-16 text-center md:text-left">
          <p className="mb-3 text-xs font-bold tracking-widest text-[#00E5FF]">05 / SERVICES</p>
          <h2 className="services-heading font-display text-4xl font-bold text-white md:text-6xl tracking-tight">
            What I Do
          </h2>
        </div>

        {/* Premium Bento Grid */}
        <div className="services-grid grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={index} 
              className="service-card group relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a]/75 p-8 backdrop-blur-md transition-colors duration-500 hover:border-[#00E5FF]/50 hover:bg-[#111111] hover:shadow-[0_10px_30px_rgba(0,229,255,0.05)]"
              whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2, z: 20 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              
              <div className="mb-8 flex items-start justify-between">
                {/* Glowing Icon */}
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#00E5FF]/10 text-[#00E5FF] transition-all duration-300 group-hover:scale-110 group-hover:bg-[#00E5FF]/20 group-hover:shadow-[0_0_20px_rgba(0,229,255,0.3)]">
                  {service.svg}
                </div>
                
                {/* Large Background Numbers */}
                <span className="font-display text-3xl font-extrabold text-white/5 transition-colors duration-500 group-hover:text-[#00E5FF]/10">
                  {service.id}
                </span>
              </div>
              
              <h3 className="mb-4 font-display text-2xl font-bold text-white transition-colors duration-300 group-hover:text-[#00E5FF]">
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed text-white/50">
                {service.description}
              </p>

              {/* Bottom Decorative Line */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#00E5FF] transition-all duration-500 group-hover:w-1/3 shadow-[0_0_10px_#00E5FF]" />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}