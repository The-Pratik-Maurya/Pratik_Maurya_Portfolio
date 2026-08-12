"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import useMousePosition from "../../hooks/useMousePosition";

export default function CustomCursor() {
  const { x, y } = useMousePosition();
  const [isDesktop, setIsDesktop] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Sirf desktop par enable karenge
  useEffect(() => {
    const checkDevice = () => {
      setIsDesktop(window.matchMedia("(pointer: fine)").matches);
    };
    checkDevice();
    window.addEventListener("resize", checkDevice);

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

    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("resize", checkDevice);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  if (!isDesktop) return null;

  return (
    <>
      {/* 1. CORE DOT: Ekdum instant (Lag-free) */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] flex h-2 w-2 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[#00E5FF] shadow-[0_0_10px_#00E5FF]"
        animate={{ 
          x, 
          y,
          scale: isHovering ? 0 : 1, // Hover par chhip jayega
        }}
        transition={{ type: "tween", ease: "linear", duration: 0 }} 
      />

      {/* 2. TRACKER WRAPPER: Smooth follow karta hai bina delay ke */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
        animate={{ x, y }}
        transition={{
          type: "spring",
          damping: 20,
          mass: 0.05,     
          stiffness: 600, 
        }}
      >
        {/* 3. JARVIS SCI-FI RING (Lock-on effect) */}
        <motion.div
          className="relative flex items-center justify-center rounded-full border-x-2 border-y-2 border-y-transparent border-x-[#00E5FF]/80 backdrop-blur-[1px]"
          animate={{
            width: isHovering ? 55 : 32,
            height: isHovering ? 55 : 32,
            rotate: isHovering ? 180 : 0, // Hover par 180 degree flip hoga
            backgroundColor: isHovering ? "rgba(0, 229, 255, 0.15)" : "transparent",
            borderColor: isHovering ? "#00E5FF" : "rgba(0, 229, 255, 0.5)",
            borderWidth: isHovering ? "1px" : "2px"
          }}
          transition={{
            width: { type: "spring", stiffness: 300, damping: 20 },
            height: { type: "spring", stiffness: 300, damping: 20 },
            rotate: { duration: 0.6, ease: "backOut" }
          }}
        >
          {/* Inner Continuous Spinning Radar (Dashed Line) */}
          <div 
            className="absolute inset-[2px] rounded-full border border-dashed border-[#00E5FF]/50 animate-spin"
            style={{ animationDuration: isHovering ? "2s" : "8s" }} // Hover par speed badh jayegi
          />
          
          {/* Hover par Center me aane wala naya lock-on dot */}
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