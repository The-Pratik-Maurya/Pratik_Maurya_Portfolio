"use client";

import { motion } from "motion/react";
import { FiGithub, FiLinkedin, FiInstagram, FiTwitter, FiYoutube } from "react-icons/fi";

// Saare important links ek jagah array me daal diye, manage karna aasan hoga
const socials = [
  { id: "github", href: "https://github.com/The-Pratik-Maurya", icon: <FiGithub className="h-[22px] w-[22px]" /> },
  { id: "linkedin", href: "https://www.linkedin.com/in/pratik-maurya-jnp/", icon: <FiLinkedin className="h-[22px] w-[22px]" /> },
  { id: "youtube", href: "https://www.youtube.com/@ThePratikVerse", icon: <FiYoutube className="h-[22px] w-[22px]" /> },
  { id: "twitter", href: "https://x.com/pratikmaurya22", icon: <FiTwitter className="h-[22px] w-[22px]" /> },
  { id: "instagram", href: "https://www.instagram.com/the_pratik_maurya/", icon: <FiInstagram className="h-[22px] w-[22px]" /> },
];

export default function SocialLinks() {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20, y: 20 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay: 2.5, duration: 0.8, ease: "easeOut" }}
      // Mobile ke liye bottom center Dock, Desktop ke liye left Vertical line
      className="fixed z-50 flex items-center gap-3 
                 bottom-6 left-1/2 -translate-x-1/2 flex-row rounded-full border border-white/10 bg-[#0a0a0a]/80 px-5 py-2.5 backdrop-blur-md shadow-2xl
                 md:bottom-0 md:left-4 md:-translate-x-0 md:flex-col md:gap-5 md:rounded-none md:border-none md:bg-transparent md:px-0 md:py-0 md:backdrop-blur-none md:shadow-none"
    >
      {socials.map((social) => (
        <a 
          key={social.id}
          href={social.href} 
          target="_blank" 
          rel="noreferrer" 
          className="group relative flex h-10 w-10 md:h-12 md:w-12 items-center justify-center rounded-full border border-transparent text-white/50 transition-all duration-300 hover:-translate-y-1 hover:border-[#00E5FF] hover:bg-[#00E5FF]/10 hover:text-[#00E5FF] hover:shadow-[0_0_15px_rgba(0,229,255,0.4)]"
        >
          {social.icon}
        </a>
      ))}
      
      {/* Vertical Line (Sirf Desktop par dikhegi) */}
      <div className="hidden h-28 w-[2px] rounded-t-full bg-gradient-to-b from-[#00E5FF]/40 to-transparent mt-2 md:block"></div>
      
    </motion.div>
  );
}