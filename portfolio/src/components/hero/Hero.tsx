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
        
        {/* LEFT SIDE: Typewriter (Mobile par Top-Left section) */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          // UPDATED: items-start, text-left, self-start
          className="flex w-full flex-col items-start self-start text-left mt-4 md:mt-0 md:w-[40%] md:pl-10 pointer-events-auto"
        >
          <motion.div 
            animate={{ boxShadow: ["0px 0px 5px #00E5FF", "0px 0px 20px #00E5FF", "0px 0px 5px #00E5FF"] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-5 md:mb-8 flex items-center gap-2 md:gap-3 rounded-full border border-[#00E5FF]/40 bg-[#00E5FF]/10 px-4 py-1.5 md:px-5 md:py-2 backdrop-blur-md"
          >
            <motion.span 
              animate={{ opacity: [1, 0, 1] }} 
              transition={{ duration: 1, repeat: Infinity }}
              className="flex h-2 w-2 md:h-2.5 md:w-2.5 items-center justify-center rounded-full bg-[#00E5FF]"
            >
              <span className="absolute h-3 w-3 md:h-4 md:w-4 animate-ping rounded-full bg-[#00E5FF] opacity-75"></span>
            </motion.span>
            <span className="text-[9px] md:text-xs font-bold tracking-widest text-[#00E5FF] uppercase drop-shadow-[0_0_8px_rgba(0,229,255,0.8)]">
              System Online
            </span>
          </motion.div>

          {/* UPDATED: justify-start */}
          <div className="flex flex-wrap justify-start gap-x-2 gap-y-1 md:gap-x-4 md:gap-y-4 max-w-[280px] md:max-w-none mx-0">
            {typewriterWords.map((wordObj, wordIndex) => (
              <div key={wordIndex} className="flex whitespace-nowrap">
                {wordObj.text.split("").map((char, charIndex) => {
                  const delayTiming = (wordIndex * 6 + charIndex) * 0.1;
                  return (
                    <motion.span
                      key={charIndex}
                      animate={{ 
                        opacity: [0, 1, 1, 0, 0],
                        scale: [0.8, 1, 1, 0.9, 0],
                        textShadow: [
                          "0px 0px 0px rgba(0,229,255,0)",
                          "0px 0px 20px rgba(0,229,255,0.8)",
                          "0px 0px 0px rgba(0,229,255,0)",
                          "0px 0px 0px rgba(0,229,255,0)",
                          "0px 0px 0px rgba(0,229,255,0)"
                        ]
                      }}
                      transition={{ 
                        duration: 6,
                        repeat: Infinity,
                        delay: delayTiming,
                        times: [0, 0.05, 0.8, 0.9, 1]
                      }}
                      className={`font-display inline-block ${wordObj.style}`}
                    >
                      {char}
                    </motion.span>
                  );
                })}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Center Space for Desktop */}
        <div className="hidden md:block md:w-[20%]"></div>

        {/* RIGHT SIDE: Glowing Title & Button (Mobile par Bottom-Right section) */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
          // UPDATED: items-end, text-right, self-end, mt-auto
          className="flex w-full flex-col items-end self-end text-right mt-auto mb-10 md:mb-0 md:mt-0 md:w-[40%] md:pr-10 z-10 pointer-events-auto"
        >
          <motion.p 
            animate={{ y: [-2, 2, -2] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="mb-1 md:mb-2 font-display text-base md:text-xl font-medium text-white/50"
          >
            A Creative
          </motion.p>
          
          <motion.h2 
            animate={{ filter: ["brightness(1)", "brightness(1.3)", "brightness(1)"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="font-display text-2xl font-bold leading-tight tracking-tight text-white md:text-5xl lg:text-6xl drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]"
          >
            AI & FULL STACK <br />
            <motion.span 
              animate={{ textShadow: ["0 0 10px #00E5FF", "0 0 30px #00E5FF", "0 0 10px #00E5FF"] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-[#00E5FF]"
            >
              ENGINEER
            </motion.span>
          </motion.h2>
          
          <motion.a
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0px 0px 30px rgba(0,229,255,0.6)",
              backgroundColor: "rgba(0,229,255,0.1)"
            }}
            whileTap={{ scale: 0.95 }}
            href="#work"
            className="group mt-6 md:mt-10 flex items-center gap-2 md:gap-3 rounded-full border border-[#00E5FF] bg-[#0a0a0a]/80 px-6 py-3 md:px-8 md:py-4 text-xs md:text-sm font-bold uppercase tracking-widest text-[#00E5FF] backdrop-blur-md transition-all"
          >
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <FiCpu className="h-4 w-4 md:h-5 md:w-5" />
            </motion.div>
            See My Work
          </motion.a>
        </motion.div>

      </div>
    </section>
  );
}