"use client";

import { motion } from "motion/react";
import Hero3D from "./Hero3D";
import { FiTerminal, FiCpu } from "react-icons/fi";

const typewriterWords = [
  { text: "Hello!", style: "text-white/50 text-xl md:text-5xl" },
  { text: "I'm", style: "text-white/50 text-xl md:text-5xl" },
  { text: "PRATIK", style: "text-white text-4xl md:text-7xl font-bold" },
  { text: "MAURYA", style: "text-white text-4xl md:text-7xl font-bold" }
];

export default function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden bg-transparent md:px-16" style={{ perspective: "1000px" }}>
      
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none">
        <Hero3D />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-screen-xl flex-col items-center justify-between px-6 py-24 md:min-h-0 md:flex-row md:py-0">
        
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex w-full flex-col items-start self-start text-left mt-4 md:mt-0 md:w-[40%] md:pl-10 pointer-events-auto"
        >
          {/* 🔥 Optimized Static Glow Box (Removed infinite boxShadow animation) */}
          <div className="mb-5 md:mb-8 flex items-center gap-2 md:gap-3 rounded-full border border-[#00E5FF]/40 bg-[#00E5FF]/10 px-4 py-1.5 md:px-5 md:py-2 backdrop-blur-md shadow-[0_0_15px_rgba(0,229,255,0.2)]">
            <span className="flex h-2 w-2 md:h-2.5 md:w-2.5 items-center justify-center rounded-full bg-[#00E5FF]">
              <span className="absolute h-3 w-3 md:h-4 md:w-4 animate-ping rounded-full bg-[#00E5FF] opacity-75"></span>
            </span>
            <span className="text-[9px] md:text-xs font-bold tracking-widest text-[#00E5FF] uppercase drop-shadow-[0_0_5px_rgba(0,229,255,0.8)]">
              System Online
            </span>
          </div>

          <div className="flex flex-wrap justify-start gap-x-2 gap-y-1 md:gap-x-4 md:gap-y-4 max-w-[280px] md:max-w-none mx-0">
            {typewriterWords.map((wordObj, wordIndex) => (
              <div key={wordIndex} className="flex whitespace-nowrap">
                {wordObj.text.split("").map((char, charIndex) => {
                  const delayTiming = (wordIndex * 6 + charIndex) * 0.1;
                  return (
                    <motion.span
                      key={charIndex}
                      // 🔥 Optimized textShadow to simpler opacity drop
                      animate={{ opacity: [0, 1, 1, 0, 0], scale: [0.9, 1, 1, 0.95, 0] }}
                      transition={{ duration: 6, repeat: Infinity, delay: delayTiming, times: [0, 0.05, 0.8, 0.9, 1] }}
                      className={`font-display inline-block drop-shadow-[0_0_8px_rgba(0,229,255,0.3)] ${wordObj.style}`}
                    >
                      {char}
                    </motion.span>
                  );
                })}
              </div>
            ))}
          </div>
        </motion.div>

        <div className="hidden md:block md:w-[20%]"></div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          className="flex w-full flex-col items-end self-end text-right mt-auto mb-10 md:mb-0 md:mt-0 md:w-[40%] md:pr-10 z-10 pointer-events-auto"
        >
          {/* 🔥 Replaced Y-axis infinite bounce with a static text to save rendering */}
          <p className="mb-1 md:mb-2 font-display text-base md:text-xl font-medium text-white/50">
            A Creative
          </p>
          
          <h2 className="font-display text-2xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]">
            AI & FULL STACK <br />
            <span className="text-[#00E5FF] drop-shadow-[0_0_15px_rgba(0,229,255,0.6)]">
              ENGINEER
            </span>
          </h2>
          
          <a
            href="#work"
            className="group mt-6 md:mt-10 flex items-center gap-2 md:gap-3 rounded-full border border-[#00E5FF] bg-[#0a0a0a]/80 px-6 py-3 md:px-8 md:py-4 text-xs md:text-sm font-bold uppercase tracking-widest text-[#00E5FF] backdrop-blur-md transition-all hover:bg-[#00E5FF]/10 hover:shadow-[0_0_20px_rgba(0,229,255,0.4)]"
          >
            <div className="transition-transform duration-500 group-hover:rotate-180">
              <FiCpu className="h-4 w-4 md:h-5 md:w-5" />
            </div>
            See My Work
          </a>
        </motion.div>

      </div>
    </section>
  );
}