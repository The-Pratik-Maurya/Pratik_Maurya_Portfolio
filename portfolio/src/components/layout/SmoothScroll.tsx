"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, 
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      touchMultiplier: 2, 
      // 🔥 OPTIMIZATION 1: Mobile par touch wheel skip taaki heavy load na aaye
      syncTouch: false,
    });

    let rafId: number; // ID store karne ke liye variable

    // Request Animation Frame loop 
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf); // ID update hoti rahegi
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      // 🔥 OPTIMIZATION 2: Memory Leak fix! Jab page change hoga, animation loop band ho jayega.
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}