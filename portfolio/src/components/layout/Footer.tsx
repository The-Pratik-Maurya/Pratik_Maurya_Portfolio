"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FaGithub, FaLinkedin, FaXTwitter, FaYoutube } from "react-icons/fa6";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const socialLinks = [
  { name: "GitHub", icon: <FaGithub className="h-5 w-5" />, href: "https://github.com/The-Pratik-Maurya", color: "hover:text-[#00E5FF] hover:border-[#00E5FF] hover:shadow-[0_0_15px_rgba(0,229,255,0.4)]" },
  { name: "LinkedIn", icon: <FaLinkedin className="h-5 w-5" />, href: "https://www.linkedin.com/in/pratik-maurya-jnp/", color: "hover:text-[#00E5FF] hover:border-[#00E5FF] hover:shadow-[0_0_15px_rgba(0,229,255,0.4)]" },
  { name: "Twitter", icon: <FaXTwitter className="h-5 w-5" />, href: "https://x.com/pratikmaurya22", color: "hover:text-[#00E5FF] hover:border-[#00E5FF] hover:shadow-[0_0_15px_rgba(0,229,255,0.4)]" },
  { name: "YouTube", icon: <FaYoutube className="h-5 w-5" />, href: "https://www.youtube.com/@ThePratikVerse", color: "hover:text-[#ff0000] hover:border-[#ff0000] hover:shadow-[0_0_15px_rgba(255,0,0,0.4)]" }, // YouTube ko red glow diya hai for personal branding
];

export default function Footer() {
  const container = useRef<HTMLElement>(null);
  const currentYear = new Date().getFullYear();

  useGSAP(() => {
    // Staggered slide-up animation for footer elements
    gsap.from(".footer-anim", {
      scrollTrigger: {
        trigger: container.current,
        start: "top 95%", // Triggers jab footer almost screen par aa jaye
        toggleActions: "play reverse play reverse",
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
    });
  }, { scope: container });

  return (
    <footer ref={container} className="relative overflow-hidden border-t border-white/5 bg-[#0a0a0a]/90 px-6 py-12 backdrop-blur-xl mt-10">
      
      {/* Top Center Premium Glow Line */}
      <div className="absolute left-1/2 top-0 h-[2px] w-1/2 -translate-x-1/2 bg-gradient-to-r from-transparent via-[#00E5FF]/60 to-transparent shadow-[0_0_20px_#00E5FF]" />

      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-10 md:flex-row">
        
        {/* Left - Branding */}
        <div className="footer-anim flex flex-col items-center text-center md:items-start md:text-left">
          <a href="#" className="group font-display text-2xl font-bold tracking-tight text-white transition-colors hover:text-white/80">
            PRATIK<span className="text-[#00E5FF] animate-pulse">.</span>
          </a>
          <p className="mt-3 text-[11px] font-semibold tracking-widest text-white/40 uppercase">
            © {currentYear} Pratik Maurya. All rights reserved.
          </p>
          <p className="mt-1 text-[10px] tracking-wider text-white/20">
            Designed & Engineered with precision.
          </p>
        </div>

        {/* Right - Social Logos */}
        <div className="footer-anim flex items-center gap-4">
          {socialLinks.map((social, index) => (
            <a 
              key={index}
              href={social.href}
              aria-label={social.name}
              target="_blank"
              rel="noopener noreferrer"
              className={`group flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/60 transition-all duration-300 hover:-translate-y-1 hover:bg-[#111111] ${social.color}`}
            >
              <div className="transition-transform duration-300 group-hover:scale-110">
                {social.icon}
              </div>
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
}