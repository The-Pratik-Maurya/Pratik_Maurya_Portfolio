"use client";

import { useEffect } from "react";
import Lenis from "lenis";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Lenis ko initialize kar rahe hain premium settings ke sath
    const lenis = new Lenis({
      duration: 1.2, // Scroll kitni der tak smoothly rukega
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Cinematic ease-out effect
      touchMultiplier: 2, // Mobile/Trackpad par touch speed
    });

    // Request Animation Frame loop (Har frame par scroll update karne ke liye)
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup function jab component unmount ho
    return () => {
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}