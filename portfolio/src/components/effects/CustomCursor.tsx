"use client";

import { useEffect, useState } from "react";
// 🔥 OPTIMIZATION 1: useMotionValue aur useSpring direct import kiye, inke use se React re-render nahi hota!
import { motion, useMotionValue, useSpring } from "motion/react";

export default function CustomCursor() {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Mouse ke coordinates direct MotionValue me store kar rahe hain (Bina hook ke)
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Tracker wrapper ke liye smooth spring config
  const springConfig = { damping: 20, stiffness: 600, mass: 0.05 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const checkDevice = () => {
      setIsDesktop(window.matchMedia("(pointer: fine)").matches);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);

    // 🔥 OPTIMIZATION 2: Mouse move ko seedha set kar rahe hain bina state update ke
    const manageMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' || 
        target.tagName.toLowerCase() === 'button' || 
        target.closest('a') || 
        target.closest('button')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", manageMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("mousemove", manageMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [mouseX, mouseY]);

  if (!isDesktop) return null;

  return (
    <>
      {/* 1. CORE DOT: style={{ x, y }} use karke CPU bachaya */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] flex h-2 w-2 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#00E5FF] shadow-[0_0_10px_#00E5FF]"
        style={{ x: mouseX, y: mouseY }}
        animate={{ scale: isHovering ? 0 : 1 }}
        transition={{ duration: 0.15 }} 
      />

      {/* 2. TRACKER WRAPPER: style={{ x, y }} se ultra smooth */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
        style={{ x: smoothX, y: smoothY }}
      >
        {/* 3. JARVIS SCI-FI RING - 🔥 OPTIMIZATION 3: 'backdrop-blur' hata diya jo browser hang karta hai */}
        <motion.div
          className="relative flex items-center justify-center rounded-full border-x-2 border-y-2 border-y-transparent border-x-[#00E5FF]/80"
          animate={{
            width: isHovering ? 55 : 32,
            height: isHovering ? 55 : 32,
            rotate: isHovering ? 180 : 0, 
            // Warning fix: "transparent" ki jagah "rgba(0,0,0,0)" use kiya
            backgroundColor: isHovering ? "rgba(0, 229, 255, 0.15)" : "rgba(0, 0, 0, 0)",
            borderColor: isHovering ? "#00E5FF" : "rgba(0, 229, 255, 0.5)",
            borderWidth: isHovering ? "1px" : "2px"
          }}
          transition={{
            width: { type: "spring", stiffness: 300, damping: 20 },
            height: { type: "spring", stiffness: 300, damping: 20 },
            rotate: { duration: 0.6, ease: "backOut" }
          }}
        >
          {/* Inner Continuous Spinning Radar */}
          <div 
            className="absolute inset-[2px] rounded-full border border-dashed border-[#00E5FF]/50 animate-spin"
            style={{ animationDuration: isHovering ? "2s" : "8s" }} 
          />
          
          {/* Hover par Center lock-on dot */}
          <motion.div 
             initial={{ opacity: 0, scale: 0 }}
             animate={{ 
               opacity: isHovering ? 1 : 0, 
               scale: isHovering ? 1 : 0 
             }}
             transition={{ duration: 0.3 }}
             className="h-1.5 w-1.5 rounded-full bg-[#00E5FF] shadow-[0_0_15px_#00E5FF]"
          />
        </motion.div>
      </motion.div>
    </>
  );
}