"use client";

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface LoadingScreenProps {
  onComplete?: () => void;
}

// Particle ka type define kar diya for TypeScript
interface Particle {
  x: number;
  y: number;
  z: number;
  size: number;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]); // Particles state
  
  const containerRef = useRef<HTMLDivElement>(null);
  const lettersRef = useRef<(HTMLSpanElement | null)[]>([]);
  const subtitleRef = useRef<HTMLDivElement>(null);
  const bottomUIRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<(HTMLDivElement | null)[]>([]);
  
  const nameLetters = ["P", "R", "A", "T", "I", "K"];

  useEffect(() => {
    // 1. GENERATE PARTICLES ONCE ON MOUNT (Fixes the impure function error)
    const generatedParticles = Array.from({ length: 50 }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      z: (Math.random() * 1500) - 1000,
      size: Math.random() * 3 + 1
    }));
    setParticles(generatedParticles);

    // 2. PREMIUM AUDIO INIT
    try {
      const bootSound = new Audio('/premium-load.mp3'); 
      bootSound.volume = 0.4;
      bootSound.play().catch(() => {});
    } catch (err) {
      console.log("Audio skipped");
    }

    // 3. NON-LINEAR LOADING LOGIC
    let currentProgress = 0;
    const progressInterval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 6) + 1; 
      
      if (currentProgress >= 100) {
        currentProgress = 100;
        setProgress(100);
        clearInterval(progressInterval);
        
        setTimeout(triggerCinematicExit, 800);
      } else {
        setProgress(currentProgress);
      }
    }, 120);

    return () => clearInterval(progressInterval);
  }, []);

  useGSAP(() => {
    // 1A. Name Letters Entrance
    gsap.fromTo(lettersRef.current, 
      { z: -2000, rotationX: -120, rotationY: 45, opacity: 0, y: 150 },
      { z: 0, rotationX: 0, rotationY: 0, opacity: 1, y: 0, duration: 2.5, stagger: 0.15, ease: "power4.out" }
    );

    // 1B. Ambient Breathing Effect for Letters
    gsap.to(lettersRef.current, {
      y: -15, z: 20, duration: 3, stagger: 0.2, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 1.5
    });

    // 1C. Subtitle Fade In
    gsap.fromTo(subtitleRef.current,
      { opacity: 0, letterSpacing: "0.2em", filter: "blur(10px)" },
      { opacity: 0.8, letterSpacing: "0.8em", filter: "blur(0px)", duration: 2, ease: "expo.out", delay: 1.5 }
    );

    // 1D. Particle System Floating Animation (Runs only when particles are generated)
    if (particles.length > 0) {
      particlesRef.current.forEach((particle) => {
        if (particle) {
          gsap.to(particle, {
            y: `-=${Math.random() * 200 + 100}`,
            x: `+=${Math.random() * 100 - 50}`,
            rotation: Math.random() * 360,
            opacity: Math.random() * 0.5 + 0.2,
            duration: Math.random() * 5 + 3,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: Math.random() * 2
          });
        }
      });
    }
  }, { scope: containerRef, dependencies: [particles] }); // Dependencies added to ensure it animates particles after they load

  // ==========================================
  // PHASE 2: THE 3D SNAP-AND-BLAST EXIT
  // ==========================================
  const triggerCinematicExit = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        if (typeof onComplete === "function") {
          onComplete(); 
        }
      }
    });

    tl.to([bottomUIRef.current, subtitleRef.current], {
      opacity: 0, y: 30, duration: 0.4, ease: "power3.in"
    });

    tl.to(lettersRef.current, {
      z: -300, scale: 0.8, duration: 0.6, ease: "power2.inOut"
    }, "-=0.2");

    tl.to(lettersRef.current, {
      z: 2500, opacity: 0, duration: 1.2, stagger: 0.08, ease: "expo.in"
    });

    tl.to(containerRef.current, {
      opacity: 0, duration: 1, ease: "power3.inOut"
    }, "-=0.9"); 
  };

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[9999] flex h-[100dvh] w-full flex-col items-center justify-center bg-[#050505] overflow-hidden pointer-events-none"
      style={{ perspective: "1500px" }}
    >
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay z-0"></div>

      {/* DYNAMIC 3D PARTICLE SYSTEM LAYER */}
      <div className="absolute inset-0 z-0" style={{ transformStyle: "preserve-3d" }}>
        {particles.map((p, i) => (
          <div
            key={i}
            ref={(el) => { particlesRef.current[i] = el; }}
            className="absolute rounded-full bg-[#00E5FF] shadow-[0_0_10px_#00E5FF]"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
              transform: `translateZ(${p.z}px)`,
              opacity: 0, // Starts invisible, animated by GSAP
            }}
          />
        ))}
      </div>

      {/* THE 3D NAME LAYER */}
      <div className="relative z-10 flex items-center justify-center gap-1 md:gap-4" style={{ transformStyle: "preserve-3d" }}>
        {nameLetters.map((letter, index) => (
          <span
            key={index}
            ref={(el) => { lettersRef.current[index] = el; }}
            className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-[140px] font-black leading-none tracking-tight text-white"
            style={{ 
              display: "inline-block",
              transformStyle: "preserve-3d",
              textShadow: "0px 0px 40px rgba(0,229,255,0.25), 0px 4px 4px rgba(0,0,0,0.5)",
              WebkitTextStroke: "1px rgba(255,255,255,0.1)"
            }}
          >
            {letter}
          </span>
        ))}
      </div>
      
      {/* Subtitle / Last Name */}
      <div 
        ref={subtitleRef}
        className="relative z-10 mt-6 font-display text-sm md:text-2xl font-bold text-[#00E5FF] uppercase drop-shadow-[0_0_15px_rgba(0,229,255,0.6)]"
      >
        MAURYA
      </div>

      {/* THE BOTTOM LOADING UI */}
      <div ref={bottomUIRef} className="absolute bottom-10 md:bottom-16 flex w-full max-w-[280px] md:max-w-md flex-col items-center px-4 md:px-6 z-10">
        <div className="relative h-[2px] md:h-[3px] w-full overflow-hidden bg-white/10 rounded-full">
          <div 
            className="absolute left-0 top-0 h-full bg-[#00E5FF] shadow-[0_0_20px_#00E5FF]"
            style={{ 
              width: `${progress}%`, 
              transition: "width 0.2s cubic-bezier(0.4, 0, 0.2, 1)" 
            }}
          />
        </div>

        <div className="mt-5 flex w-full justify-between items-center text-[10px] md:text-xs font-mono tracking-widest text-white/50 uppercase">
          <span className="animate-pulse">
            {progress < 100 ? "Syncing Systems..." : "Access Granted"}
          </span>
          <span className="font-bold text-[#00E5FF] tabular-nums">
            {progress.toString().padStart(3, '0')}%
          </span>
        </div>
      </div>

    </div>
  );
}