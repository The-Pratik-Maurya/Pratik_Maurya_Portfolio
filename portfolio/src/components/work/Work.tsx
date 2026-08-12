"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { ArrowUpRight } from "lucide-react";
import { FiCpu } from "react-icons/fi"; 

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 🔥 YAHAN CHANGE KIYA HAI: Har project me 'image' field add kar di hai
// Apni real images public folder me daal kar unka path yahan likh dena (e.g., "/roomfinder.jpg")
const projects = [
  { title: "RoomFinder", category: "AI Rental Platform", description: "Next-Gen monthly rental platform leveraging AI for smart matching patterns.", tech: ["Next.js", "FastAPI","PostgreSQL","Github"], image: "/roomfinder.png", color: "from-[#00E5FF]/20 to-blue-600/20", link: "https://room-finder-sand.vercel.app/", github: "#" },
  { title: "Meta Ai Automation", category: "AI Automation", description: "Advanced Python automation matrix using Selenium loops for high-res query flows which generate image and convert to video and automatically download in your computer.", tech: ["Python", "Selenium"], image: "/placeholder.jpg", color: "from-purple-500/20 to-[#00E5FF]/20", link: "#", github: "#" },
  { title: "Pratik Verse", category: "Digital Production", description: "A documentry Type Channel Which Tells About History Incident ", tech: ["SEO", "Analytics","Meta AI","Cap Cut"], image: "/pratik verse.png", color: "from-emerald-500/20 to-[#00E5FF]/20", link: "https://www.youtube.com/@ThePratikVerse", github: "#" },
  // { title: "Enterprise RAG Pipeline", category: "Generative AI Systems", description: "Highly optimized RAG infrastructure executing sub-second semantic data queries.", tech: ["LangChain", "VectorDB"], image: "", color: "from-orange-500/20 to-[#00E5FF]/20", link: "#", github: "#" },
  { title: "Shopsy Clone ", category: "Web Dev Frontend", description: "A clone of shopsy website which show the frontend of shospy page ", tech: ["HTML", "CSS"], image: "shospy clone.png", color: "from-pink-500/20 to-indigo-500/20", link: "#", github: "#" },
  // { title: "Chanakya Engine v1", category: "Cognitive AI Logic", description: "Experimental LLM fine-tune executing strategic game-theory simulations.", tech: ["PyTorch", "LLMs"], image: "", color: "from-amber-500/20 to-[#00E5FF]/20", link: "#", github: "#" },
  // { title: "Nexus DevPort", category: "Systems Architecture", description: "Production-ready automated portfolio builder utilizing high-performance server components.", tech: ["TypeScript", "Next.js"], image: "", color: "from-blue-500/20 to-teal-500/20", link: "#", github: "#" },
  // { title: "Neural Vision Core", category: "Computer Vision", description: "Real-time spatial object tracking engine using deep convolutional structures.", tech: ["OpenCV", "Python"], image: "", color: "from-red-500/20 to-purple-500/20", link: "#", github: "#" }
];

export default function Work() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    // 1. SCROLL-TRIGGERED TYPEWRITER ON HEADING
    const heading = document.querySelector(".work-heading");
    if (heading && !heading.querySelector(".char")) {
      const text = heading.textContent || "";
      heading.innerHTML = text
        .split("")
        .map(char => `<span class="char inline-block opacity-0 translate-y-[15px]">${char === " " ? "&nbsp;" : char}</span>`)
        .join("") + `<span class="blink-cursor inline-block h-[30px] w-[3px] bg-[#00E5FF] ml-1 align-middle md:h-[45px]"></span>`;
      
      gsap.to(".blink-cursor", { opacity: 0, repeat: -1, duration: 0.6, ease: "steps(1)" });
    }

    gsap.to(".work-heading .char", {
      opacity: 1,
      y: 0,
      stagger: 0.05,
      duration: 0.4,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".work-header-wrap",
        start: "top 85%",
        toggleActions: "play reverse play reverse",
      }
    });

    // 2. EXTREME 3D MULTI-DIRECTIONAL SLIDE-IN & SLIDE-OUT FOR CARDS
    gsap.utils.toArray(".horizontal-project-card").forEach((el, index) => {
      const card = el as HTMLElement;
      
      const isEven = index % 2 === 0;
      const xStart = isEven ? -400 : 400; 
      const rotateStart = isEven ? -15 : 15; 

      gsap.fromTo(card,
        { 
          opacity: 0, 
          x: xStart, 
          rotateY: rotateStart,
          scale: 0.8 
        },
        {
          opacity: 1,
          x: 0,
          rotateY: 0,
          scale: 1,
          duration: 1.2,
          ease: "expo.out", 
          scrollTrigger: {
            trigger: ".work-track-container", 
            start: "top 80%", 
            end: "bottom 20%", 
            toggleActions: "play reverse play reverse",
          }
        }
      );
    });
  }, { scope: container });

  return (
    <section ref={container} id="work" className="relative pt-24 pb-16 bg-transparent" style={{ perspective: "1500px" }}>
      
      <div className="mx-auto max-w-[90rem] px-6 md:px-16">
        <div className="work-header-wrap mb-12">
          <p className="work-sub mb-3 text-xs font-bold tracking-widest text-[#00E5FF]">03 / WORK</p>
          <h2 className="work-heading font-display text-4xl font-bold text-white md:text-6xl tracking-tight">
            Selected Projects
          </h2>
        </div>
      </div>

      <div className="work-track-container w-full pl-6 md:pl-16 pr-6 md:pr-16 overflow-x-auto custom-work-scrollbar pb-8 scroll-smooth">
        
        <div 
          className="flex w-max gap-6 pt-2"
          style={{
            display: "grid",
            gridTemplateRows: "1fr",
            gridAutoFlow: "column",
            gridAutoColumns: "82vw", 
          }}
        >
          <style>{`
            @media (min-width: 1024px) {
              .flex.w-max {
                grid-auto-columns: calc((90rem - 8rem) / 3 - 1rem) !important;
                gap: 1.5rem !important;
              }
            }

            .custom-work-scrollbar::-webkit-scrollbar {
              height: 6px;
            }
            .custom-work-scrollbar::-webkit-scrollbar-track {
              background: rgba(255, 255, 255, 0.05);
              border-radius: 10px;
            }
            .custom-work-scrollbar::-webkit-scrollbar-thumb {
              background: linear-gradient(to right, transparent, #00E5FF, transparent);
              border-radius: 10px;
              cursor: grab;
            }
            .custom-work-scrollbar::-webkit-scrollbar-thumb:hover {
              background: #00E5FF;
              box-shadow: 0 0 15px #00E5FF;
            }
          `}</style>

          {projects.map((project, index) => (
            <motion.div 
              key={index}
              // 🔥 YAHAN CHANGE KIYA HAI: Height h-[380px] se badha kar h-[420px] kar di hai
              className="horizontal-project-card group relative flex flex-col justify-between rounded-[20px] border border-white/10 bg-[#0a0a0a]/80 p-5 backdrop-blur-xl transition-all duration-500 hover:border-[#00E5FF]/60 hover:bg-[#111111] hover:shadow-[0_10px_40px_rgba(0,229,255,0.1)] h-[420px]" 
              whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2, z: 20 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              
              {/* 🔥 YAHAN CHANGE KIYA HAI: Clickable Image Container */}
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group/img relative mb-4 h-[180px] w-full overflow-hidden rounded-xl bg-black shadow-inner block"
              >
                {project.image ? (
                  // Agar image hai to ye dikhega
                  <>
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover/img:scale-110"
                    />
                    {/* Image ke upar halka dark gradient taaki professional lage */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-500 group-hover/img:opacity-40" />
                    {/* Hover par aane wala icon */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover/img:opacity-100 bg-[#00E5FF]/20 backdrop-blur-[2px]">
                       <ArrowUpRight className="h-12 w-12 text-white drop-shadow-[0_0_10px_#00E5FF]" />
                    </div>
                  </>
                ) : (
                  // Agar image nahi hai to purana color gradient dikhega (Fallback)
                  <>
                    <motion.div 
                      className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-70 transition-opacity duration-500 group-hover/img:opacity-100`} 
                      whileHover={{ scale: 1.08 }}
                      transition={{ duration: 0.6 }}
                    />
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <FiCpu className="h-8 w-8 text-white/30 drop-shadow-md transition-all duration-500 group-hover/img:scale-110 group-hover/img:text-[#00E5FF] group-hover/img:drop-shadow-[0_0_15px_#00E5FF]" />
                    </div>
                  </>
                )}
              </a>

              {/* Data Content Structural Layers */}
              <div className="flex flex-col flex-grow z-10">
                <p className="mb-1 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#00E5FF]">
                  {project.category}
                </p>
                <h3 className="mb-2 font-display text-xl font-bold text-white transition-colors group-hover:text-[#00E5FF] truncate drop-shadow-sm">
                  {project.title}
                </h3>
                <p className="mb-4 text-[13px] leading-relaxed text-white/50 line-clamp-2">
                  {project.description}
                </p>
                
                <div className="mt-auto">
                  <div className="mb-5 flex flex-wrap gap-1.5">
                    {project.tech.map((tech, i) => (
                      <span 
                        key={i} 
                        className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-medium text-white/70 transition-colors group-hover:border-[#00E5FF]/40 group-hover:text-white"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1 border-t border-white/5 group-hover:border-[#00E5FF]/20 transition-colors duration-500">
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="group/btn flex items-center gap-1.5 rounded-full border border-[#00E5FF]/40 bg-transparent px-4 py-1.5 text-[11px] font-bold text-[#00E5FF] transition-all duration-300 hover:border-[#00E5FF] hover:bg-[#00E5FF] hover:text-black hover:shadow-[0_0_20px_rgba(0,229,255,0.5)]">
                      System Link
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </a>
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition-all duration-300 hover:border-[#00E5FF] hover:bg-[#00E5FF]/10 hover:text-[#00E5FF] hover:shadow-[0_0_15px_rgba(0,229,255,0.2)]">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.4 6.5-7.17A5.1 5.1 0 0 0 19 4.1a5.1 5.1 0 0 0-.1-3.1s-1.5-.5-5.2 2.0a14.2 14.2 0 0 0-5.4 0C4.6 1.0 3.1 1.0 3.1 1.0a5.1 5.1 0 0 0-.1 3.1 5.1 5.1 0 0 0-1.2 3.7c0 5.7 3.3 6.8 6.5 7.1A4.8 4.8 0 0 0 8 18v4"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

            </motion.div>
          ))}
          
        </div>
      </div>
    </section>
  );
}