"use client";

import { motion } from "motion/react";
import { FiCode, FiYoutube, FiTrendingUp, FiTarget } from "react-icons/fi";

export default function About() {
  const titleText = "About Me".split("");
  const subtitleText = "WHO I AM".split("");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, display: "none" },
    visible: { opacity: 1, display: "inline-block" },
  };

  return (
    // bg-transparent kiya hai taaki global background clearly dikhe
    <section id="about" className="relative px-6 py-32 overflow-hidden bg-transparent" style={{ perspective: "1200px" }}>
      
      {/* Local 3D Canvas Hata Diya - Ab Global dikhega */}
      
      {/* Center Radial Glow (Sirf text padhne ke liye zaroori hai) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.03)_0%,rgba(0,0,0,0)_70%)] blur-[50px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        
        <div className="mb-16 text-center md:text-left">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.5 }}
            className="mb-4 text-xs font-semibold tracking-widest text-[#00E5FF]"
          >
            01 / {" "}
            {subtitleText.map((char, index) => (
              <motion.span key={index} variants={letterVariants}>
                {char}
              </motion.span>
            ))}
          </motion.div>
          
          <motion.h2
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.5 }}
            className="font-display text-4xl font-bold md:text-6xl text-white"
          >
            {titleText.map((char, index) => (
              <motion.span key={index} variants={letterVariants} className={char === " " ? "mr-3" : ""}>
                {char}
              </motion.span>
            ))}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              className="inline-block h-[40px] w-[4px] bg-[#00E5FF] ml-2 md:h-[60px]"
            ></motion.span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 50, rotateX: 10, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            whileHover={{ scale: 1.02, rotateX: 2, rotateY: -2, z: 20 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="group rounded-3xl border border-white/10 bg-[#0a0a0a]/70 p-8 backdrop-blur-md md:col-span-8 md:p-12 transition-colors duration-500 hover:border-[#00E5FF]/40 shadow-2xl"
          >
            <h3 className="mb-6 font-display text-2xl font-bold text-white md:text-3xl transition-colors group-hover:text-[#00E5FF]">
              Engineering solutions with code, strategy, and storytelling.
            </h3>
            <div className="flex flex-col gap-5 text-sm leading-relaxed text-white/60 md:text-base">
              <p>
                Currently in my 3rd year pursuing a B.Tech in Computer Science and Engineering, my focus lies at the absolute intersection of modern Web Development and AI Engineering. I build highly scalable, intelligent applications leveraging Python, FastAPI, React, and LLM integrations.
              </p>
              <p>
                Beyond writing clean architecture, I am a digital content creator and the mind behind <span className="text-white font-semibold">Pratik Verse</span>, a platform dedicated to producing investigative documentaries, decoding historical mysteries, and applying cinematic storytelling techniques.
              </p>
              <p>
                Whether I am engineering automated RAG pipelines, extracting strategic principles from Chanakya Niti, or analyzing renewable energy trends within the stock market, my approach remains fiercely data-driven and engineered for long-term impact.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 md:col-span-4">
            {[
              { icon: <FiCode className="h-5 w-5" />, title: "Full Stack AI", sub: "Next.js & Python" },
              { icon: <FiYoutube className="h-5 w-5" />, title: "Pratik Verse", sub: "Digital Content Creator" },
              { icon: <FiTrendingUp className="h-5 w-5" />, title: "Market Analysis", sub: "Renewable Energy Tech" },
              { icon: <FiTarget className="h-5 w-5" />, title: "Strategy", sub: "Chanakya Niti Principles" },
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: 50, rotateY: -20, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, rotateY: 0, scale: 1 }}
                whileHover={{ scale: 1.05, x: -10, rotateY: 8, z: 30 }}
                viewport={{ once: false, amount: 0.4 }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-5 rounded-2xl border border-white/10 bg-[#0a0a0a]/70 p-6 backdrop-blur-md transition-colors duration-300 hover:border-[#00E5FF]/50 hover:bg-[#111111]"
              >
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6, ease: "anticipate" }}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#00E5FF]/10 text-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.15)]"
                >
                  {item.icon}
                </motion.div>
                <div>
                  <p className="text-sm font-bold text-white">{item.title}</p>
                  <p className="text-xs text-white/50">{item.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}