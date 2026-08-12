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
    <section id="about" className="relative px-5 py-24 md:px-10 md:py-32 overflow-hidden bg-transparent" style={{ perspective: "1200px" }}>
      
      {/* Center Radial Glow - Premium Subtle Blur */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[400px] w-[400px] md:h-[600px] md:w-[600px] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,229,255,0.04)_0%,rgba(0,0,0,0)_70%)] blur-[50px] md:blur-[70px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        
        {/* Header Section */}
        <div className="mb-12 md:mb-20 text-center md:text-left flex flex-col items-center md:items-start">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.5 }}
            className="mb-4 flex items-center gap-3 rounded-full border border-[#00E5FF]/20 bg-[#00E5FF]/5 px-4 py-1.5 text-[10px] md:text-xs font-semibold tracking-widest text-[#00E5FF] backdrop-blur-md"
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
            className="font-display text-4xl font-extrabold tracking-tight md:text-6xl text-white flex items-center justify-center md:justify-start"
          >
            {titleText.map((char, index) => (
              <motion.span key={index} variants={letterVariants} className={char === " " ? "mr-2 md:mr-3" : ""}>
                {char}
              </motion.span>
            ))}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              className="inline-block h-[32px] w-[3px] bg-[#00E5FF] ml-3 md:h-[60px] md:w-[4px]"
            ></motion.span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-12">
          
          {/* Main About Card - Premium Glassmorphism */}
          <motion.div 
            initial={{ opacity: 0, y: 50, rotateX: 5, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
            whileHover={{ scale: 1.01, z: 10 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="group relative overflow-hidden rounded-[2rem] border border-white/5 bg-gradient-to-br from-white/[0.05] to-transparent p-8 backdrop-blur-xl shadow-2xl md:col-span-8 md:p-12 md:rounded-[2.5rem]"
          >
            {/* Subtle Top Glow for Card */}
            <div className="absolute top-0 left-1/4 h-[1px] w-1/2 bg-gradient-to-r from-transparent via-[#00E5FF]/30 to-transparent"></div>

            <h3 className="mb-6 font-display text-2xl font-bold bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent md:mb-8 md:text-3xl leading-snug">
              Engineering solutions with code, strategy, and storytelling.
            </h3>
            
            <div className="flex flex-col gap-6 text-sm leading-[1.8] text-white/70 md:gap-7 md:text-base md:leading-loose">
              <p>
                Hi, I'm Pratik Maurya, a 4th-year Computer Science and Engineering student at Kashi Institute of Technology. I specialize in bridging the gap between modern Web Development and Artificial Intelligence. With a strong command over Python, FastAPI, Next.js, and LLM integrations, I build intelligent, scalable, and highly interactive applications. From automating complex workflows to architecting high-performance backends, my goal is to engineer solutions that are not just functional, but futuristic.
              </p>
              <p>
                Beyond writing clean architecture, I am a digital content creator and the mind behind <span className="font-semibold text-white drop-shadow-md">Pratik Verse</span>, a platform dedicated to producing investigative documentaries, decoding historical mysteries, and applying cinematic storytelling techniques.
              </p>
              <p>
                My technical ecosystem revolves around modern software engineering and automation. I work extensively with Python, FastAPI, and Next.js to develop high-performance backends and interactive frontends. Whether it is engineering a voice-integrated AI assistant, building web automation solutions, or integrating complex LLM workflows, I thrive on tackling challenging problems. I believe that great software is built on a foundation of robust APIs, optimized data flow, and secure architecture.
              </p>
            </div>
          </motion.div>

          {/* Side Skills Cards */}
          <div className="grid grid-cols-1 gap-4 md:col-span-4 content-start">
            {[
              { icon: <FiCode className="h-5 w-5" />, title: "Full Stack AI", sub: "Next.js & Python" },
              { icon: <FiYoutube className="h-5 w-5" />, title: "Pratik Verse", sub: "Digital Content Creator" },
              { icon: <FiTrendingUp className="h-5 w-5" />, title: "Market Analysis", sub: "Renewable Energy Tech" },
              { icon: <FiTarget className="h-5 w-5" />, title: "Strategy", sub: "Chanakya Niti Principles" },
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                whileHover={{ scale: 1.03, x: -5 }}
                viewport={{ once: false, amount: 0.4 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                className="flex items-center gap-5 rounded-2xl border border-white/5 bg-white/[0.02] p-5 backdrop-blur-md transition-all duration-300 hover:bg-white/[0.05] hover:border-[#00E5FF]/30 hover:shadow-[0_0_20px_rgba(0,229,255,0.1)]"
              >
                <motion.div 
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6, ease: "anticipate" }}
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#00E5FF]/10 text-[#00E5FF] border border-[#00E5FF]/20 shadow-[0_0_15px_rgba(0,229,255,0.1)]"
                >
                  {item.icon}
                </motion.div>
                <div>
                  <p className="text-sm font-bold text-white tracking-wide">{item.title}</p>
                  <p className="text-xs text-white/50 mt-0.5">{item.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}