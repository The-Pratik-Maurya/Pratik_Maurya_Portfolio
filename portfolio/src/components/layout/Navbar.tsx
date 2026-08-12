"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "motion/react"; 
import { Send } from "lucide-react"; 

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Work", href: "#work" },
  { name: "Tech", href: "#tech" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  // 🔥 NAYA: Scroll Up/Down par Navbar Hide/Show Animation
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    // Agar menu open hai toh hide mat karo
    if (isOpen) return;
    
    // Agar user 150px se zyada neeche gaya aur scroll down kar raha hai, toh hide
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      // Upar scroll karne par wapas show karo
      setHidden(false);
    }
  });

  // Background scroll lock when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  // Framer Motion Variants for Menu and Links
  const menuVariants = {
    initial: { x: "100%" },
    animate: { 
      x: 0, 
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } 
    },
    exit: { 
      x: "100%", 
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.2 } 
    }
  };

  const linkContainerVariants = {
    animate: {
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    },
    exit: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 }
    }
  };

  const linkVariants = {
    initial: { x: 50, opacity: 0 },
    animate: { 
      x: 0, 
      opacity: 1, 
      transition: { duration: 0.5, ease: "easeOut" } 
    },
    exit: { 
      x: 50, 
      opacity: 0, 
      transition: { duration: 0.3 } 
    }
  };

  const logoText = "PRATIK".split(""); 

  return (
    <>
      <motion.header
        // 🔥 NAYA: Scroll Hide/Show aur 3D Drop Animation
        variants={{
          visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
          hidden: { y: "-100%", opacity: 0, transition: { duration: 0.4, ease: "easeInOut" } }
        }}
        initial="hidden"
        animate={hidden ? "hidden" : "visible"}
        className="fixed left-0 right-0 top-0 z-[60] border-b border-white/5 bg-[#0a0a0a]/80 px-6 py-4 backdrop-blur-xl md:px-10"
      >
        <nav className="mx-auto flex w-full max-w-screen-2xl items-center justify-between">
          
          {/* Left: 3D Animated Logo */}
          <div className="w-1/2 md:w-1/3" style={{ perspective: "1000px" }}>
            <a href="#" onClick={() => setIsOpen(false)} className="group font-display text-2xl font-bold tracking-tight text-white relative z-[70] flex items-center">
              {logoText.map((char, index) => (
                <motion.span
                  key={index}
                  // 🔥 NAYA: 3D Flip & Drop Animation
                  initial={{ opacity: 0, y: -40, rotateX: 90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1, 
                    type: "spring",
                    stiffness: 150,
                    damping: 12
                  }}
                  className="inline-block transition-all duration-300 group-hover:text-[#00E5FF] group-hover:-translate-y-1"
                  style={{ transitionDelay: `${index * 0.03}s` }} 
                >
                  {char}
                </motion.span>
              ))}
              {/* Blinking Neon Dot */}
              <motion.span 
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                className="text-[#00E5FF] ml-[2px] drop-shadow-[0_0_8px_#00E5FF]"
              >
                .
              </motion.span>
            </a>
          </div>

          {/* Center: Email with Enhanced Flying Animation (Desktop Only) */}
          <div className="hidden w-1/3 justify-center md:flex">
            <a 
              href="mailto:pratikmaurya222@gmail.com" 
              className="group flex items-center gap-2.5 rounded-full border border-white/5 bg-white/5 px-5 py-2 text-sm font-medium tracking-wide text-white/60 transition-all duration-300 hover:border-[#00E5FF]/50 hover:bg-[#00E5FF]/10 hover:text-white hover:shadow-[0_0_20px_rgba(0,229,255,0.2)]"
            >
              <span>pratikmaurya222@gmail.com</span>
              <div className="relative flex h-5 w-5 items-center justify-center overflow-hidden">
                {/* Outgoing Plane (Udd ke jayega) */}
                <Send className="absolute h-4 w-4 text-[#00E5FF] transition-all duration-500 ease-in-out group-hover:translate-x-6 group-hover:-translate-y-6 group-hover:scale-50 group-hover:opacity-0" />
                {/* Incoming Plane (Peeche se swoop karega) */}
                <Send className="absolute h-4 w-4 text-[#00E5FF] -translate-x-6 translate-y-6 scale-50 opacity-0 transition-all duration-500 ease-in-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100" />
              </div>
            </a>
          </div>

          {/* Right: Desktop Links (Shaped Buttons with Neon Glow) */}
          <div className="hidden w-1/3 justify-end gap-3 md:flex">
            {navLinks.map((link, i) => (
              <motion.a 
                key={i} 
                href={link.href} 
                // 🔥 NAYA: Pill Shaped Hover Buttons
                className="relative overflow-hidden rounded-full px-4 py-2 text-xs font-bold uppercase tracking-widest text-white/60 transition-all duration-300 hover:text-black group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Button Neon Hover Background */}
                <span className="absolute inset-0 z-0 h-full w-full -translate-x-full rounded-full bg-[#00E5FF] transition-transform duration-300 ease-out group-hover:translate-x-0"></span>
                {/* Button Glow Shadow */}
                <span className="absolute inset-0 z-0 h-full w-full rounded-full opacity-0 shadow-[0_0_15px_#00E5FF] transition-opacity duration-300 group-hover:opacity-100"></span>
                
                <span className="relative z-10">{link.name}</span>
              </motion.a>
            ))}
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden justify-end w-1/2">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="relative z-[70] flex h-10 w-10 flex-col items-center justify-center gap-1.5 focus:outline-none"
              aria-label="Toggle Menu"
            >
              <motion.span 
                animate={isOpen ? { rotate: 45, y: 8, backgroundColor: "#00E5FF", boxShadow: "0 0 10px #00E5FF" } : { rotate: 0, y: 0, backgroundColor: "#ffffff" }} 
                className="block h-[2px] w-7 rounded-full transition-all duration-300"
              />
              <motion.span 
                animate={isOpen ? { opacity: 0, x: 20 } : { opacity: 1, x: 0, backgroundColor: "#ffffff" }} 
                className="block h-[2px] w-7 rounded-full transition-all duration-300"
              />
              <motion.span 
                animate={isOpen ? { rotate: -45, y: -8, backgroundColor: "#00E5FF", boxShadow: "0 0 10px #00E5FF" } : { rotate: 0, y: 0, backgroundColor: "#ffffff" }} 
                className="block h-[2px] w-7 rounded-full transition-all duration-300"
              />
            </button>
          </div>

        </nav>
      </motion.header>

      {/* Full-Screen Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 z-[50] flex h-[100dvh] w-full flex-col justify-center bg-[#050505]/98 px-10 backdrop-blur-3xl md:hidden"
          >
            {/* Animated Links */}
            <motion.div 
              variants={linkContainerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col gap-8"
            >
              {navLinks.map((link, i) => (
                <motion.div key={i} variants={linkVariants} className="overflow-hidden">
                  <a 
                    href={link.href} 
                    onClick={() => setIsOpen(false)} 
                    className="group flex items-center gap-4 text-4xl font-display font-bold text-white transition-colors"
                  >
                    <span className="text-sm font-bold text-[#00E5FF] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      0{i + 1}
                    </span>
                    <span className="group-hover:text-[#00E5FF] group-hover:translate-x-2 transition-all duration-300 drop-shadow-[0_0_8px_rgba(0,229,255,0.4)]">
                      {link.name}
                    </span>
                  </a>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Bottom Contact / Email Info on Menu (With enhanced flying animation) */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-10 left-10"
            >
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-white/30">Get in touch</p>
              <a 
                href="mailto:pratikmaurya222@gmail.com" 
                className="group flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-lg font-medium text-white transition-all duration-300 hover:border-[#00E5FF]/50 hover:bg-[#00E5FF]/10 hover:text-[#00E5FF] hover:shadow-[0_0_20px_rgba(0,229,255,0.15)]"
              >
                pratikmaurya222@gmail.com
                <div className="relative flex h-5 w-5 items-center justify-center overflow-hidden">
                  <Send className="absolute h-5 w-5 transition-all duration-500 ease-in-out group-hover:translate-x-6 group-hover:-translate-y-6 group-hover:scale-50 group-hover:opacity-0" />
                  <Send className="absolute h-5 w-5 -translate-x-6 translate-y-6 scale-50 opacity-0 transition-all duration-500 ease-in-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:scale-100 group-hover:opacity-100" />
                </div>
              </a>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}