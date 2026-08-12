"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { 
  SiNextdotjs, 
  SiReact, 
  SiTailwindcss, 
  SiTypescript, 
  SiPython, 
  SiFastapi, 
  SiPostgresql, 
  SiSelenium 
} from "react-icons/si";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 8 Core Technologies with explicit brand colors and icons
const techSkills = [
  { name: "Next.js", icon: <SiNextdotjs className="h-8 w-8 text-white" />, color: "#ffffff", glow: "rgba(255,255,255,0.4)" },
  { name: "React", icon: <SiReact className="h-8 w-8 text-[#00D8FF]" />, color: "#00D8FF", glow: "rgba(0,216,255,0.5)" },
  { name: "TypeScript", icon: <SiTypescript className="h-7 w-7 text-[#3178C6]" />, color: "#3178C6", glow: "rgba(49,120,198,0.5)" },
  { name: "Tailwind CSS", icon: <SiTailwindcss className="h-8 w-8 text-[#38BDF8]" />, color: "#38BDF8", glow: "rgba(56,189,248,0.5)" },
  { name: "Python", icon: <SiPython className="h-8 w-8 text-[#3776AB]" />, color: "#3776AB", glow: "rgba(55,118,171,0.5)" },
  { name: "FastAPI", icon: <SiFastapi className="h-8 w-8 text-[#059669]" />, color: "#059669", glow: "rgba(5,150,105,0.5)" },
  { name: "PostgreSQL", icon: <SiPostgresql className="h-8 w-8 text-[#4169E1]" />, color: "#4169E1", glow: "rgba(65,105,225,0.5)" },
  { name: "Selenium", icon: <SiSelenium className="h-8 w-8 text-[#00B400]" />, color: "#00B400", glow: "rgba(0,180,0,0.5)" },
];

export default function TechStack() {
  const container = useRef<HTMLElement>(null);

  useGSAP(() => {
    // 1. SCROLL-TRIGGERED TYPEWRITER EFFECT FOR HEADING
    const heading = document.querySelector(".stack-heading");
    if (heading && !heading.querySelector(".char")) {
      const text = heading.textContent || "";
      heading.innerHTML = text
        .split("")
        .map(char => `<span class="char inline-block opacity-0 translate-y-[15px]">${char === " " ? "&nbsp;" : char}</span>`)
        .join("") + `<span class="blink-cursor inline-block h-[30px] w-[3px] bg-[#00E5FF] ml-1 align-middle md:h-[45px]"></span>`;
      
      gsap.to(".blink-cursor", { opacity: 0, repeat: -1, duration: 0.6, ease: "steps(1)" });
    }

    gsap.to(".stack-heading .char", {
      opacity: 1,
      y: 0,
      stagger: 0.05,
      duration: 0.3,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".stack-header-wrap",
        start: "top 85%",
        toggleActions: "play reverse play reverse",
      }
    });

    // 2. THE ULTIMATE FLY-IN & FIREWORK (PATAKA) ANIMATION LOGIC WITH SOUND
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".tech-grid-wrapper",
        start: "top 75%",
        end: "bottom 20%",
        toggleActions: "play reverse play reverse", // Scroll wapas aane par reverse fly honge!
      }
    });

    // Pehle container boxes ka border halke se fade in hoga
    tl.fromTo(".tech-box-container", 
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" }
    );

    const balls = gsap.utils.toArray(".tech-ball-wrapper") as HTMLElement[];

    // Har ball ko random location (screen ke bahar - left, right, top, bottom) bhej rahe hain
    balls.forEach((ball) => {
      const angle = Math.random() * Math.PI * 2; // Random 360 degree angle
      const distance = 1500; // Screen ke kafi bahar
      const startX = Math.cos(angle) * distance;
      const startY = Math.sin(angle) * distance;
      const randomRotation = Math.random() * 720 - 360; // Ghoomte hue aayegi

      // Save initial coordinates so they fly back to EXACTLY same spot
      ball.dataset.startX = startX.toString();
      ball.dataset.startY = startY.toString();

      gsap.set(ball, { 
        x: startX, 
        y: startY, 
        opacity: 0, 
        scale: 0,
        rotation: randomRotation
      });
    });

    // Ab balls 1 by 1 aayengi aur box me lagengi
    tl.to(balls, {
      x: 0,
      y: 0,
      opacity: 1,
      scale: 1,
      rotation: 0,
      duration: 1.2,
      ease: "expo.out",
      stagger: {
        each: 0.8, // 0.8s ka gap (लगभग 1-1 second par aayenge)
        onComplete: function() {
          const ballTarget = this.targets()[0] as HTMLElement;
          const box = ballTarget.parentElement;
          
          // 🔊 SOUND TRIGGER ADDED HERE 🔊
          try {
            // Ensure you have a 'pop.mp3' file inside your 'public' folder
            const blastSound = new Audio('/pop.wav'); 
            blastSound.volume = 0.3; // Gentle volume
            blastSound.play().catch(e => console.log("Audio autoplay restricted:", e));
          } catch (error) {
            console.log("Error playing sound:", error);
          }

          if (box) {
            // FIREWORK BLAST: Jaise hi ball box me aayegi, particles blast honge!
            const particles = box.querySelectorAll(".particle");
            particles.forEach((p) => {
              const pAngle = Math.random() * Math.PI * 2;
              const pRadius = Math.random() * 80 + 40; // Door tak phailenge
              
              gsap.fromTo(p, 
                { x: 0, y: 0, opacity: 1, scale: Math.random() * 1.5 + 0.5 },
                {
                  x: Math.cos(pAngle) * pRadius,
                  y: Math.sin(pAngle) * pRadius,
                  opacity: 0,
                  scale: 0,
                  duration: 0.8,
                  ease: "power3.out"
                }
              );
            });

            // Box me ek 'Hit/Impact' effect aayega
            gsap.fromTo(box, 
              { scale: 0.9, boxShadow: "inset 0 0 40px rgba(255,255,255,0.2)" },
              { scale: 1, boxShadow: "inset 0 0 15px rgba(0,0,0,0.5)", duration: 0.6, ease: "elastic.out(1, 0.3)" }
            );
          }
        }
      }
    }, "-=0.2"); // Box fade in hone ke thoda pehle hi balls aana shuru ho jayengi

  }, { scope: container });

  return (
    <section ref={container} id="tech" className="relative pt-24 pb-32 overflow-hidden bg-transparent" style={{ perspective: "1500px" }}>
      
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute left-[30%] top-[40%] h-[350px] w-[350px] rounded-full bg-[#00E5FF]/5 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-16">
        
        {/* Section Header Wrapper */}
        <div className="stack-header-wrap mb-20 text-center">
          <p className="mb-4 text-xs font-bold tracking-widest text-[#00E5FF]">04 / EXPERTISE</p>
          <h2 className="stack-heading font-display text-4xl font-bold text-white md:text-6xl tracking-tight">
            My TechStack
          </h2>
        </div>

        {/* TECH BENTO GRID WRAPPER */}
        <div className="tech-grid-wrapper grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-6">
          {techSkills.map((tech, index) => (
            <div
              key={index}
              className="tech-box-container group relative flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-[#0a0a0a]/75 p-6 backdrop-blur-md h-[180px] overflow-visible transition-colors duration-300 hover:bg-[#111111]"
              style={{
                boxShadow: `inset 0 0 15px rgba(0,0,0,0.5)`,
              }}
            >
              
              {/* THE FIREWORK PARTICLES CONTAINER (Pataka Effect) */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
                {[...Array(15)].map((_, i) => (
                  <div 
                    key={i} 
                    className="particle absolute h-2 w-2 rounded-full opacity-0"
                    style={{
                      backgroundColor: tech.color,
                      boxShadow: `0 0 10px ${tech.color}, 0 0 20px ${tech.color}`
                    }}
                  />
                ))}
              </div>

              {/* THE FLYING BALL WRAPPER */}
              <div className="tech-ball-wrapper relative z-10 flex flex-col items-center justify-center">
                <motion.div 
                  className="flex h-[80px] w-[80px] items-center justify-center rounded-full shadow-lg"
                  style={{
                    backgroundColor: tech.color + "15",
                    border: `2px solid ${tech.color}`,
                    boxShadow: `0 0 20px ${tech.glow}, inset 0 0 15px ${tech.glow}`,
                  }}
                  whileHover={{ 
                    scale: 1.15, 
                    boxShadow: `0 0 35px ${tech.color}, inset 0 0 20px ${tech.color}`,
                    rotate: 15
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                >
                  <div style={{ filter: `drop-shadow(0 0 8px ${tech.color}80)` }}>
                    {tech.icon}
                  </div>
                </motion.div>
              </div>

              {/* Skill Label Text */}
              <span className="mt-5 z-10 font-display text-sm font-bold text-white/50 group-hover:text-white transition-colors duration-300 tracking-wide" style={{ textShadow: `0 0 10px ${tech.color}00` }}>
                {tech.name}
              </span>

              {/* Dynamic Bottom Hover Glow Light Bar */}
              <div 
                className="absolute bottom-0 left-1/2 h-[3px] w-0 -translate-x-1/2 rounded-full opacity-0 transition-all duration-500 group-hover:w-2/3 group-hover:opacity-100" 
                style={{
                  backgroundColor: tech.color,
                  boxShadow: `0 0 15px 3px ${tech.color}`,
                }}
              />

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}