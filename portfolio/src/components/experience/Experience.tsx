"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { School, Briefcase } from "lucide-react"; // 🔥 CHANGED: Added Briefcase for work experience

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 🔥 CHANGED: Added 'type' parameter in array for icons
const experiences = [
  {
    year: "2026",
    type: "work",
    role: "AI & Full Stack Developer",
    company: "SAAS Web Application & Automation",
    description: "Developed automated AI workflows and data scraping tools using Python and Selenium. Built intelligent systems for seamless media and prompt processing and SAAS web applications with Next.js, React, FastAPI, and PostgreSQL.",
  },
  {
    year: "2025",
    type: "work",
    role: "Digital Content Creator",
    company: "Pratik Verse",
    description: "Produced and scaled engaging documentary-style content focusing on deep investigations. Mastered SEO, visual storytelling, and high-retention editing techniques.",
  },
  {
    year: "2023",
    type: "education",
    role: "Computer Science Engineering",
    company: "B.Tech Undergrad",
    description: "Began formal education in CSE. Explored core programming, algorithmic thinking, and laid the strong foundation for software development.",
  },
  {
    year: "2023",
    type: "education",
    role: "Passing 12th",
    company: "Oxford Public School (Science Stream) CBSE Board",
    description: "Completed high school with a focus on science subjects, gaining foundational knowledge in physics, chemistry, and mathematics, which paved the way for future studies in computer science and engineering.",
  },
  {
    year: "2021", 
    type: "education",
    role: "Passing 10th",
    company: "Oxford Public School (CBSE Board)",
    description: "Completed secondary education, acquiring essential skills and knowledge in various subjects, preparing for higher education and future academic pursuits.",
  }
];

export default function Experience() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    // 1. SCROLL-TRIGGERED TYPEWRITER FOR HEADING (Pure GSAP Approach)
    const heading = document.querySelector(".exp-heading");
    if (heading && !heading.querySelector(".char")) {
      const text = heading.textContent || "";
      heading.innerHTML = text
        .split("")
        .map(char => `<span class="char inline-block opacity-0 translate-y-[10px]">${char === " " ? "&nbsp;" : char}</span>`)
        .join("") + `<span class="blink-cursor inline-block h-[30px] w-[3px] bg-[#00E5FF] ml-1 align-middle md:h-[45px]"></span>`;
      
      // Cursor Blinking
      gsap.to(".blink-cursor", { opacity: 0, repeat: -1, duration: 0.6, ease: "steps(1)" });
    }

    // Heading Typewriter Trigger
    gsap.to(".char", {
      opacity: 1,
      y: 0,
      stagger: 0.05,
      duration: 0.3,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".exp-header-wrap",
        start: "top 85%",
        end: "bottom 15%",
        toggleActions: "play reverse play reverse", // 🔥 CHANGED: Removed 'restart' to stop flickering
      }
    });

    // Subtitle Typewriter
    const subHeading = document.querySelector(".exp-sub");
    if (subHeading && !subHeading.querySelector(".sub-char")) {
      const text = subHeading.textContent || "";
      subHeading.innerHTML = text
        .split("")
        .map(char => `<span class="sub-char inline-block opacity-0">${char === " " ? "&nbsp;" : char}</span>`)
        .join("");
    }
    gsap.to(".sub-char", {
      opacity: 1,
      stagger: 0.04,
      duration: 0.2,
      scrollTrigger: {
        trigger: ".exp-header-wrap",
        start: "top 85%",
        end: "bottom 15%",
        toggleActions: "play reverse play reverse",
      }
    });

    // 2. TIMELINE LINE FILL ANIMATION
    gsap.to(".progress-line", {
      scaleY: 1,
      ease: "none",
      scrollTrigger: {
        trigger: ".timeline-container",
        start: "top 65%",
        end: "bottom 65%",
        scrub: 1,
      },
    });

    // 3. AMBIENT GLOW ORBS
    gsap.to(".glow-orb-1", { scale: 1.3, opacity: 0.15, duration: 4, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(".glow-orb-2", { scale: 1.2, opacity: 0.12, duration: 5, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1 });

    // 4. BOX ENTRANCES (LEFT/RIGHT SYSTEM & INFINITE HIDE/SHOW ON SCROLL)
    gsap.utils.toArray(".timeline-item").forEach((el) => {
      const item = el as HTMLElement;
      const card = item.querySelector(".card-inner");
      const isEven = item.classList.contains("item-even");
      
      const xOffset = isEven ? 300 : -300; 

      gsap.fromTo(card, 
        { 
          opacity: 0, 
          x: xOffset,
          scale: 0.9
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 95%", // 🔥 CHANGED: 85% ko 95% kiya taaki last boxes (2023, 2021) easily dikh jayein
            end: "bottom 10%", 
            toggleActions: "play reverse play reverse", // 🔥 CHANGED: Smooth in-out scroll loop
          }
        }
      );

      // Dot glow activation triggers seamlessly with timelines
      const dot = item.querySelector(".timeline-dot");
      gsap.to(dot, {
        backgroundColor: "#00E5FF",
        boxShadow: "0 0 20px #00E5FF, 0 0 40px #00E5FF",
        borderColor: "#00E5FF",
        scale: 1.3,
        scrollTrigger: {
          trigger: item,
          start: "top 75%", // 🔥 CHANGED: Adjusted trigger slightly
          toggleActions: "play reverse play reverse",
        },
      });
    });
  }, { scope: container });

  return (
    // 🔥 CHANGED: Added 'pb-48' (Padding Bottom) taaki scroll karne ki jagah bache aur last item animate ho sake
    <section ref={container} id="experience" className="relative px-6 pt-32 pb-48 overflow-hidden bg-transparent" style={{ perspective: "1000px" }}>
      
      {/* LOCAL NEON GLOW BACKGROUND ORBS */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="glow-orb-1 absolute left-[-10%] top-[20%] h-[350px] w-[350px] rounded-full bg-[#00E5FF] blur-[130px] opacity-10"></div>
        <div className="glow-orb-2 absolute right-[-5%] top-[60%] h-[400px] w-[400px] rounded-full bg-[#00E5FF] blur-[150px] opacity-8"></div>
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        
        {/* Section Header */}
        <div className="exp-header-wrap mb-24 text-center">
          <p className="exp-sub mb-4 text-xs font-bold tracking-widest text-[#00E5FF]">02 / EXPERIENCE</p>
          <h2 className="exp-heading font-display text-4xl font-bold text-white md:text-6xl tracking-tight">
            My Journey
          </h2>
        </div>

        {/* Timeline Container */}
        <div className="timeline-container relative">
          
          {/* Background Gray Line */}
          <div className="absolute bottom-0 left-[19px] top-0 w-[2px] bg-white/10 md:left-1/2 md:-ml-[1px]"></div>
          
          {/* Glowing Animated Line */}
          <div className="progress-line absolute bottom-0 left-[19px] top-0 w-[2px] origin-top scale-y-0 bg-[#00E5FF] shadow-[0_0_10px_#00E5FF]"></div>

          {/* Timeline Items */}
          <div className="flex flex-col gap-16">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              return (
                <div 
                  key={index} 
                  className={`timeline-item relative flex w-full items-start md:items-center ${isEven ? "timeline-item-even item-even md:flex-row-reverse" : "timeline-item-odd md:flex-row"}`}
                >
                  
                  {/* Glowing Indicator Dot */}
                  <div className="timeline-dot absolute left-[15px] top-2.5 z-10 h-[10px] w-[10px] rounded-full border-2 border-white/30 bg-black transition-all duration-300 md:left-1/2 md:top-1/2 md:-ml-[5px] md:-mt-[5px]"></div>
                  
                  {/* Content Box Wrapper */}
                  <div className={`ml-12 w-full md:ml-0 md:w-1/2 ${isEven ? "md:pl-16" : "md:pr-16 text-left md:text-right"}`}>
                    
                    {/* Animated Inner Box */}
                    <div className="card-inner rounded-2xl border border-white/5 bg-[#0a0a0a]/80 p-8 backdrop-blur-md transition-all duration-300 hover:border-[#00E5FF]/40 hover:bg-[#111111] hover:shadow-[0_10px_30px_rgba(0,229,255,0.05)]">
                      
                      {/* 🔥 CHANGED: Integrated Icons with Year */}
                      <div className={`flex items-center gap-3 mb-2 ${isEven ? "justify-start" : "justify-start md:justify-end"}`}>
                        <span className="font-display text-2xl font-bold text-[#00E5FF] drop-shadow-[0_0_8px_rgba(0,229,255,0.4)]">{exp.year}</span>
                        {exp.type === "education" ? (
                          <School className="h-5 w-5 text-white/50" />
                        ) : (
                          <Briefcase className="h-5 w-5 text-white/50" />
                        )}
                      </div>
                      
                      <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                      <p className="mt-1 text-sm font-semibold text-white/40">{exp.company}</p>
                      <p className="mt-4 text-sm leading-relaxed text-white/60">
                        {exp.description}
                      </p>
                    </div>

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